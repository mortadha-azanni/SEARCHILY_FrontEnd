import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/admin', label: 'Dashboard', exact: true },
  { path: '/admin/reports', label: 'Reports' },
  { path: '/admin/etl', label: 'ETL Pipeline' }
];

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-mistral-black text-white shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-white/10 shrink-0">
        <h2 className="text-xl font-normal tracking-tight uppercase">Admin Panel</h2>
        <p className="text-xs text-white/50 mt-1">System Management</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-none text-sm font-normal uppercase tracking-wider transition-colors ${
                isActive 
                  ? 'bg-mistral-orange text-white' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <NavLink 
          to="/"
          className="block w-full text-center px-4 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-normal uppercase tracking-wider transition-colors rounded-none"
        >
          &larr; Back to App
        </NavLink>
      </div>
    </aside>
  );
}
