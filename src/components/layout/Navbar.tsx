import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-warm-ivory text-mistral-black border-b border-mistral-black/10">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-normal tracking-tight flex items-center gap-2 group">
          <div className="flex bg-gradient-to-r from-[#ffd900] via-[#ffa110] to-mistral-orange w-8 h-8 group-hover:opacity-90 transition-opacity"></div>
          SEARCHILY
        </Link>
        <div className="hidden md:flex gap-6 text-sm uppercase tracking-wider font-normal">
          <Link to="/about" className="hover:text-mistral-orange transition-colors">About</Link>
          <Link to="/app" className="hover:text-mistral-orange transition-colors">Product</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/auth" className="text-sm uppercase tracking-wider font-normal hover:text-mistral-orange transition-colors">Sign In</Link>
        <Link to="/auth" className="bg-mistral-black text-white px-6 py-3 text-sm uppercase tracking-wider font-normal hover:bg-mistral-orange transition-colors">Get Started</Link>
      </div>
    </nav>
  );
}
