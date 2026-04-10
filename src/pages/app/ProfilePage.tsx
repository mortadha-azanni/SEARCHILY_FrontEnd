import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignOut = () => {
    localStorage.removeItem('searchily_auth_token');
    localStorage.removeItem('searchily_user_role');
    navigate('/auth');
  };

  const handleDeleteHistory = () => {
    localStorage.removeItem('searchily_history');
    showToast('Chat history successfully deleted.');
  };

  const handleExportData = () => {
    const history = localStorage.getItem('searchily_history') || '[]';
    const exportData = {
      user: { name: 'Mock User', email: 'user@searchily.ai' },
      history: JSON.parse(history)
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'searchily_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data exported successfully.');
  };

  return (
    <div className="bg-warm-ivory min-h-screen text-mistral-black flex flex-col relative w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-mistral-black text-warm-ivory px-6 py-4 z-50 border border-mistral-black/20 text-[12px] font-normal uppercase tracking-wider shadow-sm transition-all">
          {toastMessage}
        </div>
      )}

      {/* Topbar */}
      <div className="h-[64px] px-6 flex items-center justify-between border-b border-mistral-black/10 bg-warm-ivory shrink-0 w-full">
        <Link to="/app" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Chat
        </Link>
        <div className="text-[12px] uppercase tracking-widest font-normal text-mistral-black/50">User Profile</div>
      </div>

      {/* Main Content - Full Width with proper padding */}
      <div className="flex-1 w-full p-6 md:p-12 lg:p-16">
        <h1 className="text-[32px] md:text-[48px] font-normal leading-[1] tracking-tight uppercase mb-12 border-b border-mistral-black/10 pb-6 w-full">
          Account Settings
        </h1>
        
        {/* Full Width Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 xl:gap-24 w-full">
          {/* User Info Sidebar - 1 col */}
          <div className="md:col-span-1 space-y-8 w-full">
            <div>
              <div className="w-20 h-20 bg-mistral-black mb-6 flex items-center justify-center text-warm-ivory text-[32px] font-normal uppercase shrink-0">
                U
              </div>
              <h2 className="text-[24px] font-normal uppercase tracking-wider mb-2">Mock User</h2>
              <p className="text-[14px] text-mistral-black/50 font-normal uppercase tracking-wider">user@searchily.ai</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-mistral-black/10 w-full">
              <button 
                onClick={() => showToast('Edit Profile dialog opening...')}
                className="w-full justify-start text-left bg-mistral-black/5 px-4 py-3 text-[14px] font-normal uppercase tracking-wider hover:bg-mistral-black text-mistral-black hover:text-white transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => showToast('Billing portal opening...')}
                className="w-full justify-start text-left bg-mistral-black/5 px-4 py-3 text-[14px] font-normal uppercase tracking-wider hover:bg-mistral-black text-mistral-black hover:text-white transition-colors"
              >
                Billing
              </button>
              <button 
                onClick={() => showToast('Notifications settings opening...')}
                className="w-full justify-start text-left bg-mistral-black/5 px-4 py-3 text-[14px] font-normal uppercase tracking-wider hover:bg-mistral-black text-mistral-black hover:text-white transition-colors"
              >
                Notifications
              </button>
              
              <div className="pt-8 w-full">
                <button 
                  onClick={handleSignOut}
                  className="w-full justify-start text-left px-4 py-3 text-[14px] font-normal uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Activity / Settings - 3 cols */}
          <div className="md:col-span-3 space-y-12 w-full">
            <section className="w-full">
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 mb-6 pb-2 border-b border-mistral-black/10">
                Usage Details
              </h3>
              <div className="bg-white p-8 md:p-12 border border-mistral-black/10 rounded-none shadow-sm w-full">
                <div className="flex flex-wrap justify-between items-center mb-8 pb-8 border-b border-mistral-black/10 gap-4">
                  <span className="text-[16px] font-normal uppercase tracking-wider">Current Plan</span>
                  <span className="bg-cream text-mistral-black px-4 py-2 text-[12px] font-normal uppercase tracking-wider border border-mistral-black/10">
                    Free Tier
                  </span>
                </div>
                <div className="flex justify-between items-end mb-4 gap-4">
                  <span className="text-[16px] font-normal uppercase tracking-wider text-mistral-black/70">Searches this month</span>
                  <span className="text-[32px] font-normal">14 / 50</span>
                </div>
                <div className="w-full bg-mistral-black/5 h-2 mt-4">
                  <div className="bg-mistral-orange h-full" style={{ width: '28%' }}></div>
                </div>
              </div>
            </section>
            
            <section className="w-full">
              <h3 className="text-[14px] font-normal uppercase tracking-widest text-mistral-black/50 mb-6 pb-2 border-b border-mistral-black/10">
                Data Management
              </h3>
              <div className="bg-white p-8 md:p-12 border border-mistral-black/10 rounded-none shadow-sm space-y-10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="max-w-xl">
                    <h4 className="text-[16px] font-normal uppercase tracking-wider mb-2">Clear Chat History</h4>
                    <p className="text-[14px] text-mistral-black/50">Permanently delete all conversational search history from this browser.</p>
                  </div>
                  <button 
                    onClick={handleDeleteHistory}
                    className="shrink-0 bg-mistral-black text-white px-8 py-4 text-[14px] font-normal uppercase tracking-wider hover:bg-red-600 transition-colors"
                  >
                    Delete History
                  </button>
                </div>
                
                <div className="pt-10 border-t border-mistral-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="max-w-xl">
                    <h4 className="text-[16px] font-normal uppercase tracking-wider mb-2">Export Data</h4>
                    <p className="text-[14px] text-mistral-black/50">Download a JSON copy of your preferences and saved products.</p>
                  </div>
                  <button 
                    onClick={handleExportData}
                    className="shrink-0 bg-cream border border-mistral-black/10 text-mistral-black px-8 py-4 text-[14px] font-normal uppercase tracking-wider hover:border-mistral-orange transition-colors"
                  >
                    Export JSON
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
