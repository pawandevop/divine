import { NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import { sendMail } from '@/utils/mailer';
import { passwordResetEmailTemplate } from '@/utils/emailTemplates';
import validator from 'validator';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';
import { generateCsrf, verifyCsrf, CSRF_TOKEN_HEADER, CSRF_SECRET_COOKIE } from '@/utils/csrf';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';

// Simple in-memory rate limiter (per IP)
const forgotRateLimit = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Forgot Password API route: handles password reset requests (sends reset email)
export async function POST(req) {
  // CSRF protection
  if (!verifyCsrf(req)) {
    const errorResponse = NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }

  // Rate limit logic
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const entry = forgotRateLimit.get(ip) || { count: 0, last: now };

    if (now - entry.last > WINDOW_MS) {
      entry.count = 0;
      entry.last = now;
    }

    entry.count++;
    entry.last = now;
    forgotRateLimit.set(ip, entry);

    if (entry.count > MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Too many password reset attempts. Please try again later.' }, { status: 429 });
    }
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // Sanitize and validate email
    const cleanEmail = validator.normalizeEmail(email || '', { gmail_remove_dots: false });
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      // Explicitly return error if user not found
      return NextResponse.json({ error: 'No account found with that email address.' }, { status: 404 });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    await user.save();

    // Send email
    const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
    await sendMail({
      to: cleanEmail,
      subject: 'Password Reset Request',
      html: passwordResetEmailTemplate({ resetUrl, baseUrl: BASE_URL }),
    });

    // Respond with success
    const response = NextResponse.json({ message: 'If that email is registered, a reset link has been sent.' }, { status: 200 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => response.headers.set(k, v));
    return response;
  }
  catch (err) {
    console.error('Forgot Password Error:', err);
    const errorResponse = NextResponse.json({ error: 'Server error.' }, { status: 500 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS(req) {
  const corsHeaders = handleCors(req);
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req) {
  // Issue a CSRF token for the client
  const { token, secret } = generateCsrf();
  const response = NextResponse.json({ csrfToken: token }, { status: 200 });
  response.cookies.set(CSRF_SECRET_COOKIE, secret, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
  Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => response.headers.set(k, v));
  return response;
} 