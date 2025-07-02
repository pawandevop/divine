// Strict CORS helper for Next.js API routes
// Usage: import { handleCors } from './cors';
const TRUSTED_ORIGINS = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(',').map((o) => o.trim())
  : [
    'http://localhost:3000',
  ];

// Handle CORS for API routes
export function handleCors(request) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin');

  // If origin is not in trusted origins, return a response with no access
  if (!origin || !TRUSTED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': 'null',
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Credentials': 'true',
    };
  }
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
} 