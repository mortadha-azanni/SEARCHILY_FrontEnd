import re

# 1. Update MobileNavProvider to default to true on desktop
with open('src/app/providers/MobileNavProvider.tsx', 'r') as f:
    nav_code = f.read()

nav_code = re.sub(
    r"const \[sidebarOpen, setSidebarOpen\] = useState\(false\);\n  const \[resultsPanelOpen, setResultsPanelOpen\] = useState\(false\);",
    r'''  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [resultsPanelOpen, setResultsPanelOpen] = useState(() => window.innerWidth >= 1024);''',
    nav_code
)

with open('src/app/providers/MobileNavProvider.tsx', 'w') as f:
    f.write(nav_code)

# 2. Update Topbar to show toggles on desktop too
with open('src/components/layout/Topbar.tsx', 'r') as f:
    topbar_code = f.read()

# Replace button classes for Sidebars
topbar_code = re.sub(r'className="p-2 -ml-2.*?md:hidden"', 'className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"', topbar_code)
topbar_code = re.sub(r'className="p-2 -mr-2.*?md:hidden"', 'className="p-2 -mr-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"', topbar_code)

with open('src/components/layout/Topbar.tsx', 'w') as f:
    f.write(topbar_code)

