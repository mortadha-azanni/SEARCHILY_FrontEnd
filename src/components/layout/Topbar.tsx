import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('searchily_auth_token');
    localStorage.removeItem('searchily_user_role');
    navigate('/auth');
  };

  return (
    <header className="h-[64px] shrink-0 border-b border-mistral-black/10 bg-warm-ivory flex items-center justify-between px-6 z-40 relative">
      <div className="flex items-center gap-8">
        <Link to="/app" className="text-[20px] font-normal tracking-[-1px] text-mistral-black hover:text-mistral-orange transition-colors">
          Searchily.AI
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[14px]">
          <Link to="/app" className="text-mistral-black/70 hover:text-mistral-black transition-colors font-normal">Chat</Link>
          <button className="text-mistral-black/30 cursor-not-allowed font-normal">Workspaces (Soon)</button>
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group"
          aria-expanded={menuOpen}
        >
          <div className="w-8 h-8 bg-mistral-black text-warm-ivory flex items-center justify-center text-[14px] uppercase border border-transparent group-hover:border-mistral-orange transition-colors">
            AD
          </div>
          <svg className={`w-4 h-4 text-mistral-black/40 group-hover:text-mistral-black transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-cream border border-mistral-black/20 shadow-[0_16px_40px_rgba(127,99,21,0.1)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-mistral-black/10">
                <p className="text-[14px] text-mistral-black font-normal">Admin User</p>
                <p className="text-[12px] text-mistral-black/60 font-normal">admin@searchily.ai</p>
              </div>
              <div className="py-2">
                <Link 
                  to="/app/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full px-4 py-2 text-[14px] text-mistral-black/70 hover:text-mistral-black hover:bg-mistral-black/5 transition-colors font-normal"
                >
                  Settings
                </Link>
                {localStorage.getItem('searchily_user_role') === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full px-4 py-2 text-[14px] text-mistral-black/70 hover:text-mistral-orange hover:bg-mistral-orange/5 transition-colors font-normal"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex w-full text-left px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-colors font-normal mt-2 border-t border-mistral-black/10 pt-2"
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
