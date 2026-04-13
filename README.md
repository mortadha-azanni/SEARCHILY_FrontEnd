# SEARCHILY – Mistral Brutalism AI Search

This project is a React-based AI-powered product discovery platform, sporting a distinct **Mistral Brutalism** design aesthetic (massive typography, aggressive contrast, warm/yellow-orange color blocks, no global dark mode). 

## Technical Overview
- **Vite + React (TypeScript)** setup.
- **Tailwind CSS** strictly adhering to `DESIGN.md` guidelines for Mistral branding parameters.
- **Mock WebSocket System**: Currently decoupled to accept payloads wrapped via `adaptSocketPayload` in `useChatSocket.ts` to allow local iteration independently from the `python/fastapi` backend.
- **Auth Provider**: Simple cross-tab synced auth via Context and LocalStorage (`storage` event listeners).

## Developer Resources
To get a full understanding of the app, check the documentation directories:
1. `.design/DESIGN.md` - Strictly sets limits and styles for Mistral Brutalism.
2. `.agent/` - Holds specs regarding the Frontend Folder Architecture, the Chat/WebSocket orchestration, Error Handling rules, and general UI/UX philosophies.
3. `.backend/FRONTEND_INTEGRATION_GUIDE.md` - Future reference for backend connecting via `.env` pointing to port `:8000`.

## Running the Project
```bash
npm install
npm run dev
```
