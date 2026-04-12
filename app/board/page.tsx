'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';


type Member = {
  id: number;
  name: string;
  role: string;
  img: string;
  bio: string;
  quote?: string;
  email?: string;
  linkedin?: string;
};

const board: Member[] = [
  {
    id: 1,
    name: 'Jane Kinity',
    role: 'Founder & Executive Director',
    img: '/images/employees/Jane-Kinity.avif',
    bio: 'Refugee Congress Woman for the state of Connecticut, Elected democrat city of New Haven town committee, Elected Ward 2 Co-chair 10 years, Appointed by the Court as Conservator Middleton Court. Jane Kinity moved to New Haven, Connecticut in 2000.',
    quote: 'I am passionate about helping others succeed and improve their lives. I believe that God opened the door for me so that I can do the same for others.',
    email: 'jane@nihri.com',
  },
  {
    id: 2,
    name: 'Eshe Abood',
    role: 'Vice Chair',
    img: '/images/employees/Eshe-Abood.avif',
    bio: 'Eshe Abood brings a wealth of experience and a deep commitment to humanitarian causes to her new role as Vice Chair. With a background in social work and international development, Eshe has dedicated her career to advocating for the rights and well-being of displaced individuals and marginalized communities around the globe.',
  },
  {
    id: 3,
    name: 'Ann Mbugwa',
    role: 'Secretary',
    img: '/images/employees/Ann-Mbugwa.avif',
    bio: 'Anne Mbugua graduated with BSBA in Human Resource Management on May 7, 2022. She believes that determined people working together can accomplish anything. Member of SHRM RI Society for Human Resource Management.',
  },
  {
    id: 4,
    name: 'Joseph Kazadi',
    role: 'Vice-President',
    img: '/images/employees/Joseph-Kazadi.avif',
    bio: 'Joseph Kazadi is a machine operator for Towels laboratories LTD from the Democratic Republic of Congo. He is an active member in his community, volunteering for Old Lyme fire department. He also serves as Associate Refugee Congress Delegate of Connecticut.',
    quote: 'As Vice-President, I aim to help my community come together and lead us to a happy life.',
  },
];

export default function BoardPage() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <div className="min-h-screen bg-brand-background text-render-premium">
      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/kinity6.webp"
            alt="Board of Directors Background"
            fill
            className="object-cover"
            priority
          />
          {/* White Overlay for readability - 85% opacity like homepage */}
          <div className="absolute inset-0 bg-white/85"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
          <span className="kicker-cyan mb-6 block">Leadership</span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-editorial text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6"
          >
            Board of <span className="heading-accent-cyan">Directors</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle text-gray-600 max-w-2xl mx-auto"
          >
            Meet the dedicated leaders who guide our mission with compassion and ensure every refugee family has the support they need to thrive.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <span className="inline-block w-20 h-1 bg-cyan-500 rounded-full"></span>
          </motion.div>
        </div>
      </section>

      {/* BOARD GRID */}
      <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {board.map((member, index) => (
            <motion.button
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActive(member)}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 text-left overflow-hidden border border-cyan-100 hover:border-cyan-300"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-cyan-50 group-hover:ring-cyan-200 transition-all duration-300 shadow-lg">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="card-title-cyan text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-600 mt-1 uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-3 line-clamp-3 leading-relaxed body-editorial">
                    {member.bio}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity btn-text">
                    Read more 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-20 px-6 md:px-12 bg-cyan-50/50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="kicker-cyan mb-4 block">Our Commitment</span>
          <div className="hr-cyan my-6 mx-auto"></div>
          <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-6">
            Guided by <span className="heading-accent-cyan">Purpose</span>
          </h2>
          <p className="body-editorial text-gray-600 text-lg">
            Our board members bring diverse expertise and a shared passion for empowering refugees and immigrants. 
            Together, they provide strategic direction and ensure we remain true to our mission of creating 
            a welcoming community where everyone can succeed.
          </p>
        </div>
      </section>



      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            {/* Panel */}
            <motion.div
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: '-45%' }}
              animate={{ scale: 1, opacity: 1, y: '-50%' }}
              exit={{ scale: 0.9, opacity: 0, y: '-45%' }}
            >
              {/* Header with gradient */}
              <div className="h-24 bg-gradient-to-br from-cyan-400/30 to-cyan-600/20 relative"></div>
              
              <div className="px-8 pb-8">
                {/* Profile section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 -mt-12">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 scale-105"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                      <Image
                        src={active.img}
                        alt={active.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left mt-2 sm:mt-14">
                    <h2 className="card-title text-2xl text-gray-900">{active.name}</h2>
                    <p className="text-cyan-600 font-medium text-sm uppercase tracking-wider">{active.role}</p>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 transition shadow-sm"
                    aria-label="Close modal"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-6 space-y-4">
                  <p className="body-editorial text-gray-600">{active.bio}</p>
                  
                  {active.quote && (
                    <blockquote className="quote-cyan">
                      <p className="text-gray-700">&ldquo;{active.quote}&rdquo;</p>
                    </blockquote>
                  )}
                </div>

                {/* Contact buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                  {active.email && (
                    <a
                      href={`mailto:${active.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition shadow-sm hover:shadow-md btn-text"
                    >
                      <FaEnvelope size={16} /> 
                      <span>Contact</span>
                    </a>
                  )}
                  {active.linkedin && (
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition shadow-sm hover:shadow-md btn-text"
                    >
                      <FaLinkedinIn size={16} /> 
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
