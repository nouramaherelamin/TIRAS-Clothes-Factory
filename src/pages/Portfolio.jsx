import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/dataStore';

const CATEGORIES = ['All', 'Garments', 'Denim', 'Formal Wear', 'Casual Wear', 'Leather', 'Accessories'];

// Assign a layout span for masonry variety
const getSpan = (i) => {
  const patterns = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2];
  return patterns[i % patterns.length];
};

const Portfolio = () => {
  const products = getProducts();
  const [active, setActive] = useState('All');
  const [visible, setVisible] = useState(products);

  useEffect(() => {
    if (active === 'All') {
      setVisible(products);
    } else {
      setVisible(products.filter((p) => p.category === active));
    }
  }, [active]);

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      <section style={{ backgroundColor: '#FAF9F6', padding: '6rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative z-2">
          <div className="row text-center text-md-start">
            <div className="col-lg-8 reveal-up">
              <span className="d-inline-flex align-items-center justify-content-center justify-content-md-start mb-3 w-100" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Portfolio
              </span>
              <h1 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1' }}>
                OUR WORK &
              </h1>
              <h1 className="editorial-italic mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Collections
              </h1>
              <p className="font-sans mx-auto mx-md-0" style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '540px' }}>
                Explore our manufacturing portfolio across garments, denim, formal wear, leather goods, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: '80px', zIndex: 100 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: 0,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '1.2rem 1.5rem',
                  border: 'none',
                  borderBottom: `2px solid ${active === cat ? 'var(--color-primary)' : 'transparent'}`,
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: active === cat ? 700 : 500,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: active === cat ? 'var(--color-primary)' : '#777',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0 7rem', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          {visible.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0', color: '#999' }} className="reveal-up">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>No items found in this category.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {visible.map((product, i) => (
                <div
                  key={product.id}
                  className="reveal-up shadow-sm group-hover-zoom"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    gridRow: getSpan(i) === 2 ? 'span 2' : 'span 1',
                    cursor: 'pointer',
                    animationDelay: `${(i % 12) * 50}ms`
                  }}
                >
                  <Link to={`/product/${product.id}`} style={{ display: 'block', height: '100%' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: getSpan(i) === 2 ? '550px' : '320px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      className="transition-all"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(26,3,3,0.9) 0%, rgba(26,3,3,0) 70%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '2rem',
                        opacity: 0
                      }}
                      className="transition-all portfolio-overlay"
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                    >
                      <div className="hover-translate-up" style={{ transform: 'translateY(15px)', transition: '0.4s' }}>
                        <span className="badge bg-white text-dark px-3 py-2 mb-3 text-uppercase letter-spacing-1 font-sans">{product.category}</span>
                        <h4 className="font-sans fw-bold text-white mb-0" style={{ fontSize: '1.4rem' }}>
                          {product.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
