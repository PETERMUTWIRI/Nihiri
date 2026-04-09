'use client';

import '@neondatabase/auth/ui/css';
import { AuthView, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo="/admin">
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block text-white">
            <h2 className="text-4xl font-extrabold mb-4">nihri admin</h2>
            <p className="text-lg text-slate-300">Welcome back — sign in to manage content, events, and the gallery.</p>
            <ul className="mt-6 space-y-2 text-slate-300">
              <li>• Manage posts, events, and reports</li>
              <li>• Upload gallery images</li>
              <li>• Secure admin-only access</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">nihri admin</h3>
              <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
            </div>

            <div className="space-y-4">
              <AuthView path="sign-in" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/auth/sign-up" className="text-sm text-sky-600 hover:underline">Create an account</Link>
            </div>

            <style jsx global>{`
              /* Auth UI overrides to match site theme */
              .neon-auth input, .neon-auth textarea, .neon-auth select {
                background-color: #ffffff !important;
                color: #0f172a !important;
                border: 1px solid #e6edf3 !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 0.9rem !important;
                box-shadow: none !important;
              }
              .neon-auth input::placeholder, .neon-auth textarea::placeholder { color: #94a3b8 !important; }
              .neon-auth input:focus, .neon-auth textarea:focus, .neon-auth select:focus {
                box-shadow: 0 6px 24px rgba(14,165,233,0.08) !important;
                border-color: #0ea5e9 !important;
                outline: none !important;
              }
              .neon-auth button {
                background: linear-gradient(90deg, #0ea5e9, #06b6d4) !important;
                color: #fff !important;
                padding: 0.75rem 1rem !important;
                border-radius: 0.75rem !important;
                font-weight: 600 !important;
                border: none !important;
                box-shadow: 0 8px 30px rgba(14,165,233,0.12) !important;
              }
              .neon-auth a { color: #0ea5e9 !important; }
            `}</style>
          </div>

        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
