# SEARCHILY Frontend — Full Project Audit Report

> **Audited against:** `.design/DESIGN.md` as sole source of truth  
> **Date:** April 14, 2026  
> **Coverage:** Every source file in `src/` read and evaluated

---

## Executive Summary

The SEARCHILY frontend is a **well-structured React + Vite + TailwindCSS** application with a solid component hierarchy and a clean, Mistral-inspired design language. The design system implementation is largely correct. However, the project has **significant functional gaps**:

- The entire backend integration layer is **empty** (two zero-byte service files)
- 6 of the 14 routed pages are **empty placeholder shells**
- Authentication is **fully mocked** — any token is accepted
- The primary feature (chat/search) uses **setTimeout simulations** instead of a real WebSocket
- Dozens of UI elements are **hardcoded with fake data**

---

## 1. What's Actually Working ✅

| Feature | Status |
|---------|--------|
| Design system (colors, typography, shadows, dark mode) | ✅ Correct |
| Routing and layout architecture | ✅ Solid |
| Chat UI (messages, streaming cursor, skeleton loading) | ✅ Well-built |
| History sidebar (localStorage, grouping, deletion) | ✅ Working |
| ProductCard + ResultsPanel layout | ✅ Working |
| PreviewDrawer (focus trap, keyboard nav, DOMPurify) | ✅ Well-built |
| Dark/light theme toggle with system detection | ✅ Working |
| Admin layout, sidebar, and topbar | ✅ Working |
| Resizable results panel (drag divider) | ✅ Working |
| Mobile drawer for sidebar and results panel | ✅ Working |
| ChatInput stop-generating button | ✅ Working |
| Error banner + retry button in chat | ✅ Working |
| Lazy loading for all page chunks | ✅ Correct |

---

## 2. Logic Issues & Bugs 🐛

### 2.1 ChatLayout — Mobile Sidebar/Drawer Double-Render Bug

**File:** `src/features/chat/components/ChatLayout.tsx` lines 40–63

```tsx
// Desktop sidebar
{sidebarOpen && (
  <div className="hidden md:flex ...">
    <Sidebar ... />
  </div>
)}

// Mobile drawer — uses window.innerWidth directly
{sidebarOpen && window.innerWidth < 768 && (
  <Drawer ...>
    <Sidebar ... />
  </Drawer>
)}
```

**Problem:** Calling `window.innerWidth` directly in JSX is a **snapshot at render time**, not reactive. On desktop, both conditions can be true initially if the window is later resized. Both the desktop sidebar AND the drawer mount simultaneously at certain widths. Should use `useMediaQuery` or CSS-only visibility.

**Same bug** exists for the results panel drawer on lines 107–132.

---

### 2.2 Auth — No Error Handling on Login

**File:** `src/pages/public/AuthPage.tsx`

The `handleMockLogin` function calls `login('mock_token_123', 'admin')` with a hardcoded token. When the real backend is connected, there is **no try/catch**, no error state, and no user-facing error message for wrong credentials. The `mockMessage` state is only used for the signup stub.

---

### 2.3 ProfilePage — "Sign Out" Link Goes to `/` Not `/auth`

**File:** `src/pages/app/ProfilePage.tsx` line 35

```tsx
<Link to="/" ...>Sign Out</Link>
```

This navigates to the landing page without calling `logout()`. The `Topbar`'s sign-out correctly calls `logout()` + navigate to `/auth`. The ProfilePage sign-out **bypasses auth cleanup entirely**.

---

### 2.4 `ProtectedRoute` — Role Stored as String, Compared as String

**File:** `src/components/common/ProtectedRoute.tsx` + `AuthProvider.tsx`

The role is stored in localStorage as the raw string `"admin"`. The check `role === 'admin'` works, but there's no validation at the boundary — anyone who manually sets `localStorage.setItem('searchily_user_role', 'admin')` gets full admin access without a valid token. When the backend integration goes live, the role must come from a verified JWT, not a separate localStorage item.

---

### 2.5 `useChatSocket` — `disconnect()` Always Fires an Error Event

**File:** `src/features/chat/hooks/useChatSocket.ts` line 78

```ts
const disconnect = useCallback(() => {
  isConnected.current = false;
  clearTimeouts();
  dispatchRaw({ type: 'error', payload: { message: 'Connection lost' } });
}, [clearTimeouts, dispatchRaw]);
```

