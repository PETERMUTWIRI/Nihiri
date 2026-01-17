'use client';

import { useState } from 'react';
import Link from 'next/link';
import DonateButton from './DonateButton';

const NavItem = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="px-4 py-4 text-white hover:bg-white/10 transition-colors font-medium">
        {title}
      </button>
      {open && (
        <div className="nav-dropdown">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50">
      {/* Top Social Bar */}
      <div className="bg-cyan-500 h-10 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm font-medium">Follow Us:</span>
          <div className="flex space-x-3">
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
                className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs hover:bg-white/30 transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
        <div className="text-white text-sm">
          📞 (555) 123-4567 | ✉️ info@refugeesite.org
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-brand-neutral shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white py-4">
            Refugee Foundation
          </Link>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center">
            <NavItem title="About" items={[
              { label: 'About Us', href: '/about' },
              { label: 'Our History', href: '/history' },
              { label: 'Board of Directors', href: '/board' },
              { label: 'Staff', href: '/staff' },
              { label: 'Annual Reports', href: '/reports' },
              { label: 'Blog & News', href: '/blog' },
            ]} />
            
            <NavItem title="Events" items={[
              { label: 'Upcoming Events', href: '/events/upcoming' },
              { label: 'Past Events', href: '/events/past' },
            ]} />
            
            <NavItem title="Programs" items={[
              { label: 'ESL', href: '/programs/esl' },
              { label: 'Health', href: '/programs/health' },
              { label: 'Advocacy', href: '/programs/advocacy' },
            ]} />
            
            <NavItem title="Get Involved" items={[
              { label: 'Volunteer', href: '/volunteer' },
              { label: 'Health Referral', href: '/referral' },
              { label: 'ESL Student Onboarding', href: '/esl-onboarding' },
              { label: 'Contact Us', href: '/contact' },
            ]} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="text-white hover:text-brand-light transition-colors font-medium">
              Contact Us
            </Link>
            <DonateButton />
          </div>
        </div>
      </div>
    </nav>
  );
}