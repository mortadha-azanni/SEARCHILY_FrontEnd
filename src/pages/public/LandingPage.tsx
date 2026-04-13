import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-warm-ivory dark:bg-mistral-black text-mistral-black dark:text-warm-ivory min-h-[100dvh]">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto w-full flex flex-col items-start relative transition-colors">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-block-gold/20 dark:from-mistral-orange/10 to-transparent pointer-events-none blur-3xl"></div>
        <h1 className="text-[clamp(40px,8vw,82px)] leading-[0.95] tracking-display font-normal max-w-4xl text-mistral-black dark:text-warm-ivory w-full">
          FRONTIER AI FOR PRODUCT DISCOVERY.
        </h1>
        <p className="mt-8 text-2xl font-normal leading-[1.15] max-w-2xl text-mistral-black/80 dark:text-warm-ivory/80">
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
      </section>

      {/* Demo/Features Section */}
      <section className="px-6 py-24 bg-mistral-black dark:bg-[#111111] text-white w-full border-t border-mistral-orange transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[48px] leading-[0.95] tracking-[-1px] font-normal mb-16 uppercase">
            Built for speed and accuracy.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-1 bg-mistral-orange mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Conversational Retrieval</h3>
              <p className="text-white/70 leading-relaxed">
                Describe what you want naturally. Our engine understands complex, multi-variable requests without strict boolean logic.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-sunshine-700 mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Scraping</h3>
              <p className="text-white/70 leading-relaxed">
                We pipeline and index inventory across thousands of storefronts daily, ensuring stock checks are functionally live.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-sunshine-500 mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">LLM Ranking</h3>
              <p className="text-white/70 leading-relaxed">
                Instead of keyword overlap, we utilize dense embeddings to conceptually match and score products based on actual utility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
