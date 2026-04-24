import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  console.log("[ProtectedRoute] isLoading:", isLoading, "isAuthenticated:", isAuthenticated, "role:", role);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    console.log("[ProtectedRoute] not authenticated — redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}