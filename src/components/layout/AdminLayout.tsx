import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import Drawer from '../common/Drawer';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-warm-ivory dark:bg-[#111] text-mistral-black dark:text-warm-ivory transition-colors">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        side="left"
      >
        <div className="w-full h-full flex flex-col">
          <AdminSidebar />
        </div>
      </Drawer>

      <div className="flex-1 flex flex-col">
        <AdminTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 bg-warm-ivory dark:bg-[#111] transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
