import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts - Outer shells imported synchronously
import PublicLayout from '../components/layout/PublicLayout';
import AppLayout from '../components/layout/AppLayout';
import ProfileLayout from '../components/layout/ProfileLayout';
import AdminLayout from '../components/layout/AdminLayout';
import VendorLayout from '../components/layout/VendorLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages (Lazy)
const LandingPage = React.lazy(() => import('../pages/public/LandingPage'));
const AboutPage = React.lazy(() => import('../pages/public/AboutPage'));
const LegalPage = React.lazy(() => import('../pages/public/LegalPage'));
const AuthPage = React.lazy(() => import('../pages/public/AuthPage'));
const BusinessAccountPage = React.lazy(() => import('../pages/public/BusinessAccountPage'));
const NotFoundPage = React.lazy(() => import('../pages/public/NotFoundPage'));

// App Pages (Lazy)
const AIChatPage = React.lazy(() => import('../pages/app/AIChatPage'));
const ProfilePage = React.lazy(() => import('../pages/app/ProfilePage'));
const EditProfilePage = React.lazy(() => import('../pages/app/EditProfilePage'));
const BillingPage = React.lazy(() => import('../pages/app/BillingPage'));
const NotificationsPage = React.lazy(() => import('../pages/app/NotificationsPage'));

// Admin Pages (Lazy)
const AdminDashboard = React.lazy(() => import('../pages/admin/AdminDashboard'));
const AdminReports = React.lazy(() => import('../pages/admin/AdminReports'));
const AdminETLPanel = React.lazy(() => import('../pages/admin/AdminETLPanel'));

// Vendor Pages (Lazy)
const VendorDashboard = React.lazy(() => import('../pages/vendor/VendorDashboard'));
const VendorProducts = React.lazy(() => import('../pages/vendor/VendorProducts'));
const VendorOrders = React.lazy(() => import('../pages/vendor/VendorOrders'));
const VendorSettings = React.lazy(() => import('../pages/vendor/VendorSettings'));

// Fallback loader for lazy chunks
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[50vh] bg-warm-ivory">
    <div className="w-8 h-8 bg-mistral-orange animate-spin rounded-none"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><LandingPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      { path: 'legal', element: <Suspense fallback={<PageLoader />}><LegalPage /></Suspense> },
      { path: 'auth', element: <Suspense fallback={<PageLoader />}><AuthPage /></Suspense> },
      { path: 'business-account', element: <Suspense fallback={<PageLoader />}><BusinessAccountPage /></Suspense> },
    ],
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><AIChatPage /></Suspense> },
        ]
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
          { path: 'edit', element: <Suspense fallback={<PageLoader />}><EditProfilePage /></Suspense> },
          { path: 'billing', element: <Suspense fallback={<PageLoader />}><BillingPage /></Suspense> },
          { path: 'notifications', element: <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense> },
        ]
      }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute requireAdmin={true} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> },
          { path: 'reports', element: <Suspense fallback={<PageLoader />}><AdminReports /></Suspense> },
          { path: 'etl', element: <Suspense fallback={<PageLoader />}><AdminETLPanel /></Suspense> },
        ]
      }
    ]
  },
  {
    path: '/vendor',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <VendorLayout />,
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><VendorDashboard /></Suspense> },
          { path: 'products', element: <Suspense fallback={<PageLoader />}><VendorProducts /></Suspense> },
          { path: 'orders', element: <Suspense fallback={<PageLoader />}><VendorOrders /></Suspense> },
          { path: 'settings', element: <Suspense fallback={<PageLoader />}><VendorSettings /></Suspense> },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>,
  },
], {
  basename: import.meta.env.BASE_URL
});
