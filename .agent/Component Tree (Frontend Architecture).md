🧩 Component Tree (Frontend Architecture)
1. Root Structure
```
App
├── Router
│   ├── PublicLayout
│   │   ├── LandingPage
│   │   ├── AboutPage
│   │   ├── LegalPage
│   │   └── AuthPage
│   │
│   ├── AppLayout
│   │   ├── AIChatPage
│   │   └── ProfilePage
│   │
│   └── AdminLayout
│       ├── AdminDashboard
│       ├── AdminReports
│       └── AdminETLPanel
```
🧱 2. Layout Components
PublicLayout
```
PublicLayout
├── Navbar
├── PageContent
└── Footer
```
AppLayout (Main App Shell)
```
AppLayout
├── Topbar (optional minimal)
└── PageContent
```
AdminLayout
```
AdminLayout
├── AdminSidebar
├── AdminTopbar
└── AdminContent
```
🚀 3. AIChatPage (CORE TREE)

This is your most important structure.
```
AIChatPage
├── ChatLayout
│   ├── Sidebar (History)
│   │   ├── SidebarHeader
│   │   ├── HistoryGroup
│   │   │   └── HistoryItem
│   │   └── NewChatButton
│   │
│   ├── ChatSection
│   │   ├── MessagesContainer
│   │   │   ├── MessageList
│   │   │   │   ├── UserMessage
│   │   │   │   └── AIMessage (MarkdownRenderer)
│   │   │   └── TypingIndicator
│   │   │
│   │   ├── ChatInput
│   │   │   ├── TextareaInput
│   │   │   └── SendButton
│   │   │
│   │   └── TutorialOverlay (first-time only)
│   │
│   ├── ResultsPanel (Resizable)
│   │   ├── ResultsHeader
│   │   ├── ResultsList
│   │   │   └── ProductCard
│   │   └── EmptyState / LoadingState
│   │
│   └── PreviewDrawer
│       └── ProductPreview
```
🧠 4. Product Components
```
ProductCard
├── ProductImage
├── ProductInfo
│   ├── Title
│   ├── Price
│   └── SourceBadge
└── CTAButton
```
Preview Drawer
```
ProductPreview
├── LargeImage
├── FullDescription
├── Price
├── Source
└── ExternalLinkButton
```
🧭 5. Sidebar (History System)
```
Sidebar
├── SidebarHeader
├── HistoryGroup (Today / Yesterday / Older)
│   └── HistoryItem
└── Footer (optional)
```
💬 6. Chat Components
```
MessageList
├── UserMessage
└── AIMessage
    └── MarkdownRenderer
```
Chat Input
```
ChatInput
├── Textarea (auto-resize)
├── SendButton
└── (future: VoiceButton)
```
🏠 7. Landing Page
```
LandingPage
├── HeroSection
│   ├── Headline
│   ├── Subtext
│   └── CTAButton
│
├── DemoSection
│   ├── ExampleQuery
│   └── ProductPreviewList
│
├── HowItWorks
│   └── Steps (3 items)
│
└── CTASection
```
👤 8. Profile Page
```
ProfilePage
├── ProfileHeader
├── UserInfoCard
├── HistoryList
│   └── HistoryItem
└── ClearHistoryButton
```
🔐 9. Auth Page
```
AuthPage
├── AuthCard
│   ├── OAuthButtons
│   ├── Divider
│   └── InputFields
```
⚙️ 10. Admin Components
Admin Dashboard
```
AdminDashboard
├── MetricsGrid
│   └── MetricCard
├── ChartsSection
│   └── LineChart
└── TopQueriesTable
```
Admin Reports
```
AdminReports
├── FiltersBar
├── ReportsTable
└── ExportButtons
```
Admin ETL Panel
```
AdminETLPanel
├── StatusCard
├── StatsCard
├── ActionsSection
│   ├── RunScraperButton
│   └── RebuildEmbeddingsButton
```
🧩 11. Shared Components (IMPORTANT)
```
components/
├── ui/ (shadcn)
├── layout/
│   ├── Navbar
│   ├── Footer
│   ├── Sidebar
│   └── Topbar
│
├── chat/
├── product/
├── admin/
├── common/
│   ├── Button
│   ├── Modal
│   ├── Drawer
│   ├── Loader
│   ├── EmptyState
│   └── ErrorState
```