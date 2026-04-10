import React from 'react';

export default function ChatEmptyState({ submitQuery }: { submitQuery: (q: string) => void }) {
  const suggestions = [
    "Find me a cheap gaming laptop under $1000",
    "What are the best running shoes for flat feet?",
    "Show me some noise-cancelling headphones for travel",
    "I need a minimalist standing desk"
  ];

  return (
    <div className="max-w-2xl mx-auto w-full h-full flex flex-col justify-center items-center py-12 px-4">
      <div className="flex bg-gradient-to-r from-[#ffd900] via-[#ffa110] to-mistral-orange w-12 h-12 mb-8 shadow-[-8px_16px_39px_rgba(127,99,21,0.2)]"></div>
      <h2 className="text-[32px] leading-[1.15] font-normal mb-8 text-mistral-black text-center uppercase tracking-tight">
        How can I help you discover?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {suggestions.map((suggestion, i) => (
          <button 
            key={i}
            onClick={() => submitQuery(suggestion)}
            className="text-left p-4 bg-white border border-mistral-black/10 hover:border-mistral-orange hover:shadow-[-8px_16px_39px_rgba(127,99,21,0.1)] transition-all text-sm text-mistral-black/80 font-normal"
          >
            "{suggestion}"
          </button>
        ))}
      </div>
    </div>
  );
}
