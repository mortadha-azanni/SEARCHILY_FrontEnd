import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/vendor', label: 'Dashboard', exact: true },
  { path: '/vendor/products', label: 'Products' },
  { path: '/vendor/orders', label: 'Orders' },
  { path: '/vendor/settings', label: 'Settings' }
];

export default function VendorSidebar() {
  return (
    <aside className="flex flex-col w-full md:w-64 bg-[#111] dark:bg-mistral-black text-white shrink-0 h-[100dvh] sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-white/10 shrink-0">
        <h2 className="text-[20px] font-normal tracking-tight uppercase">Vendor Console</h2>
        <p className="text-xs text-white/50 mt-1">Store Management</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-none text-[14px] font-normal uppercase tracking-wider transition-colors ${
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
