import React, { useEffect } from 'react';
import { X } from 'lucide-react'; // Or maybe an SVG
import { createPortal } from 'react-dom';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: 'left' | 'right';
  children: React.ReactNode;
}

export default function MobileDrawer({ isOpen, onClose, direction = 'left', children }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[100] flex md:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-mistral-black/60 dark:bg-warm-ivory/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 bottom-0 w-80 max-w-[85vw] bg-warm-ivory dark:bg-mistral-black shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          direction === 'left' ? 'left-0' : 'right-0'
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-mistral-black dark:bg-warm-ivory text-warm-ivory dark:text-mistral-black rounded-none shadow-mistral hover:scale-105 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}