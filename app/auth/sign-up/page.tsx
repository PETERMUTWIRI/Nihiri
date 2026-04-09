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

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
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

            <style jsx global>{`
              /* Neon Auth UI - Professional styling */
              
              /* Ensure all text is visible */
              * {
                color: inherit;
              }
              
              /* Target all neon-auth elements */
              [class*="neon"], [class*="auth"], [class*="form"] {
                color: #1e293b !important;
              }
              
              /* Labels */
              label {
                color: #1e293b !important;
                font-weight: 600 !important;
                display: block !important;
                margin-bottom: 0.5rem !important;
              }
              
              /* Input fields */
              input[type="email"],
              input[type="password"],
              input[type="text"],
              input:not([type]),
              textarea,
              select {
                background-color: #ffffff !important;
                color: #0f172a !important;
                border: 2px solid #cbd5e1 !important;
                border-radius: 0.5rem !important;
                padding: 0.75rem 0.9rem !important;
                font-size: 1rem !important;
              }
              
              /* Placeholder text - visible and readable */
              input::placeholder,
              textarea::placeholder {
                color: #64748b !important;
                opacity: 1 !important;
              }
              
              /* Input focus state */
              input:focus,
              textarea:focus,
              select:focus {
                outline: none !important;
                border-color: #0ea5e9 !important;
                box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1) !important;
              }
              
              /* Buttons */
              button,
              input[type="submit"],
              input[type="button"] {
                background: linear-gradient(90deg, #0ea5e9, #06b6d4) !important;
                color: #ffffff !important;
                padding: 0.75rem 1.5rem !important;
                border-radius: 0.75rem !important;
                font-weight: 700 !important;
                font-size: 1rem !important;
                border: none !important;
                cursor: pointer !important;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3) !important;
                text-transform: capitalize !important;
              }
              
              button:hover,
              input[type="submit"]:hover,
              input[type="button"]:hover {
                background: linear-gradient(90deg, #0284c7, #0891b2) !important;
                box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4) !important;
              }
              
              /* Form text and paragraphs */
              p, span, div {
                color: #334155 !important;
              }
              
              /* Links */
              a {
                color: #0ea5e9 !important;
                text-decoration: underline !important;
              }
              
              a:hover {
                color: #0284c7 !important;
              }
              
              /* Error and success messages */
              .error, [role="alert"] {
                color: #dc2626 !important;
              }
              
              .success {
                color: #16a34a !important;
              }
            `}</style>
          </div>

        </div>
      </div>
    </NeonAuthUIProvider>
  );
}
