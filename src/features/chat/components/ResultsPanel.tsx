import React from 'react';
import ProductList from '../../product/components/ProductList';
import { Product } from '../../../types';

export default function ResultsPanel({ 
  products,
  onProductSelect 
}: { 
  products: Product[],
  onProductSelect: (p: Product) => void 
}) {
  return (
    <aside 
      className="flex flex-col bg-white border-t md:border-l md:border-t-0 border-mistral-black/10 relative shadow-mistral w-full h-[40vh] md:h-full md:w-[350px] lg:w-[400px] shrink-0 z-10"
    >
      <div className="h-14 shrink-0 flex items-center px-4 border-b border-mistral-black/10 bg-cream font-normal uppercase tracking-widest text-mistral-black/80 text-xs">
        {products.length > 0 ? `Found ${products.length} Products` : "Products"}
      </div>
      <ProductList products={products} onProductSelect={onProductSelect} />
    </aside>
  );
}
