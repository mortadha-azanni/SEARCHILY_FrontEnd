import { useCallback, useRef } from 'react';
import { WsPayload } from '../../../types';
import chatSocket from '../../../services/websocket/socket';
import { api } from '../../../services/api/client';

type Listener = (payload: WsPayload) => void;

type BackendProductItem = {
  document?: {
    id?: string | number;
    title?: string;
    name?: string;
    description?: string;
    price?: string | number;
    urllink?: string;
    url?: string;
    urlimg?: string;
    image?: string;
    source?: string;
  };
  score?: number;
  rrf_score?: number;
  bm25_score?: number;
  semantic_score?: number;
};

function normalizeProductItem(item: BackendProductItem, index: number) {
  const document = item.document || {};
  const id = document.id != null ? String(document.id) : crypto.randomUUID();
  const title = document.title || document.name || document.description || `Product ${index + 1}`;
  const description = document.description || document.name || title;
  const price = document.price != null ? String(document.price) : 'Pricing N/A';
  const image = document.urlimg || document.image || '';
  const url = document.urllink || document.url || '';
  const score = item.score ?? item.semantic_score ?? item.rrf_score ?? item.bm25_score;
  const source = document.source || (typeof score === 'number' ? `Score ${score.toFixed(2)}` : `Result ${index + 1}`);

  return {
    id,
    title,
    description,
    price,
    image,
    url,
    source,
    score
  };
}

export function adaptSocketPayload(rawPayload: unknown, currentMsgId: string | null): WsPayload | null {
  if (!rawPayload || typeof rawPayload !== 'object') {
    throw new Error('Invalid payload format: Expected object');
  }

  const payloadObj = rawPayload as Record<string, unknown>;

  // Handle internal events gracefully
  if (payloadObj.type === '__internal_start') return null;
  if (payloadObj.type === '__internal_closed') return null;

  if (typeof payloadObj.type !== 'string') {
    throw new Error('Invalid payload format: Missing or invalid "type" field');
  }
  
  const innerPayload = (payloadObj.payload || payloadObj) as Record<string, any>;
  const activeMsgId = innerPayload.message_id || currentMsgId;

  console.log(`[adaptSocketPayload] Processing type: ${payloadObj.type}, msgId: ${activeMsgId}`);

  switch (payloadObj.type) {
    case 'start':
      if (typeof activeMsgId !== 'string') throw new Error('start: Invalid message_id');
      return { type: 'start', payload: { message_id: activeMsgId } };
    
    case 'status': {
      // Status messages show backend progress - just skip them, they're informational
      if (typeof activeMsgId !== 'string') throw new Error('status: Invalid message_id');
      const status = innerPayload.status || '';
      console.log(`[adaptSocketPayload] status message: ${status}`);
      // Return null to ignore status messages (they're purely informational)
      // If you want to display them, you could emit a 'typing' event instead
      return null;
    }
    
    case 'chunk': {
      if (typeof activeMsgId !== 'string') throw new Error('chunk: Invalid message_id');
      const content = innerPayload.content || innerPayload.text || '';
      console.log(`[adaptSocketPayload] chunk content length: ${String(content).length}`);
      return { type: 'chunk', payload: { message_id: activeMsgId, content } };
    }
    
    case 'products': {
      if (typeof activeMsgId !== 'string') throw new Error('products: Invalid message_id');
      const items = innerPayload.items || innerPayload.data || [];
      if (!Array.isArray(items)) throw new Error('products: Invalid items array');
      const normalizedItems = items.map((item, index) => normalizeProductItem(item as BackendProductItem, index));
      console.log(`[adaptSocketPayload] products count: ${normalizedItems.length}`);
      return { type: 'products', payload: { message_id: activeMsgId, items: normalizedItems } };
    }
    
    case 'end':
      if (typeof activeMsgId !== 'string') throw new Error('end: Invalid message_id');
      return { type: 'end', payload: { message_id: activeMsgId } };
    
    case 'error': {
      const message = String(innerPayload.message || innerPayload.error || 'Unknown error');
      console.warn(`[adaptSocketPayload] error message: ${message}`);
      return { type: 'error', payload: { message } };
    }
    
    default:
      throw new Error(`[WebSocket] Unknown payload type: ${payloadObj.type}`);
  }
}

export function useChatSocket() {
  const currentMsgIdRef = useRef<string | null>(null);

  const onMessage = useCallback((cb: Listener) => {
    const wrappedCb = (rawPayload: unknown) => {
      try {
        if (!rawPayload || typeof rawPayload !== 'object') return;
        const data = rawPayload as any;

        // Start event from backend handles the container, or we do it locally if they are slow
        if (data.type === '__internal_start') {
          return;
        }
        
        if (data.type === '__internal_closed') {
          return;
        }

        const adapted = adaptSocketPayload(rawPayload, currentMsgIdRef.current);
        if (adapted) {
          if (adapted.type === 'start') {
            currentMsgIdRef.current = adapted.payload.message_id;
          }
          cb(adapted);
        }
        // For status messages, return null so they don't go to UI, 
        // but the outer socket still notified us that backend is alive

      } catch (err) {
        console.error('[WebSocket] Adaptation failed:', err, 'Raw payload:', rawPayload);
        // Propagate error to UI instead of silently swallowing it
        cb({
          type: 'error',
          payload: {
            message: `WebSocket parsing error: ${err instanceof Error ? err.message : String(err)}`
          }
        });
      }
    };
    return chatSocket.onMessage(wrappedCb);
  }, []);

  const sendMessage = useCallback(async (query: string) => {
    try {
      currentMsgIdRef.current = null;
      
      // 1. Handshake: Get task ID from API
      const { task_id } = await api.search(query);
      
      // 2. Connect WebSocket to this task
      chatSocket.connect(task_id);
      
    } catch (err: any) {
      console.error('[ChatSocket] Search handshake failed:', err);
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    chatSocket.disconnect();
  }, []);

  const connect = useCallback(() => {
    // No-op
  }, []);

  // This is a trick: we return the heartbeat callback instead of the regular connect
  // The useChat hook will use this to reset timeout on every message (including status)
  return { 
    connect, 
    disconnect, 
    sendMessage, 
    onMessage,
    // Export heartbeat so useChat can use it to track backend activity
    getHeartbeatListener: () => chatSocket.onHeartbeat
  };
}
