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
        <div className="flex bg-gradient-to-r from-[#ffd900] via-[#ffa110] to-mistral-orange w-12 h-12 mb-8 shadow-mistral"></div>
        <h2 className="text-[clamp(40px,8vw,82px)] leading-[0.95] font-normal mb-12 text-mistral-black dark:text-warm-ivory text-center uppercase tracking-display transition-colors duration-200">
          How can I help you discover?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {suggestions.map((suggestion, i) => (
            <button 
              key={i}
              onClick={() => submitQuery(suggestion)}
              className="text-left p-6 bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 hover:border-mistral-orange dark:hover:border-mistral-orange shadow-sm hover:shadow-mistral text-mistral-black dark:text-warm-ivory text-[15px] font-normal rounded-none transition-all duration-200 group"
            >
              <span className="group-hover:text-mistral-orange transition-colors">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
