import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Write mock tokens to bypass ProtectedRoute
    localStorage.setItem('searchily_auth_token', 'mock_token_123');
    localStorage.setItem('searchily_user_role', 'admin'); // Grant admin access for the mock
    navigate('/app');
  };

  return (
    <div className="bg-warm-ivory min-h-screen text-mistral-black flex flex-col justify-center items-center py-20 px-6">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[56px] font-normal leading-[0.95] tracking-tight uppercase">SIGN IN</h1>
          <p className="text-mistral-black/60 mt-4 text-lg">Welcome back to Searchily.</p>
        </div>

        <div className="bg-white p-8 md:p-10 border border-mistral-black/10 shadow-mistral rounded-none">
          
          <form onSubmit={handleMockLogin} className="space-y-6">
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required
                className="w-full p-4 bg-transparent border border-[hsl(240,5.9%,90%)] focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full p-4 bg-transparent border border-[hsl(240,5.9%,90%)] focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-mistral-black text-white font-normal uppercase tracking-wider text-sm hover:bg-mistral-orange transition-colors rounded-none"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-mistral-black/10 text-center">
            <p className="text-sm text-mistral-black/60 font-normal">
              Don't have an account?{' '}
              <button onClick={(e) => { e.preventDefault(); handleMockLogin(e as any); }} className="font-normal text-mistral-orange hover:text-mistral-flame underline transition-colors">Sign up</button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-normal uppercase tracking-wider text-mistral-black/50 hover:text-mistral-black transition-colors pb-1 border-b-2 border-transparent hover:border-mistral-black">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
