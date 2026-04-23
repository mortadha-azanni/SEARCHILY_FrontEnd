import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessSuccessView } from '../../features/business/components/BusinessSuccessView';
import { BusinessOnboardingForm, BusinessFormData } from '../../features/business/components/BusinessOnboardingForm';

export default function BusinessAccountPage() {
  const [formData, setFormData] = useState<BusinessFormData>({
    companyName: '',
    industry: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    teamSize: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return <BusinessSuccessView companyName={formData.companyName} email={formData.email} />;
  }

  return (
    <div className="bg-warm-ivory dark:bg-mistral-black min-h-[100dvh] text-mistral-black dark:text-warm-ivory flex flex-col items-center py-20 px-6 transition-colors">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cream dark:bg-[#111] border border-mistral-black/10 dark:border-warm-ivory/10 px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-mistral-orange"></div>
            <span className="text-[12px] font-normal uppercase tracking-widest text-mistral-black/60 dark:text-warm-ivory/60">For Teams & Enterprises</span>
          </div>
          <h1 className="text-[clamp(36px,6vw,56px)] font-normal leading-[0.95] tracking-tight uppercase">
            BUSINESS ACCOUNT
          </h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-4 text-[18px] max-w-md mx-auto leading-relaxed">
            Unlock dedicated API access, team management, and priority support for your organization.
          </p>
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'API Access', desc: 'Dedicated endpoints' },
            { label: 'Team Seats', desc: 'Unlimited members' },
            { label: 'Priority Support', desc: '24/7 dedicated line' },
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-[#111] border border-mistral-black/10 dark:border-warm-ivory/10 p-5 transition-colors group hover:border-mistral-orange/30">
              <div className="w-8 h-0.5 bg-mistral-orange mb-3 group-hover:w-12 transition-all duration-300"></div>
              <p className="text-[14px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory">{feature.label}</p>
              <p className="text-[12px] text-mistral-black/50 dark:text-warm-ivory/50 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Component */}
        <BusinessOnboardingForm 
          formData={formData} 
          onChange={handleChange} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />

        {/* Footer Link */}
        <div className="mt-8 text-center flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/auth" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-black dark:hover:text-warm-ivory transition-colors pb-1 border-b-2 border-transparent hover:border-mistral-black dark:hover:border-warm-ivory">
            ← Back to Sign In
          </Link>
          <Link to="/" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-black dark:hover:text-warm-ivory transition-colors pb-1 border-b-2 border-transparent hover:border-mistral-black dark:hover:border-warm-ivory">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
