import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-warm-ivory text-mistral-black min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto w-full flex flex-col items-start relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-block-gold/20 to-transparent pointer-events-none blur-3xl"></div>
        <h1 className="text-[56px] md:text-[82px] leading-[0.95] tracking-display font-normal max-w-4xl text-mistral-black break-words hyphens-auto w-full">
          FRONTIER AI FOR PRODUCT DISCOVERY.
        </h1>
        <p className="mt-8 text-2xl font-normal leading-tight max-w-2xl text-mistral-black/80">
          Search less. Find more. We combine localized scraping with advanced LLM ranking into one monolithic conversational interface.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/app" className="bg-mistral-black text-white px-8 py-4 font-normal uppercase tracking-wider text-sm hover:bg-mistral-orange transition-colors text-center inline-block">
            Start Searching
          </Link>
          <Link to="/about" className="bg-cream text-mistral-black px-8 py-4 font-normal uppercase tracking-wider text-sm hover:bg-[#ffe295] transition-colors text-center inline-block">
            Read The Docs
          </Link>
        </div>
      </section>

      {/* Demo/Features Section */}
      <section className="px-6 py-24 bg-mistral-black text-white w-full border-t border-mistral-orange">
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
              <div className="w-12 h-1 bg-[#ffa110] mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Scraping</h3>
              <p className="text-white/70 leading-relaxed">
                We pipeline and index inventory across thousands of storefronts daily, ensuring stock checks are functionally live.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-[#ffd900] mb-6"></div>
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
