import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: (product: Product, isEdit: boolean) => void;
}

export function ProductFormModal({ isOpen, onClose, productToEdit, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    status: 'Active'
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({ ...productToEdit });
    } else {
      setFormData({ name: '', price: 0, stock: 0, status: 'Active' });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saveProduct: Product = {
      id: productToEdit?.id || `p${Date.now()}`,
      name: formData.name || 'New Product',
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      status: formData.status as 'Active' | 'Inactive' || 'Active'
    };
    onSave(saveProduct, !!productToEdit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mistral-black/40 backdrop-blur-sm">
      <div className="bg-warm-ivory dark:bg-mistral-black w-full max-w-md shadow-mistral border border-mistral-black/10 dark:border-warm-ivory/10">
        <div className="p-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 flex justify-between items-center">
          <h2 className="text-xl font-normal uppercase tracking-tight text-mistral-black dark:text-warm-ivory">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-mistral-black/50 hover:text-mistral-black dark:text-warm-ivory/50 dark:hover:text-warm-ivory">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full p-3 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Stock</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full p-3 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
              className="w-full p-3 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-[13px] font-normal uppercase tracking-wider text-mistral-black/70 dark:text-warm-ivory/70 hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-2 text-[13px] font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
