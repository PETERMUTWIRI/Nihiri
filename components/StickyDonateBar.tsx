'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaHeart, FaXmark } from 'react-icons/fa6';

export default function StickyDonateBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-[80px] md:top-[100px] left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <FaHeart className="w-5 h-5 text-brand-text" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    Help us support refugee families
                  </p>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Your donation provides ESL classes, health navigation, and advocacy services.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                >
                  <FaHeart className="w-4 h-4" />
                  Donate
                </Link>
                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
                  aria-label="Dismiss"
                >
                  <FaXmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
