import { useState, useCallback } from 'react';
import { Message, Product } from '../../../types';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addUserMessage = useCallback((content: string) => {
    const id = crypto.randomUUID();
    const newMessage: Message = { id, role: 'user', content };
    setMessages(prev => [...prev, newMessage]);
    return id;
  }, []);

  const addAssistantMessage = useCallback((id: string) => {
    setMessages(prev => [
      ...prev,
      { id, role: 'assistant', content: '', status: 'streaming' }
    ]);
  }, []);

  const appendToMessage = useCallback((id: string, chunk: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, content: msg.content + chunk } : msg
    ));
  }, []);

  const setProductsInMessage = useCallback((id: string, products: Product[]) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, products } : msg
    ));
  }, []);

  const finalizeMessage = useCallback((id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status: 'done' } : msg
    ));
  }, []);

  const setErrorMessage = useCallback((id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status: 'error' } : msg
    ));
  }, []);

  const abortMessage = useCallback((id: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, status: 'aborted' } : msg
    ));
  }, []);

  return {
    messages,
    setMessages,
    addUserMessage,
    addAssistantMessage,
    appendToMessage,
    setProductsInMessage,
    finalizeMessage,
    setErrorMessage,
    abortMessage
  };
}
