import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Z7 Clothes Factory';
  }, []);

  return (
    <main style={{ paddingTop: '80px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container text-center">
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 700, color: 'var(--color-primary)', margin: 0, lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>
          Page not found
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', color: '#666', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2.5rem',
            backgroundColor: 'var(--color-dark)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'background-color 0.2s ease',
          }}
        >
          <FiArrowLeft size={16} /> Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
