'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function OurStory() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Preview content - first paragraph only
  const previewContent = (
    <p className="text-gray-700 leading-relaxed mb-4 pr-16 md:pr-8">
      <strong className="text-gray-900">Jane Kinity</strong> is the CEO and founder of International New Hope for Refugees and Immigrants. A passionate advocate for displaced communities, she serves as an elected <strong>Refugee Congress Delegate</strong> representing the State of Connecticut.
    </p>
  );

  // Full content - all paragraphs
  const fullContent = (
    <>
      <p className="text-gray-700 leading-relaxed mb-4 pr-16 md:pr-8">
        <strong className="text-gray-900">Jane Kinity</strong> is the CEO and founder of International New Hope for Refugees and Immigrants. A passionate advocate for displaced communities, she serves as an elected <strong>Refugee Congress Delegate</strong> representing the State of Connecticut.
      </p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        She is also an elected <strong>Democratic Delegate</strong> for the City of New Haven and the <strong>Co-Chair of the Democratic Party</strong> for the Dwight neighborhood in New Haven. In addition, she represents the City of New Haven as a Connecticut Delegate for the <strong>Communist Party USA (CPUSA)</strong>.
      </p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        Jane works per diem as a <strong>Swahili translator at IRIS</strong> (Integrated Refugee & Immigrant Services), helping bridge communication gaps for new arrivals. Her dedication has been recognized widely: in 2012, she received an honorary award during the Connecticut Immigration Day Celebration, accompanied by an official statement from Governor Dannel Malloy. She also works at Middle Town private code conservator.
      </p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        A graduate from University of Bridgeport, she is currently pursuing her career in Ashwood University to become a Psychologist and a Chancellor.
      </p>
      
      <p className="text-gray-700 leading-relaxed">
        She holds a <strong>Community Service Award</strong> from her Organization&apos;s Management Team recognizing her outstanding contributions to the Community. Through every role, she remains committed to empowering Refugees and Immigrants, and marginalized Communities across Connecticut and beyond.
      </p>
    </>
  );

  return (
    <section className="py-12 md:py-16 bg-brand-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
            A Journey of Resilience
          </h2>
        </ScrollReveal>

        {/* Founder Statement with Profile Image - Text is primary, image accent on edge */}
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 pr-24 md:pr-32">
              {/* Profile Image - Small, circular, positioned at right edge */}
              <div className="absolute top-8 right-4 md:right-6">
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-brand-primary shadow-lg">
                    <Image
                      src="/images/hero/kinity.jpeg"
                      alt="Jane Kinity"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-1 rounded-full border-2 border-cyan-200/50"></div>
                </div>
              </div>

              {/* Statement Content */}
              <div className="prose prose-lg max-w-none">
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="full"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {fullContent}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {previewContent}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Read More / Read Less Button */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold group transition-colors"
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                  <span className={`transition-transform duration-300 ${isExpanded ? 'group-hover:-translate-y-1' : 'group-hover:translate-y-1'}`}>
                    {isExpanded ? '↑' : '↓'}
                  </span>
                </button>

                <span className="text-gray-300">|</span>

                <Link 
                  href="/history" 
                  className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold group"
                >
                  Our Full History
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Decorative Elements - Visual connection to other sections */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-brand-primary/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
}