This is called on component **unmount** via the `useEffect` cleanup (line 133–135). Every time the chat layout unmounts (e.g. navigating away), it dispatches an error event. If listeners are still attached at that moment, this causes a spurious error state. Should check if there's an active request before dispatching.

---

### 2.6 `useChat` — History Saves on Every Message Update During Streaming

**File:** `src/features/chat/hooks/useChat.ts` lines 137–158

The debounced history save (500ms) is triggered on every `messages` change. During streaming, `appendToMessage` is called for every text chunk, meaning the history save debounce resets with each chunk. This is acceptable but means **history is never saved during an active stream** — only after it finishes or a 500ms pause occurs.

---

### 2.7 `Sidebar` — `handleNewChat` Loads an Invalid Session ID

**File:** `src/features/history/components/Sidebar.tsx` line 15–18

```ts
const handleNewChat = () => {
  if (loadSession) {
    loadSession(crypto.randomUUID());
  }
};
```

`loadSession` calls `loadFromHistory(id)` — a newly generated UUID will always return `null`, so it correctly falls through to create a fresh session. This is fine, but it's unintuitive code that could be clearer (a dedicated `newSession` callback would be cleaner).

---

### 2.8 `ChatEmptyState` — Suggestion Quotes Are Literal

**File:** `src/features/chat/components/ChatEmptyState.tsx` line 25

```tsx
"{suggestion}"
```

The curly braces render the variable correctly, but the double-quote characters `"..."` are **rendered literally** around each suggestion button. This is likely unintentional — should be `{suggestion}` without the string literal quotes.

---

### 2.9 Admin ETL Panel — `isSyncing` Toggle Doesn't Match Real API Flow

**File:** `src/pages/admin/AdminETLPanel.tsx` lines 66–74

The "Force Sync Now" / "Cancel Sync" is a simple toggle that auto-resets after 5 seconds. When connected to the real backend:
- "Force Sync Now" → `POST /scrape/launch` (not a toggle)
- "Cancel Sync" → `POST /scrape/stop`
- Status must come from polling `GET /scrape/status` or the WS

The current boolean toggle logic must be replaced.

---

### 2.10 `ProductCard` — `tracking-[-2.05px]` Applied Incorrectly at 18px

**File:** `src/features/product/components/ProductCard.tsx` line 36

```tsx
<h3 className="font-normal text-[18px] ... tracking-[-2.05px] ...">
```

According to DESIGN.md, `-2.05px` tracking is **only for display/hero text at 82px**. The design spec is explicit: "Aggressive tracking on display" — never at 18px card titles. This shrinks letters too tightly at small sizes, making titles harder to read.

---

## 3. What's Missing (Unimplemented Pages) 🚧

### 3.1 EditProfilePage — Empty Shell
**File:** `src/pages/app/EditProfilePage.tsx`  
Contains only a heading and a placeholder paragraph. No form fields, no save action, no API call.

### 3.2 BillingPage — Empty Shell
**File:** `src/pages/app/BillingPage.tsx`  
Contains only a heading and a placeholder paragraph. Nothing implemented.

### 3.3 NotificationsPage — Empty Shell
**File:** `src/pages/app/NotificationsPage.tsx`  
Contains only a heading and a placeholder paragraph. Nothing implemented.

### 3.4 Auth — No Registration Flow
The "Sign up" button shows a message saying to use the Sign In form. No registration form exists.

### 3.5 Auth — No Password Reset
No "Forgot password" link or flow at all.

### 3.6 App Topbar — "Workspaces" Is a Dead Button
```tsx
<button className="text-mistral-black/30 ... cursor-not-allowed ...">Workspaces (Soon)</button>
```
This placeholder exists in the nav. If "Workspaces" is not planned for near-term, it should be removed — disabled nav items are poor UX.

---

## 4. Backend Integration Gaps 🔌

### 4.1 `services/api/client.ts` — Empty File
This file is **completely blank**. There is no Axios/fetch wrapper, no base URL injection, no auth header attachment, no error handling, no request/response interceptor. All backend calls need to be made through this client, but nothing is wired.

