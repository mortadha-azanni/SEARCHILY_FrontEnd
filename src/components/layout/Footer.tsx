import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full px-6 py-12 bg-mistral-black text-white mt-auto border-t border-mistral-orange/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-normal tracking-tight flex items-center gap-2 mb-4">
            <div className="flex bg-gradient-to-r from-[#ffd900] via-[#ffa110] to-mistral-orange w-6 h-6"></div>
            SEARCHILY
          </Link>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            AI-powered product discovery. Find exactly what you need through natural conversation, ranked and sourced in milliseconds.
          </p>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-[10px] font-normal text-white/40 mb-4">Company</h4>
          <ul className="space-y-3 text-sm font-normal text-white/80">
            <li><Link to="/about" className="hover:text-mistral-orange transition-colors">About</Link></li>
            <li><Link to="/legal" className="hover:text-mistral-orange transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal" className="hover:text-mistral-orange transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="uppercase tracking-widest text-[10px] font-normal text-white/40 mb-4">Product</h4>
          <ul className="space-y-3 text-sm font-normal text-white/80">
            <li><Link to="/app" className="hover:text-mistral-orange transition-colors">Searchily Chat</Link></li>
            <li><Link to="/admin" className="hover:text-mistral-orange transition-colors">Console Access</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-xs text-white/40 flex flex-col md:flex-row justify-between items-center">
        <p>© 2026 Searchily. Architecture strictly dictated by Design Documentation.</p>
        <div className="flex gap-4 mt-4 md:mt-0 font-normal uppercase tracking-wider">
          <a href="#" className="hover:text-mistral-orange transition-colors">Twitter</a>
          <a href="#" className="hover:text-mistral-orange transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
