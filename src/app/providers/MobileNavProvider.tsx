import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MobileNavContextType {
  sidebarOpen: boolean;
  resultsPanelOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setResultsPanelOpen: (open: boolean) => void;
}

const MobileNavContext = createContext<MobileNavContextType | undefined>(undefined);

export function MobileNavProvider({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [resultsPanelOpen, setResultsPanelOpen] = useState(() => window.innerWidth >= 1024);

  return (
    <MobileNavContext.Provider value={{ sidebarOpen, resultsPanelOpen, setSidebarOpen, setResultsPanelOpen }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (context === undefined) {
    throw new Error('useMobileNav must be used within a MobileNavProvider');
  }
  return context;
};
