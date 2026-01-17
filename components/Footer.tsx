'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <footer className="bg-brand-neutral text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <h3 className="text-3xl font-bold text-brand-primary">Nihiri</h3>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering refugee and immigrant families with the tools, education, and support 
              they need to build independent, thriving lives in our community.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { name: 'X', href: '#' },
                { name: 'FB', href: '#' },
                { name: 'IG', href: '#' },
                { name: 'IN', href: '#' },
                { name: 'YT', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           text-white hover:bg-brand-primary hover:text-brand-neutral 
                           transition-all duration-300 hover:scale-110"
                  aria-label={`${social.name} profile`}
                >
                  <span className="text-xs font-bold">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Mobile Accordion) */}
          <div>
            <h4 className="text-xl font-bold text-brand-primary mb-6">
              Quick Links
            </h4>
            
            {/* Mobile Accordion Button */}
            <button
              className="md:hidden flex items-center justify-between w-full text-left 
                         text-white font-medium py-3 border-b border-white/20"
              onClick={() => toggleSection('quick')}
              aria-expanded={openSection === 'quick'}
            >
              <span>Navigate</span>
              <span className="text-brand-primary">
                {openSection === 'quick' ? '−' : '+'}
              </span>
            </button>

            {/* Desktop/Mobile Content */}
            <div className={`
              ${openSection === 'quick' ? 'block' : 'hidden'} 
              md:block mt-4 md:mt-0
            `}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ...footerLinks.about.slice(0, 3),
                  ...footerLinks.events,
                  { label: 'Donate', href: '/donate' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-brand-primary transition-colors 
                             text-sm font-medium py-1 block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Programs & Services */}
          <div>
            <h4 className="text-xl font-bold text-brand-primary mb-6">
              Our Programs
            </h4>
            
            <button
              className="md:hidden flex items-center justify-between w-full text-left 
                         text-white font-medium py-3 border-b border-white/20"
              onClick={() => toggleSection('programs')}
              aria-expanded={openSection === 'programs'}
            >
              <span>What We Do</span>
              <span className="text-brand-primary">
                {openSection === 'programs' ? '−' : '+'}
              </span>
            </button>

            <div className={`
              ${openSection === 'programs' ? 'block' : 'hidden'} 
              md:block mt-4 md:mt-0
            `}>
              <ul className="space-y-3">
                {footerLinks.programs.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-brand-primary transition-colors 
                               text-sm font-medium flex items-center group"
                    >
                      <span className="text-brand-primary mr-2 group-hover:mr-3 
                                     transition-all">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="text-xl font-bold text-brand-primary mb-6">
              Contact Us
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <span className="text-brand-primary mt-1 group-hover:scale-110 transition-transform">
                  📧
                </span>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">
                    <a 
                      href="mailto:info@nihri.com" 
                      className="hover:text-brand-primary transition-colors"
                    >
                      info@nihri.com
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm">
                    <a 
                      href="mailto:janetk26@yahoo.com" 
                      className="hover:text-brand-primary transition-colors"
                    >
                      janetk26@yahoo.com
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm">
                    <a 
                      href="mailto:newinternationalhope@gmail.com" 
                      className="hover:text-brand-primary transition-colors"
                    >
                      newinternationalhope@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <span className="text-brand-primary mt-1 group-hover:scale-110 transition-transform">
                  📞
                </span>
                <p className="text-gray-300 text-sm">
                  <a 
                    href="tel:+2036759395" 
                    className="hover:text-brand-primary transition-colors font-medium"
                  >
                    +(203) 675 93 95
                  </a>
                </p>
              </div>

              <div className="flex items-start space-x-3 group">
                <span className="text-brand-primary mt-1 group-hover:scale-110 transition-transform">
                  📍
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  475 Elm St.<br />
                  New Haven, CT 06511<br />
                  United States
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link 
                href="/donate" 
                className="btn-primary w-full text-center inline-block"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Nihiri. All rights reserved. | 501(c)(3) Nonprofit Organization
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-brand-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-brand-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-brand-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}