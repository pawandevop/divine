import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    await connectDB();

    // Get token from cookies
    const token = req.cookies.get('token')?.value;

    // Token not found
    if (!token) {
      const res = NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => res.headers.set(k, v));
      return res;
    }

    let payload;
    // Verify token
    try {
      ({ payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)));
    }
    catch (err) {
      const res = NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => res.headers.set(k, v));
      return res;
    }

    // Find user
    const user = await User.findById(payload.userId);

    // User not found
    if (!user) {
      const res = NextResponse.json({ error: 'User not found' }, { status: 404 });
      Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => res.headers.set(k, v));
      return res;
    }

    // Return user email
    const res = NextResponse.json({ email: user.email }, { status: 200 });

    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => res.headers.set(k, v));
    return res;

  } catch (err) {
    const res = NextResponse.json({ error: 'Server error' }, { status: 500 });
    Object.entries({ ...handleCors(req), ...securityHeaders }).forEach(([k, v]) => res.headers.set(k, v));
    return res;
  }
} 