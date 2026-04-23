type Listener = (payload: unknown) => void;

class ChatSocket {
  private socket: WebSocket | null = null;
  private listeners: Set<Listener> = new Set();
  private taskId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;

  constructor(private baseUrl: string = import.meta.env.VITE_WS_URL || 'ws://localhost:8000') {}

  connect(taskId: string) {
    this.taskId = taskId;
    const url = `${this.baseUrl}/ws/status/${taskId}`;
    
    if (this.socket) {
      this.socket.close();
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log(`[WebSocket] Connected to task: ${taskId}`);
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notify(data);
      } catch (err) {
        console.error('[WebSocket] Failed to parse message:', err);
      }
    };

    this.socket.onclose = (event) => {
      console.log(`[WebSocket] Closed: ${event.code} ${event.reason}`);
      if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(taskId), 1000 * this.reconnectAttempts);
      }
    };

    this.socket.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
      this.notify({ type: 'error', payload: { message: 'Connection error' } });
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Normal Closure');
      this.socket = null;
    }
    this.taskId = null;
  }

  onMessage(callback: Listener) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(payload: unknown) {
    this.listeners.forEach(listener => listener(payload));
  }

  get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const chatSocket = new ChatSocket();
export default chatSocket;
