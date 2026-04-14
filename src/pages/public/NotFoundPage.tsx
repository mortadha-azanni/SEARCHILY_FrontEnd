import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="bg-warm-ivory dark:bg-mistral-black min-h-[100dvh] text-mistral-black dark:text-warm-ivory flex flex-col justify-center items-center py-20 px-6 transition-colors">
      <div className="text-center max-w-md">
        <div className="text-mistral-orange text-[120px] font-normal leading-none mb-8 animate-pulse">404</div>
        <h1 className="text-[40px] font-normal leading-[0.95] tracking-tight uppercase mb-4">PAGE NOT FOUND</h1>
        <p className="text-mistral-black/60 dark:text-warm-ivory/60 mb-12 text-[18px]">
          The resource you are looking for has been moved or does not exist in our index.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-8 py-4 font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors text-center inline-block">
            Return Home
          </Link>
          <Link to="/app" className="bg-cream dark:bg-mistral-black/50 text-mistral-black dark:text-warm-ivory px-8 py-4 font-normal uppercase tracking-wider text-[14px] hover:bg-block-gold dark:hover:bg-mistral-orange/20 border border-mistral-black/10 dark:border-warm-ivory/10 transition-colors text-center inline-block">
            Searchily Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
