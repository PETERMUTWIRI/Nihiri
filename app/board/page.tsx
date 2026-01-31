'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';
type Member = {
  id: number;
  name: string;
  role: string;
  img: string;
  bio: string;
  email?: string;
  linkedin?: string;
};

const board: Member[] = [
  {
    id: 1,
    name: 'Jane Kinity',
    role: 'Founder & Executive Director',
    img: '/images/board/jane-kinity.jpg',
    bio: 'Jane arrived in New Haven in 2000 and has spent two decades advocating for refugee families. She serves as Connecticut’s Refugee Congress Delegate and was the 2025 Elena’s Light Leadership Award recipient.',
    email: 'jane@nihri.com',
    linkedin: 'https://linkedin.com/in/jane-kinity',
  },
  {
    id: 2,
    name: 'Dr. Amina Hassan',
    role: 'Board Chair',
    img: '/images/board/amina-hassan.jpg',
    bio: 'A family-medicine physician at Yale New Haven Hospital. Dr. Hassan oversees our health-navigation program and brings front-line insight into refugee health disparities.',
    linkedin: 'https://linkedin.com/in/amina-hassan',
  },
  {
    id: 3,
    name: 'Carlos Martínez',
    role: 'Treasurer',
    img: '/images/board/carlos-martinez.jpg',
    bio: 'CPA and partner at a New Haven accounting firm. Carlos ensures fiscal transparency and guides our annual budgeting process.',
  },
  {
    id: 4,
    name: 'Rebecca Lee',
    role: 'Secretary',
    img: '/images/board/rebecca-lee.jpg',
    bio: 'An attorney specializing in immigration law. Rebecca keeps board minutes and leads our pro-bono legal clinic partnerships.',
    linkedin: 'https://linkedin.com/in/rebecca-lee-esq',
  },
  {
    id: 5,
    name: 'Rev. Michael Osei',
    role: 'Community Liaison',
    img: '/images/board/michael-osei.jpg',
    bio: 'Pastor of Dwight Church and former refugee from Ghana. Rev. Osei amplifies refugee voices in faith-based coalitions.',
  },
  {
    id: 6,
    name: 'Dr. Laila Al-Salam',
    role: 'Education Advisor',
    img: '/images/board/laila-al-salam.jpg',
    bio: 'Professor of TESOL at Southern Connecticut State. Laila designs our ESL curriculum and trains volunteer tutors.',
    linkedin: 'https://linkedin.com/in/laila-al-salam',
  },
  {
    id: 7,
    name: 'Nadia Ibrahim',
    role: 'Youth Representative',
    img: '/images/board/nadia-ibrahim.jpg',
    bio: 'Former ESL student and current UConn sophomore. Nadia chairs our youth advisory council and coordinates peer mentorship.',
  },
  {
    id: 8,
    name: 'Mark Thompson',
    role: 'Development Advisor',
    img: '/images/board/mark-thompson.jpg',
    bio: 'Ex-fundraising director at Save the Children. Mark crafts donor strategy and grant proposals.',
    linkedin: 'https://linkedin.com/in/mark-thompson-fundraising',
  },
];

export default function BoardPage() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="py-16 md:py-24 px-6 md:px-12 text-center bg-gradient-to-b from-brand-primary/20 to-brand-background">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Board of Directors</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Meet the leaders who guide our mission and ensure every refugee family thrives.
        </p>
      </section>

      {/* GRID */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {board.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white group-hover:ring-brand-primary transition">
                <Image
                  src={m.img}
                  alt={m.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-extrabold text-gray-900">{m.name}</h3>
              <p className="text-sm text-blue-600 font-semibold">{m.role}</p>
            </button>
          ))}
        </div>
      </section>
      {/* LAST SECTION */}
      <NewsletterCTA
        title="Stay up to date with the latest  at"
        subtitle="New International Hope\nFor Refugees And Immigrants"
      />

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            {/* panel */}
            <motion.div
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl z-50 p-6 md:p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-brand-primary">
                    <Image
                      src={active.img}
                      alt={active.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{active.name}</h2>
                    <p className="text-blue-600 font-semibold">{active.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="text-gray-400 hover:text-black transition"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{active.bio}</p>

              <div className="flex items-center gap-4">
                {active.email && (
                  <a
                    href={`mailto:${active.email}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <FaEnvelope /> Email
                  </a>
                )}
                {active.linkedin && (
                  <a
                    href={active.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <FaLinkedinIn /> LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

