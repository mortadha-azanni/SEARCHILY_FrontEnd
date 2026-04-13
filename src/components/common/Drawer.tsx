import React, { useEffect, useRef } from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side: 'left' | 'right';
  children: React.ReactNode;
}

export default function Drawer({ open, onClose, side, children }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-mistral-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        className={`relative z-50 w-[85vw] max-w-[400px] h-[100dvh] bg-cream dark:bg-mistral-black shadow-mistral flex flex-col 
          transition-transform duration-300 ease-in-out border-mistral-black/10 dark:border-warm-ivory/10
          ${side === 'left' ? 'border-r left-0 origin-left animate-in slide-in-from-left-full' : 'border-l right-0 origin-right ml-auto animate-in slide-in-from-right-full'}`
        }
      >
        <button
          onClick={onClose}
          className={`absolute top-4 z-[60] bg-warm-ivory dark:bg-mistral-black border border-mistral-black/20 dark:border-warm-ivory/20 shadow-mistral text-mistral-black dark:text-warm-ivory p-2 ${side === 'left' ? 'right-4' : 'left-4'} hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-mistral-orange`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="h-full w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
