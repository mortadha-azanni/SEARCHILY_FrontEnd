import React from 'react';
import { Link } from 'react-router-dom';

export interface BusinessFormData {
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  teamSize: string;
  message: string;
}

interface BusinessOnboardingFormProps {
  formData: BusinessFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function BusinessOnboardingForm({ formData, onChange, onSubmit, isLoading }: BusinessOnboardingFormProps) {
  return (
    <div className="bg-white dark:bg-[#111] p-8 md:p-10 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none transition-colors">
      <h2 className="text-[20px] font-normal uppercase tracking-wider mb-1">Apply for Access</h2>
      <p className="text-[14px] text-mistral-black/50 dark:text-warm-ivory/50 mb-8">Fill out the form below and we'll get you set up.</p>

      <form onSubmit={onSubmit} className="space-y-6">

        {/* Company Info Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-mistral-orange"></div>
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-mistral-black/40 dark:text-warm-ivory/40">Company Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={onChange}
                placeholder="Acme Corp"
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Industry *</label>
              <select
                name="industry"
                required
                value={formData.industry}
                onChange={onChange}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory appearance-none cursor-pointer"
              >
                <option value="" className="dark:bg-mistral-black">Select industry</option>
                <option value="ecommerce" className="dark:bg-mistral-black">E-Commerce</option>
                <option value="retail" className="dark:bg-mistral-black">Retail</option>
                <option value="technology" className="dark:bg-mistral-black">Technology</option>
                <option value="finance" className="dark:bg-mistral-black">Finance</option>
                <option value="healthcare" className="dark:bg-mistral-black">Healthcare</option>
                <option value="education" className="dark:bg-mistral-black">Education</option>
                <option value="media" className="dark:bg-mistral-black">Media & Entertainment</option>
                <option value="other" className="dark:bg-mistral-black">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={onChange}
              placeholder="https://example.com"
              className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
            />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-sunshine-700"></div>
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-mistral-black/40 dark:text-warm-ivory/40">Contact Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Full Name *</label>
              <input
                type="text"
                name="contactName"
                required
                value={formData.contactName}
                onChange={onChange}
                placeholder="Jane Doe"
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Work Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onChange}
                placeholder="jane@acme.com"
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="+1 (555) 000-0000"
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
            <div>
              <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Team Size *</label>
              <select
                name="teamSize"
                required
                value={formData.teamSize}
                onChange={onChange}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory appearance-none cursor-pointer"
              >
                <option value="" className="dark:bg-mistral-black">Select size</option>
                <option value="1-10" className="dark:bg-mistral-black">1–10 people</option>
                <option value="11-50" className="dark:bg-mistral-black">11–50 people</option>
                <option value="51-200" className="dark:bg-mistral-black">51–200 people</option>
                <option value="201-1000" className="dark:bg-mistral-black">201–1,000 people</option>
                <option value="1000+" className="dark:bg-mistral-black">1,000+ people</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-sunshine-500"></div>
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-mistral-black/40 dark:text-warm-ivory/40">Additional Information</span>
          </div>

          <div>
            <label className="block text-[13px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">How do you plan to use Searchily?</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              placeholder="Tell us about your use case, expected query volume, and any integration needs..."
              rows={4}
              className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30 resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-4 bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black font-normal uppercase tracking-widest text-[14px] hover:bg-mistral-orange dark:hover:bg-warm-ivory transition-colors shadow-mistral rounded-none disabled:opacity-50 mt-4"
        >
          {isLoading ? 'Submitting Application...' : 'Submit Application'}
        </button>

        <p className="text-[12px] text-mistral-black/40 dark:text-warm-ivory/40 text-center mt-4 leading-relaxed">
          By submitting, you agree to our{' '}
          <Link to="/legal" className="text-mistral-orange hover:text-mistral-orange/80 underline transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/legal" className="text-mistral-orange hover:text-mistral-orange/80 underline transition-colors">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
}
