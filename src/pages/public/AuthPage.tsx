import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignUp ? '/auth/register' : '/auth/login';

      let response;

      if (isSignUp) {
        // Register uses JSON body
        response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      } else {
        // Login uses form data (OAuth2PasswordRequestForm)
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Something went wrong');
        return;
      }

      // Store token and role
      localStorage.setItem('searchily_auth_token', data.access_token);
      localStorage.setItem('searchily_user_role', 'user');

      navigate('/app');

    } catch (err) {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-warm-ivory min-h-screen text-mistral-black flex flex-col justify-center items-center py-20 px-6">
      <div className="w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-[56px] font-normal leading-[0.95] tracking-tight uppercase">
            {isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </h1>
          <p className="text-mistral-black/60 mt-4 text-lg">
            {isSignUp ? 'Create your Searchily account.' : 'Welcome back to Searchily.'}
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 border border-mistral-black/10 shadow-mistral rounded-none">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-transparent border border-[hsl(240,5.9%,90%)] focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-transparent border border-[hsl(240,5.9%,90%)] focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-mistral-black text-white font-normal uppercase tracking-wider text-sm hover:bg-mistral-orange transition-colors rounded-none disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Toggle sign in / sign up */}
          <div className="mt-8 pt-8 border-t border-mistral-black/10 text-center">
            <p className="text-sm text-mistral-black/60 font-normal">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                className="font-normal text-mistral-orange hover:text-mistral-flame underline transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm font-normal uppercase tracking-wider text-mistral-black/50 hover:text-mistral-black transition-colors pb-1 border-b-2 border-transparent hover:border-mistral-black"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}