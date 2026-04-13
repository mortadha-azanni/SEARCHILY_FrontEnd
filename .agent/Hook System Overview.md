# 🧠 Hook System Overview

You need 3 core hooks for Chat state:

* `useChat` → orchestrator (main brain)
* `useChatSocket` → websocket handling (via `adaptSocketPayload`)
* `useMessages` → message state management

Optional but useful:
* `useHistory` → persistence (localStorage/mock context)
* `useAuth` → simple mock user state managed via `AuthProvider` with `storage` listner.

---

## 🧩 1. Data Model (LOCKED)

Everything depends on this.

```typescript
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'streaming' | 'done' | 'error';
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  url: string;
  source: string;
};

export type WsPayload = 
  | { type: 'start'; payload: { message_id: string } }
  | { type: 'chunk'; payload: { message_id: string; content: string } }
  | { type: 'products'; payload: { message_id: string; items: Product[] } }
  | { type: 'end'; payload: { message_id: string } }
  | { type: 'error'; payload: { message: string } };
```

---

## 🔌 2. useChatSocket (LOW-LEVEL)

**Responsibility:**
* Abstract away socket handling (`mock` or real).
* Receive streaming data and pass through `adaptSocketPayload`.
* Emit structured `WsPayload` events via `onMessage`.

**API Design:**
```typescript
const {
  connect,
  disconnect,
  sendMessage,
  onMessage,
} = useChatSocket();
```

**Behavior:**
* **On send**: Open socket (if not open), send query.
* **On receive**: Uses adapter to fail-safe parsing. Emits clean structured chunks to listeners.

---

## 💬 3. useMessages (STATE-LEVEL)

**Responsibility:**
* Maintain array of `Message` objects.
* Handle streaming concatonation.
* Handle retry mapping and ID resets.

---

## 🧠 4. useChat (ORCHESTRATOR)

**Responsibility:**
* Ties `useMessages` and `useChatSocket` together.
* Computes `isLoading` / `error` / `retryQuery`.
* Exposes clean surface for the UI components (`ChatSection`, `ChatInput`).
