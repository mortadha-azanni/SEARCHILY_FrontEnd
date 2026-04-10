# 🧠 AI Product Discovery Platform — Frontend Specification

## 1. Overview

This project is a **React-based AI-powered product discovery platform**.

Users interact with an AI chat interface to:

* Search for products across multiple scraped sources
* View structured product results
* Navigate to external websites to complete purchases

This is **NOT a marketplace**.
It is an **AI search + aggregation interface**.

---

## 2. Tech Stack

* React (Vite SPA)
* Tailwind CSS
* shadcn/ui
* Framer Motion (animations)
* React Router
* Native WebSocket (for streaming)

---

## 3. Global UI/UX Principles

### Design Style

* Dark mode only
* Clean futuristic UI
* Soft gradients (blue/purple)
* Minimal glassmorphism (low blur)
* Smooth transitions (no heavy effects)

### Layout Philosophy

* Focus on **speed + clarity**
* Avoid clutter
* Prioritize **results visibility over chat**

---

## 4. Application Structure

## Public Pages

* `/` → Landing Page
* `/chat` → AIChatPage
* `/login` → Login / Signup
* `/about` → About Page
* `/legal` → Privacy + Terms

## User Pages

* `/profile` → User Profile

## Admin Pages

* `/admin` → Dashboard
* `/admin/reports` → Reports
* `/admin/etl` → ETL Control Panel

---

## 5. Landing Page

### Sections

#### Hero

* Headline: “Find the best products using AI”
* Subtext: “Search across multiple websites instantly”
* CTA: “Start Searching” → `/chat`

#### Demo Section

* Static example query
* Example product cards

#### How It Works

* Ask → Compare → Buy

#### CTA (Repeated)

* Redirect to chat

---

## 6. AIChatPage (CORE PAGE)

### Layout

```
| Sidebar (History) | Chat Section | Results Panel |
```

### Sidebar (Left)

* Chat history grouped:

  * Today
  * Yesterday
  * Older
* Each item:

  * First query preview
  * Click → reload conversation

---

### Chat Section (Center)

#### Features

* Multi-line input
* Streaming responses (WebSocket)
* Markdown rendering for AI messages

#### Behavior

* Messages persist (localStorage or state)
* User can refine queries
* First-time users see tutorial overlay

---

### Tutorial (First Visit Only)

Overlay steps:

1. How to ask clearly
2. How to refine queries
3. Example prompts (clickable → auto-fill input)

---

### Results Panel (Right)

#### Behavior

* Updates ONLY after full AI response
* Resizable width (drag handle)

#### Layout

* Vertical **list view** (NOT grid)

---

## 7. Product Card Component

### Fields

* Image (top)
* Title (derived from description, truncated)
* Price
* Source (domain name from URL)
* CTA button: “View Product”

---

### Interactions

* Click card → opens Preview Drawer
* CTA → opens external product link

---

## 8. Preview Drawer (Replaces ShowPage)

### Behavior

* Slides from right
* Triggered by clicking product card

### Content

* Large image
* Full description
* Price
* Source
* “Go to Website” button

---

## 9. Login / Signup Page

### Features

* OAuth buttons (Google, etc.)
* Basic input fields (UI only)
* No real authentication logic required (v1)

---

## 10. Profile Page

### Sections

* User info (name/email)
* Chat history (list format)
* “Clear History” button

---

## 11. Admin Dashboard (`/admin`)

### Components

* Metrics:

  * Total searches
  * Top queries
  * Click-through rate
  * Top sources

### Visuals

* Line chart (search volume over time)
* Table (top products / queries)

---

## 12. Admin Reports

### Features

* Data views:

  * Query trends
  * Failed searches
  * Product gaps

* Export buttons:

  * CSV
  * JSON

---

## 13. Admin ETL Panel

### UI Components

* Status indicator:

  * Running / Idle

* Data:

  * Last update timestamp
  * Total indexed products

### Actions (UI only)

* “Run Scraper”
* “Rebuild Embeddings”

---

## 14. About Page

### Content

* Short explanation of:

  * What the product does
  * Why it exists
* Keep minimal (no storytelling)

---

## 15. Legal Page

### Includes

* Privacy Policy:

  * User queries may be stored
  * No payment data

* Terms:

  * Redirects to third-party websites
  * No responsibility for purchases

---

## 16. Error & Loading States

### Must include:

* Loading:

  * Skeleton UI (chat + cards)

* No results:

  * “Try refining your query”

* Error:

  * “Something went wrong”

---

## 17. WebSocket Behavior (Frontend)

### Responsibilities

* Receive streaming AI responses
* Append messages progressively
* Handle:

  * connection state
  * errors
  * completion event

---

## 18. State Management

* Chat state → local state / context
* History → localStorage
* No global state library required (v1)

---

## 19. Animations

Use Framer Motion for:

* Drawer transitions
* Message appearance
* Hover states on cards

Keep animations:

* Fast
* Subtle
* Functional

---

## 20. Future Extensions (Not in v1)

* Filters (price, category)
* Sorting options
* Model selection
* Light mode
* Real authentication
* Saved products

---

## Final Note

The priority is:

> **Fast AI → Clear results → Immediate action**

Avoid:

* Over-design
* Unnecessary pages
* Redundant flows

Focus on:

* Performance
* Simplicity
* Trust in results

---
