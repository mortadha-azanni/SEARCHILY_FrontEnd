import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Mock User',
    email: 'user@example.com',
    bio: 'Software engineer and AI enthusiast.'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-warm-ivory dark:bg-[#111] min-h-[100dvh] text-mistral-black dark:text-warm-ivory relative transition-colors">
      <div className="px-6 py-4 flex items-center justify-between border-b border-mistral-black/10 dark:border-warm-ivory/10 bg-white dark:bg-mistral-black transition-colors">
        <Link to="/app/profile" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black dark:text-warm-ivory hover:text-mistral-orange dark:hover:text-mistral-orange transition-colors flex items-center gap-2">
          ← Back to Profile
        </Link>
        <div className="text-xs uppercase tracking-widest font-normal text-mistral-black/50 dark:text-warm-ivory/50">Edit Profile</div>
      </div>

      <div className="max-w-2xl mx-auto py-12 px-4 md:px-6 w-full">
        <h1 className="text-[clamp(32px,8vw,64px)] font-normal leading-[0.95] tracking-display uppercase mb-12 break-words">
          EDIT PROFILE
        </h1>

        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-sm font-normal uppercase tracking-wider">
            Profile updated successfully.
          </div>
        )}

        <div className="bg-white dark:bg-mistral-black p-8 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none rounded-none transition-colors">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-2">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange dark:focus:border-mistral-orange outline-none transition-colors rounded-none font-normal"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange dark:focus:border-mistral-orange outline-none transition-colors rounded-none font-normal"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-normal uppercase tracking-widest text-mistral-black/50 dark:text-warm-ivory/50 mb-2">Bio</label>
              <textarea 
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 focus:border-mistral-orange dark:focus:border-mistral-orange outline-none transition-colors rounded-none font-normal resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                type="submit"
                disabled={isSaving}
                className="bg-mistral-black dark:bg-warm-ivory text-white dark:text-mistral-black px-8 py-4 text-xs font-normal uppercase tracking-wider hover:bg-mistral-orange dark:hover:bg-mistral-orange transition-colors rounded-none disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link 
                to="/app/profile"
                className="px-8 py-4 text-xs font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-black dark:hover:text-warm-ivory border border-mistral-black/10 dark:border-warm-ivory/10 text-center transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
