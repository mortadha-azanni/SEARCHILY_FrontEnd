import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <div className="bg-warm-ivory dark:bg-[#111] min-h-[100dvh] text-mistral-black dark:text-warm-ivory relative transition-colors">
      {/* Topbar equivalent for simple back nav */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-white dark:bg-mistral-black transition-colors">
        <Link to="/app" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Chat
        </Link>
        <div className="text-xs uppercase tracking-widest font-normal text-mistral-black/50 dark:text-warm-ivory/50">User Profile</div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 w-full">
        <h1 className="text-[clamp(32px,8vw,64px)] font-normal leading-[0.95] tracking-display uppercase mb-12 break-words">
          ACCOUNT SETTINGS
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* User Info */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <div className="w-24 h-24 bg-mistral-orange mb-4 flex items-center justify-center text-white text-[32px] font-normal uppercase rounded-none">
                U
              </div>
              <h2 className="text-2xl font-normal leading-[1.15]">Mock User</h2>
              <p className="text-mistral-black/60 dark:text-warm-ivory/60 text-[14px] font-normal">user@example.com</p>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10">
              <Link to="/app/profile/edit" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Edit Profile</Link>
              <Link to="/app/profile/billing" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Billing</Link>
              <Link to="/app/profile/notifications" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Notifications</Link>
              <Link to="/" className="w-full text-left text-[14px] font-normal uppercase tracking-wider text-mistral-orange hover:text-mistral-flame dark:hover:text-mistral-flame transition-colors block mt-8">Sign Out</Link>
            </div>
          </div>
          
          {/* Activity / Settings */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-4">Usage Details</h3>
              <div className="bg-white dark:bg-mistral-black p-6 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)] rounded-none transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-normal text-[14px]">Current Plan</span>
                  <span className="bg-cream dark:bg-mistral-orange text-mistral-black dark:text-white px-3 py-1 text-xs font-normal uppercase tracking-wider rounded-none">Free Tier</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-mistral-black/70 dark:text-warm-ivory/70 font-normal text-[14px]">Searches this month</span>
                  <span className="font-normal font-mono text-[14px]">14 / 50</span>
                </div>
                <div className="w-full bg-mistral-black/10 dark:bg-warm-ivory/10 h-2 mt-4 rounded-none">
                  <div className="bg-mistral-orange h-full rounded-none" style={{ width: '28%' }}></div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-4">Data Management</h3>
              <div className="bg-white dark:bg-mistral-black p-6 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)] space-y-6 rounded-none transition-colors">
                <div>
                  <h4 className="font-normal mb-1">Clear Chat History</h4>
                  <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 mb-4 font-normal">Permanently delete all your conversational search history from this browser.</p>
                  <button className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-3 text-xs font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors rounded-none outline-none">Delete History</button>
                </div>
                <div className="pt-6 border-t border-mistral-black/10 dark:border-warm-ivory/10">
                  <h4 className="font-normal mb-1">Export Data</h4>
                  <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 mb-4 font-normal">Download a JSON copy of your preferences and saved products.</p>
                  <button className="bg-cream dark:bg-[#111] border border-transparent dark:border-warm-ivory/20 text-mistral-black dark:text-warm-ivory px-6 py-3 text-xs font-normal uppercase tracking-wider hover:bg-block-gold dark:hover:bg-mistral-orange/20 transition-colors rounded-none outline-none">Export JSON</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
