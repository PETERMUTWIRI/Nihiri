'use client';

import '@neondatabase/auth/ui/css';
import { AuthView, NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <NeonAuthUIProvider authClient={authClient as any} redirectTo="/admin">
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block text-white">
            <h2 className="text-4xl font-extrabold mb-4">nihri admin</h2>
            <p className="text-lg text-slate-300">Create your admin account to manage the site.</p>
            <p className="mt-4 text-slate-300">If you already have an account, <a href="/auth/sign-in" className="text-sky-400 underline">sign in here</a>.</p>
          </div>

          <div id="sign-up-form" className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">nihri admin</h3>
              <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
            </div>

            <div className="space-y-4">
              <AuthView path="sign-up" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/auth/sign-in" className="text-sm text-sky-600 hover:underline">Already have an account?</Link>
            </div>

            <style jsx>{`
              /* Ensure all text inside the sign-up form container is visible */
              #sign-up-form * {
                color: #0f172a !important;
              }

              #sign-up-form label {
                color: #1e293b !important;
                font-weight: 600 !important;
                display: block !important;
                margin-bottom: 0.5rem !important;
              }

              #sign-up-form input[type="email"],
              #sign-up-form input[type="password"],
              #sign-up-form input[type="text"],
              #sign-up-form textarea,
              #sign-up-form select {
                background-color: #ffffff !important;
                color: #0f172a !important;
                border: 2px solid #cbd5e1 !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 0.9rem !important;
                font-size: 1rem !important;
              }

              #sign-up-form input::placeholder,
              #sign-up-form textarea::placeholder {
                color: #64748b !important;
                opacity: 1 !important;
              }

              #sign-up-form input:focus,
              #sign-up-form textarea:focus,
              #sign-up-form select:focus {
                outline: none !important;
                border-color: #0ea5e9 !important;
                box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1) !important;
              }

              #sign-up-form button,
              #sign-up-form input[type="submit"],
              #sign-up-form input[type="button"] {
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

              #sign-up-form button:hover,
              #sign-up-form input[type="submit"]:hover,
              #sign-up-form input[type="button"]:hover {
                background: linear-gradient(90deg, #0284c7, #0891b2) !important;
                box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4) !important;
              }
            `}</style>
          </div>

        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
