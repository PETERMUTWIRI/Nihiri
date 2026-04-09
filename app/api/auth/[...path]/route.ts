import { authApiHandler } from '@neondatabase/auth/next/server';

// Auth API Handler
// This proxies auth requests to your Neon Auth instance
// Required environment variables:
// - NEON_AUTH_BASE_URL (from Vercel / .env)
export const { GET, POST } = authApiHandler();