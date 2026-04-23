# Frontend Integration Guide: Connecting to the API Gateway

This document outlines everything you need to know to connect the React frontend to the backend services. The backend is built using a microservices architecture, but you **only need to communicate with the Gateway Node**. The Gateway automatically routes your requests to the correct internal services (Scraper and Ranker) and proxies the WebSockets.

## 1. Environment Setup

When running the frontend locally, configure your `.env` file to point to the local Gateway Node (which typically runs on port `8000`).

Create or update the `.env` file in the frontend project root:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

> **Note:** Do not attempt to hit the Scraper (`8001`) or Ranker (`8002`) services directly. Always use the `8000` gateway URLs for both REST and WebSocket traffic to prevent CORS drops and networking issues.

---

## 2. API Endpoints Reference

All HTTP requests should be prefixed with your `VITE_API_URL`.

### **General / Health**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Returns the Gateway connection string and status. |
| `GET` | `/health` | Quick health check for the Gateway itself. |
| `GET` | `/services/health` | Deep health check (returns status of scraper and ranker nodes). |

---

### **Scraping Controls (Admin Panel)**

These endpoints control the data scraping (ETL) process. They do not require a request body.

*   `POST /scrape/launch` — Starts the scraping process.
*   `POST /scrape/pause` — Pauses the active scraping process.
*   `POST /scrape/resume` — Resumes a paused scraping process.
*   `POST /scrape/stop` — Safely stops the scraping process.
*   `GET /scrape/status` — Retrieves the current scraper state (e.g., whether it's currently running, paused, idle, etc.).

**Example Request:**
```javascript
const response = await fetch(`${import.meta.env.VITE_API_URL}/scrape/launch`, {
  method: 'POST'
});
const data = await response.json();
```

---

### **Search and Ranker (Chat / User Panel)**

When a user submits a prompt to find products, you use the `/search` endpoint.

*   **Endpoint:** `POST /search`
*   **Payload:** Note the `query` key exactly.
    ```json
    {
      "query": "I am looking for a cheap laptop good for gaming"
    }
    ```
*   **Response:** Expect a JSON payload that contains a `task_id`. This ID is required to listen for asynchronous progress via WebSockets (explained below).
    ```json
    {
      "task_id": "b5a9c9f2-1234-5678-abcd-ef1234567890",
      "status": "Processing..."
    }
    ```

---

## 3. WebSocket Connections

Some operations in the backend (scraping catalogs and ranking LLM results) take a long time. The Gateway proxies WebSockets to stream real-time progress.

Prefix your WebSocket connections with `VITE_WS_URL`.

### **A. Scraper Progress WebSocket**
Used typically in the Admin interface to show scraping logs and progress bars.

*   **URL:** `ws://localhost:8000/websocket_progress`
*   **Behavior:** Once connected, the server will stream stringified JSON messages containing logs, component states, and item counts.
*   **Usage Example:**
    ```javascript
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/websocket_progress`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Scraping Progress Update:", data);
      // Example data: { state: "scraping", progress: "45%", items: 300 }
    };
    ```

### **B. Search & Ranker Status WebSocket**
Used in the Chat interface to show the user real-time status as the AI fetches, embeds, and ranks products.

*   **URL:** `ws://localhost:8000/ws/status/{task_id}`
*   *(Remember to replace `{task_id}` with the ID returned by the `POST /search` endpoint).*
*   **Behavior:** Streams the progress of the AI ranking. It automatically closes and sends a final message when the state resolves to `"SUCCESS"` or `"FAILURE"`.
*   **Usage Example:**
    ```javascript
    // Assume taskId was retrieved from POST /search
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws/status/${taskId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.state === "SUCCESS") {
         // Render the final AI output
         console.log("AI Markdown Response:", data.result); 
         ws.close();
      } else if (data.state === "FAILURE") {
         console.error("Task failed:", data.error);
         ws.close();
      } else {
         // Display loading state to the user
         console.log("Current Status:", data.status);
      }
    };
    ```

---

## 4. Expected LLM Data Format (Handling the Final `SUCCESS` State)

When the Search & Ranker WebSocket returns `data.state === "SUCCESS"`, the `result` property attached to that payload will contain **Markdown text** generated directly by the Gemini AI. 

The frontend should be prepared to use a library like `react-markdown` to render this cleanly in the chat UI. 

**Structure of the AI output:**
```markdown
[A conversational opening sentence generated by AI]

## Rank 1 - Product Name
*Price:* $...
*Description:* ...

## Rank 2 - Product Name
*Price:* $...
*Description:* ...
```

***
