'use client';
import { createAuthClient } from '@neondatabase/auth/next';

// Create auth client connected to the Neon Auth instance via the local proxy
// Environment variables used:
// - NEXT_PUBLIC_NEON_AUTH_BASE_URL (client-side)
// - NEON_AUTH_BASE_URL (server-side, used by /api/auth/[...path]/route.ts)
export const authClient = createAuthClient();

// Debug: Log auth client initialization in browser
if (typeof window !== 'undefined') {
  console.log('Auth client initialized');
}