### 4.2 `services/websocket/socket.ts` — Empty File
**Completely blank.** The real WebSocket class (connecting to `ws://localhost:8000/ws/status/{task_id}`) needs to be implemented here.

### 4.3 `useChatSocket` — Real WS Not Connected
The entire `sendMessage` function is a mock using `setTimeout`. The WebSocket URL from the gateway (`ws/status/{task_id}`) is never opened.

### 4.4 No `task_id` Handshake Flow
The current mock goes straight to streaming. The real flow requires:
1. `POST /search` → get `task_id`
2. Open WS `ws/status/{task_id}` → receive events

This two-step flow **does not exist in the frontend** and must be implemented in `useChatSocket`.

### 4.5 User Data Is All Hardcoded
- `Topbar`: `"Admin User"`, `"admin@searchily.ai"`, `"AD"` initials — hardcoded
- `Sidebar`: `"U"` initials, `"User Settings"` — hardcoded
- `ProfilePage`: `"Mock User"`, `"user@example.com"`, `"14 / 50"` — hardcoded
- `AdminTopbar`: `"System Admin"`, `"admin@searchily.ai"` — hardcoded

---

## 5. Design System Compliance (DESIGN.md) 🎨

### 5.1 ✅ Correct Implementations
- Color tokens: All DESIGN.md colors correctly mapped in `tailwind.config.js`
- Font: Arial fallback stack correctly configured
- Shadow: `shadow-mistral` correctly implements the 5-layer amber shadow system
- Border radius: `rounded-none` used universally — sharp corners ✅
- Weight: Font weight 400 everywhere ✅
- Dark mode: Warm dark backgrounds, not cool grays ✅
- Gradient block identity: Implemented in Navbar, Topbar, ChatEmptyState ✅
- Footer: Dark background with amber/orange accent border ✅
- Typography scale: Hero text uses `clamp()` and responsive sizing ✅

### 5.2 ❌ Violations

#### 5.2.1 `LandingPage` — Feature Section Uses font-bold
**File:** `src/pages/public/LandingPage.tsx` lines 35, 41, 47

```tsx
<h3 className="text-2xl font-bold mb-4">Conversational Retrieval</h3>
```

DESIGN.md is explicit: **"Don't use bold (700+) weight — 400 is the only weight."** These three feature card headings violate this rule directly.

#### 5.2.2 `LandingPage` — Dark Section Has Cool Gray Text
```tsx
<p className="text-white/70 leading-relaxed">
```

DESIGN.md says: "Don't use generic gray for text — even neutrals should be warm-tinted." `text-white/70` on the dark section is technically cool gray. Should use `text-warm-ivory/70` for warm temperature consistency.

#### 5.2.3 `ResultsPanel` — Background Is Pure White (`bg-white`)
**File:** `src/features/chat/components/ResultsPanel.tsx` line 16

```tsx
className="... bg-white ..."
```

DESIGN.md: "Don't use pure white as a page background — always warm-tinted (#fffaeb minimum)." Should use `bg-warm-ivory` or `bg-cream`.

#### 5.2.4 `AdminDashboard` — No Dark Mode Support
**File:** `src/pages/admin/AdminDashboard.tsx`

The admin dashboard cards use hardcoded `bg-white`, `text-mistral-black`, `bg-warm-ivory` without any `dark:` variants. All other pages support dark mode, but the admin dashboard is stuck in light mode only.

#### 5.2.5 `AdminETLPanel` — No Dark Mode Support
**File:** `src/pages/admin/AdminETLPanel.tsx`

Same issue — the status card uses `bg-white`, `text-mistral-black` without `dark:` variants.

#### 5.2.6 `ProductCard` — Tracking at 18px (Already Noted in Bug Section)
`tracking-[-2.05px]` on 18px text. This is a design spec violation. The display tracking should only be at 82px hero scale.

#### 5.2.7 `ChatEmptyState` — Wrong `leading` for Headline
```tsx
className="... leading-[1.15] ..."
```
DESIGN.md says display text should use `leading-[0.95]` or `leading-[1.00]`. The hero text in the empty state uses `1.15` which is looser than spec.

#### 5.2.8 Shadows on Profile Sub-Pages — Wrong Shadow System Used
**Files:** `BillingPage`, `EditProfilePage`, `NotificationsPage`, `ProfilePage`

