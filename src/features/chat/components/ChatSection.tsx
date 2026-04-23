import React, { useRef, useEffect, useMemo } from 'react';
import ChatInput, { ChatInputHandle } from './ChatInput';
import MessageList from './MessageList';
import TypingIndicator from './TypingIndicator';
import ChatEmptyState from './ChatEmptyState';
import { Message } from '../../../types';

interface ChatSectionProps {
  messages: Message[];
  submitQuery: (query: string) => void;
  isLoading: boolean;
  error?: string | null;
  retryQuery?: () => void;
  stopGenerating?: () => void;
  activeMessageId?: string | null;
  setActiveMessageId?: (id: string) => void;
}

export default function ChatSection({
  messages,
  submitQuery,
  isLoading,
  error,
  retryQuery,
  stopGenerating,
  activeMessageId,
  setActiveMessageId
}: ChatSectionProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<ChatInputHandle>(null);

  useEffect(() => {
    if (messagesEndRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      if (isNearBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  const handleRetry = () => {
    if (retryQuery) retryQuery();
    // Return focus to input and scroll appropriately
    chatInputRef.current?.focus();
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const isAwaitingResponse = isLoading && (
    !messages.length || 
    messages[messages.length - 1]?.role === 'user' || 
    (messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.status === 'error')
  );

  const displayMessages = useMemo(() => {
    return messages.filter((msg, idx, arr) => {
      const isFinalAssistantError =
        msg.role === 'assistant' && msg.status === 'error' && isLoading && idx === arr.length - 1;
      return !isFinalAssistantError;
    });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-warm-ivory dark:bg-mistral-black relative border-r border-l border-mistral-black/10 dark:border-warm-ivory/20 transition-colors duration-200">
      
      {/* Global Error Banner */}
      {error && (
        <div className="relative z-50 bg-mistral-black dark:bg-warm-ivory text-warm-ivory dark:text-mistral-black p-4 shadow-mistral dark:shadow-none text-[14px] flex justify-between items-center group font-normal rounded-none animate-in slide-in-from-top-2 shrink-0 transition-colors duration-200">
          <span>{error}</span>
          {retryQuery && (
            <button 
              onClick={handleRetry}
              className="px-3 py-1.5 bg-cream dark:bg-mistral-black hover:bg-block-gold dark:hover:bg-block-gold text-mistral-black dark:text-warm-ivory text-xs font-normal uppercase tracking-wider transition-colors ml-4 rounded-none border border-transparent focus:outline-none"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 relative">
        
        {messages.length === 0 && (
          <div className="absolute inset-0">
             <ChatEmptyState submitQuery={submitQuery} />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto w-full space-y-8 pb-10 mt-4">
          <MessageList 
            messages={displayMessages} 
            onRetry={handleRetry} 
            activeMessageId={activeMessageId}
            setActiveMessageId={setActiveMessageId}
          />
          
          {/* Skeleton / Typing Indicator */}
          {isAwaitingResponse && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TypingIndicator />
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-[2px] w-full" />
        </div>
      </div>

      {/* Input Form at the bottom */}
      <ChatInput ref={chatInputRef} submitQuery={submitQuery} isLoading={isLoading} stopGenerating={stopGenerating} />
      
    </div>
  );
}
