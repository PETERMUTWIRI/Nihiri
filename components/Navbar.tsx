'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import DonateButton from './DonateButton';
import { useLatestPost, BlogPost } from '@/lib/hooks/useLatestPost';
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
  FaX,
  FaSun,
  FaMoon,
} from 'react-icons/fa6';

/* ---------- TYPES ---------- */
interface NavItemType {
  label: string;
  href: string;
  description: string;
}

interface NavCategory {
  about: NavItemType[];
  events: NavItemType[];
  programs: NavItemType[];
  getInvolved: NavItemType[];
}

/* ---------- 1. MICRO-BRAND ANIMATION ---------- */
const LogoMark = () => (
  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-white/50 group-hover:scale-110 transition-transform duration-300">
    <motion.div
      whileHover={{ rotate: 18 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Image
        src="/Nihiri_logo.jpg"
        alt="Nihiri Logo"
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </motion.div>
    <motion.div
      className="absolute inset-0 rounded-full ring-brand-primary"
      initial={{ scale: 1, opacity: 0 }}
      whileHover={{ scale: 1.15, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

/* ---------- 2. ACTIVE UNDERLINE ---------- */
const ActiveBar = ({ layoutId }: { layoutId: string }) => (
  <motion.div
    layoutId={layoutId}
    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
    initial={false}
    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
  />
);

/* ---------- 3. DYNAMIC FEATURED CARD (Like Blog Pattern) ---------- */
const FeaturedCard = ({ post, isLoading }: { post: BlogPost | null; isLoading: boolean }) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (isLoading) {
    return (
      <motion.div
        className="bg-white/80 dark:bg-brand-dark-card/80 rounded-lg p-4 border border-gray-200 dark:border-brand-dark-border"
        initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div
        className="bg-white/80 dark:bg-brand-dark-card/80 rounded-lg p-4 border border-gray-200 dark:border-brand-dark-border"
        initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider mb-3">
          Featured
        </h4>
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
          <span className="text-4xl">📰</span>
        </div>
        <h5 className="font-extrabold text-brand-text dark:text-brand-dark-text mb-2 text-sm">
          Latest Stories
        </h5>
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">
          Check out our latest blog posts and updates
        </p>
        <Link
          href="/blog"
          className="text-brand-primary font-extrabold text-xs hover:underline inline-flex items-center gap-1"
        >
          View All Posts →
        </Link>
      </motion.div>
    );
  }

  // Format date like blog page
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      className="bg-white/80 dark:bg-brand-dark-card/80 rounded-lg p-4 border border-gray-200 dark:border-brand-dark-border"
      initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">
          Latest Story
        </h4>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">
          {formatDate(post.publishedAt)}
        </span>
      </div>
      
      <Link href={`/blog#${post.slug}`} className="group block">
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden relative">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // Fallback to placeholder on error
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800"><span class="text-3xl">📰</span></div>';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <span className="text-4xl">📰</span>
            </div>
          )}
        </div>
        
        <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-medium mb-2">
          {post.category}
        </span>
        
        <h5 className="font-extrabold text-brand-text dark:text-brand-dark-text mb-2 text-sm line-clamp-2 group-hover:text-brand-primary transition-colors">
          {post.title}
        </h5>
        
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
          {post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 100)}...
        </p>
      </Link>
      
      <Link
        href="/blog"
        className="text-brand-primary font-extrabold text-xs hover:underline inline-flex items-center gap-1"
      >
        Read More →
      </Link>
    </motion.div>
  );
};

