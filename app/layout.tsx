import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/NavbarWrapper';
import Footer from '../components/Footer';
import PageTransition from '@/components/PageTransition';
import StickyDonateBar from '@/components/StickyDonateBar';
import BackToTop from '@/components/BackToTop';
import CookieConsent from '@/components/CookieConsent';
import WhatsAppChat from '@/components/WhatsAppChat';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Nihri's hope",
    template: "%s | Nihri's hope",
  },
  description: "New International Hope for Refugees and Immigrants - Empowering refugee and immigrant families in New Haven, CT with ESL education, health navigation, and advocacy services. A 501(c)(3) nonprofit organization.",
  keywords: ['refugee support', 'immigrant services', 'ESL classes', 'New Haven', 'nonprofit', '501(c)(3)', 'health navigation', 'advocacy'],
  authors: [{ name: "Nihri's hope" }],
  creator: "Nihri's hope",
  publisher: "Nihri's hope",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nihrihope.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nihri's hope",
    description: "New International Hope for Refugees and Immigrants - Empowering refugee and immigrant families with education, health navigation, and advocacy services.",
    url: 'https://nihrihope.com',
    siteName: "Nihri's hope",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nihri's hope",
    description: "New International Hope for Refugees and Immigrants - Empowering refugee and immigrant families with education, health navigation, and advocacy services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <StickyDonateBar />
        <main className="pt-[80px] md:pt-[100px] lg:pt-[136px]">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppChat />
        <CookieConsent />
      </body>
    </html>
  );
}