```tsx
shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
```

DESIGN.md specifies the 5-layer warm **golden shadow** system (`shadow-mistral`). The profile pages use a hard black offset shadow — a completely different visual system. This is inconsistent with the rest of the application.

#### 5.2.9 Admin Reports Dark Mode — `dark:shadow-mistral` Wrong
**File:** `src/pages/admin/AdminReports.tsx` line 27

The reports table uses `dark:shadow-mistral` — but DESIGN.md says shadows on dark backgrounds should be minimal/none to avoid the amber wash on dark backgrounds. `shadow-mistral` in dark mode creates visual noise.

---

## 6. UX Issues 🖥️

### 6.1 No Loading State on Page Navigate
When navigating from `/app` to `/app/profile`, the `AppLayout` renders `<Outlet>` without a full page loading indicator. The `MobileNavProvider` initializes `sidebarOpen` with a `window.innerWidth` check — this SSR-unsafe call runs on every layout mount.

### 6.2 No Feedback When History Is Deleted
Deleting a session from the sidebar does not show any confirmation dialog or undo option. A single misclick loses a session permanently.

### 6.3 Chat Suggestion Buttons Quote Wrapping (Bug #2.8 Revisited)
Each suggestion card displays `"Find me a cheap gaming laptop..."` with literal quote marks. This looks intentional but reads as odd UI copy.

### 6.4 Profile Sub-Pages Don't Use the AppLayout Topbar
The `ProfilePage`, `BillingPage`, `EditProfilePage`, `NotificationsPage` all render their own inline back-nav header (`← Back to Profile`) without the Topbar. This means returning to the full app feels like a context switch. They should use a shared pattern.

### 6.5 No Session Persistence for Chat Across Page Refreshes
Chat history is saved to `localStorage` (via `useHistory`). However, when the app loads, the `useChat` hook initializes with a fresh `sessionId = crypto.randomUUID()`. The user always starts a new chat — they can only reload a past session by clicking it in the sidebar. There's no concept of "resume last session automatically."

### 6.6 `ChatInput` Does Not Clear on Submission via Ref
**File:** `src/features/chat/components/ChatInput.tsx` lines 41–43, 51–52

The input is an **uncontrolled component** (`defaultValue=""`, cleared via `inputRef.current.value = ''`). This means React's virtual DOM doesn't know the value—which is fine for performance, but the `disabled={isLoading}` prop doesn't clear the value visually when loading begins. The text remains visible in the input while `isLoading` is true.

### 6.7 Admin Reports Pagination Is Static Mock
The "Previous" / "Next" pagination buttons exist but do nothing. "Showing 1 to 4 of 12 entries" is hardcoded. No real pagination implemented.

### 6.8 Footer Links — Twitter and GitHub Link to `#`
**File:** `src/components/layout/Footer.tsx` lines 36–37

Social links go nowhere. Should link to real accounts or be removed.

### 6.9 No 404 / Not Found Route
The router has no catch-all route. Navigating to any unregistered path (e.g. `/blah`) renders the root layout with no content.

### 6.10 `StorageEvent` Listener Only Handles Cross-Tab Changes
**File:** `src/features/auth/context/AuthProvider.tsx` lines 22–33

The `storage` event only fires when another tab modifies localStorage. Within the same tab, changes via `login()` / `logout()` update state directly — which is correct. But this means the auth state is **not reactive to manual localStorage edits in the same tab** — which is an edge case but worth noting.

---

## 7. Architecture & Code Quality 🏗️

### 7.1 Store Directory Is Empty
`src/store/` exists but contains nothing. If Zustand or another state management solution was planned, it was never implemented. The current state management is entirely local React state — `useChat`, `useHistory`, `AuthProvider`, `ThemeProvider`, `MobileNavProvider`.

### 7.2 `components/ui/` Directory Is Empty
This directory was likely planned for reusable primitive components (Button, Input, Badge etc.) but contains nothing. All UI is implemented inline. This makes the codebase inconsistent.

### 7.3 `features/auth/components/` and `features/auth/hooks/` Are Empty
These directories exist but contain nothing. Auth logic is split between `context/AuthProvider.tsx` and `pages/public/AuthPage.tsx`. The pattern is inconsistent with the rest of the codebase where features export from `components/` and `hooks/`.

