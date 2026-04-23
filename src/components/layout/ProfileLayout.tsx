import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import { MobileNavProvider } from '../../app/providers/MobileNavProvider';

export default function ProfileLayout() {
  return (
    <MobileNavProvider>
      <div className="flex flex-col h-[100dvh]">
        <Topbar />
        <main className="flex-1 overflow-y-auto w-full bg-warm-ivory dark:bg-[#111] transition-colors">
          <Outlet />
        </main>
      </div>
    </MobileNavProvider>
  );
}
