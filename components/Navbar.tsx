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
  FaX
} from 'react-icons/fa6';

// DESKTOP: Original NavItem stays exactly the same
const NavItem = ({ title, items }: { 
  title: string; 
  items: { label: string; href: string; description: string }[];
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div 
      className="relative group h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="flex items-center gap-1 px-6 h-full text-black font-extrabold text-base hover:text-brand-primary transition-all border-b-2 border-transparent hover:border-brand-primary">
        {title}
        <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
      </button>

      {/* DESKTOP MEGA MENU – Untouched */}
      {open && (
        <div 
          className="fixed left-0 right-0 top-full w-full bg-brand-background border-b border-gray-200 shadow-2xl z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-2">
            <div className="grid w-full gap-2 grid-cols-4">
              <div className="col-span-3 grid grid-cols-3 gap-2">
                {items.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="relative p-2 rounded-sm hover:bg-white transition-all border-l-4 border-transparent hover:border-brand-primary bg-transparent group/item"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-brand-primary/40 group-hover/item:text-brand-primary transition-colors mt-0.5 flex-shrink-0">
                        {/* Icon placeholder */}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-black text-sm mb-0.5 leading-snug truncate">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 text-xs leading-snug line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider mb-3">
                  Featured
                </h4>
                <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  <Image 
                    src="/images/blog/latest.jpg"
                    alt="Latest update"
                    width={300}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-extrabold text-brand-text mb-2 text-sm">
                  Impact Story
                </h5>
                <p className="text-gray-600 text-xs mb-3">
                  See how we're changing lives
                </p>
                <Link 
                  href="/blog"
                  className="text-brand-primary font-extrabold text-xs hover:underline inline-flex items-center gap-1"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // MOBILE: Close menu on resize up
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrolledDown(true);
        setMobileOpen(false); // Close mobile menu when scrolling down
      } else {
        setScrolledDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = {
    about: [
      { label: 'About Us', href: '/#mission' },
      { label: 'Our History', href: '/#history' },
      { label: 'Board of Directors', href: '/#board' },
      { label: 'Staff', href: '/#staff' },
      { label: 'Annual Reports', href: '/#reports' },
      { label: 'Blog & News', href: '/#blog' },
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
      { label: 'ESL Onboarding', href: '/esl-onboarding' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <>
      {/* Top Info Bar - HIDDEN ON MOBILE */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        scrolledDown ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="bg-cyan-600/95 backdrop-blur-md h-14 flex items-center justify-between px-6 md:px-12 border-b border-white/20">
          {/* HIDDEN ON MOBILE */}
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

          {/* Social Icons */}
          <div className="flex items-center gap-5 ml-auto">
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

      {/* Main Nav */}
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
              <NavItem title="About" items={[
                { label: 'About Us', href: '/about', description: 'Learn about who we are and what we do.' },
                { label: 'Our History', href: '/history', description: 'Learn how we got here.' },
                { label: 'Board of Directors', href: '/board', description: 'Discover our board.' },
                { label: 'Staff', href: '/staff', description: 'Meet all the people that make us happen.' },
                { label: 'Annual Reports', href: '/reports', description: 'View our annual reports.' },
                { label: 'Blog & News', href: '/blog', description: 'Read the latest from our blog.' },
              ]} />
              
              <NavItem title="Events" items={[
                { label: 'Upcoming Events', href: '/events/upcoming', description: 'Join us at our next event.' },
                { label: 'Past Events', href: '/events/past', description: 'See photos and recaps.' },
              ]} />
              
              <NavItem title="Programs" items={[
                { label: 'ESL Education', href: '/programs/esl', description: 'English language classes for all levels.' },
                { label: 'Health Services', href: '/programs/health', description: 'Medical referrals and wellness programs.' },
                { label: 'Advocacy', href: '/programs/advocacy', description: 'Legal support and community representation.' },
              ]} />
              
              <NavItem title="Get Involved" items={[
                { label: 'Volunteer', href: '/volunteer', description: 'Join our volunteer team.' },
                { label: 'Health Referral', href: '/referral', description: 'Refer someone in need of health services.' },
                { label: 'ESL Student Onboarding', href: '/esl-onboarding', description: 'Start your English learning journey.' },
                { label: 'Contact Us', href: '/contact', description: 'Get in touch with our team.' },
              ]} />
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
                {mobileOpen ? <FaX size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER - Slide in from right */}
        <div className={`
          fixed inset-y-0 right-0 w-80 bg-cyan-700 text-white z-30
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden h-screen overflow-y-auto
        `}>
          <div className="py-8">
            {/* Menu Header */}
            <div className="px-6 pb-6 border-b border-white/20 mb-4">
              <h3 className="text-xl font-black text-white">Menu</h3>
            </div>
            
            {/* Mobile Accordion Items */}
            <div className="space-y-1">
              {/* About Section */}
              <MobileNavItem title="About" items={navItems.about} />
              {/* Events Section */}
              <MobileNavItem title="Events" items={navItems.events} />
              {/* Programs Section */}
              <MobileNavItem title="Programs" items={navItems.programs} />
              {/* Get Involved Section */}
              <MobileNavItem title="Get Involved" items={navItems.getInvolved} />
            </div>
            
            {/* Mobile Donate Button in Menu */}
            <div className="px-6 py-6 border-t border-white/20">
              <div className="w-full">
                <DonateButton />
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop when mobile menu is open */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </nav>
    </>
  );
}

// MOBILE ONLY: Accordion component for mobile drawer
function MobileNavItem({ title, items }: { 
  title: string; 
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-4 px-6 text-white font-bold hover:bg-white/10 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pl-6 pr-4 pb-3">
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
}