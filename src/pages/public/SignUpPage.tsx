import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthProvider';
import { api } from '../../services/api/client';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.register({ name, email, password });
      const authToken = response?.token ?? response?.access_token ?? null;
      const userRole = response?.role ?? 'user';

      if (authToken) {
        localStorage.setItem('searchily_user_email', email);
        localStorage.setItem('searchily_user_name', name);
        login(authToken, userRole);
        navigate('/app', { replace: true });
        return;
      }

      navigate('/auth', {
        replace: true,
        state: {
          message: 'Account created successfully. You can sign in now.'
        }
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Could not create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-warm-ivory dark:bg-mistral-black min-h-[100dvh] text-mistral-black dark:text-warm-ivory flex flex-col justify-center items-center py-20 px-6 transition-colors">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[56px] font-normal leading-[0.95] tracking-tight uppercase">SIGN UP</h1>
          <p className="text-mistral-black/60 dark:text-warm-ivory/60 mt-4 text-[18px]">Create your Searchily account.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 p-4 text-[14px] font-normal text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 shadow-mistral transition-colors">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-[#111] p-8 md:p-10 border border-mistral-black/10 dark:border-warm-ivory/10 shadow-mistral dark:shadow-none rounded-none transition-colors">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>

            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>

            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>

            <div>
              <label className="block text-[14px] font-normal uppercase tracking-widest text-mistral-black/70 dark:text-warm-ivory/70 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                minLength={8}
                className="w-full p-4 bg-transparent border border-mistral-black/20 dark:border-warm-ivory/20 hover:border-mistral-orange/50 dark:hover:border-mistral-orange/50 focus:border-mistral-orange dark:focus:border-mistral-orange focus:ring-1 focus:ring-mistral-orange outline-none transition-colors rounded-none font-normal text-mistral-black dark:text-warm-ivory placeholder-mistral-black/30 dark:placeholder-warm-ivory/30"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-4 bg-mistral-black dark:bg-mistral-orange text-white dark:text-mistral-black font-normal uppercase tracking-widest text-[14px] hover:bg-mistral-orange dark:hover:bg-warm-ivory transition-colors shadow-mistral rounded-none disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-mistral-black/10 dark:border-warm-ivory/10 text-center transition-colors">
            <p className="text-[14px] text-mistral-black/60 dark:text-warm-ivory/60 font-normal">
              Already have an account?{' '}
              <Link to="/auth" className="font-normal text-mistral-orange hover:text-mistral-orange/80 underline transition-colors">Sign in</Link>
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
