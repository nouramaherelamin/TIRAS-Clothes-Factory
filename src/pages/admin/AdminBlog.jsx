import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getBlogPosts, STORE_KEYS } from '../../data/dataStore';

const emptyForm = {
  title: '',
  category: '',
  date: '',
  excerpt: '',
  content: '',
  image: '',
  published: true,
};

const AdminBlog = () => {
  const [posts, setPosts] = useLocalStorage(STORE_KEYS.BLOG, getBlogPosts());
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = posts.filter(
    (p) =>
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      ...emptyForm,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    });
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content || '',
      image: item.image || '',
      published: item.published !== false,
    });
    setEditItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) return;
    const fallbackImage =
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80';
    if (editItem) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editItem.id ? { ...p, ...form } : p))
      );
    } else {
      setPosts((prev) => [
        ...prev,
        { ...form, id: Date.now(), image: form.image || fallbackImage },
      ]);
    }
    closeModal();
  };

  const togglePublish = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
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

  const publishedCount = posts.filter((p) => p.published !== false).length;

  return (
    <div>
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
            Blog Posts
          </h1>
          <p style={{ color: '#888', marginTop: '0.2rem', fontSize: '0.82rem' }}>
            {posts.length} articles · {publishedCount} published
          </p>
        </div>
        <button
          onClick={openAdd}
          id="admin-add-post"
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
          <FiPlus size={16} /> New Post
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '0',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '1rem 1.25rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ position: 'relative', maxWidth: '340px' }}>
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
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.1rem' }}
          />
        </div>
      </div>

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
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#faf9f8' }}>
                {['Article', 'Category', 'Date', 'Status', 'Actions'].map((h) => (
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
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
                >
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={post.image}
                        alt={post.title}
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
                            'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=60&q=60';
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            color: 'var(--color-dark)',
                            maxWidth: '240px',
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            color: '#aaa',
                            maxWidth: '240px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', whiteSpace: 'nowrap' }}>
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
                      {post.category}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '0.9rem 1.25rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: '#888',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.date}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: post.published !== false ? '#2D6A4F' : '#c0392b',
                        backgroundColor:
                          post.published !== false ? '#2D6A4F15' : '#c0392b15',
                        padding: '3px 10px',
                        borderRadius: '0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.published !== false ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => togglePublish(post.id)}
                        style={{
                          padding: '0.4rem 0.65rem',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#666',
                        }}
                        title={post.published !== false ? 'Unpublish' : 'Publish'}
                        aria-label={`${post.published !== false ? 'Unpublish' : 'Publish'} ${post.title}`}
                      >
                        {post.published !== false ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                      <button
                        onClick={() => openEdit(post)}
                        style={{
                          padding: '0.4rem 0.65rem',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#666',
                        }}
                        title="Edit"
                        aria-label={`Edit ${post.title}`}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id)}
                        style={{
                          padding: '0.4rem 0.65rem',
                          border: '1px solid rgba(192,57,43,0.2)',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          color: '#c0392b',
                        }}
                        title="Delete"
                        aria-label={`Delete ${post.title}`}
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
                    colSpan={5}
                    style={{
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#aaa',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                    }}
                  >
                    No articles found.
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
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              padding: '2rem',
              width: '100%',
              maxWidth: '560px',
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
                {editItem ? 'Edit Article' : 'New Article'}
              </h3>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px' }}
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  style={inputStyle}
                  placeholder="Article title"
                  required
                />
              </div>
              <div className="row g-3" style={{ marginBottom: '1rem' }}>
                <div className="col-md-6">
                  <label style={labelStyle}>Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    style={inputStyle}
                    placeholder="e.g. Denim"
                  />
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Date</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    style={inputStyle}
                    placeholder="Sep 20, 2026"
                  />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  style={inputStyle}
                  placeholder="https://example.com/image.jpg (leave blank for default)"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Excerpt *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
                  placeholder="Short summary..."
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                  placeholder="Full article content..."
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                  />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#555' }}>
                    Publish immediately
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
                  {editItem ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
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
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              padding: '2rem',
              width: '100%',
              maxWidth: '360px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(192,57,43,0.1)',
                borderRadius: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <FiTrash2 size={20} color="#c0392b" />
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
              Delete Article?
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

export default AdminBlog;
