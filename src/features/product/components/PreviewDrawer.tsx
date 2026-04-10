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
    // 1. Accessibility: Store previous focus to restore on close
    const previousFocus = document.activeElement as HTMLElement | null;

    // 2. Prevent backdrop scrolling & handle race conditions across multiple modals
    const currentLocks = parseInt(document.body.getAttribute('data-scroll-locks') || '0', 10);
    document.body.setAttribute('data-scroll-locks', (currentLocks + 1).toString());
    
    let originalStyle = '';
    if (currentLocks === 0) {
      originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.setAttribute('data-original-overflow', originalStyle);
      document.body.style.overflow = 'hidden';
    }

    // 3. Accessibility: Focus the drawer container on mount for screen readers
    // Using a micro-timeout ensures the DOM is fully interactive
    const focusTimeout = setTimeout(() => {
      if (drawerRef.current) {
        drawerRef.current.focus();
      }
    }, 0);

    return () => {
      clearTimeout(focusTimeout);
      
      // Restore scroll only if this is the last modal closing
      const locks = parseInt(document.body.getAttribute('data-scroll-locks') || '1', 10);
      const newLocks = locks - 1;
      
      if (newLocks <= 0) {
        document.body.removeAttribute('data-scroll-locks');
        const storedOverflow = document.body.getAttribute('data-original-overflow') || '';
        document.body.style.overflow = storedOverflow;
        document.body.removeAttribute('data-original-overflow');
      } else {
        document.body.setAttribute('data-scroll-locks', newLocks.toString());
      }

      // Restore focus
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    };
  }, []); // Run on mount/unmount

  // Handle global escape key independently to avoid losing dismissal when focus escapes the drawer
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [onClose]);

  // Handle Event Delegation cleanly with React Synthetic Events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }

    // 4. Accessibility: Focus Trapping
    if (e.key === 'Tab' && drawerRef.current) {
      // We only want to handle Tab keys for this specific modal, preventing bubbling conflicts
      e.stopPropagation();
      // FIX: Query selector heavily filters out ALL disabled states naturally
      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement || document.activeElement === drawerRef.current) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  // XSS Risk Fix: Sanitize incoming HTML descriptions
  const safeHtml = DOMPurify.sanitize(product.description || 'No description available.');

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-40 bg-mistral-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer Container */}
      <div 
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        onKeyDown={handleKeyDown}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] sm:max-w-full bg-white border-l border-mistral-black/10 shadow-2xl flex flex-col z-50 pointer-events-auto outline-none"
      >
        <div className="h-14 flex items-center justify-between px-6 border-b border-mistral-black/10 bg-cream shrink-0">
          <h2 id="drawer-title" className="font-normal uppercase text-xs tracking-widest text-mistral-black/80">Product Preview</h2>
          <button 
            onClick={onClose} 
            className="text-mistral-black/50 hover:text-mistral-orange py-2 -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-mistral-orange focus:ring-offset-2"
            aria-label="Close drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="w-full h-64 bg-mistral-black/5 flex items-center justify-center text-mistral-black/40 uppercase mb-6 overflow-hidden ">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
            ) : (
               "No Image"
            )}
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-normal text-mistral-black tracking-tight leading-tight">{product.title}</h1>
            <span className="text-xl font-normal text-mistral-orange ml-4 flex-shrink-0" aria-label={`Price: ${product.price}`}>
              {product.price}
            </span>
          </div>
          
          {product.source && (
            <div className="inline-block px-3 py-1 bg-cream text-mistral-black text-xs font-normal uppercase tracking-wider mb-6">
              {product.source}
            </div>
          )}
          
          <div 
            className="prose prose-sm sm:prose-base text-mistral-black/80 max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>
        
        <div className="p-6 border-t border-mistral-black/10 bg-warm-ivory shrink-0">
          <button 
            onClick={() => product.url && window.open(product.url, '_blank', 'noopener,noreferrer')}
            disabled={!product.url}
            className={`w-full py-4 font-normal uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mistral-black ${
              product.url 
                ? 'bg-mistral-black text-white hover:bg-mistral-orange hover:shadow-lg' 
                : 'bg-mistral-black/10 text-mistral-black/40 cursor-not-allowed'
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
