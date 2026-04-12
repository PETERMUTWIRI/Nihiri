'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaXTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaCircleCheck
} from 'react-icons/fa6';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      // Reset after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'About Us', href: '/about' },
      { label: 'Our History', href: '/history' },
      { label: 'Board of Directors', href: '/board' },
      { label: 'Staff', href: '/staff' },
      { label: 'Annual Reports', href: '/reports' },
      { label: 'Blog & News', href: '/blog' },
    ],
    events: [
      { label: 'Upcoming Events', href: '/events/upcoming' },
      { label: 'Past Events', href: '/events/past' },
    ],
    programs: [
      { label: 'ESL Program', href: '/programs/esl' },
      { label: 'Health Services', href: '/programs/health' },
      { label: 'Advocacy', href: '/programs/advocacy' },
    ],
    getInvolved: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Health Referral', href: '/referral' },
      { label: 'ESL Onboarding', href: '/esl-onboarding' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <footer className="text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/kinity1.webp"
          alt="Footer background"
          fill
          className="object-cover object-center"
          priority={false}
        />
        {/* Cyan overlay with 90% opacity */}
        <div className="absolute inset-0 bg-cyan-600/90"></div>
      </div>
      
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-light to-brand-primary opacity-30 z-10"></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="block group">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-white/50 flex-shrink-0">
                  <Image 
                    src="/Nihiri_logo.jpg"
                    alt="Nihiri Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-extrabold text-white tracking-tight leading-tight">
                    Nihri&apos;s hope
                  </h2>
                  <p className="text-xs text-white/80 font-medium">
                    For Refugees And Immigrants
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Nihri&apos;s hope empowers refugee and immigrant families with the tools, education, 
              and support they need to build independent, thriving lives in our community.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { Icon: FaXTwitter, href: '#' },
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaInstagram, href: '#' },
                { Icon: FaLinkedinIn, href: '#' },
                { Icon: FaYoutube, href: '#' },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           text-white hover:bg-brand-primary hover:text-cyan-600 
                           transition-all duration-300 hover:scale-110 hover:rotate-6"
                  aria-label="Social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-black text-brand-primary mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            
            <div className="space-y-3">
              {[
                ...footerLinks.about.slice(0, 3),
                ...footerLinks.events,
                { label: 'Donate', href: '/donate' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-all 
                           text-sm font-medium py-1 group"
                >
                  <span className="text-brand-primary text-xs transition-all group-hover:translate-x-1">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="text-lg font-black text-brand-primary mb-6 uppercase tracking-wider">
              Our Programs
            </h4>
            
            <div className="space-y-3">
              {footerLinks.programs.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-all 
                           text-sm font-medium py-1 group"
                >
                  <span className="text-brand-primary text-xs transition-all group-hover:translate-x-1">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-black text-brand-primary mb-6 uppercase tracking-wider">
              Stay Connected
            </h4>
            
            {subscribed ? (
              <div className="bg-green-500/20 border border-green-400 rounded-xl p-4 text-center">
                <FaCircleCheck className="text-3xl text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Welcome to our weekly newsletter!</p>
                <p className="text-white/80 text-sm mt-1">Thank you for subscribing.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <p className="text-white/80 text-sm">
                  Get updates on our programs, events, and impact stories.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition flex items-center gap-2"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
                <p className="text-xs text-white/60">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Darker Blue */}
      <div className="bg-cyan-700 border-t border-cyan-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} Nihri&apos;s hope. All rights reserved. | 501(c)(3) Nonprofit Organization
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-white/70 hover:text-brand-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-brand-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-white/70 hover:text-brand-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
