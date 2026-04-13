import React from 'react';

export default function ChatEmptyState({ submitQuery }: { submitQuery: (q: string) => void }) {
  const suggestions = [
    "Find me a cheap gaming laptop under $1000",
    "What are the best running shoes for flat feet?",
    "Show me some noise-cancelling headphones for travel",
    "I need a minimalist standing desk"
  ];

  return (
    <div className="flex-1 bg-warm-ivory dark:bg-mistral-black z-20 flex flex-col justify-center items-center py-12 px-4 animate-in fade-in duration-300 min-h-full transition-colors duration-200">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        <div className="flex bg-mistral-orange w-12 h-12 mb-8 shadow-mistral"></div>
        <h2 className="text-[clamp(40px,8vw,82px)] leading-[1.15] font-normal mb-8 text-mistral-black dark:text-warm-ivory text-center uppercase tracking-[-2.05px] transition-colors duration-200">
          How can I help you discover?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {suggestions.map((suggestion, i) => (
            <button 
              key={i}
              onClick={() => submitQuery(suggestion)}
              className="text-left p-4 bg-warm-ivory dark:bg-mistral-black border-2 border-mistral-black dark:border-warm-ivory hover:bg-mistral-black hover:text-warm-ivory dark:hover:bg-warm-ivory dark:hover:text-mistral-black text-mistral-black dark:text-warm-ivory text-[14px] font-normal rounded-none transition-colors duration-200"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
