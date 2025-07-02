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
// Message is optional, so no validation needed

/**
 * ContactSection component renders the contact/appointment form.
 * Handles frontend validation, captcha, and form submission to the backend.
 * Props:
 *   - hidemap: boolean (hide the map section)
 *   - captchaEnabled: boolean (enable/disable captcha)
 */
export default function ContactSection({ hidemap = false, captchaEnabled = true }) {
  // Form state
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', hp_field: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [captchaValid, setCaptchaValid] = useState(!captchaEnabled);
  const [fieldErrors, setFieldErrors] = useState({});

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
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
      setSuccess('Thank you! Your message has been received. We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '', hp_field: '' });
      setFieldErrors({});
    } catch (err) {
      setError(err.message || 'Failed to send message');
    }
    setSubmitting(false);
  }

  // Render the contact form UI
  return (
    <section className="contact_us_form">
      <div className="container">
        <div className="common_heading">Book an<span> Appointment</span></div>
        <div className="row pt-4 row-reverse-sm">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="contact_details">
              <div className="city">Find Us</div>
              <div className="area"><b>Divine Elite Wellness Clinic, 06/07, Ground Floor, Cricket Box, Urbana Mall, Sector 67 Gurugram, Haryana</b></div>
            </div>
            {/* Map section, hidden if hidemap is true */}
            {!hidemap && (
              <div className="map_container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4174.066531881949!2d77.06350075050864!3d28.390349065017098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d230016a523b5%3A0xe8faa2e895c1f2ce!2sElite%20Wellbeing!5e0!3m2!1sen!2sin!4v1746204208488!5m2!1sen!2sin" width="550" height="240" style={{ border: '2px solid #BB8E23' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            )}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="contact_form">
              <form id="appointmentForm" className="form_design" onSubmit={handleSubmit} autoComplete="off">
                <div className="row g-3">
                  {/* Name field */}
                  <div className="col-lg-6 col-md-6 col-6">
                    <input type="text" className="form-control fields" name="name" placeholder="Name*" value={form.name} onChange={handleChange} required disabled={submitting} />
                    {fieldErrors.name && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.name}</div>}
                  </div>
                  {/* Honeypot field (hidden) */}
                  <input type="text" name="hp_field" value={form.hp_field} onChange={handleChange} style={{ display: 'none' }} autoComplete="off" tabIndex="-1" />
                  {/* Email field */}
                  <div className="col-lg-6 col-md-6 col-6">
                    <input type="email" name="email" className="form-control fields" placeholder="Email Address*" value={form.email} onChange={handleChange} required disabled={submitting} />
                    {fieldErrors.email && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.email}</div>}
                  </div>
                  {/* Phone field */}
                  <div className="col-lg-6 col-md-6 col-6">
                    <input type="text" name="phone" className="form-control fields" placeholder="Phone No.* " minLength={10} maxLength={10} value={form.phone} onChange={handleChange} required disabled={submitting} />
                    {fieldErrors.phone && <div style={{ color: 'red', fontSize: 13 }}>{fieldErrors.phone}</div>}
                  </div>
                  {/* Message field (optional) */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <textarea name="message" id="message" className="form-control fields" placeholder="Type Message" value={form.message} onChange={handleChange} disabled={submitting}></textarea>
                  </div>
                  {/* Captcha */}
                  <div className="col-lg-12 col-md-12">
                    <Captcha enabled={captchaEnabled} onValidate={setCaptchaValid} />
                  </div>
                  {/* Submit button and feedback */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form_btn">
                      <button title="submit" id="submitapp" aria-label="Submit Form" type="submit" disabled={submitting || (captchaEnabled && !captchaValid)}>
                        {submitting ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                  {/* Centered error/success messages */}
                  {(error || success) && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                      {success && <div style={{ color: 'green' }}>{success}</div>}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 