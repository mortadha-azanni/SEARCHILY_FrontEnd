import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-warm-ivory min-h-screen text-mistral-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[clamp(3rem,6vw,82px)] font-normal leading-[0.95] tracking-display uppercase mb-12">
          ABOUT SEARCHILY
        </h1>
        
        <div className="prose prose-mistral prose-lg max-w-none space-y-8 text-xl font-normal leading-relaxed">
          <p>
            Searchily was built to solve a fundamental problem with modern e-commerce: discovering products is too much work. 
            Traditional search requires you to know exactly what keywords to use, what filters to apply, and forces you to 
            scroll through pages of irrelevant results just to find what you want.
          </p>

          <h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 tracking-tight">Our Technology</h2>
          
          <p>
            Rather than relying on basic keyword matching, Searchily leverages state-of-the-art embedding models to understand 
            the semantic meaning behind your query. When you search for "a jacket for snowy weather that looks professional," 
            we don't just look for those words. We understand the concepts of *warmth*, *winter apparel*, and *formal aesthetics*.
          </p>

          <div className="bg-cream p-8 my-12 border-l-4 border-mistral-orange shadow-[rgba(127,99,21,0.12)_-8px_16px_39px]">
            <h3 className="text-[30px] font-normal leading-[1.2] mb-4">The Pipeline</h3>
            <ul className="space-y-4 text-lg">
              <li><strong className="text-mistral-orange">1. Catalog Integration:</strong> We continuously index millions of products into high-dimensional vector spaces.</li>
              <li><strong className="text-mistral-orange">2. Semantic Retrieval:</strong> Your natural language query retrieves the closest matching items instantly.</li>
              <li><strong className="text-mistral-orange">3. LLM Ranking:</strong> An LLM reviews the candidates and ranks them, providing personalized reasoning for each recommendation.</li>
            </ul>
          </div>

          <h2 className="text-[48px] font-normal leading-[0.95] uppercase mt-16 mb-8 pt-8 border-t border-mistral-black/10 tracking-tight">Our Mission</h2>
          
          <p>
            We believe that finding the right product should feel like talking to the world's most knowledgeable store associate. 
            No more endless scrolling, no more manipulated SEO results. Just clear, ranked, and explained matches.
          </p>
        </div>
      </div>
    </div>
  );
}
