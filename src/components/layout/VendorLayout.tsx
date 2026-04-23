import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorTopbar from './VendorTopbar';
import Drawer from '../common/Drawer';

export default function VendorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-warm-ivory dark:bg-[#111] text-mistral-black dark:text-warm-ivory transition-colors">
      <div className="hidden md:flex">
        <VendorSidebar />
      </div>
      
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        side="left"
      >
        <div className="w-full h-full flex flex-col">
          <VendorSidebar />
        </div>
      </Drawer>

      <div className="flex-1 flex flex-col">
        <VendorTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-6 bg-warm-ivory dark:bg-[#111] transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
