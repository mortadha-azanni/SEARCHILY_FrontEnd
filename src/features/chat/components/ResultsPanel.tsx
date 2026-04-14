import React from 'react';
import ProductList from '../../product/components/ProductList';
import { Product } from '../../../types';
import { useMobileNav } from '../../../app/providers/MobileNavProvider';

export default function ResultsPanel({ 
  products,
  onProductSelect,
  isSearching,
  className = ""
}: { 
  products: Product[],
  onProductSelect: (p: Product) => void,
  isSearching?: boolean,
  className?: string
}) {
  const { setResultsPanelOpen } = useMobileNav();

  return (
    <aside 
      className={`flex flex-col bg-warm-ivory dark:bg-mistral-black border-l border-mistral-black/10 dark:border-warm-ivory/20 relative shadow-mistral dark:shadow-none w-full h-full md:w-[350px] lg:w-[400px] shrink-0 transition-colors duration-200 ${className}`}
    >
      <div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-mistral-black/10 dark:border-warm-ivory/20 bg-cream dark:bg-mistral-black font-normal uppercase tracking-widest text-mistral-black/80 dark:text-warm-ivory/80 text-xs transition-colors duration-200">
        <span>{isSearching ? "Searching..." : products.length > 0 ? `Found ${products.length} Products` : "Products"}</span>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setResultsPanelOpen(false)}
          className="md:hidden p-2 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors"
          aria-label="Close Results"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      {isSearching ? (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-24 h-24 bg-mistral-black/10 dark:bg-warm-ivory/10 shrink-0"></div>
              <div className="flex-1 flex flex-col gap-2 py-1">
                <div className="h-4 bg-mistral-black/10 dark:bg-warm-ivory/10 w-3/4"></div>
                <div className="h-3 bg-mistral-black/10 dark:bg-warm-ivory/10 w-1/2 mt-1"></div>
                <div className="h-6 bg-mistral-black/10 dark:bg-warm-ivory/10 w-1/3 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductList products={products} onProductSelect={onProductSelect} />
      )}
    </aside>
  );
}
