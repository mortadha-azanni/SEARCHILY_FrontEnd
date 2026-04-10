import React from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import { Message } from '../../../types';

export default function MessageList({ 
  messages, 
  onRetry 
}: { 
  messages: Message[], 
  onRetry?: () => void 
}) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      {messages.map((msg, index) => 
        msg.role === 'user' ? (
          <UserMessage key={msg.id} content={msg.content} />
        ) : (
          <AIMessage 
            key={msg.id} 
            content={msg.content} 
            status={msg.status} 
            onRetry={index === messages.length - 1 && msg.status === 'error' ? onRetry : undefined}
          />
        )
      )}
    </div>
  );
}
