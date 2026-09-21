import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { getProducts } from '../data/dataStore';

const CATEGORIES = ['All', 'Garments', 'Denim', 'Formal Wear', 'Casual Wear', 'Leather', 'Accessories'];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const products = getProducts();
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
    else setCategory('All');
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    let result = products;
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [category, search]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      <section style={{ backgroundColor: '#FAF9F6', padding: '6rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative z-2">
          <div className="row text-center">
            <div className="col-lg-8 mx-auto reveal-up">
              <span className="d-inline-flex align-items-center justify-content-center mb-3 w-100" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Product Catalogue
              </span>
              <h1 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: '1' }}>
                SHOP OUR
              </h1>
              <h1 className="editorial-italic mb-0" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Collections
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: '80px', zIndex: 100 }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 py-3">
            <div
              style={{
                display: 'flex',
                gap: 0,
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                flexShrink: 0,
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderBottom: `2px solid ${category === cat ? 'var(--color-primary)' : 'transparent'}`,
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: category === cat ? 700 : 500,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: category === cat ? 'var(--color-primary)' : '#777',
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

            <div style={{ position: 'relative', minWidth: '240px' }}>
              <FiSearch
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: '#FAF9F6',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  borderRadius: '4px',
                  color: 'var(--color-dark)',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0 7rem', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <p className="font-sans fw-bold mb-4" style={{ fontSize: '0.8rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0', color: '#999' }} className="reveal-up">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>No products match your search.</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setSearchParams({}); }}
                className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-4 py-2 transition-all hover-scale border-0 mt-3"
                style={{ backgroundColor: 'var(--color-dark)', borderRadius: '4px', fontSize: '0.8rem' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row gy-5 gx-4">
              {filtered.map((product, i) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-12 reveal-up" key={product.id} style={{ animationDelay: `${(i % 12) * 50}ms` }}>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}
                    className="shadow-sm group-hover-zoom transition-all hover-scale"
                  >
                    <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '320px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          className="transition-all"
                        />
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(26,3,3,0.1)', opacity: 0, transition: '0.3s' }} className="product-overlay" />
                      </Link>
                      {product.featured && (
                        <span
                          className="badge font-sans text-uppercase letter-spacing-1"
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            backgroundColor: 'var(--color-primary)',
                            color: '#fff',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.4rem 0.8rem',
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--color-primary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {product.category}
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: 'var(--color-dark)',
                          marginBottom: '0.75rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {product.name}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', flex: 1, margin: '0 0 1.5rem' }}>
                        {product.description}
                      </p>
                      <Link
                        to={`/product/${product.id}`}
                        className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 hover-arrow"
                        style={{
                          fontSize: '0.8rem',
                          width: 'fit-content',
                        }}
                      >
                        View Details <FiArrowRight size={14} className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Shop;