### 7.4 `features/admin/components/` Is Empty
The admin feature directory exists but is empty. The admin components live in `components/layout/` (AdminTopbar, AdminSidebar) and admin pages directly. No feature-level organization.

### 7.5 Junk/Fix Scripts in Root
The project root contains 9+ one-off Python scripts:
```
fix_admin_pages.py, fix_desktop_cond.py, fix_desktop_layout.py,
fix_drawer.py, fix_profile_links.py, fix_prose.py,
fix_remaining.py, fix_router.py, fix_topbar_buttons.py
```
These are **patch scripts** from past debugging sessions — they should not be in the repository. They should be deleted and gitignored or moved to a dev-tools directory.

Also present: `replace_jit.js`, `update_chat_layout.py`, `echo`, `src_tree.txt`, `md_files.txt` — all junk files that should be cleaned up.

### 7.6 `src/hooks/` and `src/lib/` Are Empty
Both utility directories created, never used.

### 7.7 `src/app/providers/AppProvider.tsx` and `QueryProvider.tsx` Are Empty
Two empty provider files — likely planned for React Query or a global app provider.

### 7.8 Citation Sources Are Entirely Mocked
**File:** `src/features/chat/components/AIMessage.tsx` lines 5–10

The citation hover cards (`[1]`, `[2]` etc.) pull from `MOCK_SOURCES` — a hardcoded dict. Sources must come from the backend alongside each AI response. No data contract exists for this yet.

### 7.9 `mockGenerateAIResponse` Returns a Generic Markdown Guide
**File:** `src/mockdata/chatMock.ts`

The mock AI response returns a generic "Markdown syntax guide" completely unrelated to the user's query. This makes development testing confusing. At minimum it should return something query-relevant.

### 7.10 `useHistory` — `deleteHistorySession` Is Missing
**File:** `src/features/history/hooks/useHistory.ts`

The `useChat` hook calls `deleteHistorySession` from `useHistory`, but `useHistory.ts` only exports `{ history, saveToHistory, loadFromHistory, getGroupedHistory }`. There is **no `deleteHistorySession`** function — this will throw at runtime when trying to delete a history item.

> This is a critical runtime bug. The delete button in `Sidebar.tsx` calls `removeSession(id)` → `deleteHistorySession(id)` which doesn't exist.

---

## 8. Security Notes 🔒

### 8.1 Auth Bypass via localStorage Manipulation
Anyone who opens DevTools and sets `searchily_auth_token` to any truthy string gets access to `/app`. `role: "admin"` grants `/admin` access. This is acceptable for a frontend-only MVP but must never ship to production without backend token validation on every request.

### 8.2 DOMPurify Is Used Correctly
`PreviewDrawer.tsx` correctly sanitizes `product.description` before `dangerouslySetInnerHTML`. ✅

### 8.3 Product URLs Open in `_blank` with `noopener,noreferrer`
Correctly implemented. ✅

---

## 9. Visual Audit (Browser Inspection) 🖼️

> Findings from live browser session — screenshots taken across all pages in both light and dark mode, and at mobile viewport width (~390px).

---

### 9.1 Landing Page

**Light mode:** Mostly correct. Hero text renders cleanly at large scale. The warm ivory background and sharp-cornered buttons look correct.

**Critical visual gap:** The hero section is **mostly empty** — the right half of the viewport (roughly 50%) is a blank cream canvas with no content, illustration, gradient accent, or any visual element. DESIGN.md calls for "Dramatic landscape photography in warm golden tones" and a "Golden Landscape Wash". The page looks unfinished and imbalanced.

**Dark mode:** The landing page in dark mode shows the background switches to a dark charcoal which is not `#1f1f1f` (mistral-black) — it appears as a warm-dark brown (`#1a1200` range). This creates inconsistency between the Navbar (correctly `bg-mistral-black`) and the page body.

**Feature section (dark band):** The three feature cards all have `font-bold` headings (confirmed visually — text is noticeably heavier than body text). Violates design spec.

---

### 9.2 Auth Page

**Light and dark mode:** The auth card renders correctly with clean sharp borders and cream background in light. The SIGN IN heading is properly large.

