import { useState, useEffect } from 'react';
import { Product } from '../types';

const DEFAULT_PRODUCTS: Product[] = [];

export function useVendorProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('searchily_vendor_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('searchily_vendor_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const bulkAddProducts = (newProducts: Product[]) => setProducts(prev => [...prev, ...newProducts]);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkAddProducts
  };
}
