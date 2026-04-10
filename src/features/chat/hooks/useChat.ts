import { useState, useCallback, useEffect, useRef } from 'react';
import { useMessages } from './useMessages';
import { useChatSocket } from './useChatSocket';
import { useHistory } from '../../history/hooks/useHistory';
import { Product, WsPayload } from '../../../types';

export function useChat(initialSessionId?: string) {
  const [sessionId, setSessionId] = useState(() => initialSessionId || crypto.randomUUID());
  
  const { 
    messages, 
    setMessages,
    addUserMessage, 
    addAssistantMessage, 
    appendToMessage, 
    finalizeMessage, 
    setErrorMessage 
  } = useMessages();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  const isLoadingRef = useRef(false);
  isLoadingRef.current = isLoading;
  
  const activeMessageIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { saveToHistory, loadFromHistory } = useHistory();
  const { connect, disconnect, sendMessage, onMessage } = useChatSocket();

  // Implement session change logic
  const loadSession = useCallback((id: string) => {
    const historicalState = loadFromHistory(id);
    if (historicalState) {
      setSessionId(id);
      setMessages(historicalState.messages || []);
      setProducts(historicalState.products || []);
      setError(historicalState.error || null);
      setIsLoading(false);
    } else {
      // If it doesn't exist, create a new one
      setSessionId(crypto.randomUUID());
      setMessages([]);
      setProducts([]);
      setError(null);
      setIsLoading(false);
    }
  }, [loadFromHistory, setMessages, setProducts]);

  const clearQueryTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleSocketError = useCallback((message: string) => {
    setIsLoading(false);
    setError(message);
    if (activeMessageIdRef.current) {
      setErrorMessage(activeMessageIdRef.current);
      activeMessageIdRef.current = null;
    }
    clearQueryTimeout();
  }, [setErrorMessage, clearQueryTimeout]);

  const resetQueryTimeout = useCallback(() => {
    clearQueryTimeout();
    timeoutRef.current = setTimeout(() => {
       handleSocketError('Request timed out. Please check your connection and try again.');
    }, 15000); // 15 seconds string stream timeout
  }, [clearQueryTimeout, handleSocketError]);

  const handleSocketMessage = useCallback((payload: WsPayload) => {
    if (!isLoadingRef.current) return;

    resetQueryTimeout();

    switch (payload.type) {
      case 'start':
        activeMessageIdRef.current = payload.payload.message_id;
        addAssistantMessage(payload.payload.message_id);
        break;
      case 'chunk':
        if (activeMessageIdRef.current === payload.payload.message_id) {
          appendToMessage(payload.payload.message_id, payload.payload.content);
        }
        break;
      case 'products':
        setProducts(payload.payload.items);
        break;
      case 'end':
        setIsLoading(false);
        clearQueryTimeout();
        if (activeMessageIdRef.current === payload.payload.message_id) {
          finalizeMessage(payload.payload.message_id);
          activeMessageIdRef.current = null;
        }
        break;
      case 'error':
        handleSocketError(payload.payload.message);
        break;
    }
  }, [addAssistantMessage, appendToMessage, setProducts, finalizeMessage, handleSocketError, resetQueryTimeout, clearQueryTimeout]);

  useEffect(() => {
    const unsubscribe = onMessage(handleSocketMessage);
    return () => {
      unsubscribe();
      clearQueryTimeout();
    };
  }, [onMessage, handleSocketMessage, clearQueryTimeout]);

  // Persist history: Save continuously to prevent Ghost Sessions, debounced to prevent spam
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToHistory(sessionId, {
        messages,
        products,
        isLoading,
        error
      });
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messages, products, isLoading, error, sessionId, saveToHistory]);

  const executeQuery = useCallback((query: string) => {
    setIsLoading(true);
    setError(null);
    setLastQuery(query);
    resetQueryTimeout();
    sendMessage(query);
  }, [sendMessage, resetQueryTimeout]);

  const submitQuery = useCallback((query: string) => {
    if (isLoadingRef.current) return null;
    const messageId = addUserMessage(query);
    executeQuery(query);
    return messageId;
  }, [addUserMessage, executeQuery]);

  const retryQuery = useCallback(() => {
    if (isLoadingRef.current || !lastQuery) return;
    executeQuery(lastQuery);
  }, [lastQuery, executeQuery]);

  return {
    sessionId,
    messages,
    products,
    isLoading,
    error,
    submitQuery,
    retryQuery,
    loadSession,
    connect,
    disconnect
  };
}