**Issue — Auth page background inconsistency in dark mode:** The nav bar at top shows correctly dark, but the auth card box (`bg-white dark:bg-[#111111]`) floats on a dark background that appears cooler/bluer than `mistral-black (#1f1f1f)`. Minor but visible.

**Issue — "Sign In" button is cream-colored:** The Submit button (`SIGN IN`) renders with a cream/warm-ivory (`#fff0c2`) background with dark text. This reads as a **secondary button** visually. DESIGN.md says the primary CTA should be the **dark solid** button (`bg-mistral-black`, white text). The auth form's primary action should be the dominant dark button — the current cream button undersells it.

**Issue — Password field focus ring:** When the password field is focused (confirmed by screenshot), it shows a **red/orange border** — this is the `invalid:` CSS pseudo-class triggering because the field type is `password` with `required`. The `:not(:placeholder-shown):not(:focus):invalid` selector fires prematurely. The red border shows even before the user has interacted with the field in some browsers.

---

### 9.3 Chat Page — Empty State

**Issue — The orange square block identity floats in isolation above the headline.** There is no padding, context, or branding tie-in around it — it just appears as a lone orange square at the top center. It should represent the "Mistral block gradient" identity (yellow → amber → orange), not a flat orange square. The current implementation is `bg-mistral-orange` with no gradient.

**Issue — Suggestion cards show literal quote marks.** Confirmed visually: `"Find me a cheap gaming laptop under $1000"` — the quotes are rendered as text. This looks amateurish.

**Issue — Suggestion cards have a very thick black border (`border-2 border-mistral-black`)** which looks heavy and out of character for the design system. The design uses subtle `border-mistral-black/10` borders elsewhere. This makes the suggestion cards feel like a different design language.

**Issue — The results panel header says "PRODUCTS" when empty** (no search has been run). This is confusing — it should say something more neutral like "No results yet" or simply be hidden until a search is made. A further label appears: "NO ASSETS RETRIEVED" which combines with the "PRODUCTS" header to create a slightly confusing double-message.

**Dark mode chat empty state:** Works well overall. Colors are correct. Minor: the suggestion card hover changes to black-bg/cream-text which creates high contrast — looks a bit harsh in dark mode.

---

### 9.4 Chat Page — After Sending a Message

**Issue — The AI response renders a generic "Markdown Syntax Guide"** completely irrelevant to the query. This is the mock response. In a demo context this looks broken — a user clicking "Find me a cheap gaming laptop under $1000" gets a markdown tutorial instead of product recommendations.

**Issue — Long AI response with embedded markdown image.** The mock response includes an `![markdown image](svg url)` which renders a large Markdown logo image in the middle of the chat bubble. This is a side effect of the generic mock data and makes the chat look like a test/debug page.

**Issue — Chat message box width is inconsistent.** The AI message bubble has `max-w-[90%] min-w-[50%]` — on the populated chat page, the message bubble stretches almost the full available width of the center column, while the user message (`max-w-[80%]`) is right-aligned to a narrower width. The asymmetry between 90% AI and 80% user creates uneven visual rhythm.

**Issue — The results panel text overflows.** Product title "Sony WH-1000XM4" is truncated with `...` in the panel header badge area. The badge label "AMAZON.CO..." is truncated due to narrow fixed panel width. The full text "AMAZON.COM" does not fit, which makes it look like broken content rather than a styled label.

**Issue — Product images in the results panel fail to load.** The mock product `image` field is `"https://placeholder.com/150"` which returns a 404. The fallback rendering shows the alt text `"SONY WH-1000XM4"` stacked vertically inside the square image container, which looks unprofessional. Needs a proper placeholder SVG or broken-image icon.

---

### 9.5 Product Preview Drawer

**Overall:** The drawer renders cleanly with sharp corners, correct typography, cream header, and orange "VIEW RETAILER" button.

**Issue — Product image area renders the broken image `alt` text** ("SONY WH-1000XM4") in plain text inside the 256px image container because the placeholder URL 404s. Same image loading problem as the results panel.

**Issue — The drawer backdrop overlay only shows on `lg:hidden`** (`fixed inset-0 z-40 lg:hidden`). On desktop at typical window sizes (1280px), the backdrop is hidden — but the drawer still appears. Without a backdrop, clicking outside the drawer does nothing (no dismiss hit area). This is a UX problem on any viewport wider than 1024px.

