import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-warm-ivory dark:bg-mistral-black text-mistral-black dark:text-warm-ivory min-h-[100dvh]">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-48 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between relative transition-colors overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-block-gold/20 dark:from-mistral-orange/10 to-transparent pointer-events-none blur-3xl"></div>
        
        <div className="z-10 max-w-2xl">
          <h1 className="text-[clamp(40px,8vw,82px)] leading-[0.95] tracking-display font-normal text-mistral-black dark:text-warm-ivory w-full">
            FRONTIER AI FOR PRODUCT DISCOVERY.
          </h1>
          <p className="mt-8 text-2xl font-normal leading-[1.15] text-mistral-black/80 dark:text-warm-ivory/80">
            Search less. Find more. We combine localized scraping with advanced LLM ranking into one monolithic conversational interface.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/auth" className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black p-[12px] font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors text-center inline-block">
              Get Started
            </Link>
            <Link to="/about" className="bg-cream dark:bg-mistral-black/50 text-mistral-black dark:text-warm-ivory p-[12px] font-normal uppercase tracking-wider text-[14px] hover:bg-block-gold dark:hover:bg-mistral-orange/20 border border-mistral-black/10 dark:border-warm-ivory/10 transition-colors text-center inline-block">
              Read The Docs
            </Link>
          </div>
        </div>

        {/* Hero Visual - Added abstract pattern */}
        <div className="hidden lg:flex relative z-0 w-1/3 aspect-square items-center justify-center opacity-20 dark:opacity-30">
          <div className="absolute w-full h-full bg-gradient-to-tr from-mistral-orange via-block-gold to-sunshine-500 blur-[80px]"></div>
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 animate-pulse">
            <path d="M10 10 H90 V90 H10 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 20 H80 V80 H20 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M30 30 H70 V70 H30 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M40 40 H60 V60 H40 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 0 V100 M0 50 H100" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
          </svg>
        </div>
      </section>

      {/* Demo/Features Section */}
      <section className="px-6 py-24 bg-mistral-black dark:bg-[#111] text-white w-full border-t border-mistral-orange transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[48px] leading-[0.95] tracking-[-1px] font-normal mb-16 uppercase">
            Built for speed and accuracy.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-1 bg-mistral-orange mb-6"></div>
              <h3 className="text-2xl font-normal mb-4">Conversational Retrieval</h3>
              <p className="text-warm-ivory/70 leading-relaxed">
                Describe what you want naturally. Our engine understands complex, multi-variable requests without strict boolean logic.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-sunshine-700 mb-6"></div>
              <h3 className="text-2xl font-normal mb-4">Real-Time Scraping</h3>
              <p className="text-warm-ivory/70 leading-relaxed">
                We pipeline and index inventory across thousands of storefronts daily, ensuring stock checks are functionally live.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-sunshine-500 mb-6"></div>
              <h3 className="text-2xl font-normal mb-4">LLM Ranking</h3>
              <p className="text-warm-ivory/70 leading-relaxed">
                Instead of keyword overlap, we utilize dense embeddings to conceptually match and score products based on actual utility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
