import { useState, useCallback, useEffect, useRef } from 'react';
import { useMessages } from './useMessages';
import { useChatSocket } from './useChatSocket';
import { useHistory } from '../../history/hooks/useHistory';
import { Message, WsPayload } from '../../../types';

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err && typeof err === 'object') {
    const maybeError = err as { message?: string; response?: { data?: { message?: string } } };
    return maybeError.response?.data?.message ?? maybeError.message ?? fallback;
  }
  return fallback;
};

export function useChat(initialSessionId?: string) {
  const { saveToHistory, loadFromHistory, deleteHistorySession, getLatestSessionId } = useHistory();
  const [sessionId, setSessionId] = useState(() => initialSessionId || crypto.randomUUID());
  const hasAttemptedResume = useRef(false);
  
  const { 
    messages, 
    setMessages,
    addUserMessage, 
    addAssistantMessage, 
    appendToMessage,
    setProductsInMessage,
    finalizeMessage, 
    setErrorMessage,
    abortMessage
  } = useMessages();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  const isLoadingRef = useRef(false);
  
  const activeMessageIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const { connect, disconnect, sendMessage, onMessage } = useChatSocket();

  const loadSession = useCallback((id: string) => {
    const historicalState = loadFromHistory(id);
    if (historicalState) {
      setSessionId(id);
      setMessages(historicalState.messages || []);
      setError(historicalState.error || null);
      setIsLoading(false);
      // Find the last assistant message and set it active
      const lastAssoc = historicalState.messages?.slice().reverse().find((m: Message) => m.role === 'assistant');
      setActiveMessageId(lastAssoc?.id || null);
    } else {
      setSessionId(crypto.randomUUID());
      setMessages([]);
      setError(null);
      setIsLoading(false);
      setActiveMessageId(null);
    }
  }, [loadFromHistory, setMessages]);

  // Auto-resume latest session on mount if no initialSessionId
  useEffect(() => {
    if (!initialSessionId && !hasAttemptedResume.current) {
      const latestId = getLatestSessionId();
      // Only auto-load if history is populated (it might be async from localStorage)
      if (latestId) {
        // Use a small delay or check to ensure loadSession is ready
        loadSession(latestId);
        hasAttemptedResume.current = true;
      }
    }
  }, [initialSessionId, getLatestSessionId, loadSession]);

  const removeSession = useCallback((id: string) => {
    deleteHistorySession(id);
    if (sessionId === id) {
      setSessionId(crypto.randomUUID());
      setMessages([]);
      setError(null);
      setIsLoading(false);
      setActiveMessageId(null);
    }
  }, [deleteHistorySession, sessionId, setMessages]);

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
    }, 15000); 
  }, [clearQueryTimeout, handleSocketError]);

  const handleSocketMessage = useCallback((payload: WsPayload) => {
    if (!isLoadingRef.current) return;

    resetQueryTimeout();

    switch (payload.type) {
      case 'start':
        activeMessageIdRef.current = payload.payload.message_id;
        addAssistantMessage(payload.payload.message_id);
        setActiveMessageId(payload.payload.message_id);
        break;
      case 'chunk':
        if (activeMessageIdRef.current === payload.payload.message_id) {
          appendToMessage(payload.payload.message_id, payload.payload.content);
        }
        break;
      case 'products':
        if (payload.payload.message_id) {
          setProductsInMessage(payload.payload.message_id, payload.payload.items);
        } else if (activeMessageIdRef.current) {
          setProductsInMessage(activeMessageIdRef.current, payload.payload.items);
        }
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
  }, [addAssistantMessage, appendToMessage, setProductsInMessage, finalizeMessage, handleSocketError, resetQueryTimeout, clearQueryTimeout]);

  useEffect(() => {
    const unsubscribe = onMessage(handleSocketMessage);
    return () => {
      unsubscribe();
      clearQueryTimeout();
    };
  }, [onMessage, handleSocketMessage, clearQueryTimeout]);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToHistory(sessionId, {
        messages,
        activeMessageId,
        isLoading,
        error
      });
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messages, activeMessageId, isLoading, error, sessionId, saveToHistory]);

  const executeQuery = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setLastQuery(query);
    resetQueryTimeout();
    try {
      await sendMessage(query);
    } catch (err: unknown) {
      setIsLoading(false);
      setError(getErrorMessage(err, 'Failed to start search'));
      if (activeMessageIdRef.current) {
        setErrorMessage(activeMessageIdRef.current);
      }
    }
  }, [sendMessage, resetQueryTimeout, setErrorMessage]);

  const submitQuery = useCallback(async (query: string) => {
    if (isLoadingRef.current) return null;
    const messageId = addUserMessage(query);
    await executeQuery(query);
    return messageId;
  }, [addUserMessage, executeQuery]);

  const retryQuery = useCallback(async () => {
    if (isLoadingRef.current || !lastQuery) return;
    await executeQuery(lastQuery);
  }, [lastQuery, executeQuery]);

  const stopGenerating = useCallback(() => {
    if (!isLoadingRef.current || !activeMessageIdRef.current) return;
    setIsLoading(false);
    clearQueryTimeout();
    abortMessage(activeMessageIdRef.current);
    activeMessageIdRef.current = null;
  }, [clearQueryTimeout, abortMessage]);

  return {
    sessionId,
    messages,
    activeMessageId,
    setActiveMessageId,
    isLoading,
    error,
    submitQuery,
    retryQuery,
    stopGenerating,
    loadSession,
    removeSession,
    connect,
    disconnect
  };
}
