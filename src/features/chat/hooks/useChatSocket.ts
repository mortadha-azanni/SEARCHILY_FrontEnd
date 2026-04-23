import { useCallback } from 'react';
import { Product, WsPayload } from '../../../types';
import chatSocket from '../../../services/websocket/socket';
import { api } from '../../../services/api/client';

type Listener = (payload: WsPayload) => void;

// Decouple WebSocket state machine parsing raw payloads from real websocket
export function adaptSocketPayload(rawPayload: unknown): WsPayload | null {
  if (!rawPayload || typeof rawPayload !== 'object') {
    throw new Error('Invalid payload format: Expected object');
  }

  const payloadObj = rawPayload as Record<string, unknown>;

  if (typeof payloadObj.type !== 'string') {
    throw new Error('Invalid payload format: Missing or invalid "type" field');
  }
  
  const innerPayload = (payloadObj.payload ?? payloadObj) as Record<string, unknown>;

  switch (payloadObj.type) {
    case 'start':
      if (typeof innerPayload.message_id !== 'string') throw new Error('start: Invalid message_id');
      return { type: 'start', payload: { message_id: innerPayload.message_id } };
    
    case 'chunk':
      if (typeof innerPayload.message_id !== 'string') throw new Error('chunk: Invalid message_id');
      {
        const content =
          typeof innerPayload.content === 'string'
            ? innerPayload.content
            : typeof innerPayload.text === 'string'
              ? innerPayload.text
              : null;
        if (!content) throw new Error('chunk: Invalid content');
        return { type: 'chunk', payload: { message_id: innerPayload.message_id, content } };
      }
    
    case 'products':
      if (typeof innerPayload.message_id !== 'string') throw new Error('products: Invalid message_id');
      {
        const items = Array.isArray(innerPayload.items)
          ? innerPayload.items
          : Array.isArray(innerPayload.data)
            ? innerPayload.data
            : null;
        if (!items) throw new Error('products: Invalid items array');
        return { type: 'products', payload: { message_id: innerPayload.message_id, items: items as Product[] } };
      }
    
    case 'end':
      if (typeof innerPayload.message_id !== 'string') throw new Error('end: Invalid message_id');
      return { type: 'end', payload: { message_id: innerPayload.message_id } };
    
    case 'error':
      {
        const message =
          typeof innerPayload.message === 'string'
            ? innerPayload.message
            : typeof innerPayload.error === 'string'
              ? innerPayload.error
              : 'Unknown error';
        return { type: 'error', payload: { message } };
      }
    
    default:
      throw new Error(`[WebSocket] Unknown payload type: ${payloadObj.type}`);
  }
}

export function useChatSocket() {
  const onMessage = useCallback((cb: Listener) => {
    // Wrapper to adapt payload before calling callback
    const wrappedCb = (rawPayload: unknown) => {
      try {
        const adapted = adaptSocketPayload(rawPayload);
        if (adapted) cb(adapted);
      } catch (err) {
        console.error('[WebSocket] Adaptation failed:', err);
      }
    };
    return chatSocket.onMessage(wrappedCb);
  }, []);

  const sendMessage = useCallback(async (query: string) => {
    try {
      // 1. Handshake: Get task ID from API
      const { task_id } = await api.search(query);
      
      // 2. Connect WebSocket to this task
      chatSocket.connect(task_id);
      
    } catch (err: unknown) {
      console.error('[ChatSocket] Search handshake failed:', err);
      // We need a way to dispatch this locally. Since we don't have a direct dispatch in chatSocket,
      // we can rely on the fact that if api.search fails, the UI will handle it via the promise catch.
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    chatSocket.disconnect();
  }, []);

  const connect = useCallback(() => {
    // No-op for now, as we connect on sendMessage
  }, []);

  return { connect, disconnect, sendMessage, onMessage };
}
