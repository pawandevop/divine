// Default security headers for Next.js API routes (Helmet-like)
// Usage: import { securityHeaders } from './securityHeaders';

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0', // Modern browsers ignore, but still common
  'Referrer-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload', // Only effective on HTTPS
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  // Add a basic Content-Security-Policy if needed:
  // 'Content-Security-Policy': "default-src 'self'"
};