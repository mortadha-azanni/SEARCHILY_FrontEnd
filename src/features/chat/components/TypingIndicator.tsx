import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-8 h-8 flex items-center justify-center bg-mistral-black text-white shrink-0 rounded-none">
        <span className="font-normal text-[14px]">AI</span>
      </div>
      <div className="flex-1 flex items-center gap-1.5 min-h-[32px]">
        <div className="w-1.5 h-1.5 bg-mistral-orange rounded-none animate-typing delay-0"></div>
        <div className="w-1.5 h-1.5 bg-mistral-orange opacity-75 rounded-none animate-typing delay-200"></div>
        <div className="w-1.5 h-1.5 bg-mistral-orange opacity-50 rounded-none animate-typing delay-500"></div>
      </div>
    </div>
  );
}
