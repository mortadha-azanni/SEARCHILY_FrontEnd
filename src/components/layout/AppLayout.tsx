import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

export default function AppLayout() {
  return (
    <div className="flex flex-col h-[100dvh]">
      <Topbar />
      <main className="flex-1 flex overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
