import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQty, clearCart, totalItems } = useCart();

  const eyebrow = (
    <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
      <span style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block', marginRight: '0.5rem' }} />
      Shopping Cart
    </span>
  );

  if (items.length === 0) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
        <section style={{ padding: '7rem 0', textAlign: 'center' }}>
          <div className="container">
            {eyebrow}
            <FiShoppingBag size={64} style={{ color: 'rgba(82,12,11,0.2)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', color: 'var(--color-dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Your Cart is Empty
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#777', marginBottom: '2.5rem', maxWidth: '440px', margin: '0 auto 2.5rem' }}>
              Browse our collections and add items to your cart to begin an inquiry.
            </p>
            <Link to="/shop"
              className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale"
              style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.85rem', gap: '0.5rem' }}>
              Explore the Collection <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#2B0A0F', padding: '4rem 0 3rem' }}>
        <div className="container">
          {eyebrow}
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
            YOUR CART
          </h1>
          <h2 className="editorial-italic" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--color-primary)', margin: 0, lineHeight: 1 }}>
            &amp; Inquiry Summary
          </h2>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="row gy-5 align-items-start">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-dark)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {totalItems} Item{totalItems !== 1 ? 's' : ''}
                </h3>
                <button onClick={clearCart}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FiTrash2 size={14} /> Clear All
                </button>
              </div>

              <div style={{ borderTop: '2px solid rgba(0,0,0,0.06)' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                    padding: '2rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    {/* Image */}
                    <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                      <div style={{ width: '110px', height: '130px', overflow: 'hidden', borderRadius: '4px' }} className="group-hover-zoom">
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="transition-all" />
                      </div>
                    </Link>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', display: 'block', marginBottom: '0.4rem' }}>
                        {item.category}
                      </span>
                      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-dark)', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                          {item.name}
                        </h4>
                      </Link>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#888', margin: '0 0 1rem' }}>
                        Custom manufacturing inquiry
                      </p>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(0,0,0,0.12)', width: 'fit-content' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-dark)' }}
                          aria-label="Decrease quantity">
                          <FiMinus size={14} />
                        </button>
                        <span style={{ width: '44px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.95rem', borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                          {item.qty}
                        </span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-dark)' }}
                          aria-label="Increase quantity">
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: '4px', flexShrink: 0, transition: 'color 0.2s' }}
                      aria-label={`Remove ${item.name}`}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#c0392b')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}>
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-dark)', textDecoration: 'none' }}
                  className="hover-arrow">
                  <FiArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div style={{ backgroundColor: '#2B0A0F', padding: '2.5rem', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
                  Inquiry Summary
                </h3>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', maxWidth: '70%' }}>
                        {item.name} × {item.qty}
                      </span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
                        Request Quote
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Total Items
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      {totalItems}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.6 }}>
                    Pricing is determined per order based on quantities, materials, and specifications. Submit an inquiry to receive a quote.
                  </p>
                </div>

                <Link to="/checkout"
                  className="d-flex align-items-center justify-content-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 py-3 transition-all hover-scale"
                  style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.85rem', gap: '0.5rem' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d0907')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}>
                  Submit Inquiry <FiArrowRight size={16} />
                </Link>

                <Link to="/shop"
                  className="d-flex align-items-center justify-content-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 py-3 transition-all mt-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', gap: '0.5rem' }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
