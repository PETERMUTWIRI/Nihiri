import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/NavbarWrapper';  // ✅ FIXED
import Footer from '../components/Footer';   // Add this too!

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nihiri - Refugee Support Foundation',
  description: 'Empowering refugee and immigrant families in New Haven, CT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* ✅ Add footer here */}
      </body>
    </html>
  );
} 