'use client';

import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (loginId: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = async (loginId: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login_id: loginId, login_password: password }),
    });

    if (!res.ok) {
      throw new Error('Invalid credentials');
    }

    const { token } = await res.json();
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}
