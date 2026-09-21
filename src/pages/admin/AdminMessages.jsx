import React, { useState } from 'react';
import { FiSearch, FiTrash2, FiMail, FiCircle, FiCheckCircle } from 'react-icons/fi';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getMessages, STORE_KEYS } from '../../data/dataStore';

const AdminMessages = () => {
  const [messages, setMessages] = useLocalStorage(STORE_KEYS.MESSAGES, getMessages());
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // all | unread | read

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search.trim() ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'unread' && !m.read) ||
      (statusFilter === 'read' && m.read);
    return matchSearch && matchStatus;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const markRead = (id) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));

  const markUnread = (id) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: false } : m)));

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleteId(null);
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = (msg) => {
    setSelected(msg);
    markRead(msg.id);
  };

  // Keep selected message in sync with messages state
  const selectedMsg = selected ? messages.find((m) => m.id === selected.id) || null : null;

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
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            Messages
            {unreadCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '0',
                }}
              >
                {unreadCount} new
              </span>
            )}
          </h1>
          <p style={{ color: '#888', marginTop: '0.2rem', fontSize: '0.82rem' }}>
            {messages.length} messages total
          </p>
        </div>
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
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.1rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { label: 'All', val: 'all' },
            { label: 'Unread', val: 'unread' },
            { label: 'Read', val: 'read' },
          ].map(({ label, val }) => (
            <button
              key={val}
              onClick={() => setStatusFilter(val)}
              style={{
                padding: '0.45rem 0.9rem',
                border: '1px solid',
                borderColor: statusFilter === val ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)',
                borderRadius: '0',
                backgroundColor: statusFilter === val ? 'var(--color-primary)' : '#fff',
                color: statusFilter === val ? '#fff' : '#555',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="row gx-3 gy-3">
        {/* Message List */}
        <div className={selectedMsg ? 'col-lg-5' : 'col-12'}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '0',
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  color: '#aaa',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                }}
              >
                No messages found.
              </div>
            ) : (
              filtered.map((msg, i) => (
                <div
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openMessage(msg)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    backgroundColor:
                      selectedMsg?.id === msg.id
                        ? 'rgba(82,12,11,0.04)'
                        : !msg.read
                        ? 'rgba(82,12,11,0.02)'
                        : '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="admin-message-row"
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0',
                      backgroundColor: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: msg.read ? 500 : 700,
                          fontSize: '0.88rem',
                          color: 'var(--color-dark)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {msg.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.7rem',
                          color: '#bbb',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {msg.date}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        color: msg.read ? '#aaa' : 'var(--color-primary)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {msg.service}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: '#888',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {msg.message}
                    </div>
                  </div>
                  {!msg.read && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '0',
                        backgroundColor: 'var(--color-primary)',
                        flexShrink: 0,
                        marginTop: '6px',
                      }}
                      aria-label="Unread"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        {selectedMsg && (
          <div className="col-lg-7">
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '0',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: '1.75rem',
                position: 'sticky',
                top: '80px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--color-dark)',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {selectedMsg.name}
                  </h3>
                  <a
                    href={`mailto:${selectedMsg.email}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    {selectedMsg.email}
                  </a>
                  {selectedMsg.phone && (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: '#aaa',
                        marginLeft: '0.75rem',
                      }}
                    >
                      {selectedMsg.phone}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() =>
                      selectedMsg.read ? markUnread(selectedMsg.id) : markRead(selectedMsg.id)
                    }
                    style={{
                      padding: '0.4rem 0.65rem',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '0',
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      color: '#666',
                    }}
                    title={selectedMsg.read ? 'Mark Unread' : 'Mark Read'}
                    aria-label={selectedMsg.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {selectedMsg.read ? <FiCircle size={14} /> : <FiCheckCircle size={14} />}
                  </button>
                  <button
                    onClick={() => setDeleteId(selectedMsg.id)}
                    style={{
                      padding: '0.4rem 0.65rem',
                      border: '1px solid rgba(192,57,43,0.2)',
                      borderRadius: '0',
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      color: '#c0392b',
                    }}
                    title="Delete"
                    aria-label="Delete message"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Company', value: selectedMsg.company || '—' },
                  { label: 'Service', value: selectedMsg.service },
                  { label: 'Date', value: selectedMsg.date },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#aaa',
                        minWidth: '70px',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#444' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  backgroundColor: '#faf9f8',
                  borderRadius: '0',
                  padding: '1.25rem',
                  borderLeft: '3px solid var(--color-primary)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: '#333',
                    lineHeight: '1.8',
                    margin: 0,
                  }}
                >
                  {selectedMsg.message}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                <a
                  href={`mailto:${selectedMsg.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.25rem',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                  }}
                >
                  <FiMail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

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
              Delete Message?
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

export default AdminMessages;
