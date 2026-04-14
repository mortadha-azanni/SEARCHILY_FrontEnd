import React from 'react';
import { Link } from 'react-router-dom';

export default function BillingPage() {
  return (
    <div className="bg-warm-ivory dark:bg-[#111] min-h-[100dvh] text-mistral-black dark:text-warm-ivory relative transition-colors">
      <div className="px-6 py-4 flex items-center justify-between border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-white dark:bg-mistral-black transition-colors">
        <Link to="/app/profile" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Profile
        </Link>
        <div className="text-xs uppercase tracking-widest font-normal text-mistral-black/50 dark:text-warm-ivory/50">Billing</div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 w-full">
        <h1 className="text-[clamp(32px,8vw,64px)] font-normal leading-[0.95] tracking-display uppercase mb-12 break-words">
          BILLING & PLANS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Plan */}
          <section className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none transition-colors">
            <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6">Current Subscription</h3>
            <div className="mb-8">
              <span className="text-3xl font-normal">Free Tier</span>
              <p className="mt-2 text-mistral-black/60 dark:text-warm-ivory/60 text-sm">You are currently on the limited free plan.</p>
            </div>
            <ul className="space-y-4 mb-10 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-mistral-orange"></div>
                50 searches per month
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-mistral-orange"></div>
                Standard search speed
              </li>
              <li className="flex items-center gap-2 opacity-40">
                <div className="w-1.5 h-1.5 bg-mistral-black/20 dark:bg-warm-ivory/20"></div>
                Multi-retailer price tracking (Pro)
              </li>
            </ul>
            <button className="w-full bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black py-4 text-xs font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors">
              Upgrade to Pro
            </button>
          </section>

          {/* Payment Method */}
          <section className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none transition-colors">
            <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 border border-mistral-black/10 dark:border-warm-ivory/10 mb-8">
              <div className="w-12 h-8 bg-mistral-black/5 dark:bg-warm-ivory/5 flex items-center justify-center font-mono text-[10px] tracking-tighter">VISA</div>
              <div>
                <p className="text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-mistral-black/40 dark:text-warm-ivory/40">Expires 12/28</p>
              </div>
            </div>
            <button className="text-xs font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 hover:text-mistral-orange transition-colors">
              Update Payment Method
            </button>
          </section>

          {/* Billing History */}
          <section className="md:col-span-2 bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none transition-colors">
            <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-6 border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-4">Invoices</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-mistral-black/5 dark:border-warm-ivory/5 last:border-0">
                  <div>
                    <p className="text-sm">Invoice #SHY-00{i}</p>
                    <p className="text-xs text-mistral-black/40 dark:text-warm-ivory/40">April {15 - i}, 2026</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-normal">$0.00</span>
                    <button className="text-[10px] font-normal uppercase tracking-widest text-mistral-orange hover:underline">PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
