'use client';
import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';
import Image from 'next/image';
import '@/styles/backend-auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch CSRF token on mount
    fetch('/api/forgot-password')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(() => setCsrfToken(''));
  }, []);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          setError(data.error || 'No account found with that email address.');
        } else {
          showToast(data.error || 'Request failed', 'error');
        }
        setLoading(false);
        return;
      }
      showToast(data.message || 'If that email is registered, a reset link has been sent.', 'success');
      setEmail('');
      setLoading(false);

    } catch (err) {
      showToast('Request failed.', 'error');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f6f2 0%, #e7e3d8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 8px' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 32px #0001',
        maxWidth: 420,
        width: '100%',
        margin: '0 auto',
        padding: '36px 32px 32px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1.5px solid #f3b80522',
      }}>
        <span style={{ marginBottom: 12 }}>
          <Image src="/img/logo-backend.png" alt="Forgot Password Logo" width={64} height={64} style={{ borderRadius: '50%', objectFit: 'cover', background: 'transparent' }} />
        </span>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#b97a3a', marginBottom: 8, letterSpacing: 0.5 }}>Forgot Password</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 24, textAlign: 'center' }}>
          Enter your email address and we&apos;ll send you a password reset link.
        </div>
        <form
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: '1.5px solid #ccc',
              fontSize: 16,
              marginBottom: 4,
              outline: 'none',
              background: '#fafbfc',
              transition: 'border 0.2s',
            }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            style={{
              background: 'var(--brown, #b97a3a)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 17,
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              marginTop: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px #b97a3a22',
              transition: 'background 0.2s',
              width: '100%',
              letterSpacing: 0.2,
            }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</div>
          )}
        </form>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            zIndex: 10,
            cursor: 'not-allowed',
            borderRadius: 20,
          }} />
        )}
      </div>
    </div>
  );
} 