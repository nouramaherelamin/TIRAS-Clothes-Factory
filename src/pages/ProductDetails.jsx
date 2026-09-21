import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import { getProducts } from '../data/dataStore';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const products = getProducts();
  const product = Number.isInteger(productId) ? products.find((p) => p.id === productId) : undefined;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (!product) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '60vh', backgroundColor: '#FAF9F6' }}>
        <section style={{ padding: '10rem 1rem', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', color: 'var(--color-dark)', fontWeight: 800, marginBottom: '1rem' }}>
              Product Not Found
            </h1>
            <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              The product you are looking for does not exist or may have been removed.
            </p>
            <Link to="/shop"
              className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale"
              style={{ backgroundColor: 'var(--color-dark)', fontSize: '0.9rem', gap: '0.5rem' }}>
              Back to Shop <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specs = [
    { label: 'Category', value: product.category },
    { label: 'Type', value: 'Manufacturing Sample' },
    { label: 'Quality Grade', value: 'Premium' },
    { label: 'Production', value: 'Custom Order' },
    { label: 'Min. Order', value: 'Contact for MOQ' },
    { label: 'Lead Time', value: 'Contact for timeline' },
  ];

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#fff', padding: '1.2rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container d-flex align-items-center gap-2"
          style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans)', color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}
            onMouseOver={(e) => (e.target.style.color = 'var(--color-primary)')}
            onMouseOut={(e) => (e.target.style.color = '#888')}>
            Home
          </Link>
          <span style={{ color: '#ccc' }}>/</span>
          <Link to="/shop" style={{ color: '#888', textDecoration: 'none' }}
            onMouseOver={(e) => (e.target.style.color = 'var(--color-primary)')}
            onMouseOut={(e) => (e.target.style.color = '#888')}>
            Shop
          </Link>
          <span style={{ color: '#ccc' }}>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: '#888', textDecoration: 'none' }}
            onMouseOver={(e) => (e.target.style.color = 'var(--color-primary)')}
            onMouseOut={(e) => (e.target.style.color = '#888')}>
            {product.category}
          </Link>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: 'var(--color-dark)', fontWeight: 700 }}>{product.name}</span>
        </div>
      </div>

      {/* Product Main */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div className="row gy-5 align-items-start">
            {/* Image */}
            <div className="col-lg-6 reveal-up">
              <div style={{ position: 'relative', overflow: 'hidden' }} className="shadow-sm group-hover-zoom">
                <img src={product.image} alt={product.name} className="transition-all"
                  style={{ width: '100%', height: '640px', objectFit: 'cover', display: 'block' }} />
                {product.featured && (
                  <div className="badge font-sans text-uppercase letter-spacing-1"
                    style={{
                      position: 'absolute', top: '1.5rem', left: '1.5rem',
                      backgroundColor: 'var(--color-primary)', color: '#fff',
                      fontSize: '0.68rem', fontWeight: 700, padding: '0.5rem 1rem',
                    }}>
                    Featured
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="col-lg-6 ps-lg-5 reveal-up" style={{ animationDelay: '100ms' }}>
              <button onClick={() => navigate(-1)}
                className="d-inline-flex align-items-center text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 hover-arrow mb-4 border-0 bg-transparent"
                style={{ fontSize: '0.8rem', color: '#777', padding: 0, gap: '0.4rem' }}>
                <FiArrowLeft size={14} /> Back
              </button>

              <span className="d-block mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {product.category}
              </span>

              <h1 style={{
                fontFamily: 'var(--font-sans)', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em',
                color: 'var(--color-dark)', marginBottom: '1.25rem', lineHeight: 1.1,
              }}>
                {product.name}
              </h1>

              <p style={{ color: '#555', lineHeight: 1.85, fontSize: '1.05rem', marginBottom: '2rem' }}>
                {product.description} — This item represents our manufacturing capability in the{' '}
                <strong style={{ color: 'var(--color-dark)' }}>{product.category}</strong> category. All products are available for custom bulk production with flexible specifications to meet your brand's requirements.
              </p>

              {/* Specifications */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h5 className="font-sans fw-bold text-dark text-uppercase letter-spacing-1 mb-3" style={{ fontSize: '0.85rem' }}>
                  Specifications
                </h5>
                <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)' }}>
                  {specs.map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#888' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-dark)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h5 className="font-sans fw-bold text-dark text-uppercase letter-spacing-1 mb-3" style={{ fontSize: '0.85rem' }}>
                  Key Features
                </h5>
                <div className="row gy-2">
                  {['Premium quality materials', 'Custom specifications available', 'Bulk production capacity', 'International shipping'].map((f, i) => (
                    <div key={i} className="col-sm-6 d-flex align-items-center gap-2">
                      <FaCheckCircle size={14} color="var(--color-primary)" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#555' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + Cart */}
              <div style={{ marginBottom: '2rem' }}>
                <h5 className="font-sans fw-bold text-dark text-uppercase letter-spacing-1 mb-3" style={{ fontSize: '0.85rem' }}>
                  Quantity
                </h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(0,0,0,0.12)', width: 'fit-content', marginBottom: '1.5rem' }}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-dark)', fontWeight: 300 }}
                    aria-label="Decrease quantity">
                    −
                  </button>
                  <span style={{ width: '52px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                    {qty}
                  </span>
                  <button onClick={() => setQty((q) => q + 1)}
                    style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-dark)', fontWeight: 300 }}
                    aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="d-inline-flex align-items-center text-white font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all"
                  style={{
                    backgroundColor: addedToCart ? '#2e7d32' : 'var(--color-primary)',
                    border: 'none', cursor: 'pointer', fontSize: '0.85rem', gap: '0.5rem',
                    transition: 'background-color 0.3s ease',
                  }}>
                  {addedToCart ? (
                    <><FiCheck size={16} /> Added to Cart</>
                  ) : (
                    <><FiShoppingBag size={16} /> Add to Cart</>
                  )}
                </button>

                <Link to="/contact"
                  className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale"
                  style={{ border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', gap: '0.5rem' }}>
                  Inquire Now <FiArrowRight size={14} />
                </Link>
              </div>

              {/* Added to cart confirmation */}
              {addedToCart && (
                <div style={{
                  marginTop: '1.25rem', padding: '0.85rem 1rem',
                  backgroundColor: 'rgba(46,125,50,0.07)', border: '1px solid rgba(46,125,50,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#2e7d32' }}>
                    <FiCheck size={14} style={{ marginRight: '0.5rem' }} />
                    {qty} × {product.name} added to your cart.
                  </span>
                  <Link to="/cart" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    View Cart →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
          <div className="container">
            <div className="d-flex align-items-end justify-content-between mb-5 reveal-up">
              <div>
                <span className="d-inline-flex align-items-center mb-2"
                  style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  More to Explore
                </span>
                <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '2.5rem', lineHeight: 1 }}>
                  RELATED PRODUCTS
                </h2>
              </div>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="d-none d-md-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 hover-arrow"
                style={{ fontSize: '0.85rem', gap: '0.5rem' }}>
                View All <FiArrowRight size={16} />
              </Link>
            </div>

            <div className="row gy-5 gx-4">
              {related.map((p, i) => (
                <div className="col-lg-3 col-md-6 reveal-up" key={p.id} style={{ animationDelay: `${i * 100}ms` }}>
                  <Link to={`/product/${p.id}`} style={{ display: 'block', textDecoration: 'none' }} className="group-hover-zoom">
                    <div style={{ overflow: 'hidden', marginBottom: '1.2rem', borderRadius: '4px' }} className="shadow-sm">
                      <img src={p.image} alt={p.name}
                        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                        className="transition-all" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                      {p.category}
                    </span>
                    <h5 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-dark)', margin: 0, letterSpacing: '-0.01em' }}>
                      {p.name}
                    </h5>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
