import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import { NeonAuthUIProvider, UserButton } from '@neondatabase/auth/react';
import { authClient } from '@/lib/auth/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nihiri - Refugee Support Foundation',
  description: 'Empowering refugee and immigrant families in New Haven, CT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NeonAuthUIProvider authClient={authClient} emailOTP redirectTo="/account/settings">
          {/* Top-right user button */}
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white border-b">
            <UserButton size="icon" />
          </header>

          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}