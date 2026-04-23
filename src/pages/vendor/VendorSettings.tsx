import React, { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  storeName: 'Acme Test Vendor',
  contactEmail: 'vendor@acme.com',
  phone: '+1 (555) 123-4567',
  description: 'We sell the best electronics and peripherals.'
};

export default function VendorSettings() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('searchily_vendor_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('searchily_vendor_settings', JSON.stringify(formData));
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-normal uppercase tracking-tight text-mistral-black dark:text-warm-ivory">Store Settings</h1>
        <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-1">Manage your public store profile and contact details.</p>
      </div>

      <div className="bg-white dark:bg-mistral-black border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-mistral-orange"></div>
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-mistral-black/40 dark:text-warm-ivory/40">Basic Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Support Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Business Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory text-[14px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Store Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory text-[14px] resize-none"
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black font-normal uppercase tracking-widest text-[13px] px-8 py-4 hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors"
            >
              Save Changes
            </button>
            
            {isSaved && (
              <span className="text-green-600 dark:text-green-400 text-[13px] font-normal uppercase tracking-widest flex items-center gap-2 animate-in fade-in">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Saved successfully
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
