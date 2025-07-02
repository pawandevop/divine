import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import validator from 'validator';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';
import { generateCsrf, verifyCsrf, CSRF_TOKEN_HEADER, CSRF_SECRET_COOKIE } from '@/utils/csrf';

// Load environment variable: JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Simple in-memory rate limiter (per IP)
const loginRateLimit = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Login API route: handles user authentication (login)
export async function POST(req) {
  // CSRF protection
  if (!verifyCsrf(req)) {
    const errorResponse = NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }
  try {
    // Rate limit logic
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const entry = loginRateLimit.get(ip) || { count: 0, last: now };
    if (now - entry.last > WINDOW_MS) {
      entry.count = 0;
      entry.last = now;
    }
    entry.count++;
    entry.last = now;
    loginRateLimit.set(ip, entry);
    if (entry.count > MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
    }

    // Ensure DB connection
    await connectDB();

    // Parse request body
    const { email, password } = await req.json();

    // Sanitize and validate email
    const cleanEmail = validator.normalizeEmail(email || '', { gmail_remove_dots: false });
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    // Sanitize password (escape dangerous characters)
    const cleanPassword = validator.escape(password || '');
    if (!cleanPassword) {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }

    // Find user by email (include role)
    const user = await User.findOne({ email: cleanEmail }).select('+password +role');

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(cleanPassword, user.password);

    // Check if password is correct
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Check if user has a valid role
    if (!user.role || !['pawan', 'user'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized role.' },
        { status: 403 }
      );
    }

    // Generate JWT token with role and passwordChangedAt
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        passwordChangedAt: user.passwordChangedAt ? user.passwordChangedAt.getTime() : null,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Determine if running on localhost
    const isLocalhost = req.headers.get('host')?.includes('localhost');
    const response = NextResponse.json(
      { role: user.role, message: 'Login successful.' },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
      secure: !isLocalhost,
    });
    // Set CORS + security headers
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => response.headers.set(k, v));
    return response;
  } catch (err) {
    // Log error to console
    console.error('Login error:', err);
    const errorResponse = NextResponse.json(
      { error: 'Server error.' },
      { status: 500 }
    );
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