/* ---------- 4. MEGA-MENU WITH DYNAMIC FEATURED ---------- */
const NavItem = ({
  title,
  items,
  layoutId,
  featuredPost,
  isLoadingPost,
}: {
  title: string;
  items: NavItemType[];
  layoutId: string;
  featuredPost: BlogPost | null;
  isLoadingPost: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  }, []);

  return (
    <div
      className="relative group h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button className="relative flex items-center gap-1 px-6 h-full text-black dark:text-white font-extrabold text-base hover:text-brand-primary transition-colors">
        {title}
        <FaChevronDown
          className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}
        />
        {open && <ActiveBar layoutId={layoutId} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 right-0 top-full w-full bg-brand-background dark:bg-brand-dark-bg border-b border-gray-200 dark:border-brand-dark-border shadow-2xl z-50"
            initial={{ height: 0, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
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
                      className="relative p-2 rounded-sm hover:bg-white dark:hover:bg-brand-dark-card transition-all border-l-4 border-transparent hover:border-brand-primary bg-transparent group/item"
                      prefetch
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-brand-primary/40 group-hover/item:text-brand-primary transition-colors mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-extrabold text-black dark:text-white text-sm mb-0.5 leading-snug truncate">
                            {item.label}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs leading-snug line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Dynamic Featured Section */}
                <FeaturedCard post={featuredPost} isLoading={isLoadingPost} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- 5. MOBILE DRAWER WITH REFUGEE-WAVE ---------- */
const MobileDrawer = ({ open, setOpen, navItems, featuredPost }: { 
  open: boolean; 
  setOpen: (v: boolean) => void; 
  navItems: NavCategory;
  featuredPost: BlogPost | null;
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-80 bg-cyan-700 text-white z-30 md:hidden h-screen overflow-y-auto"
            initial={shouldReduceMotion ? { x: '100%' } : { x: '100%', clipPath: 'circle(0% at 100% 0)' }}
            animate={shouldReduceMotion ? { x: 0 } : { x: 0, clipPath: 'circle(150% at 100% 0)' }}
            exit={shouldReduceMotion ? { x: '100%' } : { x: '100%', clipPath: 'circle(0% at 100% 0)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 40 }}
          >
            <div className="py-8">
              <div className="px-6 pb-6 border-b border-white/20 mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black text-white">Menu</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-brand-primary transition-colors p-2 -mr-2"
                  aria-label="Close menu"
                >
                  <FaX size={24} />
                </button>
              </div>
              
              {/* Mobile Featured Section */}
              {featuredPost && (
                <div className="px-6 pb-4 border-b border-white/20">
                  <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                    Latest Story
                  </h4>
                  <Link 
                    href={`/blog#${featuredPost.slug}`}
                    onClick={() => setOpen(false)}
                    className="block bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    {featuredPost.cover && (
                      <img
                        src={featuredPost.cover}
                        alt={featuredPost.title}
                        className="w-full h-24 object-cover rounded mb-2"
                        loading="lazy"
                      />
                    )}
                    <h5 className="font-bold text-sm line-clamp-2">{featuredPost.title}</h5>
                    <span className="text-xs text-white/70">{featuredPost.category}</span>
                  </Link>
                </div>
              )}
              
              <div className="space-y-1">
                <MobileAccordion title="About" items={navItems.about} />
                <MobileAccordion title="Events" items={navItems.events} />
                <MobileAccordion title="Programs" items={navItems.programs} />
                <MobileAccordion title="Get Involved" items={navItems.getInvolved} />
              </div>
              <div className="px-6 py-6 border-t border-white/20">
                <DonateButton />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ---------- 6. MOBILE ACCORDION ---------- */
const MobileAccordion = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-4 px-6 text-white font-bold hover:bg-white/10 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}>
          <FaChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="overflow-hidden"
          >
            <div className="pl-6 pr-4 pb-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- 7. ENTERPRISE THEME TOGGLE ---------- */
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    setMounted(true);
    
    const initializeTheme = () => {
      // Check localStorage first
      const saved = localStorage.getItem('nihiri-theme') as 'light' | 'dark' | null;
      
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('nihiri-theme', initialTheme);
      }
    };

    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('nihiri-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('nihiri-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="ml-4 p-2 rounded-lg text-white hover:text-brand-primary hover:bg-white/10 transition-all"
        aria-label="Toggle theme"
      >
        <FaMoon size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded-lg text-white hover:text-brand-primary hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <FaMoon size={18} className="text-white" />
        ) : (
          <FaSun size={18} className="text-brand-primary" />
        )}
      </motion.div>
    </button>
  );
};

