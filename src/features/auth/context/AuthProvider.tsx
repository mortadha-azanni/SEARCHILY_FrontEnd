import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem('searchily_auth_token');
  });
  
  const [role, setRoleState] = useState<string | null>(() => {
    return localStorage.getItem('searchily_user_role');
  });

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
    setTokenState(newToken);
    setRoleState(newRole);
    localStorage.setItem('searchily_auth_token', newToken);
    localStorage.setItem('searchily_user_role', newRole);
  };

  const logout = () => {
    setTokenState(null);
    setRoleState(null);
    localStorage.removeItem('searchily_auth_token');
    localStorage.removeItem('searchily_user_role');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated }}>
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
