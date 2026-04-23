type Listener = (payload: unknown) => void;

class ChatSocket {
  private socket: WebSocket | null = null;
  private listeners: Set<Listener> = new Set();
  private heartbeatListeners: Set<HeartbeatListener> = new Set();
  private taskId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;

  private static getDefaultBaseUrl() {
    const viteEnv = import.meta as ImportMeta & { env?: { VITE_WS_URL?: string } };
    return viteEnv.env?.VITE_WS_URL || 'ws://localhost:8000';
  }

  constructor(private baseUrl: string = ChatSocket.getDefaultBaseUrl()) {}

  connect(taskId: string) {
    this.taskId = taskId;
    const token = localStorage.getItem('searchily_auth_token');
    const url = `${this.baseUrl}/ws/status/${taskId}${token ? `?token=${token}` : ''}`;
    
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
        console.log('[WebSocket raw payload received]', event.data);
        const data = JSON.parse(event.data);
        console.log('[WebSocket parsed message]', {
          type: data.type,
          hasPayload: !!data.payload,
          messageId: data.payload?.message_id || 'MISSING',
          payloadKeys: Object.keys(data.payload || {})
        });
        this.notify(data);
      } catch (err) {
        console.error('[WebSocket] Failed to parse message:', err, 'Raw data:', event.data);
        this.notify({
          type: 'error',
          payload: { message: `WebSocket parse error: ${err instanceof Error ? err.message : String(err)}` }
        });
      }
    };

    this.socket.onclose = (event) => {
      console.log(`[WebSocket] Closed: ${event.code} ${event.reason}`);
      if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(taskId), 1000 * this.reconnectAttempts);
      } else {
        this.notify({ type: '__internal_closed', payload: { taskId: this.taskId } });
      }
    };

    this.socket.onerror = (err) => {
      console.error('[WebSocket] Error event:', {
        readyState: this.socket?.readyState,
        message: err instanceof Event ? 'WebSocket connection error' : String(err),
        taskId: this.taskId
      });
      this.notify({
        type: 'error',
        payload: { message: 'WebSocket connection error - check console for details' }
      });
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

  onHeartbeat(callback: HeartbeatListener) {
    this.heartbeatListeners.add(callback);
    return () => this.heartbeatListeners.delete(callback);
  }

  private notify(payload: unknown) {
    this.listeners.forEach(listener => listener(payload));
  }

  private notifyHeartbeat() {
    this.heartbeatListeners.forEach(listener => listener());
  }

  get isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

export const chatSocket = new ChatSocket();
export default chatSocket;