/* ---------- 8. MAIN NAVBAR ---------- */
export default function Navbar() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { post: featuredPost, isLoading: isLoadingPost } = useLatestPost();
  const router = useRouter();

  /* restore scroll lock */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolledDown(y > lastScrollY && y > 96);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: NavCategory = {
    about: [
      { label: 'About Us', href: '/about', description: 'Learn about who we are and what we do.' },
      { label: 'Our History', href: '/history', description: 'Learn how we got here.' },
      { label: 'Board of Directors', href: '/board', description: 'Discover our board.' },
      { label: 'Staff', href: '/staff', description: 'Meet all the people that make us happen.' },
      { label: 'Annual Reports', href: '/reports', description: 'View our annual reports.' },
      { label: 'Blog & News', href: '/blog', description: 'Read the latest from our blog.' },
    ],
    events: [
      { label: 'Upcoming Events', href: '/events', description: 'Join us at our next event.' },
      { label: 'Past Events', href: '/events/past', description: 'See photos and recaps.' },
    ],
    programs: [
      { label: 'ESL Education', href: '/programs/esl', description: 'English language classes for all levels.' },
      { label: 'Health Services', href: '/programs/health', description: 'Medical referrals and wellness programs.' },
      { label: 'Advocacy', href: '/programs/advocacy', description: 'Legal support and community representation.' },
    ],
    getInvolved: [
      { label: 'Volunteer', href: '/volunteer', description: 'Join our volunteer team.' },
      { label: 'Health Referral', href: '/referral', description: 'Refer someone in need of health services.' },
      { label: 'ESL Student Onboarding', href: '/esl-onboarding', description: 'Start your English learning journey.' },
      { label: 'Contact Us', href: '/contact', description: 'Get in touch with our team.' },
    ],
  };

  /* ---------- DONATE BUTTON HEARTBEAT ---------- */
  const DonatePulse = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.div
        animate={shouldReduceMotion ? {} : { scale: [1, 1.06, 1] }}
        transition={{ repeat: 3, repeatType: 'loop', duration: 0.8, ease: 'easeInOut' }}
      >
        <DonateButton />
      </motion.div>
    );
  };

  return (
    <>
      {/* ---------- TOP BAR WITH FROST ---------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          scrolledDown ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <motion.div
          className={`bg-cyan-600/95 backdrop-blur-md h-14 flex items-center justify-between px-6 md:px-12 border-b border-white/20 ${
            scrolledDown ? 'bg-cyan-600/80' : ''
          }`}
        >
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
            <ThemeToggle />
          </div>
        </motion.div>
      </header>

      {/* ---------- MAIN NAV ---------- */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-transform duration-300 ${
          scrolledDown ? 'top-0' : 'top-[56px]'
        }`}
      >
        <div className="bg-brand-background/95 dark:bg-brand-dark-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-brand-dark-border shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-20">
            <Link href="/" className="flex items-center gap-4 group">
              <LogoMark />
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex flex-col"
              >
                <h2 className="text-xl font-extrabold text-black dark:text-white tracking-tight leading-tight">
                  New International Hope
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">For Refugees And Immigrants</p>
              </motion.div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden xl:flex items-center h-full gap-1">
              <NavItem 
                title="About" 
                items={navItems.about} 
                layoutId="underline-about" 
                featuredPost={featuredPost}
                isLoadingPost={isLoadingPost}
              />
              <NavItem 
                title="Events" 
                items={navItems.events} 
                layoutId="underline-events" 
                featuredPost={featuredPost}
                isLoadingPost={isLoadingPost}
              />
              <NavItem 
                title="Programs" 
                items={navItems.programs} 
                layoutId="underline-programs" 
                featuredPost={featuredPost}
                isLoadingPost={isLoadingPost}
              />
              <NavItem 
                title="Get Involved" 
                items={navItems.getInvolved} 
                layoutId="underline-getInvolved" 
                featuredPost={featuredPost}
                isLoadingPost={isLoadingPost}
              />
            </div>

            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:block text-black dark:text-white font-extrabold hover:text-brand-primary transition-colors">
                Contact Us
              </Link>
              <div className="hidden md:block">
                <DonatePulse />
              </div>
              <button
                className="md:hidden p-2 text-black dark:text-white hover:text-brand-primary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaX size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        <MobileDrawer 
          open={mobileOpen} 
          setOpen={setMobileOpen} 
          navItems={navItems} 
          featuredPost={featuredPost}
        />
      </nav>
    </>
  );
}
