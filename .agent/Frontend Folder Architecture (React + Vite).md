# 📁 Frontend Folder Architecture (React + Vite)
```
src/
├── app
│   ├── App.tsx
│   ├── providers
│   │   ├── AppProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   └── router.tsx
├── assets
│   ├── fonts
│   ├── icons
│   └── images
├── components
│   ├── common
│   │   ├── Drawer.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layout
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopbar.tsx
│   │   ├── AppLayout.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── PublicLayout.tsx
│   │   └── Topbar.tsx
│   └── ui
├── features
│   ├── admin
│   │   └── components
│   ├── auth
│   │   ├── components
│   │   ├── context
│   │   │   └── AuthProvider.tsx
│   │   └── hooks
│   ├── chat
│   │   ├── components
│   │   │   ├── AIMessage.tsx
│   │   │   ├── ChatEmptyState.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatLayout.tsx
│   │   │   ├── ChatSection.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── ResultsPanel.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── UserMessage.tsx
│   │   ├── hooks
│   │   │   ├── useChatSocket.ts
│   │   │   ├── useChat.ts
│   │   │   └── useMessages.ts
│   │   ├── services
│   │   └── utils
│   ├── history
│   │   ├── components
│   │   │   └── Sidebar.tsx
│   │   ├── hooks
│   │   │   └── useHistory.ts
│   │   └── utils
│   ├── product
│   │   ├── components
│   │   │   ├── PreviewDrawer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   ├── hooks
│   │   └── utils
│   └── tutorial
│       ├── components
│       └── hooks
├── hooks
├── lib
│   ├── config.ts
│   ├── constants.ts
│   └── utils.ts
├── main.tsx
├── mockdata
│   └── chatMock.ts
├── pages
│   ├── admin
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminETLPanel.tsx
│   │   └── AdminReports.tsx
│   ├── app
│   │   ├── AIChatPage.tsx
│   │   └── ProfilePage.tsx
│   └── public
│       ├── AboutPage.tsx
│       ├── AuthPage.tsx
│       ├── LandingPage.tsx
│       └── LegalPage.tsx
├── services
│   ├── api
│   │   └── client.ts
│   ├── mockAdminData.ts
│   └── websocket
│       └── socket.ts
├── store
├── styles
│   └── globals.css
└── types
    └── index.ts

46 directories, 57 files
```
