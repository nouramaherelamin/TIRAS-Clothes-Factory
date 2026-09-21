import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getBlogPosts } from '../data/dataStore';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogPosts = getBlogPosts().filter(p => p.published !== false);
  const post = blogPosts.find((p) => p.id === parseInt(id));
  const postIndex = blogPosts.findIndex((p) => p.id === parseInt(id));
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  if (!post) {
    return (
      <main style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center', padding: '10rem 1rem', backgroundColor: '#FAF9F6' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', color: 'var(--color-dark)', fontWeight: '800' }}>Article not found</h2>
        <Link to="/blog" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase px-5 py-3 transition-all mt-4" style={{ backgroundColor: 'var(--color-dark)', borderRadius: '4px', fontSize: '0.9rem', textDecoration: 'none' }}>
          Back to Blog
        </Link>
      </main>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      {/* Hero Image */}
      <section style={{ position: 'relative', height: '65vh', minHeight: '450px', overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,3,3,0.2) 0%, rgba(26,3,3,0.75) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4rem 0 3rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 reveal-up">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'var(--color-primary)', color: '#fff', padding: '0.4rem 0.9rem' }}>
                    {post.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {post.date}
                  </span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '1rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', color: '#888', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: '#ccc' }}>/</span>
          <Link to="/blog" style={{ color: '#888', textDecoration: 'none' }}>Blog</Link>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: 'var(--color-dark)', fontWeight: '700' }}>{post.title}</span>
        </div>
      </div>

      {/* Article Content */}
      <section style={{ padding: '6rem 0 4rem', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 reveal-up">
              <button onClick={() => navigate(-1)} className="d-inline-flex align-items-center font-sans fw-bold text-uppercase hover-arrow mb-5 border-0 bg-transparent" style={{ fontSize: '0.8rem', color: '#777', padding: 0, letterSpacing: '0.08em' }}>
                <FiArrowLeft size={14} className="me-2" /> Back to Blog
              </button>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#444', lineHeight: '1.8', fontStyle: 'italic', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1.8rem', marginBottom: '3rem' }}>
                {post.excerpt}
              </p>

              <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#444', lineHeight: '1.9' }}>
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: '1.8rem' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '2rem', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', fontWeight: 600 }}>Category:</span>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', padding: '0.35rem 0.85rem' }}>
                  {post.category}
                </span>
              </div>

              {/* Prev / Next Navigation */}
              <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                {prevPost ? (
                  <Link to={`/blog/${prevPost.id}`} style={{ textDecoration: 'none', maxWidth: '45%' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <FiArrowLeft size={12} /> Previous
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-dark)', lineHeight: 1.3 }}>{prevPost.title}</div>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link to={`/blog/${nextPost.id}`} style={{ textDecoration: 'none', maxWidth: '45%', textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end', fontWeight: 600 }}>
                      Next <FiArrowRight size={12} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-dark)', lineHeight: 1.3 }}>{nextPost.title}</div>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5 reveal-up">
            <div>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Continue Reading</span>
              <h3 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '2.5rem', lineHeight: '1' }}>MORE ARTICLES</h3>
            </div>
            <Link to="/blog" className="d-none d-md-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase hover-arrow" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              All Articles <FiArrowRight size={16} className="ms-2" />
            </Link>
          </div>
          <div className="row gy-5 gx-4">
            {relatedPosts.map((p, i) => (
              <div className="col-lg-4 col-md-6 reveal-up" key={p.id} style={{ animationDelay: `${i * 100}ms` }}>
                <article>
                  <div style={{ overflow: 'hidden', marginBottom: '1.2rem', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                    <Link to={`/blog/${p.id}`}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} className="transition-all" />
                    </Link>
                  </div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>{p.category}</span>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.01em', color: 'var(--color-dark)', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                    <Link to={`/blog/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="blog-title-link">{p.title}</Link>
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>{p.excerpt}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
