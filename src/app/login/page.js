'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Toast from '@/components/Toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '@/styles/login.css';

// Login page component
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Email and password regex from backend schema
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Show toast notification
  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!email.trim()) {
      showToast('Email is required.', 'warning');
      setLoading(false);
      return;
    }

    // Email must be a valid email address
    if (!emailRegex.test(email.trim().toLowerCase())) {
      showToast('Please enter a valid email address.', 'warning');
      setLoading(false);
      return;
    }

    // Password is required
    if (!password) {
      showToast('Password is required.', 'warning');
      setLoading(false);
      return;
    }

    // Password must be at least 8 characters
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.', 'warning');
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        showToast(data.error || 'Login failed', 'error');
        setLoading(false);
        return;
      }
      // No need to set document.cookie here; cookie is set server-side
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err) {
      setError('Login failed.');
      showToast('Login failed.', 'error');
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch CSRF token on mount
    fetch('/api/login')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(() => setCsrfToken(''));
    // Show custom message if redirected due to password reset
    if (typeof window !== 'undefined') {
      const reason = searchParams.get('reason');
      if (reason === 'password-reset') {
        showToast('You have been logged out because your password was changed. Please log in again.', 'warning');
      }
      // Check for token cookie and validate expiry
      const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
      if (match && match[1]) {
        try {
          const payload = JSON.parse(atob(match[1].split('.')[1]));
          if (payload.exp && Date.now() < payload.exp * 1000) {
            router.replace('/dashboard');
          }
        } catch (e) {
          // Ignore invalid token
        }
      }
    }
  }, []);

  return (
    // Main background container with gradient
    <div className="login-bg">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* Centered card for login form */}
      <div className="login-card">
        {/* Logo at the top of the card */}
        <span className="backend-auth-logo">
          <Image
            src="/img/logo-backend.png"
            alt="Login Logo"
            width={64}
            height={64}
            style={{ borderRadius: '50%', objectFit: 'cover', background: 'transparent' }}
            priority
          />
        </span>
        {/* Heading for the login form */}
        <div className="backend-auth-heading">Login</div>
        {/* Login form */}
        <form className="backend-auth-form" autoComplete="off" onSubmit={handleSubmit} style={loading ? { pointerEvents: 'none', opacity: 0.7, position: 'relative' } : {}}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            required
            className="backend-auth-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          {/* Password input */}
          <div className="input-eye-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="backend-auth-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(v => !v)}
              className="input-eye-btn"
              disabled={loading}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {error && <div style={{ color: 'red', fontSize: 15, marginBottom: 8 }}>{error}</div>}

          {/* Login button */}
          <button
            type="submit"
            className="backend-auth-btn"
            disabled={loading}
            style={loading ? { cursor: 'not-allowed' } : {}}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Forgot password link */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <a href="/forgot-password" style={{ color: 'var(--brown)', fontWeight: 600, textDecoration: 'none' }}>
            Forgot password?
          </a>
        </div>

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