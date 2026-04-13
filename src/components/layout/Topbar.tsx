import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { useMobileNav } from '../../app/providers/MobileNavProvider';
import { useTheme } from '../../app/providers/ThemeProvider';

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, role } = useAuth();
  const { sidebarOpen, setSidebarOpen, resultsPanelOpen, setResultsPanelOpen } = useMobileNav();
  const { theme, setTheme } = useTheme();

  const isChatPage = location.pathname.startsWith('/app');

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-[64px] shrink-0 border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-warm-ivory dark:bg-mistral-black flex items-center justify-between px-4 md:px-6 z-40 relative">
      <div className="flex items-center gap-4 md:gap-8">
        {isChatPage && (
          <button 
            type="button"
            className="p-2 -ml-2 text-mistral-black dark:text-warm-ivory hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors focus:outline-none focus:ring-2 focus:ring-mistral-orange"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open history sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        
        <Link to="/" className="text-2xl font-normal tracking-tight flex items-center gap-2 group text-mistral-black dark:text-warm-ivory hover:text-mistral-orange transition-colors">
          <div className="flex bg-gradient-to-r from-[#ffd900] via-[#ffa110] to-mistral-orange w-8 h-8 group-hover:opacity-90 transition-opacity"></div>
          SEARCHILY
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[14px]">
          <Link to="/app" className="text-mistral-black/70 dark:text-warm-ivory/70 hover:text-mistral-black dark:hover:text-warm-ivory transition-colors font-normal uppercase">Chat</Link>
          <button className="text-mistral-black/30 dark:text-warm-ivory/30 cursor-not-allowed font-normal uppercase">Workspaces (Soon)</button>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4 relative">
        <button
          onClick={toggleTheme}
          className="p-2 text-mistral-black/60 dark:text-warm-ivory/60 hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors focus:outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {isChatPage && (
          <button 
            type="button"
            className="p-2 text-mistral-black dark:text-warm-ivory hover:text-mistral-orange hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors focus:outline-none"
            onClick={() => setResultsPanelOpen(!resultsPanelOpen)}
            aria-label="Open results panels"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </button>
        )}

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group ml-2"
          aria-expanded={menuOpen}
        >
          <div className="w-8 h-8 bg-mistral-black dark:bg-warm-ivory text-warm-ivory dark:text-mistral-black flex items-center justify-center text-[14px] uppercase border border-transparent group-hover:border-mistral-orange transition-colors">
            AD
          </div>
          <svg className={`w-4 h-4 text-mistral-black/40 dark:text-warm-ivory/40 group-hover:text-mistral-black dark:group-hover:text-warm-ivory transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 sm:right-0 sm:top-full top-14 sm:mt-2 fixed sm:absolute w-56 top-16 right-4 sm:top-auto sm:right-auto bg-cream dark:bg-mistral-black border border-mistral-black/20 dark:border-warm-ivory/20 shadow-mistral z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-mistral-black/10 dark:border-warm-ivory/10">
                <p className="text-[14px] text-mistral-black dark:text-warm-ivory font-normal">Admin User</p>
                <p className="text-[12px] text-mistral-black/60 dark:text-warm-ivory/60 font-normal">admin@searchily.ai</p>
              </div>
              <div className="py-2">
                <Link 
                  to="/app" 
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full px-4 py-2 text-[14px] text-mistral-black/70 dark:text-warm-ivory/70 hover:text-mistral-black dark:hover:text-warm-ivory hover:bg-mistral-black/5 dark:hover:bg-warm-ivory/5 transition-colors font-normal"
                >
                  Settings
                </Link>
                {role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full px-4 py-2 text-[14px] text-mistral-black/70 dark:text-warm-ivory/70 hover:text-mistral-orange hover:bg-mistral-orange/5 transition-colors font-normal"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex w-full text-left px-4 py-2 text-[14px] text-red-600 dark:text-mistral-orange hover:bg-red-50 dark:hover:bg-mistral-orange/10 transition-colors font-normal mt-2 border-t border-mistral-black/10 dark:border-warm-ivory/10 pt-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
