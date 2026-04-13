import os

path = 'src/app/router.tsx'
with open(path, 'r') as f:
    content = f.read()

import_str = """
// App Pages (Lazy)
const AIChatPage = React.lazy(() => import('../pages/app/AIChatPage'));
const ProfilePage = React.lazy(() => import('../pages/app/ProfilePage'));
const EditProfilePage = React.lazy(() => import('../pages/app/EditProfilePage'));
const BillingPage = React.lazy(() => import('../pages/app/BillingPage'));
const NotificationsPage = React.lazy(() => import('../pages/app/NotificationsPage'));
"""

content = content.replace(
    "// App Pages (Lazy)\nconst AIChatPage = React.lazy(() => import('../pages/app/AIChatPage'));\nconst ProfilePage = React.lazy(() => import('../pages/app/ProfilePage'));",
    import_str.strip()
)

route_str = """
          { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
          { path: 'profile/edit', element: <Suspense fallback={<PageLoader />}><EditProfilePage /></Suspense> },
          { path: 'profile/billing', element: <Suspense fallback={<PageLoader />}><BillingPage /></Suspense> },
          { path: 'profile/notifications', element: <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense> },
"""

content = content.replace(
    "          { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },",
    route_str.strip("\n")
)

with open(path, 'w') as f:
    f.write(content)
