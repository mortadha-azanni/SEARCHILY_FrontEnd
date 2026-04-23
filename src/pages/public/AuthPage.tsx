import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [mockMessage, setMockMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simulation of a real login process
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const role = email.toLowerCase().includes('vendor') ? 'vendor' : 'admin';
      login('mock_token_123', role);
      navigate(role === 'vendor' ? '/vendor' : '/app');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or system error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    setMockMessage('Sign up flow mock: Registration form not active. Use "Sign In" with any credentials.');
  };

  return (
    <div className="bg-warm-ivory dark:bg-mistral-black min-h-[100dvh] text-mistral-black dark:text-warm-ivory flex flex-col justify-center items-center py-20 px-6 transition-colors">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[56px] font-normal leading-[0.95] tracking-tight uppercase">SIGN IN</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-4 text-[18px]">Welcome back to Searchily.</p>
        </div>

        {mockMessage && (
          <div className="mb-6 bg-cream dark:bg-[#111] p-4 text-[14px] font-normal text-mistral-black dark:text-warm-ivory shadow-mistral border border-mistral-black/10 dark:border-warm-ivory/10 flex justify-between items-start transition-colors">
            <span>{mockMessage}</span>
            <button onClick={() => setMockMessage(null)} className="text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-black dark:hover:text-warm-ivory ml-4">
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 p-4 text-[14px] font-normal text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 shadow-mistral transition-colors">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-[#111] p-8 md:p-10 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none rounded-none transition-colors">
          
          <form onSubmit={handleMockLogin} className="space-y-6">
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal peer text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal peer text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
              <div className="mt-2 text-right">
                <button 
                  type="button" 
                  onClick={() => setMockMessage('Password reset flow mock: Check your email for instructions (not really).')}
                  className="text-[12px] font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-orange transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full p-4 bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black font-normal uppercase tracking-widest text-[14px] hover:bg-mistral-orange dark:hover:bg-warm-ivory transition-colors shadow-mistral rounded-none disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>

            {/* Business Account Link */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-mistral-black/10 dark:bg-warm-ivory/10"></div>
              <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-mistral-black/30 dark:text-warm-ivory/30">or</span>
              <div className="flex-1 h-px bg-mistral-black/10 dark:bg-warm-ivory/10"></div>
            </div>

            <Link
              to="/business-account"
              className="mt-5 w-full p-4 bg-transparent text-mistral-black dark:text-warm-ivory font-normal uppercase tracking-widest text-[13px] border border-mistral-orange/40 hover:border-mistral-orange hover:bg-mistral-orange/5 dark:hover:bg-mistral-orange/10 transition-colors text-center inline-block group"
            >
              <span className="flex items-center justify-center gap-2">
                Apply for a Business Account
                <svg className="w-4 h-4 text-mistral-orange group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </form>

          <div className="mt-8 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10 text-center transition-colors">
            <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-normal">
              Don't have an account?{' '}
              <button onClick={handleMockSignup} className="font-normal text-mistral-orange hover:text-mistral-orange/80 underline transition-colors">Sign up</button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-[14px] font-normal uppercase tracking-wider text-mistral-black/50 dark:text-warm-ivory/50 hover:text-mistral-black dark:hover:text-warm-ivory transition-colors pb-1 border-b-2 border-transparent hover:border-mistral-black dark:hover:border-warm-ivory">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
