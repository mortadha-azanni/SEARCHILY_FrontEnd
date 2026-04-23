import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ requireAdmin = false, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
