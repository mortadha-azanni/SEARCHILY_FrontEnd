import React from 'react';
import { Product } from '../types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-mistral-black/10 dark:border-warm-ivory/10">
            <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Product Name</th>
            <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Price</th>
            <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Stock</th>
            <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">Status</th>
            <th className="p-4 text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-mistral-black/50 dark:text-warm-ivory/50">No products found. Add one to get started.</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="border-b border-mistral-black/5 dark:border-warm-ivory/5 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors">
                <td className="p-4 text-[14px]">{product.name}</td>
                <td className="p-4 text-[14px]">${product.price.toFixed(2)}</td>
                <td className={`p-4 text-[14px] ${product.stock < 5 ? 'text-red-500' : ''}`}>
                  {product.stock} {product.stock < 5 && '(Low)'}
                </td>
                <td className="p-4 text-[14px]">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider ${
                    product.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-[12px] uppercase text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-orange mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-[12px] uppercase text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
