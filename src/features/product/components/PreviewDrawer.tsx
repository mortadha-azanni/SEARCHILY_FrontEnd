import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Product } from '../../../types';

interface PreviewDrawerProps {
  product: Product;
  onClose: () => void;
}

export default function PreviewDrawer({ product, onClose }: PreviewDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === drawerRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    // Auto-focus the drawer itself on mount to trap focus
    if (drawerRef.current) {
      drawerRef.current.focus();
    }
    
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [onClose]);

  const safeHtml = DOMPurify.sanitize(product.description || 'No description available.');

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-mistral-black/20 backdrop-blur-sm lg:hidden transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
          className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white dark:bg-mistral-black border-l border-mistral-black/10 dark:border-warm-ivory/10 flex flex-col z-50 outline-none shrink-0 transition-colors shadow-2xl"
      >
        <div className="h-14 flex items-center justify-between px-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-cream dark:bg-[#111] shrink-0 transition-colors">
          <h2 id="drawer-title" className="font-normal uppercase text-xs tracking-widest text-mistral-black/80 dark:text-warm-ivory/80">Product Preview</h2>
          <button 
            onClick={onClose} 
            className="text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-orange dark:hover:text-mistral-orange py-2 -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-mistral-orange focus:ring-offset-2"
            aria-label="Close drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin bg-warm-ivory dark:bg-mistral-black transition-colors">
          <div className="w-full h-64 bg-mistral-black/5 dark:bg-warm-ivory/5 flex items-center justify-center text-mistral-black/40 dark:text-warm-ivory/40 uppercase mb-6 overflow-hidden ">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
            ) : (
               "No Image"
            )}
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl sm:text-[32px] font-normal text-mistral-black dark:text-warm-ivory tracking-tight leading-[1.15]">{product.title}</h1>
            <span className="text-[20px] font-normal text-mistral-orange ml-4 flex-shrink-0" aria-label={`Price: ${product.price}`}>
              {product.price}
            </span>
          </div>
          
          {product.source && (
            <div className="inline-block px-3 py-1 bg-cream text-mistral-black text-xs font-normal uppercase tracking-wider mb-6">
              {product.source}
            </div>
          )}
          
          <div 
            className="prose prose-sm sm:prose-base text-mistral-black/80 dark:text-warm-ivory/80 max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>
        
        <div className="p-6 border-t border-mistral-black/10 dark:border-warm-ivory/10 bg-warm-ivory dark:bg-[#111] shrink-0 transition-colors">
          <button 
            onClick={() => product.url && window.open(product.url, '_blank', 'noopener,noreferrer')}
            disabled={!product.url}
            className={`w-full py-4 font-normal uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mistral-black ${
              product.url 
                ? 'bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black hover:bg-mistral-orange dark:hover:bg-warm-ivory hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)]' 
                : 'bg-mistral-black/10 dark:bg-warm-ivory/10 text-mistral-black/40 dark:text-warm-ivory/40 cursor-not-allowed'
            }`}
            aria-disabled={!product.url}
          >
            {product.url ? 'View Retailer' : 'No Link Available'}
          </button>
        </div>
      </div>
    </>
  );
}
