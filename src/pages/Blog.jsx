import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getBlogPosts } from '../data/dataStore';

const Blog = () => {
  const blogPosts = getBlogPosts().filter(p => p.published !== false);
  const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];


  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);
  const featured = blogPosts[0];

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#FAF9F6', padding: '6rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-lg-8 reveal-up">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Insights &amp; Stories
              </span>
              <h1 className="mb-0" style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-dark)' }}>
                THE Z7
              </h1>
              <h1 className="editorial-italic mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Journal
              </h1>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '480px' }}>
                Manufacturing insights, industry trends, and craftsmanship stories from our production floor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <p className="font-sans fw-bold mb-4" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)' }}>
              Featured Article
            </p>
            <div className="row align-items-center gy-5">
              <div className="col-lg-7 reveal-up">
                <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                  <Link to={`/blog/${featured.id}`}>
                    <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }} className="transition-all" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 ps-lg-5 reveal-up" style={{ animationDelay: '100ms' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>{featured.category}</span>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', color: 'var(--color-dark)', marginBottom: '1.2rem', lineHeight: 1.1 }}>{featured.title}</h2>
                <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '0.8rem', fontSize: '1rem' }}>{featured.excerpt}</p>
                <p style={{ fontSize: '0.75rem', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: '1.5rem' }}>{featured.date}</p>
                <Link to={`/blog/${featured.id}`} className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase hover-arrow" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                  Read Article <FiArrowRight size={16} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + Grid */}
      <section style={{ padding: '3rem 0 7rem', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', borderBottom: '2px solid rgba(0,0,0,0.06)', marginBottom: '4rem' }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '1rem 1.4rem', border: 'none', borderBottom: `2px solid ${activeCategory === cat ? 'var(--color-primary)' : 'transparent'}`, backgroundColor: 'transparent', fontFamily: 'var(--font-sans)', fontWeight: activeCategory === cat ? 700 : 500, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: activeCategory === cat ? 'var(--color-primary)' : '#777', cursor: 'pointer', transition: 'all 0.25s ease', whiteSpace: 'nowrap', flexShrink: 0, marginBottom: '-2px' }}>
                {cat}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-5"><p className="font-sans" style={{ fontSize: '1.1rem', color: '#999' }}>No articles found in this category.</p></div>
          ) : (
            <div className="row gy-5 gx-4">
              {filtered.map((post, i) => (
                <div className="col-lg-4 col-md-6 reveal-up" key={post.id} style={{ animationDelay: `${(i % 6) * 80}ms` }}>
                  <article>
                    <div style={{ overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                      <Link to={`/blog/${post.id}`}><img src={post.image} alt={post.title} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} className="transition-all" /></Link>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>{post.category}</span>
                      <span style={{ color: '#ddd' }}>—</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em', color: 'var(--color-dark)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                      <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="blog-title-link">{post.title}</Link>
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.7', marginBottom: '1.2rem' }}>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase hover-arrow" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>
                      Read More <FiArrowRight size={14} className="ms-2" />
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
