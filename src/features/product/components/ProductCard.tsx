import React from 'react';

export default function ProductCard({ 
  title, 
  price, 
  description, 
  image, 
  url, 
  source,
  onClick
}: { 
  title?: string, 
  price?: string, 
  description?: string, 
  image?: string, 
  url?: string, 
  source?: string,
  onClick?: () => void
}) {
  return (
    <div 
      className="group border border-mistral-black/10 p-4 hover:border-mistral-orange transition-all duration-200 cursor-pointer bg-white hover:bg-warm-ivory relative hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(250,82,15,0.1)]"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Strict sharp container for images */}
        <div className="w-20 h-20 bg-mistral-black/5 flex-shrink-0 flex items-center justify-center text-[10px] tracking-widest text-mistral-black/40 uppercase overflow-hidden border border-mistral-black/5 group-hover:border-mistral-orange/20 transition-colors">
          {image && image !== 'No IMG' ? (
            <img src={image} alt={title || 'Product'} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300" />
          ) : (
            "No IMG"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-normal text-[18px] leading-tight line-clamp-1 text-mistral-black tracking-tighter group-hover:text-mistral-orange transition-colors">
              {title || 'Product Title'}
            </h3>
            {source && (
              <span className="text-[10px] font-normal bg-cream px-2 py-0.5 text-mistral-black uppercase tracking-widest flex-shrink-0 border border-mistral-black/10">
                {source}
              </span>
            )}
          </div>
          <p className="text-[16px] text-mistral-black mt-1.5 font-normal tracking-tight">{price || 'Pricing N/A'}</p>
          <p className="text-[14px] font-normal text-mistral-black/70 mt-2 line-clamp-2 leading-relaxed">{description || 'No description available.'}</p>
        </div>
      </div>
      
      {/* Decorative arrow on hover to simulate CTA */}
      <div className="absolute right-4 bottom-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-mistral-orange">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  );
}
