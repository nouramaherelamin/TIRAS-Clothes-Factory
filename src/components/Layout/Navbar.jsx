import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';
import { FiArrowUp, FiShoppingBag, FiUser, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import logo from '../../assets/images/Logo.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { totalItems } = useCart();
  const { customer, logout: customerLogout, isLoggedIn } = useCustomerAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 600);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const isTransparent = isHome && !scrolled;
  const isSolid = scrolled || !isHome;

  const textColor = isTransparent ? 'rgba(255,255,255,0.92)' : 'var(--color-dark)';
  const iconColor = isTransparent ? 'rgba(255,255,255,0.9)' : 'var(--color-dark)';

  return (
    <>
      <nav
        className={`navbar-custom${isSolid ? ' navbar-solid' : ' navbar-transparent'}`}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          padding: isSolid ? '0.65rem 0' : '1.5rem 0',
          backgroundColor: isSolid ? 'rgba(253,252,251,0.97)' : 'transparent',
          backdropFilter: isSolid ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isSolid ? 'blur(16px)' : 'none',
          borderBottom: isSolid ? '1px solid rgba(0,0,0,0.06)' : 'none',
          boxShadow: isSolid ? '0 2px 24px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: '2px',
          width: `${scrollProgress}%`, backgroundColor: 'var(--color-primary)',
          transition: 'width 0.1s linear', pointerEvents: 'none',
        }} />

        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="navbar-brand-custom d-flex align-items-center" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Z7 Factory" style={{
              height: isSolid ? '34px' : '38px',
              filter: isTransparent ? 'brightness(0) invert(1)' : 'none',
              transition: 'all 0.4s ease',
            }} />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="d-none d-lg-flex list-unstyled mb-0 align-items-center gap-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link to={link.path}
                    style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.8rem',
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      color: textColor, textDecoration: 'none',
                      padding: '0.5rem 1rem', position: 'relative', transition: 'color 0.3s ease',
                    }}
                    className={`nav-link-custom${isActive ? ' nav-link-active' : ''}`}
                  >
                    {link.label}
                    <span style={{
                      position: 'absolute', bottom: 0, left: '1rem', right: '1rem', height: '1.5px',
                      backgroundColor: isTransparent ? 'rgba(255,255,255,0.7)' : 'var(--color-primary)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left', transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }} className="nav-underline" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {/* Search */}
            <button className="btn p-0 border-0 bg-transparent"
              onClick={() => setSearchOpen((open) => !open)}
              style={{ color: iconColor, transition: 'color 0.3s ease' }}
              aria-label="Search site" aria-expanded={searchOpen}>
              {searchOpen ? <FaTimes size={16} /> : <FaSearch size={16} />}
            </button>

            {/* Cart Badge */}
            <Link to="/cart"
              style={{ position: 'relative', color: iconColor, transition: 'color 0.3s ease', padding: '0 0.5rem' }}
              aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}>
              <FiShoppingBag size={18} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-2px',
                  backgroundColor: 'var(--color-primary)', color: '#fff',
                  fontSize: '0.6rem', fontWeight: 700,
                  width: '17px', height: '17px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-sans)', lineHeight: 1,
                }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Customer Account */}
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.78rem',
                  color: textColor, textTransform: 'uppercase', letterSpacing: '0.05em',
                  maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  <FiUser size={14} style={{ marginRight: '0.35rem' }} />
                  {customer?.fullName?.split(' ')[0]}
                </span>
                <button onClick={customerLogout}
                  style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.72rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: isTransparent ? 'var(--color-dark)' : '#fff',
                    backgroundColor: isTransparent ? 'rgba(255,255,255,0.9)' : 'var(--color-dark)',
                    padding: '0.45rem 1rem', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                  }}
                  aria-label="Sign out">
                  <FiLogOut size={13} /> Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login"
                  style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.78rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: textColor, textDecoration: 'none',
                    padding: '0.45rem 0.75rem', transition: 'color 0.3s ease',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}>
                  <FiUser size={14} /> Login
                </Link>
                <Link to="/register"
                  style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.78rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: isTransparent ? 'var(--color-dark)' : '#fff',
                    backgroundColor: isTransparent ? 'rgba(255,255,255,0.95)' : 'var(--color-dark)',
                    padding: '0.55rem 1.2rem', textDecoration: 'none',
                    border: '1px solid', borderColor: isTransparent ? 'rgba(255,255,255,0.95)' : 'var(--color-dark)',
                    transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}
                  className="btn-nav-cta">
                  <FiUserPlus size={13} /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="d-flex d-lg-none align-items-center gap-3">
            <Link to="/cart"
              style={{ position: 'relative', color: isTransparent ? 'white' : 'var(--color-dark)' }}
              aria-label={`Cart — ${totalItems} items`}>
              <FiShoppingBag size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  backgroundColor: 'var(--color-primary)', color: '#fff',
                  fontSize: '0.6rem', fontWeight: 700,
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="btn border-0 bg-transparent p-1"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
              style={{ color: isTransparent ? 'white' : 'var(--color-dark)', transition: 'color 0.3s ease' }}>
              {menuOpen ? <FaTimes size={22} /> : <RiMenu3Line size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="site-search" role="search" style={{ animationName: 'slideDown', animationDuration: '0.3s', animationFillMode: 'both' }}>
          <div className="container d-flex align-items-center gap-3">
            <FaSearch aria-hidden="true" color="var(--color-primary)" />
            <input autoFocus type="search" placeholder="Search the collection..." aria-label="Search the collection" />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search"><FaTimes /></button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: 'var(--color-dark)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column',
          padding: '7rem 2.5rem 3rem', overflow: 'auto',
        }}
        aria-hidden={!menuOpen}
      >
        <ul className="list-unstyled mb-0">
          {navLinks.map((link, i) => (
            <li key={link.path} style={{
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
            }}>
              <Link to={link.path} style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: '2.2rem', color: location.pathname === link.path ? 'var(--color-accent1)' : 'rgba(255,255,255,0.92)',
                textDecoration: 'none', padding: '1.1rem 0', letterSpacing: '-0.02em', transition: 'color 0.25s ease',
              }}>
                {link.label}
              </Link>
            </li>
          ))}
          {/* Cart in mobile menu */}
          <li style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: menuOpen ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${navLinks.length * 60}ms`,
          }}>
            <Link to="/cart" style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '2.2rem',
              color: 'rgba(255,255,255,0.92)', textDecoration: 'none', padding: '1.1rem 0',
              letterSpacing: '-0.02em',
            }}>
              Cart {totalItems > 0 && <span style={{ backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '0.9rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>}
            </Link>
          </li>
        </ul>

        {/* Mobile account section */}
        <div className="mt-auto pt-4" style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0, transition: 'all 0.4s ease 420ms' }}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <FiUser size={14} style={{ marginRight: '0.5rem' }} />{customer?.fullName}
              </span>
              <button onClick={customerLogout}
                style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--color-dark)', backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                <FiLogOut size={13} /> Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              }}>
                <FiUser size={14} /> Login
              </Link>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'var(--color-dark)', backgroundColor: 'var(--color-bg)',
                padding: '0.75rem 1.5rem', textDecoration: 'none',
              }}>
                <FiUserPlus size={13} /> Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Back to Top */}
      <button onClick={scrollToTop} aria-label="Back to top"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 800,
          width: '44px', height: '44px', backgroundColor: 'var(--color-dark)', color: '#fff',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: showBackToTop ? 'auto' : 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
        className="back-to-top-btn">
        <FiArrowUp size={18} />
      </button>
    </>
  );
};

export default Navbar;
