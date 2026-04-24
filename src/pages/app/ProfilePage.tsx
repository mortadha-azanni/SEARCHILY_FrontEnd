import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 w-full text-mistral-black dark:text-warm-ivory transition-colors">
      {/* Back arrow */}
      <button
        onClick={() => navigate('/app')}
        className="flex items-center gap-2 mb-12 text-mistral-black/60 dark:text-warm-ivory/60 hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors group"
        aria-label="Back to chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span className="text-[13px] font-normal uppercase tracking-widest">Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* User Info Sidebar */}
        <div className="md:col-span-1 space-y-8 bg-white/70 dark:bg-mistral-black/40 border border-mistral-black/10 dark:border-warm-ivory/10 p-6 shadow-mistral dark:shadow-none">
          <div>
            <div className="w-24 h-24 bg-mistral-orange mb-4 flex items-center justify-center text-white text-[32px] font-normal uppercase rounded-none shadow-mistral">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-normal leading-[1.15]">{user.name}</h2>
            <p className="text-mistral-black/60 dark:text-warm-ivory/60 text-[14px] font-normal">{user.email}</p>
          </div>

          <div className="space-y-4 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10">
            <Link to="/app/profile/edit" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Edit Profile</Link>
            <Link to="/app/profile/billing" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Billing</Link>
            <Link to="/app/profile/notifications" className="block w-full text-left text-[14px] font-normal uppercase tracking-wider hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors">Notifications</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-[14px] font-normal uppercase tracking-wider text-mistral-black/60 dark:text-warm-ivory/60 hover:text-red-500 transition-colors block mt-8"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Activity / Settings Main */}
        <div className="md:col-span-2 space-y-10">
          <section>
            <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/55 dark:text-warm-ivory/55 mb-5 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-3">Usage Details</h3>
            <div className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none rounded-none transition-colors">
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
            <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/55 dark:text-warm-ivory/55 mb-5 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-3">Data Management</h3>
            <div className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none space-y-8 rounded-none transition-colors">
              <div>
                <h4 className="font-normal mb-1">Clear Chat History</h4>
                <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 mb-6 font-normal">Permanently delete all your conversational search history from this browser.</p>
                <button className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-6 py-3 text-[10px] font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors rounded-none outline-none">Delete History</button>
              </div>
              <div className="pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10">
                <h4 className="font-normal mb-1">Export Data</h4>
                <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 mb-6 font-normal">Download a JSON copy of your preferences and saved products.</p>
                <button className="bg-cream dark:bg-[#111] border border-transparent dark:border-warm-ivory/20 text-mistral-black dark:text-warm-ivory px-6 py-3 text-[10px] font-normal uppercase tracking-wider hover:bg-block-gold dark:hover:bg-mistral-orange/20 transition-colors rounded-none outline-none">Export JSON</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}