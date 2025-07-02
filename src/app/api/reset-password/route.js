import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';
import { generateCsrf, verifyCsrf, CSRF_TOKEN_HEADER, CSRF_SECRET_COOKIE } from '@/utils/csrf';

// POST /api/reset-password
export async function POST(req) {
  // CSRF protection
  if (!verifyCsrf(req)) {
    const errorResponse = NextResponse.json({ error: 'Invalid CSRF token.' }, { status: 403 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }

  try {
    await connectDB();
    const { token, password } = await req.json();

    // Check if token and password are provided
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required.' }, { status: 400 });
    }

    // Find user by token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
    }

    // Update password and clear reset fields
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Invalidate all previous sessions by updating passwordChangedAt
    user.passwordChangedAt = new Date();
    await user.save();

    const response = NextResponse.json({ message: 'Password has been reset. You can now log in.' }, { status: 200 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => response.headers.set(k, v));
    return response;
  } catch (err) {
    const errorResponse = NextResponse.json({ error: 'Server error.' }, { status: 500 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => errorResponse.headers.set(k, v));
    return errorResponse;
  }
}

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