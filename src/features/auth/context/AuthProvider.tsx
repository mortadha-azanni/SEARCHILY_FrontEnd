import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../../../services/api/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  email_verified?: boolean;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: User | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('searchily_auth_token');
  });
  
  const [role, setRoleState] = useState<string | null>(() => {
    return localStorage.getItem('searchily_user_role');
  });

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const me = await api.getMe();
      if (me?.email) {
        localStorage.setItem('searchily_user_email', me.email);
      }
      if (me?.name) {
        localStorage.setItem('searchily_user_name', me.name);
      }
      setUser({
        id: me.id,
        name: me.name,
        email: me.email,
        role: me.role ?? role ?? 'user',
        avatar: me.avatar_url,
        email_verified: me.email_verified ?? null,
      });
    } catch {
      const fallbackEmail = localStorage.getItem('searchily_user_email') ?? 'user@example.com';
      const fallbackName = localStorage.getItem('searchily_user_name') ?? fallbackEmail.split('@')[0] ?? 'User';
      const fallbackRole = role ?? localStorage.getItem('searchily_user_role') ?? 'user';

      setUser({
        id: 'fallback-user',
        name: fallbackName,
        email: fallbackEmail,
        role: fallbackRole,
        email_verified: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, role]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'searchily_auth_token') {
        setTokenState(e.newValue);
      }
      if (e.key === 'searchily_user_role') {
        setRoleState(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (newToken: string, newRole: string) => {
    localStorage.setItem('searchily_auth_token', newToken);
    localStorage.setItem('searchily_user_role', newRole);
    setTokenState(newToken);
    setRoleState(newRole);
  };

  const logout = () => {
    localStorage.removeItem('searchily_auth_token');
    localStorage.removeItem('searchily_user_role');
    setTokenState(null);
    setRoleState(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
