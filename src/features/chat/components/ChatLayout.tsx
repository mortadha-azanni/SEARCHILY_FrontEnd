import React, { useState } from 'react';
import Sidebar from '../../history/components/Sidebar';
import ChatSection from './ChatSection';
import ResultsPanel from './ResultsPanel';
import PreviewDrawer from '../../product/components/PreviewDrawer';
import { useChat } from '../hooks/useChat';
import { Product } from '../../../types';

export default function ChatLayout() {
  const { sessionId, messages, products, isLoading, error, submitQuery, retryQuery, loadSession } = useChat();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-warm-ivory text-mistral-black relative">
      <Sidebar loadSession={loadSession} currentSessionId={sessionId} />
      <ChatSection 
        messages={messages} 
        submitQuery={submitQuery} 
        isLoading={isLoading} 
        error={error} 
        retryQuery={retryQuery} 
      />
      
      {/* Resizable Divider (No Logic, UI Only, Hidden on mobile) */}
      <div 
        className="hidden md:flex w-1 bg-mistral-black/5 hover:bg-mistral-orange cursor-col-resize transition-colors flex-col justify-center items-center"
      >
        <div className="h-8 w-0.5 bg-mistral-black/20"></div>
      </div>

      <ResultsPanel products={products} onProductSelect={setSelectedProduct} />

      {/* Render the Drawer overlay conditionally */}
      {selectedProduct && (
         <PreviewDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} /> 
      )}
    </div>
  );
}
