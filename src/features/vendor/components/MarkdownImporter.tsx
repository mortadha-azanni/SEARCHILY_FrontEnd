import React, { useRef } from 'react';
import { Product } from '../types';

interface MarkdownImporterProps {
  onImport: (products: Product[]) => void;
}

export function MarkdownImporter({ onImport }: MarkdownImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('File size exceeds the 1MB limit. Please upload a smaller file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const newProducts: Product[] = [];
      const lines = text.split('\n');

      let inTable = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && line.endsWith('|')) {
          inTable = true;
          if (line.toLowerCase().includes('| name ') || line.includes('---')) continue;

          const parts = line.split('|').map(s => s.trim()).filter(s => s);
          if (parts.length >= 4) {
            newProducts.push({
              id: `p${Date.now()}-${i}`,
              name: parts[0],
              price: parseFloat(parts[1].replace('$', '')) || 0,
              stock: parseInt(parts[2], 10) || 0,
              status: parts[3].toLowerCase().includes('inactive') ? 'Inactive' : 'Active'
            });
          }
        } else if (inTable && line === '') {
          inTable = false;
        }
      }

      if (newProducts.length > 0) {
        onImport(newProducts);
        alert(`Successfully imported ${newProducts.length} products!`);
      } else {
        alert('Could not find a valid products table in the markdown file.');
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".md"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="border border-mistral-black dark:border-warm-ivory text-mistral-black dark:text-warm-ivory px-6 py-2 text-[13px] font-normal uppercase tracking-wider hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/10 transition-colors"
      >
        Import .md
      </button>
    </>
  );
}
