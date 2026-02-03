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
  FaLocationDot
} from 'react-icons/fa6';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
    // After
    <footer className="bg-cyan-600 text-white relative overflow-hidden">
      {/* Decorative wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-light to-brand-primary opacity-30"></div>
      
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
                    nihiri&apos;s hope
                  </h2>
                  <p className="text-xs text-white/80 font-medium">
                    For Refugees And Immigrants
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              nihiri&apos;s hope empowers refugee and immigrant families with the tools, education, 
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

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-black text-brand-primary mb-6 uppercase tracking-wider">
              Contact Us
            </h4>
            
            <div className="space-y-4">
              <a href="mailto:info@nihri.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <FaEnvelope className="text-brand-primary" />
                <span className="text-sm font-medium">info@nihri.com</span>
              </a>
              
              <a href="mailto:janetk26@yahoo.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <FaEnvelope className="text-brand-primary" />
                <span className="text-sm font-medium">janetk26@yahoo.com</span>
              </a>
              
              <a href="mailto:newinternationalhope@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <FaEnvelope className="text-brand-primary" />
                <span className="text-sm font-medium">newinternationalhope@gmail.com</span>
              </a>

              <a href="tel:+2036759395" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <FaPhone className="text-brand-primary" />
                <span className="text-sm font-medium">+(203) 675 93 95</span>
              </a>

              <div className="flex items-start gap-3 text-white/80">
                <FaLocationDot className="text-brand-primary mt-1" />
                <span className="text-sm font-medium leading-relaxed">
                  475 Elm St.<br />
                  New Haven, CT 06511<br />
                  United States
                </span>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom Bar - Darker Blue */}
      <div className="bg-cyan-700 border-t border-cyan-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear} nihiri&apos;s hope. All rights reserved. | 501(c)(3) Nonprofit Organization
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