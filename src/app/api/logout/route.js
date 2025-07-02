// Logout API route: handles user logout by clearing the auth cookie
import { NextResponse } from 'next/server';
import { handleCors } from '@/utils/cors';
import { securityHeaders } from '@/utils/securityHeaders';

// Handle user logout
export async function POST(request) {
  // Clear the token cookie
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0), // Expire immediately
    path: '/',
  });
  return response;
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS(request) {
  const corsHeaders = handleCors(request);
  return new Response(null, { status: 204, headers: corsHeaders });
} 