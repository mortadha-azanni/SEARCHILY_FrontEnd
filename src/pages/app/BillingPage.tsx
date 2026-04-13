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
          BILLING
        </h1>
        <div className="bg-white dark:bg-mistral-black p-6 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(238,236,225,0.2)] rounded-none transition-colors">
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 font-normal">Subscription details, invoices, and payment methods flow here.</p>
        </div>
      </div>
    </div>
  );
}
