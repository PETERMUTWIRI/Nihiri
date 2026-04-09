'use client';

import { authClient } from '@/lib/auth/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        
        if (!session) {
          window.location.replace('/auth/sign-in');
          return;
        }
        
        setIsAuth(true);
        // @ts-ignore
        setUser(session.data?.user || session.user);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth error:', err);
        window.location.replace('/auth/sign-in');
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking auth
  if (isLoading || !isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
        <div className="h-20 flex items-center justify-between px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
              <FaHome className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">nihri admin</h1>
              <p className="text-slate-400 text-xs">Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <p className="text-white text-sm font-medium">{user?.name || user?.email || 'Admin'}</p>
              <p className="text-slate-400 text-xs">{user?.email || 'user@example.com'}</p>
            </div>
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = '/auth/sign-in';
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}