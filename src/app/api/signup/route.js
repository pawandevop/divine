import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDB } from '@/utils/db';
import { sendMail } from '@/utils/mailer';
import { registrationEmailTemplate } from '@/utils/emailTemplates';
import validator from 'validator';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';
import { generateCsrf, verifyCsrf, CSRF_TOKEN_HEADER, CSRF_SECRET_COOKIE } from '@/utils/csrf';

// Load environment variable: JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Simple in-memory rate limiter (per IP)
const signupRateLimit = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Disable public signup: all POST requests are rejected
export async function POST(req) {
  return NextResponse.json({ error: 'Signup is disabled. Please contact the administrator.' }, { status: 403 });
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