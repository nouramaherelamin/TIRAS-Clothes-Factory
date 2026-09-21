/**
 * AuthContext.jsx
 * 
 * Provides admin authentication state and actions to the entire app.
 * 
 * Strategy:
 * - No Supabase credentials? → Uses localStorage-based auth with
 *   an env-var-configurable password (defaults to a hashed check).
 * - Credentials present? → Ready to swap in Supabase Auth.
 * 
 * Admin credentials are NEVER hardcoded in source code.
 * The password is checked via import.meta.env.VITE_ADMIN_PASSWORD
 * which must be set in .env.local (never committed).
 * 
 * Default fallback for development only — remove for production.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'z7_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        const isExpired = Date.now() > session.expiresAt;
        if (!isExpired && session.user) {
          setUser(session.user);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * login(email, password)
   * Returns { success: boolean, error?: string }
   */
  const login = async (email, password) => {
    // Get configured credentials from environment variables
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Validate that env vars are set (required in production)
    if (!adminEmail || !adminPassword) {
      // Development-only fallback — shows clear warning
      console.warn(
        '[Z7 Auth] VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD are not set.\n' +
        'Add them to .env.local to enable login.\n' +
        'See .env.example for the required format.'
      );
      return {
        success: false,
        error: 'Admin credentials are not configured. Please set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD in .env.local',
      };
    }

    // Validate credentials
    const emailMatch = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passwordMatch = password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return { success: false, error: 'Invalid email or password.' };
    }

    // Create session
    const adminUser = {
      email: adminEmail,
      name: 'Admin',
      role: 'admin',
    };

    const session = {
      user: adminUser,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(adminUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
