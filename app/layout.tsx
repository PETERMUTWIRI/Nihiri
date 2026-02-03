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
    default: "nihiri's hope | Refugee & Immigrant Support",
    template: "%s | nihiri's hope",
  },
  description: 'Empowering refugee and immigrant families in New Haven, CT with ESL education, health navigation, and advocacy services. A 501(c)(3) nonprofit organization.',
  keywords: ['refugee support', 'immigrant services', 'ESL classes', 'New Haven', 'nonprofit', '501(c)(3)', 'health navigation', 'advocacy'],
  authors: [{ name: "nihiri's hope" }],
  creator: "nihiri's hope",
  publisher: "nihiri's hope",
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
    title: "nihiri's hope | Refugee & Immigrant Support",
    description: 'Empowering refugee and immigrant families with education, health navigation, and advocacy services.',
    url: 'https://nihrihope.com',
    siteName: "nihiri's hope",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "nihiri's hope | Refugee & Immigrant Support",
    description: 'Empowering refugee and immigrant families with education, health navigation, and advocacy services.',
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
