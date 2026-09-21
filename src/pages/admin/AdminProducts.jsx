import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiStar } from 'react-icons/fi';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getProducts, STORE_KEYS } from '../../data/dataStore';

const CATEGORIES = ['All', 'Garments', 'Denim', 'Formal Wear', 'Casual Wear', 'Leather', 'Accessories'];

const emptyForm = { name: '', category: 'Garments', description: '', featured: false };

const AdminProducts = () => {
  const [products, setProducts] = useLocalStorage(STORE_KEYS.PRODUCTS, getProducts());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => {
    setForm(emptyForm);
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      featured: product.featured,
    });
    setEditItem(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;
    if (editItem) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editItem.id ? { ...p, ...form } : p))
      );
    } else {
      const placeholder = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80`;
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now(), image: placeholder },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const toggleFeatured = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '0',
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    outline: 'none',
    color: 'var(--color-dark)',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#666',
    display: 'block',
    marginBottom: '0.4rem',
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.4rem',
              color: 'var(--color-dark)',
              margin: 0,
            }}
          >
            Products
          </h1>
          <p style={{ color: '#888', marginTop: '0.2rem', fontSize: '0.82rem' }}>
            {products.length} items total · {products.filter((p) => p.featured).length} featured
          </p>
        </div>
        <button
          onClick={openAdd}
          id="admin-add-product"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '0',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          <FiPlus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '0',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '1rem 1.25rem',
          marginBottom: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
          <FiSearch
            size={14}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#aaa',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="admin-product-search"
            style={{ ...inputStyle, paddingLeft: '2.1rem' }}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ ...inputStyle, width: 'auto', minWidth: '140px', cursor: 'pointer' }}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '0',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr
                style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#faf9f8' }}
              >
                {['Product', 'Category', 'Featured', 'Actions'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.75rem 1.25rem',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#888',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  }}
                >
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '38px',
                          height: '38px',
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
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            color: 'var(--color-dark)',
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            color: '#aaa',
                            maxWidth: '220px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: '#555',
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        padding: '3px 10px',
                        borderRadius: '0',
                      }}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      title={product.featured ? 'Remove from featured' : 'Mark as featured'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: product.featured ? '#2D6A4F' : '#aaa',
                        backgroundColor: product.featured ? '#2D6A4F15' : 'transparent',
                        border: product.featured ? '1px solid #2D6A4F30' : '1px solid rgba(0,0,0,0.08)',
                        padding: '3px 10px',
                        borderRadius: '0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {product.featured ? (
                        <>
                          <FiCheck size={11} /> Featured
                        </>
                      ) : (
                        <>
                          <FiStar size={11} /> No
                        </>
                      )}
                    </button>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEdit(product)}
                        style={{
                          padding: '0.4rem 0.65rem',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#666',
                          transition: 'all 0.2s ease',
                        }}
                        className="admin-action-btn"
                        title="Edit"
                        aria-label={`Edit ${product.name}`}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        style={{
                          padding: '0.4rem 0.65rem',
                          border: '1px solid rgba(192,57,43,0.2)',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#c0392b',
                          transition: 'all 0.2s ease',
                        }}
                        className="admin-action-btn"
                        title="Delete"
                        aria-label={`Delete ${product.name}`}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#aaa',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                    }}
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={editItem ? 'Edit Product' : 'Add Product'}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              padding: '2rem',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--color-dark)',
                  margin: 0,
                }}
              >
                {editItem ? 'Edit Product' : 'Add Product'}
              </h3>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px' }}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  placeholder="Product name"
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                  placeholder="Product description"
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                  />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#555' }}>
                    Featured product
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '0.65rem 1.25rem',
                    border: '1px solid rgba(0,0,0,0.12)',
                    borderRadius: '0',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#555',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.65rem 1.5rem',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}
                >
                  {editItem ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Confirm deletion"
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              padding: '2rem',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                backgroundColor: 'rgba(192,57,43,0.1)',
                borderRadius: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <FiTrash2 size={22} color="#c0392b" />
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-dark)',
                marginBottom: '0.5rem',
              }}
            >
              Delete Product?
            </h4>
            <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: '0.65rem 1.25rem',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '0',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: '#555',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  padding: '0.65rem 1.25rem',
                  backgroundColor: '#c0392b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
