import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff, FiCopy, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Logo.png';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const DEMO_EMAIL = 'admin@nmefactory.com';
  const DEMO_PASSWORD = 'admin123nme';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const fillDemo = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setError('');
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 3rem',
    border: `1px solid ${hasError ? '#c0392b' : 'rgba(0,0,0,0.12)'}`,
    borderRadius: 0,
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    color: 'var(--color-dark)',
    backgroundColor: '#fdfcfb',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  });

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#1A0303',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 60% 30%, rgba(82,12,11,0.5) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
        {/* Demo Credentials Card */}
        <div style={{
          backgroundColor: 'rgba(82,12,11,0.25)', border: '1px solid rgba(82,12,11,0.5)',
          padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>
              Demo Admin Access
            </span>
            <button onClick={fillDemo}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', background: 'none', border: '1px solid rgba(255,255,255,0.15)', padding: '0.3rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}>
              Auto-fill
            </button>
          </div>

          <div style={{ marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.75rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>Email</span>
                <code style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#fff' }}>{DEMO_EMAIL}</code>
              </div>
              <button onClick={() => copyToClipboard(DEMO_EMAIL, 'email')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === 'email' ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)', padding: '2px', transition: 'color 0.2s' }}
                aria-label="Copy email">
                {copied === 'email' ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.75rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>Password</span>
                <code style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#fff' }}>{DEMO_PASSWORD}</code>
              </div>
              <button onClick={() => copyToClipboard(DEMO_PASSWORD, 'password')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === 'password' ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)', padding: '2px', transition: 'color 0.2s' }}
                aria-label="Copy password">
                {copied === 'password' ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.5 }}>
            This demo account is provided for testing the Admin Dashboard only.
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 0,
          padding: '2.5rem', boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src={logo} alt="Z7 Clothes Factory" style={{ height: '36px', marginBottom: '1rem' }} />
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-dark)', margin: '0 0 0.25rem' }}>
              Admin Login
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#888', margin: 0 }}>
              Restricted area — authorised personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="admin-login-email" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                <input
                  id="admin-login-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@nmefactory.com"
                  style={inputStyle(false)}
                  disabled={loading}
                  autoComplete="email"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="admin-login-password" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', display: 'block', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ ...inputStyle(false), paddingRight: '3rem' }}
                  disabled={loading}
                  autoComplete="current-password"
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
                />
                <button type="button" onClick={() => setShowPassword((s) => !s)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '2px', lineHeight: 1 }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#c0392b' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.9rem',
                backgroundColor: loading ? '#aaa' : 'var(--color-primary)',
                color: '#fff', border: 'none', borderRadius: 0,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = '#3d0907'; }}
              onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = loading ? '#aaa' : 'var(--color-primary)'; }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#bbb', marginTop: '1.5rem', marginBottom: 0 }}>
            This is a restricted area. Unauthorised access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
