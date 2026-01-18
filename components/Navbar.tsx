'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DonateButton from './DonateButton';
import { 
  FaPhone, 
  FaEnvelope, 
  FaXTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaChevronDown,
  FaBars,
  FaXmark
} from 'react-icons/fa6';

// Mobile Menu Subcomponent
const MobileNavItem = ({ title, items }: { 
  title: string; 
  items: { label: string; href: string; description: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200/20 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 px-6 text-white font-bold"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="bg-cyan-700/30 px-4 pb-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  const navItems = {
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
      { label: 'ESL Education', href: '/programs/esl' },
      { label: 'Health Services', href: '/programs/health' },
      { label: 'Advocacy', href: '/programs/advocacy' },
    ],
    getInvolved: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Health Referral', href: '/referral' },
      { label: 'ESL Student Onboarding', href: '/esl-onboarding' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <>
      {/* Top Info Bar - HIDE PHONE/EMAIL ON MOBILE */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        scrolledDown ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="bg-cyan-600/95 backdrop-blur-md h-14 flex items-center justify-between px-6 md:px-12 border-b border-white/20">
          {/* HIDDEN ON MOBILE - Show only on md+ */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+2036759395" className="flex items-center gap-2 text-white text-sm hover:text-brand-primary transition-colors">
              <FaPhone className="text-brand-primary" />
              <span className="font-semibold">+(203) 675 93 95</span>
            </a>
            <a href="mailto:info@nihri.com" className="flex items-center gap-2 text-white text-sm hover:text-brand-primary transition-colors">
              <FaEnvelope className="text-brand-primary" />
              <span className="font-semibold">info@nihri.com</span>
            </a>
          </div>

          {/* Social Icons - Always visible */}
          <div className="flex items-center gap-5">
            <a href="#" aria-label="X/Twitter" className="text-white hover:text-brand-primary transition-colors hover:scale-110">
              <FaXTwitter size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="text-white hover:text-brand-primary transition-colors hover:scale-110">
              <FaFacebookF size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="text-white hover:text-brand-primary transition-colors hover:scale-110">
              <FaInstagram size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white hover:text-brand-primary transition-colors hover:scale-110">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="text-white hover:text-brand-primary transition-colors hover:scale-110">
              <FaYoutube size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Nav - Creamy Background */}
      <nav className={`fixed left-0 right-0 z-40 transition-transform duration-300 ${
        scrolledDown ? 'top-0' : 'top-[56px]'
      } ${scrolledDown ? '-translate-y-0' : 'translate-y-0'}`}>
        <div className="bg-brand-background/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-20">
            
            {/* Logo + Title */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-white/50">
                <Image 
                  src="/Nihiri_logo.jpg"
                  alt="Nihiri Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-black tracking-tight leading-tight">
                  New International Hope
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  For Refugees And Immigrants
                </p>
              </div>
            </Link>

            {/* DESKTOP MENU - Hidden on mobile */}
            <div className="hidden xl:flex items-center h-full gap-1">
              {/* About Mega Menu */}
              <div className="relative group h-full">
                <button className="flex items-center gap-1 px-6 h-full text-black font-extrabold text-base hover:text-brand-primary transition-all">
                  About
                  <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full w-96 bg-brand-background border border-gray-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {navItems.about.map((item) => (
                      <Link key={item.href} href={item.href} className="p-3 hover:bg-white rounded-lg text-sm font-medium">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Events */}
              <div className="relative group h-full">
                <button className="flex items-center gap-1 px-6 h-full text-black font-extrabold text-base hover:text-brand-primary transition-all">
                  Events
                  <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full w-64 bg-brand-background border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="flex flex-col p-2">
                    {navItems.events.map((item) => (
                      <Link key={item.href} href={item.href} className="p-3 hover:bg-white rounded-lg text-sm font-medium">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Programs */}
              <div className="relative group h-full">
                <button className="flex items-center gap-1 px-6 h-full text-black font-extrabold text-base hover:text-brand-primary transition-all">
                  Programs
                  <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full w-64 bg-brand-background border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="flex flex-col p-2">
                    {navItems.programs.map((item) => (
                      <Link key={item.href} href={item.href} className="p-3 hover:bg-white rounded-lg text-sm font-medium">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Get Involved */}
              <div className="relative group h-full">
                <button className="flex items-center gap-1 px-6 h-full text-black font-extrabold text-base hover:text-brand-primary transition-all">
                  Get Involved
                  <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full w-64 bg-brand-background border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="flex flex-col p-2">
                    {navItems.getInvolved.map((item) => (
                      <Link key={item.href} href={item.href} className="p-3 hover:bg-white rounded-lg text-sm font-medium">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Contact Link */}
              <Link href="/contact" className="hidden lg:block text-black font-extrabold hover:text-brand-primary transition-colors">
                Contact Us
              </Link>
              {/* HIDDEN ON MOBILE - Donate Button */}
              <div className="hidden md:block">
                <DonateButton />
              </div>
              
              {/* MOBILE HAMBURGER - Only visible on mobile */}
              <button
                className="md:hidden p-2 text-black hover:text-brand-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <div className={`
          fixed inset-x-0 top-[140px] bottom-0 bg-cyan-700 text-white z-30
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}>
          <div className="h-full overflow-y-auto">
            <div className="py-8">
              <MobileNavItem title="About" items={navItems.about.map(i => ({ ...i, description: '' }))} />
              <MobileNavItem title="Events" items={navItems.events.map(i => ({ ...i, description: '' }))} />
              <MobileNavItem title="Programs" items={navItems.programs.map(i => ({ ...i, description: '' }))} />
              <MobileNavItem title="Get Involved" items={navItems.getInvolved.map(i => ({ ...i, description: '' }))} />
              
              {/* Mobile Donate Button in Menu */}
              <div className="px-6 py-6 border-t border-white/20">
                <DonateButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}