**Issue — Dark mode on the PreviewDrawer is partly broken.** The drawer body (`bg-warm-ivory dark:bg-mistral-black`) switches correctly, but the image placeholder area appears as a light gray (`bg-mistral-black/5`) which is barely distinguishable from the dark background in dark mode — the empty image box becomes invisible.

---

### 9.6 Profile / Account Settings Page

**Issue — The profile page renders on top of a white column on the right** (~350px wide from the results panel). This white area appears to be the unmounted ResultsPanel's space still being allocated — the layout doesn't collapse properly when navigating to `/app/profile`. The right column is a blank white rectangle that shouldn't be there.

**Issue — Dark mode on ProfilePage:** The "ACCOUNT SETTINGS" header and all content render correctly in dark mode. However, the Usage Details card uses a dark background with the `shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]` (pure black shadow). On dark backgrounds, this shadow is invisible — the hard black shadow blends into the dark card background. The dark mode shadow should be a warm light offset: `dark:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)]` (which is actually correctly defined in the code — but the visual result still looks flat in practice).

**Issue — "SIGN OUT" link in the profile sidebar is orange-colored** (`text-mistral-orange`). Sign Out is a destructive/exit action — it should use a different color treatment (red, or at minimum not the brand accent color used for positive CTAs). The orange color makes it look like a featured action rather than a logout.

**Issue — The profile page renders *inside* the AppLayout** — which means the `Topbar` (with Sidebar toggle, Results toggle, and user menu) **is still visible at the top** while the Profile page has its own secondary back-nav bar just below it. This creates a double-header situation with two navigation bars stacked — very confusing UX.

---

### 9.7 Admin Panel

**Light mode Admin Dashboard:** The dashboard background is correctly `bg-warm-ivory` but the metric cards are pure `bg-white` — which renders as slightly colder/brighter than the warm ivory background, creating a visible difference. This is the no-dark-mode issue noted in static analysis, now confirmed visually.

**Issue — Admin sidebar and content area have a visible border/gap on the left side** where the AdminSidebar ends. The sidebar background (`bg-mistral-black`) and the main content area (`bg-warm-ivory`) create a jarring stark contrast with no subtle transition.

**Issue — Admin Dashboard chart bars are barely visible** in the light theme — they're `bg-mistral-black/10` against a white background card. The bar chart has almost no visual contrast, making the data hard to read.

**Issue — Admin Reports page in dark mode:** The page renders correctly but the "GENERATED" and "FAILED" status badges use `bg-green-100 text-green-800` and `bg-red-100 text-red-800` — warm green and red which look out of place in the dark UI. These badges don't have dark mode variants and appear as bright light-colored pills on a dark background — inconsistent with the design system.

**Issue — The Admin Reports "Download CSV" button has no visual affordance** — it's just small uppercase text with very low contrast (`text-mistral-black/50` on white). It doesn't look like a clickable button at all — more like a disabled caption. Should have better interactive styling.

---

### 9.8 Mobile Viewport (~390px)

**Issue — On mobile, the empty state headline "HOW CAN I HELP YOU DISCOVER?" stacks to 3 lines** and takes up the majority of the viewport height, pushing the suggestion cards and the input field partially off-screen. The suggestion cards are still in a 1-column layout which is better, but the bottom suggestion card is partially cut off by the chat input bar.

**Issue — On mobile, the Topbar shows all icons** (hamburger, logo, theme toggle, results panel toggle, user avatar dropdown) on a single row. At 390px, these are cramped — particularly the user avatar "AD" + chevron area is very close to the right edge.

**Issue — On mobile, the results panel (shown as a drawer) doesn't have a close button visible in its header.** The "FOUND 3 PRODUCTS" header renders with no X/close button — the drawer can only be closed by navigating away or triggering it from the Topbar. Poor mobile UX.

**Issue — On mobile, the chat input bar takes up a large portion of the bottom area.** The padding (`p-6`) makes the input area taller than necessary on small screens — should reduce to `p-3` or `p-4` on mobile.

**Issue — On mobile, the suggestion card borders are quite thick (`border-2 border-mistral-black`)** and the quote-wrapped text makes them feel like form options rather than quick-action buttons.

---

### 9.9 Dark Mode — General Observations

