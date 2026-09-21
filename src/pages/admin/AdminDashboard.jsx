import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiSettings, FiFileText, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { getProducts, getServices, getBlogPosts, getMessages, STORE_KEYS } from '../../data/dataStore';
import useLocalStorage from '../../hooks/useLocalStorage';

const AdminDashboard = () => {
  // Read live counts from the same localStorage store
  const [products] = useLocalStorage(STORE_KEYS.PRODUCTS, getProducts());
  const [services] = useLocalStorage(STORE_KEYS.SERVICES, getServices());
  const [blogPosts] = useLocalStorage(STORE_KEYS.BLOG, getBlogPosts());
  const [messages] = useLocalStorage(STORE_KEYS.MESSAGES, getMessages());

  const unread = messages.filter((m) => !m.read);
  const recentMessages = [...messages]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 5);
  const publishedPosts = blogPosts.filter((p) => p.published !== false);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      sub: `${products.filter((p) => p.featured).length} featured`,
      icon: FiPackage,
      color: '#520C0B',
      path: '/admin/products',
    },
    {
      label: 'Total Services',
      value: services.length,
      sub: 'active offerings',
      icon: FiSettings,
      color: '#2D6A4F',
      path: '/admin/services',
    },
    {
      label: 'Blog Posts',
      value: blogPosts.length,
      sub: `${publishedPosts.length} published`,
      icon: FiFileText,
      color: '#1D3557',
      path: '/admin/blog',
    },
    {
      label: 'Messages',
      value: messages.length,
      sub: `${unread.length} unread`,
      icon: FiMessageSquare,
      color: unread.length > 0 ? '#c0392b' : '#7D4F50',
      path: '/admin/messages',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '1.6rem',
            color: 'var(--color-dark)',
            margin: 0,
          }}
        >
          Dashboard Overview
        </h1>
        <p style={{ color: '#888', marginTop: '0.25rem', fontSize: '0.88rem' }}>
          Welcome back. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="row gy-3 gx-3 mb-4">
        {stats.map(({ label, value, sub, icon: Icon, color, path }) => (
          <div className="col-lg-3 col-md-6" key={label}>
            <Link to={path} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '0',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'box-border border-dark 0.2s ease, transform 0.2s ease',
                }}
                className="admin-stat-card"
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '0',
                    backgroundColor: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.8rem',
                      color: 'var(--color-dark)',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      color: '#888',
                      marginTop: '0.2rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#bbb', marginTop: '0.1rem' }}>
                    {sub}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row gy-3 gx-3">
        {/* Recent Messages */}
        <div className="col-lg-6">
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--color-dark)',
                  margin: 0,
                }}
              >
                Recent Messages
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {unread.length > 0 && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: '0',
                    }}
                  >
                    {unread.length} new
                  </span>
                )}
                <Link
                  to="/admin/messages"
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-sans)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  View all <FiArrowRight size={12} />
                </Link>
              </div>
            </div>
            {recentMessages.length === 0 ? (
              <div
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  color: '#bbb',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                }}
              >
                No messages yet.
              </div>
            ) : (
              recentMessages.map((msg, i) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: i < recentMessages.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    backgroundColor: !msg.read ? 'rgba(82,12,11,0.03)' : 'transparent',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  {!msg.read && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '0',
                        flexShrink: 0,
                        marginTop: '6px',
                      }}
                    />
                  )}
                  <div style={{ flex: 1, paddingLeft: msg.read ? '1.1rem' : 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.2rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          color: 'var(--color-dark)',
                        }}
                      >
                        {msg.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#aaa' }}>
                        {msg.date}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: '#666',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '280px',
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Featured Products */}
        <div className="col-lg-6">
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--color-dark)',
                  margin: 0,
                }}
              >
                Featured Products
              </h3>
              <Link
                to="/admin/products"
                style={{
                  color: 'var(--color-primary)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Manage <FiArrowRight size={12} />
              </Link>
            </div>
            {featuredProducts.length === 0 ? (
              <div
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  color: '#bbb',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                }}
              >
                No featured products yet.
              </div>
            ) : (
              featuredProducts.map((product, i) => (
                <div
                  key={product.id}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderBottom:
                      i < featuredProducts.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '0',
                      flexShrink: 0,
                      backgroundColor: '#f0eeec',
                    }}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&q=60';
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                        fontSize: '0.88rem',
                        color: 'var(--color-dark)',
                      }}
                    >
                      {product.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#aaa' }}>
                      {product.category}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#2D6A4F',
                      backgroundColor: '#2D6A4F15',
                      padding: '2px 8px',
                      borderRadius: '0',
                    }}
                  >
                    Featured
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12">
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              border: '1px solid rgba(0,0,0,0.06)',
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--color-dark)',
                marginBottom: '1rem',
              }}
            >
              Quick Actions
            </h3>
            <div className="d-flex gap-2 flex-wrap">
              {[
                { label: '+ Add Product', path: '/admin/products' },
                { label: '+ Add Service', path: '/admin/services' },
                { label: '+ New Blog Post', path: '/admin/blog' },
                { label: 'View Messages', path: '/admin/messages' },
              ].map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  style={{
                    padding: '0.55rem 1.25rem',
                    backgroundColor: 'rgba(82,12,11,0.06)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    borderRadius: '0',
                    border: '1px solid rgba(82,12,11,0.15)',
                    transition: 'all 0.2s ease',
                  }}
                  className="admin-quick-action"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
