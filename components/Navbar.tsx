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
  FaCircleInfo,
  FaCalendarDays,
  FaBook,
  FaHeart,
  FaUserGroup,
  FaBuilding,
  FaUsers,
  FaFileLines,
  FaNewspaper,
  FaForward,
  FaBackward,
  FaLayerGroup,
  FaHandHoldingHeart,
  FaIdCard,
  FaAddressBook
} from 'react-icons/fa6';

// Individual icons for each menu item (tightly integrated)
const itemIcons: { [key: string]: React.ReactNode } = {
  'About Us': <FaCircleInfo />,
  'Our History': <FaBackward />,
  'Board of Directors': <FaBuilding />,
  'Staff': <FaUsers />,
  'Annual Reports': <FaFileLines />,
  'Blog & News': <FaNewspaper />,
  'Upcoming Events': <FaForward />,
  'Past Events': <FaCalendarDays />,
  'ESL Education': <FaBook />,
  'Health Services': <FaHeart />,
  'Advocacy': <FaHandHoldingHeart />,
  'Volunteer': <FaUserGroup />,
  'Health Referral': <FaHeart />,
  'ESL Student Onboarding': <FaIdCard />,
  'Contact Us': <FaAddressBook />
};

const useHoverMenu = () => {
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

  return { open, handleEnter, handleLeave };
};

// DYNAMIC COLUMN CALCULATION
const getItemSpan = (count: number) => {
  if (count <= 3) return 'col-span-1';
  if (count <= 6) return 'col-span-2';
  return 'col-span-3';
};

const NavItem = ({ title, items }: { 
  title: string; 
  items: { label: string; href: string; description: string }[];
}) => {
  const { open, handleEnter, handleLeave } = useHoverMenu();
  
  // Calculate optimal layout based on item count
  const itemCount = items.length;
  const columnsClass = itemCount <= 3 ? 'grid-cols-3' : 'grid-cols-3';

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

      {/* DYNAMIC MEGA MENU */}
      {open && (
        <div 
          className="fixed left-0 right-0 top-full w-full bg-brand-background border-b border-gray-200 shadow-2xl z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-2">
            <div className={`grid w-full gap-2 ${
              itemCount <= 3 ? 'grid-cols-4' : 'grid-cols-4'
            }`}>
              
              {/* ITEMS SECTION - Auto-adjusting */}
              <div className={`${getItemSpan(itemCount)} grid gap-2`}>
                {items.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="relative p-2 rounded-sm hover:bg-white transition-all border-l-4 border-transparent hover:border-brand-primary bg-transparent group/item"
                  >
                    {/* Icon - Embedded, not separate */}
                    <div className="flex items-start gap-2">
                      <span className="text-brand-primary/40 group-hover/item:text-brand-primary transition-colors mt-0.5 flex-shrink-0">
                        {itemIcons[item.label]}
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

              {/* FEATURED SECTION - Only if enough items */}
              {itemCount > 2 && (
                <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
                  <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider mb-3">
                    Featured
                  </h4>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                    <Image 
                      src="/images/blog/impact_story.jpg"
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
              )}
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Info Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        scrolledDown ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="bg-cyan-600/95 backdrop-blur-md h-14 flex items-center justify-between px-6 md:px-12 border-b border-white/20">
          <div className="flex items-center gap-6">
            <a href="tel:+2036759395" className="flex items-center gap-2 text-white text-sm hover:text-brand-primary transition-colors">
              <FaPhone className="text-brand-primary" />
              <span className="font-semibold">+(203) 675 93 95</span>
            </a>
            <a href="mailto:info@nihri.com" className="flex items-center gap-2 text-white text-sm hover:text-brand-primary transition-colors">
              <FaEnvelope className="text-brand-primary" />
              <span className="font-semibold">info@nihri.com</span>
            </a>
          </div>
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

      {/* Main Nav */}
      <nav className={`fixed left-0 right-0 z-40 transition-transform duration-300 ${
        scrolledDown ? 'top-0' : 'top-[56px]'
      } ${scrolledDown ? '-translate-y-0' : 'translate-y-0'}`}>
        <div className="bg-brand-background/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-20">
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

            <div className="hidden xl:flex items-center h-full">
              <NavItem 
                title="About" 
                items={[
                  { label: 'About Us', href: '/about', description: 'Learn about who we are and what we do.' },
                  { label: 'Our History', href: '/history', description: 'Learn how we got here.' },
                  { label: 'Board of Directors', href: '/board', description: 'Discover our board.' },
                  { label: 'Staff', href: '/staff', description: 'Meet all the people that make us happen.' },
                  { label: 'Annual Reports', href: '/reports', description: 'View our annual reports.' },
                  { label: 'Blog & News', href: '/blog', description: 'Read the latest from our blog.' },
                ]}
              />
              
              <NavItem 
                title="Events" 
                items={[
                  { label: 'Upcoming Events', href: '/events/upcoming', description: 'Join us at our next event.' },
                  { label: 'Past Events', href: '/events/past', description: 'See photos and recaps.' },
                ]}
              />
              
              <NavItem 
                title="Programs" 
                items={[
                  { label: 'ESL Education', href: '/programs/esl', description: 'English language classes for all levels.' },
                  { label: 'Health Services', href: '/programs/health', description: 'Medical referrals and wellness programs.' },
                  { label: 'Advocacy', href: '/programs/advocacy', description: 'Legal support and community representation.' },
                ]}
              />
              
              <NavItem 
                title="Get Involved" 
                items={[
                  { label: 'Volunteer', href: '/volunteer', description: 'Join our volunteer team.' },
                  { label: 'Health Referral', href: '/referral', description: 'Refer someone in need of health services.' },
                  { label: 'ESL Student Onboarding', href: '/esl-onboarding', description: 'Start your English learning journey.' },
                  { label: 'Contact Us', href: '/contact', description: 'Get in touch with our team.' },
                ]}
              />
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className="hidden lg:block text-black font-extrabold hover:text-brand-primary transition-colors"
              >
                Contact Us
              </Link>
              <DonateButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}