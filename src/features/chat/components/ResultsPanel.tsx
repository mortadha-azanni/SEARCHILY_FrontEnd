import React from 'react';
import ProductList from '../../product/components/ProductList';
import { Product } from '../../../types';

export default function ResultsPanel({ 
  products,
  onProductSelect,
  isSearching
}: { 
  products: Product[],
  onProductSelect: (p: Product) => void,
  isSearching?: boolean
}) {
  return (
    <aside 
      className="flex flex-col bg-white dark:bg-mistral-black border-l border-mistral-black/10 dark:border-warm-ivory/20 relative shadow-mistral dark:shadow-none w-full h-full md:w-[350px] lg:w-[400px] shrink-0 transition-colors duration-200"
    >
      <div className="h-14 shrink-0 flex items-center px-4 border-b border-mistral-black/10 dark:border-warm-ivory/20 bg-cream dark:bg-mistral-black font-normal uppercase tracking-widest text-mistral-black/80 dark:text-warm-ivory/80 text-xs transition-colors duration-200">
        {isSearching ? "Searching..." : products.length > 0 ? `Found ${products.length} Products` : "Products"}
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
