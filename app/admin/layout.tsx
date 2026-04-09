'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, FaNewspaper, FaCalendarAlt, FaVideo, FaImages, 
  FaHeart, FaFlag, FaSignOutAlt, FaBars, FaTimes, FaHandshake,
} from 'react-icons/fa';

const adminNavLinks = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'News Posts', href: '/admin/posts', icon: FaNewspaper },
  { name: 'Events', href: '/admin/events', icon: FaCalendarAlt },
  { name: 'Videos', href: '/admin/videos', icon: FaVideo },
  { name: 'Gallery', href: '/admin/gallery', icon: FaImages },
  { name: 'Donations', href: '/admin/donations', icon: FaHeart },
  { name: 'Volunteers', href: '/admin/volunteers', icon: FaHandshake },
  { name: 'Manifesto', href: '/admin/manifesto', icon: FaFlag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        
        if (!session) {
          // Not authenticated - redirect immediately
          window.location.replace('/auth/sign-in');
          return;
        }
        
        // Authenticated
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

  // Show loading while checking
  if (isLoading || !isAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A] mx-auto mb-4" />
          <p className="text-slate-400">{isLoading ? 'Checking authentication...' : 'Redirecting...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#D4A017] flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="text-white font-slogan text-lg">National Vision Party</h1>
              <p className="text-slate-400 text-xs">Admin</p>
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {adminNavLinks.map((link) => (
            <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={async () => {
              await authClient.signOut();
              window.location.href = '/auth/sign-in';
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                <FaBars />
              </button>
              <h2 className="text-white font-semibold hidden sm:block">Campaign Management</h2>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/admin/posts/new" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white text-sm font-semibold">
                <FaNewspaper className="w-4 h-4" />
                New Post
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#D4A017] flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.[0] || user?.email?.[0] || 'K'}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-24 pb-6 px-4 sm:px-6 lg:px-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}