import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { setStored, STORE_KEYS } from '../data/dataStore';

const ORDERS_KEY = 'z7_customer_orders';

const Checkout = () => {
  const { items, clearCart, totalItems } = useCart();
  const { customer } = useCustomerAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: customer?.fullName || '',
    email: customer?.email || '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email address is required.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);

    // Save order to localStorage
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      customer: { name: form.name, email: form.email, phone: form.phone, company: form.company, address: form.address },
      notes: form.notes,
      items: items.map((i) => ({ id: i.id, name: i.name, category: i.category, qty: i.qty })),
      totalItems,
      status: 'pending',
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      existingOrders.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders));
    } catch {
      // Ignore storage errors
    }

    // Also save as a contact message so admin can see it
    try {
      const messages = JSON.parse(localStorage.getItem(STORE_KEYS.MESSAGES) || '[]');
      messages.push({
        id: Date.now() + 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: `ORDER INQUIRY\n\nItems:\n${items.map((i) => `- ${i.name} (${i.category}) × ${i.qty}`).join('\n')}\n\nAddress: ${form.address}\n\nNotes: ${form.notes}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        read: false,
        type: 'order',
      });
      localStorage.setItem(STORE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      clearCart();
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', border: '1px solid rgba(0,0,0,0.12)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-dark)',
    backgroundColor: '#fdfcfb', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s', borderRadius: 0,
  };
  const labelStyle = {
    fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555',
    display: 'block', marginBottom: '0.5rem',
  };

  if (items.length === 0 && !submitted) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
        <section style={{ padding: '7rem 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>Your cart is empty</h1>
            <p style={{ color: '#777', marginBottom: '2rem' }}>Add items to your cart before proceeding to checkout.</p>
            <Link to="/shop" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3"
              style={{ backgroundColor: 'var(--color-primary)', gap: '0.5rem' }}>
              Browse Collection <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FAF9F6' }}>
        <section style={{ padding: '7rem 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ width: '72px', height: '72px', backgroundColor: 'rgba(82,12,11,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <FiCheckCircle size={36} color="var(--color-primary)" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,2.8rem)', color: 'var(--color-dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Inquiry Submitted!
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Thank you for your interest in Z7 Clothes Factory. Our team has received your production inquiry and will be in touch within 1–2 business days.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#999', marginBottom: '3rem' }}>
                A summary has been sent to <strong style={{ color: 'var(--color-dark)' }}>{form.email}</strong>
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/shop"
                  className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3"
                  style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.85rem', gap: '0.5rem' }}>
                  Continue Shopping <FiArrowRight size={16} />
                </Link>
                <Link to="/"
                  className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3"
                  style={{ border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem' }}>
                  Return Home
                </Link>
              </div>
            </div>
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
          <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block', marginRight: '0.5rem' }} />
            Inquiry &amp; Checkout
          </span>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
            PRODUCTION
          </h1>
          <h2 className="editorial-italic" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--color-primary)', margin: 0, lineHeight: 1 }}>
            Inquiry Form
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)', marginTop: '1rem', fontSize: '0.95rem', maxWidth: '480px' }}>
            No payment is processed. This form submits your production inquiry to our team, who will contact you with pricing and lead times.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="row gy-5 align-items-start">
            {/* Form */}
            <div className="col-lg-7">
              <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderTop: '4px solid var(--color-primary)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2rem' }}>
                  Contact Details
                </h3>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label htmlFor="co-name" style={labelStyle}>Full Name *</label>
                      <input id="co-name" type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name" style={{ ...inputStyle, borderColor: errors.name ? '#c0392b' : 'rgba(0,0,0,0.12)' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = errors.name ? '#c0392b' : 'rgba(0,0,0,0.12)')} />
                      {errors.name && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#c0392b', margin: '0.4rem 0 0' }}>{errors.name}</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="co-email" style={labelStyle}>Email Address *</label>
                      <input id="co-email" type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="you@example.com" style={{ ...inputStyle, borderColor: errors.email ? '#c0392b' : 'rgba(0,0,0,0.12)' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? '#c0392b' : 'rgba(0,0,0,0.12)')} />
                      {errors.email && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#c0392b', margin: '0.4rem 0 0' }}>{errors.email}</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="co-phone" style={labelStyle}>Phone Number *</label>
                      <input id="co-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+1 (555) 000-0000" style={{ ...inputStyle, borderColor: errors.phone ? '#c0392b' : 'rgba(0,0,0,0.12)' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = errors.phone ? '#c0392b' : 'rgba(0,0,0,0.12)')} />
                      {errors.phone && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#c0392b', margin: '0.4rem 0 0' }}>{errors.phone}</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="co-company" style={labelStyle}>Company <span style={{ fontWeight: 400, opacity: 0.7 }}>(Optional)</span></label>
                      <input id="co-company" type="text" name="company" value={form.company} onChange={handleChange}
                        placeholder="Your brand or company" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="co-address" style={labelStyle}>Shipping Address <span style={{ fontWeight: 400, opacity: 0.7 }}>(Optional)</span></label>
                      <input id="co-address" type="text" name="address" value={form.address} onChange={handleChange}
                        placeholder="City, Country" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="co-notes" style={labelStyle}>Additional Notes <span style={{ fontWeight: 400, opacity: 0.7 }}>(Optional)</span></label>
                      <textarea id="co-notes" name="notes" value={form.notes} onChange={handleChange} rows={4}
                        placeholder="Specifications, quantities, delivery requirements, or any other details..."
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: '#faf9f6', border: '1px solid rgba(82,12,11,0.1)', borderLeft: '3px solid var(--color-primary)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--color-dark)', fontFamily: 'var(--font-sans)' }}>No payment required.</strong> This is a production inquiry only.
                      Our team will review your request and respond with pricing, lead times, and next steps within 1–2 business days.
                    </p>
                  </div>

                  <button id="checkout-submit" type="submit" disabled={loading}
                    style={{
                      marginTop: '2rem', width: '100%', padding: '1rem',
                      backgroundColor: loading ? '#9a5a4d' : 'var(--color-primary)',
                      color: '#fff', border: 'none', borderRadius: 0,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    }}>
                    {loading ? 'Submitting...' : (<>Submit Inquiry <FiArrowRight size={16} /></>)}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5">
              <div style={{ backgroundColor: '#2B0A0F', padding: '2.5rem', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
                  Order Summary
                </h3>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '56px', height: '64px', overflow: 'hidden', borderRadius: '2px', flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: '#fff', margin: '0 0 0.25rem' }}>{item.name}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Qty: {item.qty}</p>
                      </div>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'var(--color-primary)', fontStyle: 'italic' }}>
                        Quote
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Total Items
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)' }}>
                      {totalItems}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.75rem', marginBottom: 0, lineHeight: 1.6 }}>
                    Pricing will be provided in our response based on materials, quantities, and specifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
