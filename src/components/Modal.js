"use client";

import { useState } from 'react';
import Captcha from './Captcha';

// Utility validation functions
function validateName(name) {
  return /^[A-Za-z\s]{2,50}$/.test(name.trim());
}
function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
}
function validatePhone(phone) {
  return /^\d{10}$/.test(phone.trim());
}

/**
 * Modal component renders the appointment booking form in a modal dialog.
 * Handles frontend validation, captcha, and form submission to the backend.
 * Props:
 *   - open: boolean (show/hide the modal)
 *   - onClose: function (close the modal)
 *   - captchaEnabled: boolean (enable/disable captcha)
 */
export default function Modal({ open, onClose, captchaEnabled = true }) {
  // Form state
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', hp_field: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [captchaValid, setCaptchaValid] = useState(!captchaEnabled);

  if (!open) return null;

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    setError('');
    setSuccess('');
  }

  // Validate all fields before submit
  function validateAll() {
    const errors = {};
    if (!validateName(form.name)) errors.name = 'Enter a valid name (letters and spaces only, 2-50 chars).';
    if (!validateEmail(form.email)) errors.email = 'Enter a valid email address.';
    if (!validatePhone(form.phone)) errors.phone = 'Enter a valid 10-digit phone number.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAll()) return;

    if (captchaEnabled && !captchaValid) {
      setError('Please solve the captcha correctly.');
      return;
    }
    setSubmitting(true);

    try {
      // Send form data to backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSuccess('Thank you! Your appointment request has been received. We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '', hp_field: '' });
      setFieldErrors({});

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        setSuccess('');
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to send message');
    }
    setSubmitting(false);
  }

  // Render the modal form UI
  return (
    <div id="appointmentModal" className="modal" style={{ display: 'flex' }}>
      <div style={{ backgroundColor: 'black' }} className="modal-content">
        <span style={{ color: 'rgb(255, 255, 255)', cursor: 'pointer' }} className="close-btn" onClick={onClose}> ✖ </span>
        <h1 style={{ color: 'rgb(247, 247, 247)' }}> Book An <span style={{ color: '#f3b805' }}>Appointment</span></h1>
        <p style={{ color: 'rgb(255, 255, 255)' }}>Fill in the details to book your appointment.</p>

        <form className="form-group" onSubmit={handleSubmit} autoComplete="off">
          {/* Name field */}
          <input type="text" name="name" placeholder="Name *" value={form.name} onChange={handleChange} required disabled={submitting} />
          {fieldErrors.name && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.name}</div>}

          {/* Honeypot field (hidden) */}
          <input type="text" name="hp_field" value={form.hp_field} onChange={handleChange} style={{ display: 'none' }} autoComplete="off" tabIndex="-1" />

          {/* Email field */}
          <input type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} required disabled={submitting} />
          {fieldErrors.email && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.email}</div>}

          {/* Phone field */}
          <input type="tel" name="phone" placeholder="Mobile No. *" value={form.phone} onChange={handleChange} required disabled={submitting} />
          {fieldErrors.phone && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.phone}</div>}

          {/* Message field (optional) */}
          <textarea rows="5" name="message" placeholder="Message *" value={form.message} onChange={handleChange} disabled={submitting}></textarea>

          {/* Captcha */}
          <Captcha enabled={captchaEnabled} onValidate={setCaptchaValid} />

          {/* Submit button and feedback */}
          <input type="submit" value={submitting ? 'Submitting...' : 'Submit'} disabled={submitting || (captchaEnabled && !captchaValid)} />

          {/* Centered error/success messages */}
          {(error || success) && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {success && <div style={{ color: 'green' }}>{success}</div>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}