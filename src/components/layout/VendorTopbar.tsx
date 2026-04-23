import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider' ;
import { Menu } from 'lucide-react';

interface VendorTopbarProps {
  onMenuClick?: () => void;
}

export default function VendorTopbar({ onMenuClick }: VendorTopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <header className="h-[64px] shrink-0 border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-warm-ivory dark:bg-[#111] flex items-center justify-between px-6 z-40 relative transition-colors">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden text-mistral-black dark:text-warm-ivory hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-[18px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory md:hidden">Vendor</h1>
      </div>

      <div className="flex items-center gap-4 relative ml-auto">
        <div className="hidden md:flex text-right flex-col mr-4">
          <span className="text-[12px] text-mistral-black dark:text-warm-ivory font-normal uppercase tracking-widest">{user.name}</span>
          <span className="text-[10px] text-mistral-black/50 dark:text-warm-ivory/50 font-normal">{user.email}</span>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group"
          aria-expanded={menuOpen}
        >
          <div className="w-10 h-10 bg-mistral-black dark:bg-warm-ivory text-warm-ivory dark:text-mistral-black flex items-center justify-center text-[14px] uppercase border border-transparent group-hover:border-mistral-orange dark:group-hover:border-mistral-orange transition-colors shadow-mistral dark:shadow-none">
            {user.name.charAt(0)}
          </div>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-cream dark:bg-[#1f1f1f] border border-mistral-black/20 dark:border-warm-ivory/20 shadow-mistral z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                <button 
                  onClick={handleLogout}
                  className="flex w-full text-left px-4 py-3 text-[14px] text-red-600 dark:text-mistral-orange hover:bg-red-50 dark:hover:bg-mistral-orange/10 transition-colors font-normal uppercase tracking-wider"
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
