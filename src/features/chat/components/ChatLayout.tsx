import React, { useState } from 'react';
import Sidebar from '../../history/components/Sidebar';
import ChatSection from './ChatSection';
import ResultsPanel from './ResultsPanel';
import PreviewDrawer from '../../product/components/PreviewDrawer';
import Drawer from '../../../components/common/Drawer';
import { useChat } from '../hooks/useChat';
import { useMobileNav } from '../../../app/providers/MobileNavProvider';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Product } from '../../../types';

export default function ChatLayout() {
  const { 
    sessionId, 
    messages, 
    activeMessageId,
    setActiveMessageId,
    isLoading, 
    error, 
    submitQuery, 
    retryQuery, 
    stopGenerating,
    loadSession,
    removeSession
  } = useChat();

  const { sidebarOpen, resultsPanelOpen, setSidebarOpen, setResultsPanelOpen } = useMobileNav();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Right panel resize state
  const [rightPanelWidth, setRightPanelWidth] = useState(350);

  const activeMessage = messages.find(m => m.id === activeMessageId);
  const activeProducts = activeMessage?.products || [];

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-warm-ivory dark:bg-mistral-black text-mistral-black dark:text-warm-ivory relative">
      {/* Desktop Sidebar */}
      {sidebarOpen && !isMobile && (
        <div className="hidden md:flex shrink-0 animate-in slide-in-from-left duration-200">
          <Sidebar 
            loadSession={loadSession} 
            currentSessionId={sessionId}
            removeSession={removeSession}
          />
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && isMobile && (
        <Drawer side="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Sidebar 
            className="flex w-full h-full"
            loadSession={(id) => {
              loadSession(id);
              setSidebarOpen(false);
            }} 
            currentSessionId={sessionId}
            removeSession={removeSession}
          />
        </Drawer>
      )}

      <ChatSection 
        messages={messages} 
        submitQuery={submitQuery} 
        isLoading={isLoading} 
        error={error} 
        retryQuery={retryQuery} 
        stopGenerating={stopGenerating}
        activeMessageId={activeMessageId}
        setActiveMessageId={setActiveMessageId}
      />
      
      {/* Resizable Divider (Desktop Only) */}
      {resultsPanelOpen && !isMobile && (
        <div 
          className="hidden md:flex w-1 hover:bg-mistral-orange cursor-col-resize shrink-0 transition-colors flex-col justify-center items-center group relative z-10"
          onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startWidth = rightPanelWidth;
            
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const deltaX = startX - moveEvent.clientX;
              const newWidth = Math.max(250, Math.min(600, startWidth + deltaX));
              setRightPanelWidth(newWidth);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
              document.body.style.cursor = 'default';
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
          }}
        >
          <div className="h-8 w-1 bg-mistral-black/20 dark:bg-warm-ivory/20 group-hover:bg-mistral-orange rounded-full"></div>
        </div>
      )}

      {/* Desktop Results Panel */}
      {resultsPanelOpen && !isMobile && (
        <div 
          className="hidden md:flex shrink-0 animate-in slide-in-from-right duration-200"
          style={{ width: rightPanelWidth }}
        >
          <ResultsPanel 
            products={activeProducts} 
            onProductSelect={setSelectedProduct} 
            isSearching={isLoading && activeMessageId === messages[messages.length - 1]?.id} 
          />
        </div>
      )}

      {/* Mobile Results Drawer */}
      {resultsPanelOpen && isMobile && (
        <Drawer side="right" open={resultsPanelOpen} onClose={() => setResultsPanelOpen(false)}>
          <ResultsPanel 
            className="flex w-full h-full"
            products={activeProducts} 
            onProductSelect={(p) => {
              setSelectedProduct(p);
              setResultsPanelOpen(false);
            }} 
            isSearching={isLoading && activeMessageId === messages[messages.length - 1]?.id} 
          />
        </Drawer>
      )}

      {/* Side-Sheet Preview Drawer */}
      {selectedProduct && (
        <PreviewDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
