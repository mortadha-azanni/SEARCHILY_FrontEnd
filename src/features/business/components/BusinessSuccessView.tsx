import React from 'react';
import { Link } from 'react-router-dom';

interface BusinessSuccessViewProps {
  companyName: string;
  email: string;
}

export function BusinessSuccessView({ companyName, email }: BusinessSuccessViewProps) {
  return (
    <div className="bg-warm-ivory dark:bg-mistral-black min-h-[100dvh] text-mistral-black dark:text-warm-ivory flex flex-col justify-center items-center py-20 px-6 transition-colors">
      <div className="w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="relative mx-auto w-20 h-20 mb-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-mistral-orange to-sunshine-500 blur-xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 bg-mistral-black dark:bg-warm-ivory flex items-center justify-center">
            <svg className="w-10 h-10 text-white dark:text-mistral-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-[48px] font-normal leading-[0.95] tracking-tight uppercase mb-6">
          APPLICATION RECEIVED
        </h1>
        <p className="text-mistral-black/60 dark:text-warm-ivory/60 text-[18px] leading-relaxed mb-4">
          Thank you, <span className="text-mistral-orange font-medium">{companyName}</span>. Our team will review your business account application and get back to you within 24–48 hours.
        </p>
        <p className="text-mistral-black/40 dark:text-warm-ivory/40 text-[14px] mb-12">
          A confirmation email has been sent to {email}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black p-4 font-normal uppercase tracking-widest text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors text-center inline-block"
          >
            Back to Home
          </Link>
          <Link
            to="/auth"
            className="bg-cream dark:bg-[#111] text-mistral-black dark:text-warm-ivory p-4 font-normal uppercase tracking-widest text-[14px] hover:bg-block-gold dark:hover:bg-mistral-orange/20 border border-mistral-black/10 dark:border-warm-ivory/10 transition-colors text-center inline-block"
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