**Issue — The dark theme background color is inconsistently implemented.** Some components use `dark:bg-mistral-black` (#1f1f1f), others use `dark:bg-[#111]` (pure near-black), and others use `dark:bg-[#1a1a1a]`. There are at least 3 different dark background values in use across the app. This creates inconsistent layering and depth perception in dark mode.

**Issue — The `ProductCard` in dark mode** renders with `dark:bg-mistral-black hover:dark:bg-warm-ivory/10`. On hover, the product card text color doesn't change, meaning dark text (`dark:text-warm-ivory`) on a slightly lighter bg still works — but the transition from near-black to `warm-ivory/10` is nearly imperceptible.

**Issue — Topbar user avatar "AD"** is hardcoded and always shows initials "AD" regardless of user. The avatar background (`bg-mistral-black dark:bg-warm-ivory`) looks correct but the initials don't change.

---

## 10. Prioritized Remediation

### 🔴 Critical (Blocks backend integration or crashes)
1. **Implement `services/api/client.ts`** — axios/fetch wrapper with auth headers
2. **Implement `useChatSocket.ts`** — real WebSocket replacing all setTimeout mocks
3. **Add `deleteHistorySession` to `useHistory`** — current delete button will crash at runtime
4. **Fix login error handling in `AuthPage`** — no feedback on failed credentials

### 🟠 High (Visible bugs / broken UX)
5. **Fix `window.innerWidth` in `ChatLayout`** — use `useMediaQuery` or CSS-only approach
6. **Fix ProfilePage Sign Out** — must call `logout()` before navigating
7. **Fix `ChatEmptyState` suggestion quotes** — `"{suggestion}"` → `{suggestion}`
8. **Fix product placeholder images** — `https://placeholder.com/150` returns 404; add a proper SVG fallback
9. **Fix Auth page `SIGN IN` button** — should be dark solid (`bg-mistral-black`) not cream (secondary style)
10. **Fix double-header on Profile pages** — the AppLayout Topbar + inline back-nav creates two stacked navbars
11. **Fix PreviewDrawer backdrop** — currently only covers `lg:hidden`; desktop users can't dismiss by clicking outside
12. **Fix `LandingPage` `font-bold` headers** — change to `font-normal`
13. **Fix `ProductCard` tracking at 18px** — remove `tracking-[-2.05px]`

### 🟡 Medium (Design compliance / incomplete pages)
14. **Add dark mode to AdminDashboard and AdminETLPanel**
15. **Fix Admin Reports status badges** — add dark mode variants (`dark:bg-green-900 dark:text-green-200` etc.)
16. **Normalize dark background values** — standardize on `mistral-black (#1f1f1f)` everywhere, remove ad-hoc `[#111]`, `[#1a1a1a]`
17. **Replace profile page black offset shadows with `shadow-mistral`**
18. **Fix the blank white right-column ghost** on Profile page — layout doesn't collapse results panel area
19. **Replace empty state orange square** with proper gradient block identity (yellow → amber → orange strip)
20. **Fix suggestion card border** — switch from `border-2 border-mistral-black` to `border border-mistral-black/20`
21. **Implement real user data fetch** — replace all hardcoded "Mock User" / "admin@"
22. **Add a 404 Not Found route**
23. **Implement EditProfilePage form**, BillingPage, NotificationsPage

### 🟢 Low (Polish)
24. **Delete junk root scripts** (9 .py files, echo, src_tree.txt, md_files.txt)
25. **Fix ResultsPanel `bg-white`** → `bg-warm-ivory`
26. **Fix "Download CSV" button styling** in Admin Reports — needs visible button treatment
27. **Fix Admin chart bar visibility** — increase contrast from `bg-mistral-black/10` to `bg-mistral-black/30`
28. **Fix "SIGN OUT" color** in Profile sidebar — use red or neutral, not brand orange
29. **Reduce chat input padding on mobile** — `p-6` → `p-3` at `< 640px`
30. **Add close button to mobile Results drawer header**
31. **Fix Footer social links** → real URLs or remove
32. **Improve mock AI response** — make it query-relevant, remove the markdown tutorial
33. **Add chat session auto-resume** on app load
34. **Add hero visual content** to LandingPage right side — photography, gradient, or illustration
35. **Add "Forgot password" link** to auth page
