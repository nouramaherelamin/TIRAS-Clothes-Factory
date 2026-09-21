import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import logo from '../assets/images/Logo.png';

const CustomerLogin = () => {
  const { login } = useCustomerAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const result = login({ email: form.email, password: form.password });
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#2B0A0F' }}>
      {/* Decorative background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(82,12,11,0.6) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(82,12,11,0.3) 0%, transparent 50%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '3rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <img src={logo} alt="Z7 Clothes Factory" style={{ height: '42px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2rem', color: '#fff', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              Welcome Back
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              Sign in to your Z7 account
            </p>
          </div>

          {/* Card */}
          <div style={{
            backgroundColor: '#fff',
            padding: '2.5rem',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
            borderTop: '4px solid var(--color-primary)',
          }}>
            {error && (
              <div style={{
                marginBottom: '1.5rem', padding: '0.85rem 1rem',
                backgroundColor: 'rgba(192,57,43,0.07)', border: '1px solid rgba(192,57,43,0.25)',
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#c0392b',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="login-email" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', display: 'block', marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <FiMail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={loading}
                    autoComplete="email"
                    style={{
                      width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem',
                      border: '1px solid rgba(0,0,0,0.12)', fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem', color: 'var(--color-dark)', backgroundColor: '#fdfcfb',
                      outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                      borderRadius: 0,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="login-password" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', display: 'block', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <FiLock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="current-password"
                    style={{
                      width: '100%', padding: '0.9rem 3rem 0.9rem 2.8rem',
                      border: '1px solid rgba(0,0,0,0.12)', fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem', color: 'var(--color-dark)', backgroundColor: '#fdfcfb',
                      outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                      borderRadius: 0,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '2px', lineHeight: 1 }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <button
                id="customer-login-submit"
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '1rem', backgroundColor: loading ? '#9a5a4d' : 'var(--color-primary)',
                  color: '#fff', border: 'none', borderRadius: 0, cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = '#3d0907'; }}
                onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = 'var(--color-primary)'; }}
              >
                {loading ? 'Signing In...' : (<>Sign In <FiArrowRight size={16} /></>)}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666', marginTop: '1.75rem', marginBottom: 0 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerLogin;
