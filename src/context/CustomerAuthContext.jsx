/**
 * CustomerAuthContext.jsx
 *
 * Provides customer authentication state and actions.
 * Completely separate from AdminAuth — uses a distinct localStorage key.
 * No backend required: credentials stored in localStorage.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerAuthContext = createContext(null);

const CUSTOMER_SESSION_KEY = 'z7_customer_session';
const CUSTOMER_USERS_KEY = 'z7_customer_users';

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOMER_SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        if (session && session.email) {
          setCustomer(session);
        } else {
          localStorage.removeItem(CUSTOMER_SESSION_KEY);
        }
      }
    } catch {
      localStorage.removeItem(CUSTOMER_SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * register({ fullName, email, password })
   * Returns { success: boolean, error?: string }
   */
  const register = ({ fullName, email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem(CUSTOMER_USERS_KEY) || '[]');
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (exists) {
        return { success: false, error: 'An account with this email already exists.' };
      }
      const newUser = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem(CUSTOMER_USERS_KEY, JSON.stringify(users));
      const session = { fullName: newUser.fullName, email: newUser.email };
      localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session));
      setCustomer(session);
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  /**
   * login({ email, password })
   * Returns { success: boolean, error?: string }
   */
  const login = ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem(CUSTOMER_USERS_KEY) || '[]');
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );
      if (!user) {
        return { success: false, error: 'Incorrect email or password. Please try again.' };
      }
      const session = { fullName: user.fullName, email: user.email };
      localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session));
      setCustomer(session);
      return { success: true };
    } catch {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider
      value={{ customer, loading, register, login, logout, isLoggedIn: !!customer }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  return ctx;
};
