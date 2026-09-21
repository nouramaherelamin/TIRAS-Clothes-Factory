import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaArrowRight } from 'react-icons/fa';
import logo from '../../assets/images/Logo.png';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A0303', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', borderTop: '4px solid var(--color-primary)' }}>
      {/* CTA Banner */}
      <div style={{ backgroundColor: '#FAF9F6', padding: '5rem 0' }}>
        <div className="container">
          <div className="row align-items-center gy-4 text-center text-lg-start">
            <div className="col-lg-8 reveal-up">
              <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                READY TO MANUFACTURE
              </h2>
              <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, color: 'var(--color-primary)' }}>
                Your Vision?
              </h2>
            </div>
            <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end reveal-up delay-100">
              <Link to="/contact"
                className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale"
                style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.9rem', gap: '0.5rem' }}>
                Get In Touch <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-5 mt-4">
        <div className="row gy-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-12 reveal-up">
            {/* Large prominent logo */}
            <img src={logo} alt="Z7 Clothes Factory"
              style={{ height: '56px', filter: 'brightness(0) invert(1)', marginBottom: '1.5rem', display: 'block' }} />
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: '320px', marginBottom: '1.75rem', fontFamily: 'var(--font-body)' }}>
              Premium textile manufacturing, garment production, and leather crafting for modern international brands. Quality driven from material to final product.
            </p>
            <div aria-label="Social channels" className="d-flex gap-3" style={{ marginBottom: '1.5rem' }}>
              <a href="https://www.linkedin.com/in/nouramaherelamin/" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease', textDecoration: 'none' }}
                className="footer-social-icon hover-scale">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://github.com/nouramaherelamin" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease', textDecoration: 'none' }}
                className="footer-social-icon hover-scale">
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-4 col-6 reveal-up delay-100">
            <h6 className="font-sans fw-bold text-white mb-4" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Company
            </h6>
            <ul className="list-unstyled mb-0">
              {[
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path} className="mb-3">
                  <Link to={path} className="text-decoration-none font-sans footer-link"
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                    onMouseOver={(e) => (e.target.style.color = '#fff')}
                    onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.55)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div className="col-lg-2 col-md-4 col-6 reveal-up delay-200">
            <h6 className="font-sans fw-bold text-white mb-4" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Products
            </h6>
            <ul className="list-unstyled mb-0">
              {[
                { label: 'Garments', cat: 'Garments' },
                { label: 'Denim', cat: 'Denim' },
                { label: 'Formal Wear', cat: 'Formal Wear' },
                { label: 'Casual Wear', cat: 'Casual Wear' },
                { label: 'Leather Goods', cat: 'Leather' },
                { label: 'Accessories', cat: 'Accessories' },
              ].map(({ label, cat }) => (
                <li key={cat} className="mb-3">
                  <Link to={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-decoration-none font-sans"
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                    onMouseOver={(e) => (e.target.style.color = '#fff')}
                    onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.55)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div className="col-lg-4 col-md-4 reveal-up delay-300">
            <h6 className="font-sans fw-bold text-white mb-4" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Resources
            </h6>
            <ul className="list-unstyled mb-4">
              {[
                { label: 'Shop Collection', path: '/shop' },
                { label: 'Production Inquiry', path: '/cart' },
                { label: 'Customer Account', path: '/login' },
              ].map(({ label, path }) => (
                <li key={path} className="mb-3">
                  <Link to={path} className="text-decoration-none font-sans"
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                    onMouseOver={(e) => (e.target.style.color = '#fff')}
                    onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.55)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h6 className="font-sans fw-bold text-white mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Start an Enquiry
            </h6>
            <p className="font-sans" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px', marginBottom: '1rem' }}>
              Tell us about your next production brief and our team will be in touch.
            </p>
            <Link to="/contact"
              className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom pb-1"
              style={{ fontSize: '0.82rem', borderColor: 'rgba(255,255,255,0.25)', gap: '0.5rem' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}>
              Contact Our Team <FaArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 pt-4 mt-5 font-sans"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div>
            <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
              © 2026 Z7 Clothes Factory. All Rights Reserved.
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>
              Designed &amp; Developed by{' '}
              <a href="https://www.linkedin.com/in/nouramaherelamin/" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => (e.target.style.color = 'var(--color-primary)')}
                onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.45)')}>
                Noura Maher Elamin
              </a>
              {' '}&bull;{' '}
              <a href="https://github.com/nouramaherelamin" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.45)')}>
                GitHub
              </a>
            </p>
          </div>

          {/* Discreet Admin link */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/admin/login"
              style={{ color: 'rgba(255,255,255,0.18)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', transition: 'color 0.2s ease' }}
              title="Admin access"
              onMouseOver={(e) => (e.target.style.color = 'rgba(255,255,255,0.4)')}
              onMouseOut={(e) => (e.target.style.color = 'rgba(255,255,255,0.18)')}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
