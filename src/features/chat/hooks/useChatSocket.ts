import { useRef, useCallback, useEffect } from 'react';
import { WsPayload } from '../../../types';
import { mockGenerateAIResponse, MOCK_PRODUCTS } from '../../../mockdata/chatMock';

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
  
  const innerPayload = (payloadObj.payload || payloadObj) as Record<string, any>;

  switch (payloadObj.type) {
    case 'start':
      if (typeof innerPayload.message_id !== 'string') throw new Error('start: Invalid message_id');
      return { type: 'start', payload: { message_id: innerPayload.message_id } };
    
    case 'chunk':
      if (typeof innerPayload.message_id !== 'string') throw new Error('chunk: Invalid message_id');
      if (typeof (innerPayload.content || innerPayload.text) !== 'string') throw new Error('chunk: Invalid content');
      return { type: 'chunk', payload: { message_id: innerPayload.message_id, content: innerPayload.content || innerPayload.text } };
    
    case 'products':
      if (typeof innerPayload.message_id !== 'string') throw new Error('products: Invalid message_id');
      if (!Array.isArray(innerPayload.items || innerPayload.data)) throw new Error('products: Invalid items array');
      return { type: 'products', payload: { message_id: innerPayload.message_id, items: innerPayload.items || innerPayload.data } };
    
    case 'end':
      if (typeof innerPayload.message_id !== 'string') throw new Error('end: Invalid message_id');
      return { type: 'end', payload: { message_id: innerPayload.message_id } };
    
    case 'error':
      return { type: 'error', payload: { message: String(innerPayload.message || innerPayload.error || 'Unknown error') } };
    
    default:
      throw new Error(`[WebSocket] Unknown payload type: ${payloadObj.type}`);
  }
}

export function useChatSocket() {
  const isConnected = useRef(false);
  const listeners = useRef<Listener[]>([]);
  const activeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const connect = useCallback(() => {
    isConnected.current = true;
  }, []);

  const clearTimeouts = useCallback(() => {
    activeTimeouts.current.forEach(clearTimeout);
    activeTimeouts.current = [];
  }, []);

  // Adapter receives raw payload and adapts it before updating the app React state
  const dispatchRaw = useCallback((rawPayload: unknown) => {
    try {
      const adapted = adaptSocketPayload(rawPayload);
      if (!adapted) return;
      listeners.current.forEach(cb => cb(adapted));
    } catch (e) {
      console.error('[WebSocket] Adaptation failed:', e);
      // Depending on severity, we could emit an error payload to listeners here:
      // listeners.current.forEach(cb => cb({ type: 'error', payload: { message: 'Adaptation failed' } }));
    }
  }, []);

  const disconnect = useCallback(() => {
    isConnected.current = false;
    clearTimeouts();
    dispatchRaw({ type: 'error', payload: { message: 'Connection lost' } });
  }, [clearTimeouts, dispatchRaw]);

  const onMessage = useCallback((cb: Listener) => {
    listeners.current.push(cb);
    return () => {
      listeners.current = listeners.current.filter(l => l !== cb);
    };
  }, []);

  const sendMessage = useCallback((query: string) => {
    if (!isConnected.current) {
      connect();
    }
    
    // Exact protocol simulation as required, feeding it into raw adapter
    const messageId = crypto.randomUUID();
    
    const startTimeout = setTimeout(() => {
      dispatchRaw({ type: 'start', payload: { message_id: messageId } });
      
      const text = mockGenerateAIResponse(query);
      const chunks = text.split(/(?=\s+)/);
      let delay = 200;
      
      chunks.forEach((chunk, index) => {
        const chunkTimeout = setTimeout(() => {
          dispatchRaw({ type: 'chunk', payload: { message_id: messageId, content: chunk } });
        }, delay + (index * 100)); // fast streaming simulation
        activeTimeouts.current.push(chunkTimeout);
      });
      
      const nextDelay = delay + (chunks.length * 100) + 200;
      
      const productsTimeout = setTimeout(() => {
        dispatchRaw({
          type: 'products',
          payload: {
            message_id: messageId,
            items: MOCK_PRODUCTS
          }
        });
      }, nextDelay);
      activeTimeouts.current.push(productsTimeout);
      
      const endTimeout = setTimeout(() => {
        dispatchRaw({ type: 'end', payload: { message_id: messageId } });
      }, nextDelay + 200);
      activeTimeouts.current.push(endTimeout);

    }, 300);
    activeTimeouts.current.push(startTimeout);

  }, [connect, dispatchRaw]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, disconnect, sendMessage, onMessage };
}
