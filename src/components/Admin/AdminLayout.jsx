import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiPackage,
  FiSettings,
  FiFileText,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronRight,
  FiExternalLink,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Logo.png';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: FiGrid, exact: true },
  { label: 'Products', path: '/admin/products', icon: FiPackage },
  { label: 'Services', path: '/admin/services', icon: FiSettings },
  { label: 'Blog', path: '/admin/blog', icon: FiFileText },
  { label: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const currentLabel = navItems.find((i) => isActive(i))?.label || 'Admin';

  const SidebarContent = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div
        style={{
          padding: '1.5rem 1.5rem 1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={logo}
          alt="Z7 Clothes Factory"
          style={{ height: '28px', filter: 'brightness(0) invert(1)' }}
        />
        <button
          className="d-lg-none"
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '4px' }}
          aria-label="Close menu"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* User info */}
      {user && (
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '0',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.82rem',
              flexShrink: 0,
            }}
          >
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.name || 'Admin'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.4)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.email}
            </div>
          </div>
        </div>
      )}

      {/* Label */}
      <div style={{ padding: '1rem 1.5rem 0.5rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Navigation
        </span>
      </div>

      {/* Nav */}
      <nav aria-label="Admin navigation" style={{ flex: 1, padding: '0.5rem 0.75rem', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0',
                marginBottom: '2px',
                backgroundColor: active ? 'var(--color-primary)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontWeight: active ? 600 : 400,
                fontSize: '0.88rem',
                transition: 'all 0.2s ease',
              }}
              className="admin-nav-item"
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={17} />
              {item.label}
              {active && (
                <FiChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            padding: '0.6rem 1rem',
            borderRadius: '0',
            transition: 'all 0.2s ease',
            marginBottom: '2px',
          }}
          className="admin-footer-link"
        >
          <FiExternalLink size={14} />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            padding: '0.6rem 1rem',
            borderRadius: '0',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
            textAlign: 'left',
          }}
          className="admin-footer-link"
        >
          <FiLogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f4f3f1',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Desktop Sidebar */}
      <aside
        className="d-none d-lg-flex flex-column"
        style={{
          width: '240px',
          flexShrink: 0,
          backgroundColor: '#1A0303',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '260px',
              backgroundColor: '#1A0303',
              height: '100%',
              flexShrink: 0,
            }}
          >
            <SidebarContent />
          </div>
          <div
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(false)}
            role="button"
            aria-label="Close sidebar"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            padding: '0 1.5rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <button
              className="d-lg-none"
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-dark)',
                padding: '4px',
              }}
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: 'var(--color-dark)',
              }}
            >
              {currentLabel}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user && (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: '#888',
                  display: 'none',
                }}
                className="d-none d-md-inline"
              >
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '0',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: '#666',
                transition: 'all 0.2s ease',
              }}
              className="admin-action-btn"
              title="Sign out"
            >
              <FiLogOut size={14} />
              <span className="d-none d-sm-inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="admin-main-content"
          style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
