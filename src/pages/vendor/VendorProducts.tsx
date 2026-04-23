import React, { useState } from 'react';
import { useVendorProducts } from '../../features/vendor/hooks/useVendorProducts';
import { ProductTable } from '../../features/vendor/components/ProductTable';
import { MarkdownImporter } from '../../features/vendor/components/MarkdownImporter';
import { ProductFormModal } from '../../features/vendor/components/ProductFormModal';
import { Product } from '../../features/vendor/types';

export default function VendorProducts() {
  const { products, addProduct, updateProduct, deleteProduct, bulkAddProducts } = useVendorProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSave = (product: Product, isEdit: boolean) => {
    if (isEdit) updateProduct(product);
    else addProduct(product);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-normal uppercase tracking-tight text-mistral-black dark:text-warm-ivory">Products</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-1">Manage your catalog and inventory.</p>
        </div>
        <div className="flex gap-4">
          <MarkdownImporter onImport={bulkAddProducts} />
          <button
            onClick={handleOpenAdd}
            className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-2 text-[13px] font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>

      <ProductTable 
        products={products} 
        onEdit={handleOpenEdit} 
        onDelete={deleteProduct} 
      />

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={productToEdit} 
        onSave={handleSave} 
      />
    </div>
  );
}

