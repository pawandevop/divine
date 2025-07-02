import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import validator from 'validator';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';
import { generateCsrf, verifyCsrf, CSRF_TOKEN_HEADER, CSRF_SECRET_COOKIE } from '@/utils/csrf';

export async function OPTIONS(req) {
  // Respond to preflight with CORS + security headers
  const headers = { ...handleCors(req), ...securityHeaders };
  return new Response(null, { status: 204, headers });
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

export async function POST(req) {
  // CSRF protection
  if (!verifyCsrf(req)) {
    const errorResponse = NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }

  try {
    await connectDB();
    const { email } = await req.json();
    // Sanitize and validate email
    const cleanEmail = validator.normalizeEmail(email || '', { gmail_remove_dots: false });
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }

    const response = NextResponse.json({ message: 'Email is available.' }, { status: 200 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => response.headers.set(k, v));
    return response;

  } catch (err) {
    const errorResponse = NextResponse.json({ error: 'Server error.' }, { status: 500 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }
} 