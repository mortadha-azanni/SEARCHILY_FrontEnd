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
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-mistral-black/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 opacity-50 text-mistral-orange/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="0" ry="0" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
          <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
          <line x1="9" y1="21" x2="9" y2="9" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
        <p className="font-normal uppercase tracking-[0.15em] text-[10px] text-center">No Assets Retrieved</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-mistral-black/10 scrollbar-track-transparent">
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
