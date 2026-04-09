'use client';
import { createAuthClient } from '@neondatabase/auth/next';
export const authClient = createAuthClient();

// Debug: Log auth client initialization in browser
if (typeof window !== 'undefined') {
	console.log('Auth client initialized');
}