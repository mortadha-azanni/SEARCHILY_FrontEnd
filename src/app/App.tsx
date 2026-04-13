import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';
import { AuthProvider } from '../features/auth/context/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
