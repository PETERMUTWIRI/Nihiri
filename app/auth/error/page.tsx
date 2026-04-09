'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    default: 'An error occurred during authentication.',
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access denied. You do not have permission to sign in.',
    Verification: 'The verification link has expired or has already been used.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  };

  const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.default;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-8">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#1E3A8A]/30">
            <Image
              src="/isaac_kinity-logo.jpeg"
              alt="National Vision Party"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-slogan text-xl text-[#DC2626]">National Vision Party</p>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </Link>

        {/* Error Card */}
        <div className="bg-slate-900 rounded-2xl border border-red-900/30 p-8 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-slate-400 mb-6">{errorMessage}</p>

          <div className="flex flex-col gap-3">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-semibold hover:bg-[#0F172A] transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A] mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
