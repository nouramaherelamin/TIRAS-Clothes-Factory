import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getServices, STORE_KEYS } from '../../data/dataStore';
import { getIcon, ICON_OPTIONS } from '../../data/iconMap';

const emptyForm = { title: '', description: '', iconKey: 'industry' };

const AdminServices = () => {
  const [items, setItems] = useLocalStorage(STORE_KEYS.SERVICES, getServices());
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = items.filter(
    (s) =>
      !search.trim() ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(emptyForm);
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      iconKey: item.iconKey || 'industry',
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
    if (!form.title.trim() || !form.description.trim()) return;
    if (editItem) {
      setItems((prev) =>
        prev.map((s) => (s.id === editItem.id ? { ...s, ...form } : s))
      );
    } else {
      setItems((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((s) => s.id !== id));
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
            Services
          </h1>
          <p style={{ color: '#888', marginTop: '0.2rem', fontSize: '0.82rem' }}>
            {items.length} services total
          </p>
        </div>
        <button
          onClick={openAdd}
          id="admin-add-service"
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
          <FiPlus size={16} /> Add Service
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
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.1rem' }}
          />
        </div>
      </div>

      <div className="row gy-3 gx-3">
        {filtered.map((svc) => {
          const Icon = getIcon(svc.iconKey);
          return (
            <div className="col-lg-4 col-md-6" key={svc.id}>
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '0',
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: 'rgba(82,12,11,0.08)',
                      borderRadius: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color="var(--color-primary)" />
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => openEdit(svc)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        color: '#666',
                      }}
                      title="Edit"
                      aria-label={`Edit ${svc.title}`}
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteId(svc.id)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        border: '1px solid rgba(192,57,43,0.2)',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        color: '#c0392b',
                      }}
                      title="Delete"
                      aria-label={`Delete ${svc.title}`}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--color-dark)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {svc.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: '#777',
                    lineHeight: '1.6',
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {svc.description}
                </p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div
            className="col-12"
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#aaa',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
            }}
          >
            No services found.
          </div>
        )}
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
              maxWidth: '480px',
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
                {editItem ? 'Edit Service' : 'Add Service'}
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
                  placeholder="Service title"
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Icon</label>
                <select
                  value={form.iconKey}
                  onChange={(e) => setForm((p) => ({ ...p, iconKey: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  placeholder="Service description"
                  required
                />
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
                  {editItem ? 'Save Changes' : 'Add Service'}
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
              Delete Service?
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

export default AdminServices;
