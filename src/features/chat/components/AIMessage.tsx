import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Centralised mock source data for hover citations
const MOCK_SOURCES: Record<string, { title: string, snippet: string }> = {
  "1": { title: "Product Specs Overview", snippet: "The dimensions and technical specifications of the device indicate strong structural rigidity. No radius curves used." },
  "2": { title: "Verified Buyer Review", snippet: "Highly rated for its portability and battery life compared to the previous generation." },
  "3": { title: "Pricing & Availability", snippet: "Available at a competitive price directly from verified distributors in the NA region." },
  "4": { title: "Technical Datasheet", snippet: "Power consumption ranges from 15W to 45W depending on load conditions." }
};

const CitationLabel = ({ index }: { index: string }) => {
  const [show, setShow] = useState(false);
  const source = MOCK_SOURCES[index];
  
  if (!source) return <span className="text-mistral-orange font-normal text-[12px] px-0.5">[{index}]</span>;
  
  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <sup className="text-mistral-orange font-normal hover:text-mistral-flame transition-colors leading-[0] px-[1px]">
        [{index}]
      </sup>
      
      {/* Tooltip Overlay */}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[280px] bg-mistral-black text-white p-4 shadow-mistral z-[100] border-t border-mistral-orange animate-in fade-in slide-in-from-bottom-2 duration-150 rounded-none pointer-events-none">
          <div className="font-normal uppercase tracking-wider mb-2 text-mistral-orange text-[12px] pb-2 border-b border-white/10 flex items-center justify-between">
            <span>Source {index}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
          <div className="font-normal text-cream mb-1 text-[14px]">{source.title}</div>
          <div className="opacity-80 text-[12px] leading-relaxed font-normal">{source.snippet}</div>
          
          {/* Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-mistral-black rotate-45 border-r border-b border-transparent shadow-[0_8px_30px_rgba(250,82,15,0.05)]"></div>
        </div>
      )}
    </span>
  );
};

export default function AIMessage({ 
  content, 
  status,
  onRetry 
}: { 
  content?: string, 
  status?: 'streaming' | 'done' | 'error',
  onRetry?: () => void
}) {                                           
  
  // Custom markdown renderer to inject citation hover cards
  const renderWithCitations = (children: React.ReactNode) => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        const parts = child.split(/(\[\d+\])/g);
        return parts.map((part, i) => {
          const match = part.match(/\[(\d+)\]/);
          if (match) return <CitationLabel key={i} index={match[1]} />;
          return <span key={i} className="font-normal">{part}</span>;
        });
      }
      return child;
    });
  };

  return (
    <div className="flex justify-start mb-8">
      <div className={`bg-cream dark:bg-[#111] text-mistral-black dark:text-warm-ivory px-6 py-5 max-w-[90%] min-w-[50%] text-[14px] font-normal leading-relaxed border ${
        status === 'error' ? 'border-red-300 dark:border-red-800 shadow-[0_8px_30px_rgba(250,82,15,0.05)]' : 'border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none'
      } rounded-none relative transition-colors duration-200`}>                                                 
        
        <div className="prose prose-sm max-w-none prose-p:my-3 prose-p:leading-relaxed prose-headings:font-normal prose-headings:uppercase prose-headings:tracking-[-2.05px] prose-headings:text-mistral-black dark:prose-headings:text-warm-ivory prose-a:text-mistral-orange prose-a:no-underline hover:prose-a:underline prose-li:my-1 prose-ul:my-3 prose-ol:my-3 prose-strong:font-normal prose-strong:text-mistral-black dark:prose-strong:text-warm-ivory prose-p:text-mistral-black dark:prose-p:text-warm-ivory prose-li:text-mistral-black dark:prose-li:text-warm-ivory">
          <ReactMarkdown
            components={{
              p: ({ node, children }) => <p className="font-normal">{renderWithCitations(children)}</p>,
              li: ({ node, children }) => <li className="font-normal">{renderWithCitations(children)}</li>,
              strong: ({ node, children }) => <strong className="font-normal text-[15px] tracking-tight">{children}</strong>
            }}
          >
            {content || ''}
          </ReactMarkdown>
          
          {/* Natural streaming indicator instead of a generic box */}
          {status === 'streaming' && (
            <span className="inline-block w-1.5 h-4 ml-1.5 bg-mistral-orange animate-pulse align-middle translate-y-[2px]"></span>
          )}
          
          {status === 'error' && (
            <div className="mt-5 pt-4 border-t border-red-100 flex items-center justify-between text-red-600">
              <span className="text-[12px] font-normal uppercase tracking-widest">Pipeline Interrupted</span>
              {onRetry && (
                <button 
                  onClick={onRetry}
                  className="px-4 py-2 border border-red-200 hover:bg-red-50 hover:border-red-300 text-red-700 text-[12px] font-normal uppercase tracking-[0.1em] transition-colors ml-4 shadow-[0_8px_30px_rgba(250,82,15,0.05)] active:bg-red-100 rounded-none">
                  Retry Query
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
