import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../app/providers/ThemeProvider';
import logoPng from '../../pages/public/logo.png';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-warm-ivory dark:bg-mistral-black text-mistral-black dark:text-warm-ivory border-b border-mistral-black/10 dark:border-warm-ivory/10">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 ease-out hover:scale-[1.03]">
          <div className="relative h-10 w-[72px] max-w-[72px] overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.05]">
            <img
              src={logoPng}
              alt="Searchily"
              className="absolute inset-x-0 -top-[8%] h-[180%] w-full max-w-none object-cover object-top drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            />
          </div>
        </Link>
        <div className="hidden md:flex gap-6 text-[14px] uppercase tracking-wider font-normal">
          <Link to="/about" className="hover:text-mistral-orange transition-colors">About</Link>
          <Link to="/app" className="hover:text-mistral-orange transition-colors">Product</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
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

        <Link to="/auth" className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-3 text-[14px] uppercase tracking-wider font-normal hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors">Get Started</Link>
      </div>
    </nav>
  );
}
