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

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 auth-form">
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

            <style jsx>{`
              .auth-form label {
                color: #1e293b !important;
                font-weight: 600 !important;
                display: block !important;
                margin-bottom: 0.5rem !important;
              }
              
              .auth-form input[type="email"],
              .auth-form input[type="password"],
              .auth-form input[type="text"],
              .auth-form textarea,
              .auth-form select {
                background-color: #ffffff !important;
                color: #0f172a !important;
                border: 2px solid #cbd5e1 !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 0.9rem !important;
                font-size: 1rem !important;
              }
              
              .auth-form input::placeholder,
              .auth-form textarea::placeholder {
                color: #64748b !important;
                opacity: 1 !important;
              }
              
              .auth-form input:focus,
              .auth-form textarea:focus,
              .auth-form select:focus {
                outline: none !important;
                border-color: #0ea5e9 !important;
                box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1) !important;
              }
              
              .auth-form button,
              .auth-form input[type="submit"],
              .auth-form input[type="button"] {
                background: linear-gradient(90deg, #0ea5e9, #06b6d4) !important;
                color: #ffffff !important;
                padding: 0.75rem 1.5rem !important;
                border-radius: 0.75rem !important;
                font-weight: 700 !important;
                font-size: 1rem !important;
                border: none !important;
                cursor: pointer !important;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3) !important;
              }
              
              .auth-form button:hover,
              .auth-form input[type="submit"]:hover,
              .auth-form input[type="button"]:hover {
                background: linear-gradient(90deg, #0284c7, #0891b2) !important;
                box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4) !important;
              }
              
              .auth-form a {
                color: #0ea5e9 !important;
              }
              
              .auth-form a:hover {
                color: #0284c7 !important;
              }
            `}</style>
          </div>

        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
