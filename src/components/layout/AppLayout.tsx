import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import { MobileNavProvider } from '../../app/providers/MobileNavProvider';

export default function AppLayout() {
  return (
    <MobileNavProvider>
      <div className="flex flex-col h-[100dvh]">
        <Topbar />
        <main className="flex-1 flex overflow-hidden w-full">
          <Outlet />
        </main>
      </div>
    </MobileNavProvider>
  );
}
