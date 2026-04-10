import React, { useState, useEffect } from 'react';

interface TypingIndicatorProps {
  statusText?: string;
}

export default function TypingIndicator({ statusText = "Processing pipeline..." }: TypingIndicatorProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] border border-mistral-black/10 bg-white p-5 shadow-[0_4px_20px_rgba(127,99,21,0.05)] rounded-none">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Pulsing square indicator instead of bouncing rounded dots */}
            <div className="w-2.5 h-2.5 bg-mistral-orange translate-y-[2px] opacity-75 animate-pulse" />
          </div>
          <span className="text-[14px] text-mistral-black/60 tracking-tight font-normal">
            {statusText}{dots}
          </span>
        </div>
      </div>
    </div>
  );
}
