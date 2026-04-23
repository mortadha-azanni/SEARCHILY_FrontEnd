# 🔌 WebSocket Response Protocol — AI Product Discovery

## 1. Overview

This document defines the **WebSocket communication protocol** between the backend and frontend.

The backend streams AI responses in **structured events**, allowing:

* Real-time message rendering
* Controlled UI updates
* Clean product extraction

---

## 2. Message Format (Global)

All WebSocket messages MUST follow this structure:

```json
{
  "type": "string",
  "payload": {}
}
```

---

## 3. Event Types

### 3.1 `start`

Sent when the AI begins processing a query.

```json
{
  "type": "start",
  "payload": {
    "message_id": "uuid"
  }
}
```

#### Purpose:

* Initialize AI message in frontend
* Reset loading state if needed

---

### 3.2 `chunk`

Streaming text response from the AI.

```json
{
  "type": "chunk",
  "payload": {
    "message_id": "uuid",
    "content": "partial text chunk"
  }
}
```

#### Notes:

* Multiple `chunk` events will be sent
* Must be appended in order
* Used for real-time UI streaming

---

### 3.3 `products`

Structured product results (sent ONCE per query)

```json
{
  "type": "products",
  "payload": {
    "items": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "price": "string",
        "image": "string (url)",
        "url": "string (external link)",
        "source": "string (domain name)"
      }
    ]
  }
}
```

#### Notes:

* Sent AFTER most chunks OR near the end
* Frontend updates Results Panel ONLY when full response completes

---

### 3.4 `end`

Marks completion of the AI response.

```json
{
  "type": "end",
  "payload": {
    "message_id": "uuid"
  }
}
```

#### Purpose:

* Stop loading state
* Finalize message
* Trigger UI updates (e.g. enable input)

---

### 3.5 `error`

Sent when something goes wrong.

```json
{
  "type": "error",
  "payload": {
    "message": "Something went wrong"
  }
}
```

#### Behavior:

* Stop streaming
* Show error state in UI

---

## 4. Event Flow (Complete Example)

### Step-by-step sequence:

```json
{ "type": "start", "payload": { "message_id": "123" } }

{ "type": "chunk", "payload": { "message_id": "123", "content": "Here are some" } }

{ "type": "chunk", "payload": { "message_id": "123", "content": " great laptops" } }

{ "type": "chunk", "payload": { "message_id": "123", "content": " under $1000:" } }

{ "type": "products", "payload": {
  "items": [
    {
      "id": "p1",
      "title": "Gaming Laptop XYZ",
      "description": "16GB RAM, RTX 4060",
      "price": "$950",
      "image": "https://...",
      "url": "https://store.com/product",
      "source": "store.com"
    }
  ]
}}

{ "type": "end", "payload": { "message_id": "123" } }
```

---

## 5. Frontend Expectations

### Message Handling

* `start` → create AI message
* `chunk` → append text
* `products` → store results (DO NOT render yet)
* `end` → finalize message + update Results Panel

---

### State Mapping

| Event    | Frontend Action                    |
| -------- | ---------------------------------- |
| start    | create empty AI message            |
| chunk    | append to AI message               |
| products | store products temporarily         |
| end      | finalize message + render products |
| error    | show error UI                      |

---

## 6. Constraints (IMPORTANT)

### Ordering

* Events MUST be in order:
  `start → chunk* → products → end`

---

### message_id

* Must be consistent across all events
* Used to match streaming message

---

### products event

* MUST be sent once
* MUST contain full list (no streaming)

---

### end event

* MUST always be sent (even if empty response)

---

## 7. Optional Extensions (Future)

These are NOT required for v1 but supported:

### 7.1 `metadata`

```json
{
  "type": "metadata",
  "payload": {
    "query_time_ms": 1200,
    "source_count": 5
  }
}
```

---

### 7.2 `suggestions`

```json
{
  "type": "suggestions",
  "payload": {
    "items": ["gaming laptop", "cheap laptop", "ultrabook"]
  }
}
```

---

## 8. Summary

This protocol ensures:

* Smooth streaming UX
* Clear separation of concerns
* Predictable frontend behavior

The frontend MUST NOT:

* Guess response structure
* Parse raw text for products

All structured data MUST come via `products` event.

---

## 🚨 Note on Backend Discrepancy

Currently, the `.backend/FRONTEND_INTEGRATION_GUIDE.md` specifies a simpler protocol (`POST /search` -> return `task_id` -> open WS -> receive `{ state: "SUCCESS", result: "Markdown" }`). That contract does **not** provide streaming arrays of structured products required by the `ResultsPanel`. 

Because of this gap, the `useChatSocket.ts` hook implements an `adaptSocketPayload()` adapter layer. The frontend operates on the `start | chunk | products | end` specification documented here utilizing local mock data, waiting for the backend to evolve to this multi-event streaming standard. When the backend is ready, `adaptSocketPayload` can either translate the backend messages or accept them natively.
