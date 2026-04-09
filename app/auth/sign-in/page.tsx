'use client';

import '@neondatabase/auth/ui/css';
import { AuthView, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <NeonAuthUIProvider 
      authClient={authClient as any}
      redirectTo="/admin"
    >
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Brand (updated) */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">nihri admin</h3>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign In</h1>
            
            <AuthView path="sign-in" />

            <style jsx global>{`
              /* Ensure Neon auth inputs are visible on light card */
              input, textarea, select {
                background-color: #ffffff !important;
                color: #111827 !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem !important;
              }
              input::placeholder, textarea::placeholder { color: #6b7280 !important; }
              input:focus, textarea:focus, select:focus {
                box-shadow: 0 0 0 4px rgba(59,130,246,0.08) !important;
                outline: none !important;
              }
              .neon-auth * { color: inherit !important; }
            `}</style>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/sign-up" className="text-[#1E3A8A] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
