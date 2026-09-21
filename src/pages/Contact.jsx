import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { getMessages, setStored, STORE_KEYS } from '../data/dataStore';

const SERVICE_OPTIONS = [
  'Fabric Production',
  'Garment Manufacturing',
  'Custom Production',
  'Sourcing',
  'Finishing',
  'Quality Control',
  'Other',
];

const INIT = { name: '', email: '', phone: '', company: '', service: '', message: '' };
const ERRORS_INIT = { name: '', email: '', phone: '', company: '', service: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState(ERRORS_INIT);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // Set page title
  useEffect(() => {
    document.title = 'Contact Us | Z7 Clothes Factory';
    return () => { document.title = 'Z7 Clothes Factory | Premium Garment Manufacturing'; };
  }, []);

  const validate = () => {
    const e = { ...ERRORS_INIT };
    let valid = true;
    if (!form.name.trim()) { e.name = 'Full name is required.'; valid = false; }
    if (!form.email.trim()) { e.email = 'Email address is required.'; valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = 'Enter a valid email address.'; valid = false; }
    if (!form.service) { e.service = 'Please select a service.'; valid = false; }
    if (!form.message.trim()) { e.message = 'Message is required.'; valid = false; }
    else if (form.message.trim().length < 20) { e.message = 'Message must be at least 20 characters.'; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      // Save to localStorage so it appears in admin Messages
      const existing = getMessages();
      const newMessage = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || '',
        company: form.company.trim() || '',
        service: form.service,
        message: form.message.trim(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
        read: false,
      };
      setStored(STORE_KEYS.MESSAGES, [newMessage, ...existing]);

      // Simulate slight async delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setForm(INIT);
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.9rem 1rem',
    border: `1px solid ${hasError ? '#c0392b' : 'rgba(0,0,0,0.15)'}`,
    backgroundColor: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    color: 'var(--color-dark)',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#555',
    display: 'block',
    marginBottom: '0.5rem',
  };

  const errorStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    color: '#c0392b',
    marginTop: '0.4rem',
    display: 'block',
  };

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section
        style={{
          backgroundColor: 'var(--color-dark)',
          padding: '6rem 0 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 80% 40%, rgba(82,12,11,0.45) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container position-relative">
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent1)',
              borderBottom: '1px solid var(--color-secondary)',
              paddingBottom: '6px',
              marginBottom: '1.5rem',
            }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Let&apos;s build something
            <br />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--color-accent1)',
                fontWeight: 400,
              }}
            >
              together
            </span>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              maxWidth: '500px',
            }}
          >
            Reach out to discuss your manufacturing requirements. Our team will respond within one
            business day.
          </p>
        </div>
      </section>

      {/* Contact Main */}
      <section style={{ padding: '7rem 0', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div className="row gy-5">
            {/* Info Column */}
            <div className="col-lg-4 pe-lg-5">
              <div style={{ position: 'sticky', top: '100px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    letterSpacing: '-0.03em',
                    color: 'var(--color-dark)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Contact
                  <br />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: 'var(--color-primary)',
                    }}
                  >
                    information
                  </span>
                </h2>
                <p
                  style={{
                    color: '#666',
                    lineHeight: '1.8',
                    marginBottom: '3rem',
                    fontSize: '0.95rem',
                  }}
                >
                  Whether you have a specific production project in mind or are just exploring our
                  capabilities, we are happy to help.
                </p>

                <div className="d-flex gap-3 align-items-start mb-4">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: 'rgba(82,12,11,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--color-primary)',
                    }}
                  >
                    <FiMessageCircle size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#aaa',
                        marginBottom: '0.3rem',
                      }}
                    >
                      Project enquiries
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        color: 'var(--color-dark)',
                      }}
                    >
                      Use the form to share your brief, preferred service, quantity, and timeline.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="col-lg-8">
              {status === 'success' ? (
                <div
                  style={{
                    padding: '5rem 3rem',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    borderTop: '4px solid var(--color-primary)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.04)',
                  }}
                  role="alert"
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      backgroundColor: 'rgba(82,12,11,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.8rem',
                      color: 'var(--color-dark)',
                      marginBottom: '0.8rem',
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      lineHeight: '1.8',
                      marginBottom: '2rem',
                      maxWidth: '400px',
                      margin: '0 auto 2rem',
                    }}
                  >
                    Thank you for reaching out. We will review your inquiry and get back to you
                    within one business day.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      padding: '0.8rem 2rem',
                      backgroundColor: 'var(--color-dark)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    backgroundColor: '#fff',
                    padding: '3rem',
                    borderTop: '4px solid var(--color-primary)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label htmlFor="contact-name" style={labelStyle}>
                        Full Name <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        style={inputStyle(!!errors.name)}
                        disabled={status === 'loading'}
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <span id="name-error" style={errorStyle} role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-email" style={labelStyle}>
                        Email Address <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        style={inputStyle(!!errors.email)}
                        disabled={status === 'loading'}
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" style={errorStyle} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-phone" style={labelStyle}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="contact-phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        style={inputStyle(!!errors.phone)}
                        disabled={status === 'loading'}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-company" style={labelStyle}>
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="contact-company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        style={inputStyle(!!errors.company)}
                        disabled={status === 'loading'}
                        autoComplete="organization"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-service" style={labelStyle}>
                        Service Required <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <select
                        name="service"
                        id="contact-service"
                        value={form.service}
                        onChange={handleChange}
                        style={{
                          ...inputStyle(!!errors.service),
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem',
                          cursor: 'pointer',
                        }}
                        disabled={status === 'loading'}
                        aria-required="true"
                        aria-describedby={errors.service ? 'service-error' : undefined}
                      >
                        <option value="">Select a service...</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span id="service-error" style={errorStyle} role="alert">
                          {errors.service}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-message" style={labelStyle}>
                        Message <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        id="contact-message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, requirements, quantities, timelines..."
                        rows={6}
                        style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: '140px' }}
                        disabled={status === 'loading'}
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <span id="message-error" style={errorStyle} role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      {status === 'error' && (
                        <p
                          style={{
                            color: '#c0392b',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.88rem',
                            marginBottom: '1rem',
                          }}
                          role="alert"
                        >
                          Something went wrong. Please try again.
                        </p>
                      )}
                      <button
                        type="submit"
                        id="contact-submit"
                        disabled={status === 'loading'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '1rem 2.5rem',
                          backgroundColor: status === 'loading' ? '#999' : 'var(--color-dark)',
                          color: '#fff',
                          border: 'none',
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          transition: 'background-color 0.3s ease',
                        }}
                        aria-disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <>
                            <span
                              style={{
                                display: 'inline-block',
                                width: '14px',
                                height: '14px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: '#fff',
                                borderRadius: '0',
                                animation: 'spin 0.8s linear infinite',
                              }}
                              aria-hidden="true"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <FiArrowRight size={16} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
