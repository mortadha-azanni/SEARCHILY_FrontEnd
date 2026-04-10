import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminTopbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('searchily_auth_token');
    localStorage.removeItem('searchily_user_role');
    navigate('/auth');
  };

  return (
    <header className="h-[64px] shrink-0 border-b border-mistral-black/10 bg-warm-ivory flex items-center justify-between px-6 z-40 relative">
      <div className="flex items-center gap-4">
        <h1 className="text-[18px] font-normal uppercase tracking-wider text-mistral-black md:hidden">Admin</h1>
      </div>

      <div className="flex items-center gap-4 relative ml-auto">
        <div className="hidden md:flex text-right flex-col mr-4">
          <span className="text-[14px] text-mistral-black font-normal uppercase tracking-wider">System Admin</span>
          <span className="text-[12px] text-mistral-black/50 font-normal">admin@searchily.ai</span>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group"
          aria-expanded={menuOpen}
        >
          <div className="w-10 h-10 bg-mistral-black text-warm-ivory flex items-center justify-center text-[14px] uppercase border border-transparent group-hover:border-mistral-orange transition-colors">
            AD
          </div>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-cream border border-mistral-black/20 shadow-[0_16px_40px_rgba(127,99,21,0.1)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                <button 
                  onClick={handleLogout}
                  className="flex w-full text-left px-4 py-3 text-[14px] text-mistral-orange hover:bg-mistral-orange/5 transition-colors font-normal uppercase tracking-wider"
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
