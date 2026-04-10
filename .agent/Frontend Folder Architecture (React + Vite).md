📁 Frontend Folder Architecture (React + Vite)
Root Structure
```
src/
├── app/
├── pages/
├── features/
├── components/
├── hooks/
├── services/
├── lib/
├── store/
├── styles/
├── assets/
└── types/
🧠 1. app/ — App Core (Routing + Providers)
```
app/
├── App.tsx
├── router.tsx
├── providers/
│   ├── ThemeProvider.tsx
│   ├── QueryProvider.tsx (optional)
│   └── AppProvider.tsx
```
Purpose:
Central entry point
Routing setup
Global providers
📄 2. pages/ — Route-Level Components ONLY

⚠️ Rule:
NO business logic here
```

pages/
├── public/
│   ├── LandingPage.tsx
│   ├── AboutPage.tsx
│   ├── LegalPage.tsx
│   └── AuthPage.tsx
│
├── app/
│   ├── AIChatPage.tsx
│   └── ProfilePage.tsx
│
└── admin/
    ├── AdminDashboard.tsx
    ├── AdminReports.tsx
    └── AdminETLPanel.tsx
    ```
🧩 3. features/ — CORE LOGIC (Most Important Folder)

👉 This is where your real app lives.
```

features/
├── chat/
├── product/
├── history/
├── tutorial/
├── auth/
└── admin/
```
🔥 chat/
```
features/chat/
├── components/
│   ├── ChatLayout.tsx
│   ├── ChatSection.tsx
│   ├── MessageList.tsx
│   ├── UserMessage.tsx
│   ├── AIMessage.tsx
│   ├── ChatInput.tsx
│   └── TypingIndicator.tsx
│
├── hooks/
│   ├── useChat.ts
│   ├── useChatSocket.ts
│   └── useMessages.ts
│
├── services/
│   └── chat.socket.ts
│
├── utils/
│   └── messageParser.ts
│
└── types.ts
```
🛍 product/
```
features/product/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductPreview.tsx
│   └── PreviewDrawer.tsx
│
├── hooks/
│   └── useProducts.ts
│
├── utils/
│   └── formatProduct.ts
│
└── types.ts
```
🧭 history/
```
features/history/
├── components/
│   ├── Sidebar.tsx
│   ├── HistoryGroup.tsx
│   └── HistoryItem.tsx
│
├── hooks/
│   └── useHistory.ts
│
└── utils/
    └── groupByDate.ts
    ```
🎓 tutorial/
```
features/tutorial/
├── components/
│   └── TutorialOverlay.tsx
├── hooks/
│   └── useTutorial.ts
```
🔐 auth/
```
features/auth/
├── components/
│   ├── AuthForm.tsx
│   └── OAuthButtons.tsx
├── hooks/
│   └── useAuth.ts
```
⚙️ admin/
```
features/admin/
├── components/
│   ├── MetricCard.tsx
│   ├── Charts.tsx
│   ├── ReportsTable.tsx
│   ├── StatusCard.tsx
│   └── ActionsPanel.tsx
```
🧱 4. components/ — SHARED UI (Reusable)
```
components/
├── ui/            # shadcn components
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Topbar.tsx
│   └── AdminSidebar.tsx
│
├── common/
│   ├── Loader.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── Modal.tsx
│   └── Drawer.tsx
```
🔌 5. services/ — External Communication
```
services/
├── websocket/
│   └── socket.ts
├── api/
│   └── client.ts (future)
```
🧠 6. hooks/ — Global Hooks
```
hooks/
├── useLocalStorage.ts
├── useDebounce.ts
└── useResizablePanel.ts
```
🧰 7. lib/ — Utilities & Config
```
lib/
├── utils.ts       # cn(), helpers
├── constants.ts
└── config.ts
```
🎨 8. styles/
```
styles/
└── globals.css
```
🖼 9. assets/
```
assets/
├── images/
├── icons/
└── fonts/
```
🧾 10. types/
```
types/
├── product.ts
├── chat.ts
└── index.ts
```
