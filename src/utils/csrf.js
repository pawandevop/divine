import Tokens from 'csrf';

// Create a new Tokens instance
const tokens = new Tokens();
const CSRF_SECRET_COOKIE = 'csrfSecret';
const CSRF_TOKEN_HEADER = 'x-csrf-token';

// Generate a new CSRF secret and token
export function generateCsrf() {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  return { token, secret };
}

// Verify the CSRF token from the request
export function verifyCsrf(req) {
  const secret = req.cookies.get(CSRF_SECRET_COOKIE)?.value;
  const token = req.headers.get(CSRF_TOKEN_HEADER);
  if (!secret || !token) return false;
  return tokens.verify(secret, token);
}

// Export constants for use in API routes
export { CSRF_SECRET_COOKIE, CSRF_TOKEN_HEADER }; 