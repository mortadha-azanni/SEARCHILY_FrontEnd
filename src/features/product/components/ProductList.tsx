import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../../types';

export default function ProductList({ 
  products,
  onProductSelect 
}: { 
  products: Product[],
  onProductSelect: (p: Product) => void 
}) {
  if (!products || products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-mistral-black/40 dark:text-warm-ivory/40 transition-colors duration-200">
        <div className="w-12 h-1 bg-mistral-orange mb-6"></div>
        <p className="font-normal uppercase tracking-widest text-[11px] text-center">No Assets Retrieved</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-mistral-black/10 dark:scrollbar-thumb-warm-ivory/10 scrollbar-track-transparent bg-warm-ivory/50 dark:bg-mistral-black/50 transition-colors duration-200">
      {products.map((p) => (
        <ProductCard 
          key={p.id} 
          title={p.title} 
          price={p.price} 
          description={p.description} 
          image={p.image}
          url={p.url}
          source={p.source}
          onClick={() => onProductSelect(p)}
        />
      ))}
    </div>
  );
}
