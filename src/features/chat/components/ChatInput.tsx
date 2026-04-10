import React, { useRef, useEffect } from 'react';

export default function ChatInput({ submitQuery, isLoading }: { submitQuery: (q: string) => void, isLoading: boolean }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Autofocus heavily on mount and after loading
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const val = inputRef.current?.value.trim() || '';
      
      if (e.shiftKey && !val) {
        e.preventDefault();
        return;
      }

      if (!e.shiftKey) {
        e.preventDefault();
        if (!isLoading && val) {
          submitQuery(val);
          if (inputRef.current) inputRef.current.value = '';
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && inputRef.current?.value.trim()) {
      submitQuery(inputRef.current.value.trim());
      inputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-warm-ivory via-warm-ivory to-transparent mt-auto relative z-10 w-full shrink-0">
      <form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto relative border border-mistral-black/20 bg-white focus-within:border-mistral-orange transition-colors shadow-[0_16px_40px_rgba(127,99,21,0.05)] rounded-none"
      >
        <textarea 
          ref={inputRef}
          autoFocus
          className="w-full bg-transparent p-4 pr-16 resize-none outline-none text-[16px] min-h-[56px] max-h-[200px] [field-sizing:content] text-mistral-black placeholder:text-mistral-black/40"
          placeholder="Ask anything..."
          rows={1}
          defaultValue=""
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="absolute right-2 bottom-2 h-10 w-10 bg-mistral-black text-white hover:bg-mistral-orange flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-4 h-4">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
