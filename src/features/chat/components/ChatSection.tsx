import React, { useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import AIMessage from './AIMessage';
import UserMessage from './UserMessage';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../hooks/useChat';

export default function ChatSection() {
  const { messages, isLoading, submitQuery, currentStatus } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-warm-ivory relative border-r border-l border-mistral-black/10">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center max-w-lg mx-auto pb-20">
            <h2 className="text-[32px] md:text-[40px] tracking-tight text-mistral-black mb-4 font-normal">
              What are you looking for?
            </h2>
            <p className="text-[18px] text-mistral-black/60 font-normal">
              Search the universe of products using natural constraints.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-8 pb-10">
            {messages.map((message) => (
              message.role === 'user' 
                ? <UserMessage key={message.id} content={message.content} />
                : <AIMessage key={message.id} content={message.content} />
            ))}
            
            {/* Typing Indicator with strict prop-drilled pipeline status */}
            {isLoading && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <TypingIndicator statusText={currentStatus || "Fetching results"} />
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-[2px] w-full" />
          </div>
        )}
      </div>

      {/* Input Form at the bottom */}
      <ChatInput submitQuery={submitQuery} isLoading={isLoading} />
      
    </div>
  );
}
