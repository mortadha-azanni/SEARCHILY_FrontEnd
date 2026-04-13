import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

interface ChatInputProps {
  submitQuery: (q: string) => void;
  isLoading: boolean;
  stopGenerating?: () => void;
}

export interface ChatInputHandle {
  focus: () => void;
}

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(({ submitQuery, isLoading, stopGenerating }, ref) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

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
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-warm-ivory via-warm-ivory dark:from-mistral-black dark:via-mistral-black to-transparent mt-auto relative z-10 w-full shrink-0 transition-colors duration-200">
      <form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto relative border border-mistral-black/20 dark:border-warm-ivory/20 bg-white dark:bg-[#1a1a1a] focus-within:border-mistral-orange dark:focus-within:border-mistral-orange transition-colors shadow-mistral dark:shadow-none rounded-none"
      >
        <textarea 
          ref={inputRef}
          autoFocus
          className="w-full bg-transparent p-4 pr-16 resize-none outline-none text-[16px] min-h-[56px] max-h-[200px] [field-sizing:content] text-mistral-black dark:text-warm-ivory placeholder:text-mistral-black/40 dark:placeholder:text-warm-ivory/40 transition-colors duration-200"
          placeholder="Ask anything..."
          rows={1}
          defaultValue=""
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {isLoading && stopGenerating ? (
          <button 
            type="button"
            onClick={stopGenerating}
            className="absolute right-2 bottom-2 h-10 w-10 bg-mistral-orange text-mistral-black hover:bg-mistral-black hover:text-white dark:hover:bg-warm-ivory dark:hover:text-mistral-black flex items-center justify-center rounded-none transition-colors duration-200"
            aria-label="Stop Generating"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
          </button>
        ) : (
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 bottom-2 h-10 w-10 bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black hover:bg-mistral-orange dark:hover:bg-mistral-orange flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        )}
      </form>
    </div>
  );
});

export default ChatInput;
