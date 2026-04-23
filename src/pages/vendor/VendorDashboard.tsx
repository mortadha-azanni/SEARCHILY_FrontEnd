import React from 'react';

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-normal uppercase tracking-tight text-mistral-black dark:text-warm-ivory">Vendor Dashboard</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-1">Overview of your store's performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 p-6 shadow-mistral dark:shadow-none">
          <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 mb-2">Today's Sales</h3>
          <p className="text-4xl font-normal tracking-tight text-mistral-black dark:text-warm-ivory">$450.50</p>
        </div>
        <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 p-6 shadow-mistral dark:shadow-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-mistral-orange/10 transform translate-x-8 -translate-y-8 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 mb-2">Pending Orders</h3>
          <p className="text-4xl font-normal tracking-tight text-mistral-orange dark:text-mistral-orange">3</p>
        </div>
        <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 p-6 shadow-mistral dark:shadow-none">
          <h3 className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60 mb-2">Low Stock Items</h3>
          <p className="text-4xl font-normal tracking-tight text-mistral-black dark:text-warm-ivory">2</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 p-6 shadow-mistral dark:shadow-none mt-8">
        <h2 className="text-xl font-normal tracking-tight uppercase border-b border-mistral-black/10 dark:border-warm-ivory/10 pb-4 mb-4">Recent Activity</h2>
        <div className="text-center py-12">
           <p className="text-mistral-black/50 dark:text-warm-ivory/50">Your store activity will appear here.</p>
        </div>
      </div>
    </div>
  );
}
