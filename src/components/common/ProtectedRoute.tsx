import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ requireAdmin = false }: { requireAdmin?: boolean }) {
  // Minimal auth check for Phase 6
  // Check if a token exists to protect routes.
  const token = localStorage.getItem('searchily_auth_token');
  const role = localStorage.getItem('searchily_user_role');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
