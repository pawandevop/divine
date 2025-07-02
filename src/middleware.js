import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Protected routes
const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PAGES = ['/login', '/signup', '/forgot-password', '/reset-password'];
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from login/signup
  if (AUTH_PAGES.some((path) => pathname === path)) {

    // Get JWT token from cookies
    const token = req.cookies.get('token')?.value;

    // If token is present, verify it
    if (token) {
      try {
        // Verify JWT token using jose (Edge compatible)
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        // Valid token, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch (err) {
        // Invalid token, allow access to login/signup
      }
    }
    // No token, allow access
    return NextResponse.next();
  }

  // Only run middleware for protected paths
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // Get JWT token from cookies
    const token = req.cookies.get('token')?.value;

    // Check if token is not present
    if (!token) {
      // Not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify JWT token using jose (Edge compatible)
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );

      // Check if passwordChangedAt in JWT is after token iat
      if (payload.passwordChangedAt && payload.iat && payload.passwordChangedAt > payload.iat * 1000) {
        // Password was changed after token was issued; invalidate session
        return NextResponse.redirect(new URL('/login?reason=password-reset', req.url));
      }

      // Authenticated, allow access
      return NextResponse.next();
    } catch (err) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Not protected route, continue
  return NextResponse.next();
}

// Middleware to protect routes
export const config = {
  // Protect below routes and their subroutes
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password'],
}; 