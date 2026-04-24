import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import { MobileNavProvider } from '../../app/providers/MobileNavProvider';
import VerificationBanner from '../common/VerificationBanner';
import { useAuth } from '../../features/auth/context/AuthProvider';

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <MobileNavProvider>
      <div className="flex flex-col h-[100dvh]">
        <Topbar />
        {user && (
          <VerificationBanner
            email={user.email}
            emailVerified={user.email_verified ?? null}
          />
        )}
        <main className="flex-1 flex overflow-hidden w-full">
          <Outlet />
        </main>
      </div>
    </MobileNavProvider>
  );
}
