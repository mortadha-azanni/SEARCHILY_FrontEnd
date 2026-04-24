import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';
import logoPng from './logo.png';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col w-full bg-warm-ivory dark:bg-mistral-black text-mistral-black dark:text-warm-ivory min-h-[100dvh]">
      {/* Hero Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto w-full transition-colors flex flex-row">
        <div className="absolute top-0 right-0 min-w-1/2 h-full bg-gradient-to-l from-block-gold/20 dark:from-mistral-orange/10 to-transparent pointer-events-none blur-3xl"></div>
        
        <div className="z-10 max-w-2xl">
          <h1 className="text-[clamp(40px,8vw,82px)] leading-[0.95] tracking-display font-normal text-mistral-black dark:text-warm-ivory w-full">
            FRONTIER AI FOR PRODUCT DISCOVERY.
          </h1>
          <p className="mt-8 text-2xl font-normal leading-[1.15] text-mistral-black/80 dark:text-warm-ivory/80">
            Search less. Find more. We combine localized scraping with advanced LLM ranking into one monolithic conversational interface.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to={isAuthenticated ? '/app' : '/auth'} className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black p-[12px] font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors text-center inline-block">
              {isAuthenticated ? 'Open App' : 'Get Started'}
            </Link>
            <Link to="/about" className="bg-cream dark:bg-mistral-black/50 text-mistral-black dark:text-warm-ivory p-[12px] font-normal uppercase tracking-wider text-[14px] hover:bg-block-gold dark:hover:bg-mistral-orange/20 border border-mistral-black/10 dark:border-warm-ivory/10 transition-colors text-center inline-block">
              Read The Docs
            </Link>
            <br />
            
          </div>
        </div>
        

        {/* Hero Visual */}
        <div className="hidden lg:flex relative z-0 w-[42%] items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-mistral-orange via-block-gold to-sunshine-500 blur-[100px]"></div>
          <div className="relative z-10 w-full max-w-[520px] h-[295px] overflow-hidden">
            <img
              src={logoPng}
              alt="Searchily vector logo"
              className="absolute inset-x-0 top-0 h-[200%] w-full max-w-none object-cover"
            />
          </div>
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

      {/* For Business Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto w-full transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[clamp(32px,6vw,56px)] leading-[0.95] tracking-[-1px] font-normal text-mistral-black dark:text-warm-ivory mb-8 uppercase">
              Scale with enterprise power.
            </h2>
            <p className="text-lg text-mistral-black/70 dark:text-warm-ivory/70 leading-relaxed mb-8">
              Connect your commerce stack to Searchily with catalog sync, advanced reporting, and priority support.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 h-full bg-block-gold flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-normal text-mistral-black dark:text-warm-ivory mb-2">Seamless Catalog Integration</h3>
                  <p className="text-mistral-black/60 dark:text-warm-ivory/60">Sync your storefront inventory and product feeds directly into Searchily to make your catalog instantly discoverable.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 h-full bg-sunshine-500 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-normal text-mistral-black dark:text-warm-ivory mb-2">Analytics & Insights</h3>
                  <p className="text-mistral-black/60 dark:text-warm-ivory/60">Track search trends, catalog performance, and inventory shifts with business-grade reporting dashboards.</p>
                </div>
              </div>
            </div>
            <Link 
              to="/businessaccountpage" 
              className="mt-12 inline-block bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black p-[12px] font-normal uppercase tracking-wider text-[14px] hover:bg-mistral-orange dark:hover:bg-warm-ivory transition-colors shadow-mistral"
            >
              Apply for Business Account
            </Link>
          </div>
          
          <div className="relative h-96 md:h-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-mistral-orange via-block-gold to-sunshine-500 blur-[100px]"></div>
            <div className="relative z-10 w-full max-w-[520px] h-[260px] overflow-hidden">
              <img
                src={logoPng}
                alt="Searchily business logo"
                className="absolute inset-x-0 bottom-0 h-[200%] w-full max-w-none object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
