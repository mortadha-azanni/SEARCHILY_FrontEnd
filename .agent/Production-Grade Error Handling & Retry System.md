# ⚠️ Production-Grade Error Handling & Retry System

## AI Product Discovery — Frontend Specification

---

## 1. Overview

This document defines a **robust frontend error handling and retry strategy** for the AI chat system.

Goals:

* Prevent UI freezing or inconsistent states
* Provide clear feedback to users
* Enable safe retries without duplication or corruption
* Handle unstable WebSocket connections gracefully

---

## 2. Error Categories

Errors MUST be categorized to ensure correct UI/UX behavior.

### 2.1 Network Errors

* WebSocket fails to connect
* Connection drops mid-stream

### 2.2 Server Errors

* Backend sends `error` event
* Invalid or malformed response

### 2.3 Timeout Errors

* No response within defined time window (e.g. 5–10s)

### 2.4 Client Errors

* Unexpected frontend crash
* State inconsistency

---

## 3. Global Error State Model

Each chat session must track:

```text
error: string | null
errorType: 'network' | 'server' | 'timeout' | 'unknown'
retryAvailable: boolean
```

Additionally, each AI message must support:

```text
status: 'streaming' | 'done' | 'error'
```

---

## 4. Error Handling Behavior

### 4.1 During Streaming

If an error occurs while receiving chunks:

* Stop streaming immediately
* Mark AI message:

  * `status = 'error'`
* Preserve already received content (do NOT delete partial text)
* Set global error state
* Enable retry

---

### 4.2 Before Streaming Starts

If connection fails before `start` event:

* Do NOT create AI message
* Show global error banner
* Allow retry from input

---

### 4.3 After Completion

If error occurs after `end`:

* Ignore (no UI impact)
* Log internally (optional)

---

## 5. Retry System (Core Logic)

### 5.1 Retry Trigger

User can retry via:

* Retry button on failed message
* Retry action in global error banner

---

### 5.2 Retry Behavior

On retry:

1. Re-send the SAME query
2. Create NEW AI message (do NOT reuse old one)
3. Keep failed message visible (for context)
4. Reset:

   * error state
   * loading state

---

### 5.3 Retry Constraints

* Only last failed query is retryable
* Prevent multiple retries at same time
* Disable retry button while retrying

---

## 6. Timeout Strategy

### 6.1 Timeout Rules

* If no `start` event within X seconds → trigger timeout
* If no `chunk` received within Y seconds → trigger timeout

Example:

* Start timeout: 5s
* Stream timeout: 10s

---

### 6.2 Timeout Behavior

* Abort current request
* Mark AI message as error
* Show message:
  “Request timed out. Try again.”

---

## 7. WebSocket Resilience

### 7.1 Connection Lifecycle

States:

```text
idle → connecting → open → error → closed
```

---

### 7.2 Reconnection Strategy

* Auto-reconnect ONLY if:

  * connection drops unexpectedly
* Do NOT auto-retry queries silently

---

### 7.3 Reconnection Rules

* Max retry attempts: 3
* Backoff strategy:

  * 1s → 2s → 5s

---

### 7.4 On Reconnect Failure

* Show persistent error banner:
  “Connection lost. Please refresh or retry.”

---

## 8. UI Error Patterns

### 8.1 Message-Level Error

Displayed inside chat:

* Show partial content (if any)
* Add:

  * error label
  * retry button

---

### 8.2 Global Error Banner

Displayed at top of chat:

* For:

  * connection issues
  * server failures

Includes:

* short message
* retry action

---

### 8.3 Empty State Error

If no products returned:

* Message:
  “No results found. Try refining your query.”

---

## 9. Loading & Disabled States

During request:

* Disable send button
* Prevent duplicate queries
* Show typing indicator

During retry:

* Disable retry button
* Show loading indicator in message

---

## 10. Logging (Optional but Recommended)

Track errors for debugging:

* error type
* timestamp
* query
* failure stage (connect / stream / end)

---

## 11. Edge Cases

### 11.1 Partial Response + Error

* Keep partial AI text
* Allow retry

---

### 11.2 Products Missing

* If no `products` event:

  * Show empty state
  * Do NOT treat as error

---

### 11.3 Duplicate Responses

* Ignore events with unknown or completed `message_id`

---

### 11.4 Rapid User Inputs

* Queue or block new queries while one is active

---

## 12. UX Principles

* Never lose user input
* Never hide errors silently
* Always provide recovery path (retry)
* Keep UI responsive under failure

---

## 13. Summary

This system ensures:

* Stable chat experience under unreliable conditions
* Clear user feedback
* Safe and controlled retries
* Clean separation between message-level and global errors

---

## Final Rule

> Every failure must either:
>
> * recover automatically, OR
> * provide a clear retry path

No dead ends.
