import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState({
    priceAlerts: true,
    weeklyDigest: false,
    security: true
  });

  return (
    <div className="bg-warm-ivory dark:bg-[#111] min-h-[100dvh] text-mistral-black dark:text-warm-ivory relative transition-colors">
      <div className="px-6 py-4 flex items-center justify-between border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-white dark:bg-mistral-black transition-colors">
        <Link to="/app/profile" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Profile
        </Link>
        <div className="text-xs uppercase tracking-widest font-normal text-mistral-black/50 dark:text-warm-ivory/50">Notifications</div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 w-full">
        <h1 className="text-[clamp(32px,8vw,64px)] font-normal leading-[0.95] tracking-display uppercase mb-12 break-words">
          NOTIFICATIONS
        </h1>

        <div className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none transition-colors">
          <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-8 pb-4 border-b border-mistral-black/10 dark:border-warm-ivory/10">Push & Email Preferences</h3>
          
          <div className="space-y-10">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-normal mb-1">Price Drop Alerts</h4>
                <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60">Get notified when a tracked product hits your target price.</p>
              </div>
              <button 
                onClick={() => setPrefs({...prefs, priceAlerts: !prefs.priceAlerts})}
                className={`w-12 h-6 flex items-center p-1 transition-colors ${prefs.priceAlerts ? 'bg-mistral-orange' : 'bg-mistral-black/10 dark:bg-warm-ivory/10'}`}
              >
                <div className={`w-4 h-4 bg-white transition-transform ${prefs.priceAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-normal mb-1">Weekly Discovery Digest</h4>
                <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60">A curated list of products based on your recent AI searches.</p>
              </div>
              <button 
                onClick={() => setPrefs({...prefs, weeklyDigest: !prefs.weeklyDigest})}
                className={`w-12 h-6 flex items-center p-1 transition-colors ${prefs.weeklyDigest ? 'bg-mistral-orange' : 'bg-mistral-black/10 dark:bg-warm-ivory/10'}`}
              >
                <div className={`w-4 h-4 bg-white transition-transform ${prefs.weeklyDigest ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-normal mb-1">Security & Account</h4>
                <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60">Critical updates regarding your login and subscription status.</p>
              </div>
              <button 
                onClick={() => setPrefs({...prefs, security: !prefs.security})}
                className={`w-12 h-6 flex items-center p-1 transition-colors ${prefs.security ? 'bg-mistral-orange' : 'bg-mistral-black/10 dark:bg-warm-ivory/10'}`}
              >
                <div className={`w-4 h-4 bg-white transition-transform ${prefs.security ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10">
            <button className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-8 py-4 text-xs font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
