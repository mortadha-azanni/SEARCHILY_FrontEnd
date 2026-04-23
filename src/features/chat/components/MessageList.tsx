import React from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import { Message } from '../../../types';

export default function MessageList({ 
  messages, 
  onRetry,
  activeMessageId,
  setActiveMessageId
}: { 
  messages: Message[], 
  onRetry?: () => void,
  activeMessageId?: string | null,
  setActiveMessageId?: (id: string) => void
}) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      {messages.map((msg, index) => 
        msg.role === 'user' ? (
          <UserMessage key={msg.id} content={msg.content} />
        ) : (
          <div 
            key={msg.id}
            role="button"
            tabIndex={0}
            onClick={() => setActiveMessageId?.(msg.id)}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveMessageId?.(msg.id);
              }
            }}
            className={`cursor-pointer border -mx-4 px-4 py-1 outline-none focus-visible:ring-2 focus-visible:ring-mistral-orange focus-visible:ring-offset-2 ${
              activeMessageId === msg.id 
                ? 'border-mistral-black bg-cream shadow-[4px_4px_0px_0px_theme(colors.mistral.black)]' 
                : 'border-transparent hover:border-mistral-black/30'
            }`}
            aria-current={activeMessageId === msg.id}
          >
            <AIMessage 
              content={msg.content} 
              status={msg.status} 
              onRetry={index === messages.length - 1 && msg.status === 'error' ? onRetry : undefined}
            />
          </div>
        )
      )}
    </div>
  );
}
