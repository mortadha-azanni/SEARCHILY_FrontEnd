import { useRef, useCallback, useEffect } from 'react';
import { WsPayload } from '../../../types';
import { mockGenerateAIResponse, MOCK_PRODUCTS } from '../../../mockdata/chatMock';

type Listener = (payload: WsPayload) => void;

export function useChatSocket() {
  const isConnected = useRef(false);
  const listeners = useRef<Listener[]>([]);
  const activeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const connect = useCallback(() => {
    // console.log('[WebSocket] Connected');
    isConnected.current = true;
  }, []);

  const clearTimeouts = useCallback(() => {
    activeTimeouts.current.forEach(clearTimeout);
    activeTimeouts.current = [];
  }, []);

  const dispatch = useCallback((payload: WsPayload) => {
    listeners.current.forEach(cb => cb(payload));
  }, []);

  const disconnect = useCallback(() => {
    // console.log('[WebSocket] Disconnected');
    isConnected.current = false;
    clearTimeouts();
    // Dispatch an error payload so consumers know the stream aborted abruptly
    dispatch({ type: 'error', payload: { message: 'Connection lost' } });
  }, [clearTimeouts, dispatch]);

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
    // console.log(`[WebSocket] Sending: ${query}`);
    
    // Exact protocol simulation as required
    const messageId = crypto.randomUUID();
    
    const startTimeout = setTimeout(() => {
      // console.log(`[WebSocket] Received: { type: "start", payload: { message_id: "${messageId}" } }`);
      dispatch({ type: 'start', payload: { message_id: messageId } });
      
      const text = mockGenerateAIResponse(query);
      const chunks = text.split(/(?=\s+)/);
      let delay = 200;
      
      chunks.forEach((chunk, index) => {
        const chunkTimeout = setTimeout(() => {
          // console.log(`[WebSocket] Received: { type: "chunk", payload: { message_id: "${messageId}", content: "${chunk}" } }`);
          dispatch({ type: 'chunk', payload: { message_id: messageId, content: chunk } });
        }, delay + (index * 100)); // fast streaming simulation
        activeTimeouts.current.push(chunkTimeout);
      });
      
      const nextDelay = delay + (chunks.length * 100) + 200;
      
      const productsTimeout = setTimeout(() => {
        // console.log(`[WebSocket] Received: { type: "products", payload: { items: [...] } }`);
        dispatch({
          type: 'products',
          payload: {
            items: MOCK_PRODUCTS
          }
        });
      }, nextDelay);
      activeTimeouts.current.push(productsTimeout);
      
      const endTimeout = setTimeout(() => {
        // console.log(`[WebSocket] Received: { type: "end", payload: { message_id: "${messageId}" } }`);
        dispatch({ type: 'end', payload: { message_id: messageId } });
      }, nextDelay + 200);
      activeTimeouts.current.push(endTimeout);

    }, 300);
    activeTimeouts.current.push(startTimeout);

  }, [connect, dispatch]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, disconnect, sendMessage, onMessage };
}
