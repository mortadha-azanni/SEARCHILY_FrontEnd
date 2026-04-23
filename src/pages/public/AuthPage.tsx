import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err && typeof err === 'object') {
    const maybeError = err as { message?: string; response?: { data?: { message?: string } } };
    return maybeError.response?.data?.message ?? maybeError.message ?? fallback;
  }
  return fallback;
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [mockMessage, setMockMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Use the actual backend API for authentication
      const response = await api.login({ email, password });
      
      // Update global context & local storage using context's login method
      login(response.token, response.role);
      
      navigate('/app');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Invalid credentials or system error. Please try again.'));
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
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal peer text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {/* Divider */}
          <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-mistral-black/10"></div>
          <span className="text-[12px] uppercase tracking-widest text-mistral-black/40">or</span>
          <div className="flex-1 h-px bg-mistral-black/10"></div>
          </div>

          {/* Google OAuth Button */}

          <a href="http://localhost:8000/auth/google"
          className="w-full py-4 border border-mistral-black/20 text-mistral-black font-normal uppercase tracking-wider text-sm hover:border-mistral-orange transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
          
            Continue with Google
            </a>
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
