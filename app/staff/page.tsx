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
  team: string;
  img: string;
  bio: string;
  email?: string;
  linkedin?: string;
  past?: boolean;
};

const staff: Member[] = [
  /* ----- Founder ----- */
  {
    id: 1,
    name: 'Jane Kinity',
    role: 'Founder & Executive Director',
    team: 'Founder',
    img: '/images/staff/jane-kinity.jpg',
    bio: 'Jane started INHRIC at her kitchen table in 2000 and still leads with the mantra “Empowerment through education.”',
    email: 'jane@nihri.com',
  },

  /* ----- Development ----- */
  {
    id: 2,
    name: 'Mark Thompson',
    role: 'Development Director',
    team: 'Development Team',
    img: '/images/staff/mark-thompson.jpg',
    bio: 'Ex-Save the Children fundraiser; crafts grant strategy and donor stewardship.',
    linkedin: 'https://linkedin.com/in/mark-thompson-fundraising',
  },
  {
    id: 3,
    name: 'Sara Lee',
    role: 'Grant Writer',
    team: 'Grant Team',
    img: '/images/staff/sara-lee.jpg',
    bio: 'Award-winning grant writer who has secured over $3 M for refugee programmes.',
    linkedin: 'https://linkedin.com/in/sara-lee-grants',
  },

  /* ----- ESL ----- */
  {
    id: 4,
    name: 'Dr. Laila Al-Salam',
    role: 'ESL Curriculum Lead',
    team: 'ESL Team',
    img: '/images/staff/laila-al-salam.jpg',
    bio: 'Professor of TESOL; designs culturally-responsive English lessons.',
    linkedin: 'https://linkedin.com/in/laila-al-salam',
  },
  {
    id: 5,
    name: 'Carlos Ortega',
    role: 'ESL Instructor',
    team: 'ESL Team',
    img: '/images/staff/carlos-ortega.jpg',
    bio: 'Certified ESL teacher with 8 years of classroom experience.',
  },

  /* ----- Health ----- */
  {
    id: 6,
    name: 'Dr. Amina Hassan',
    role: 'Health-Navigation Director',
    team: 'Health Team',
    img: '/images/staff/amina-hassan.jpg',
    bio: 'Family-medicine physician; oversees medical accompaniment and health-literacy workshops.',
    linkedin: 'https://linkedin.com/in/amina-hassan-md',
  },
  {
    id: 7,
    name: 'Nurse Rachel Green',
    role: 'Community Health Nurse',
    team: 'Health Team',
    img: '/images/staff/rachel-green.jpg',
    bio: 'RN who conducts blood-pressure screenings and vaccine drives.',
  },

  /* ----- Legal ----- */
  {
    id: 8,
    name: 'Rebecca Lee',
    role: 'Staff Attorney',
    team: 'Legal Advocacy Team',
    img: '/images/staff/rebecca-lee.jpg',
    bio: 'Immigration-law specialist; leads asylum clinics and Know-Your-Rights sessions.',
    linkedin: 'https://linkedin.com/in/rebecca-lee-esq',
  },

  /* ----- Social Media ----- */
  {
    id: 9,
    name: 'Maya Patel',
    role: 'Social Media Manager',
    team: 'Social Media Team',
    img: '/images/staff/maya-patel.jpg',
    bio: 'Digital-storytelling expert; grew our Instagram following 400 % in one year.',
    linkedin: 'https://linkedin.com/in/maya-patel-sm',
  },

  /* ----- Past Staff ----- */
  {
    id: 10,
    name: 'John Smith',
    role: 'Former Grant Intern',
    team: 'Past Staff',
    img: '/images/staff/john-smith.jpg',
    bio: 'Columbia SIPA graduate; now a program officer at IRC. We miss you, John!',
    past: true,
  },
  {
    id: 11,
    name: 'Linda Brown',
    role: 'Former ESL Volunteer',
    team: 'Past Staff',
    img: '/images/staff/linda-brown.jpg',
    bio: 'Retired teacher who gave 3 years of Saturday mornings to our students.',
    past: true,
  },
];

const teams = ['All', 'Founder', 'Development Team', 'Grant Team', 'ESL Team', 'Health Team', 'Legal Advocacy Team', 'Social Media Team', 'Past Staff'];

export default function StaffPage() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<Member | null>(null);

  const filtered = filter === 'All' ? staff : staff.filter((s) => s.team === filter);

  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-brand-primary/20 to-brand-background">
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Our Staff</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Meet the passionate people who power our programmes every day.
        </p>
      </section>

      {/* FILTER PILLS */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-sm font-extrabold transition ${
                filter === t
                  ? 'bg-brand-primary text-black'
                  : 'bg-white text-gray-900 hover:bg-brand-primary/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filtered.map((m) => (
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
              <p className="text-sm text-brand-primary font-semibold">{m.role}</p>
              {m.past && (
                <span className="mt-2 inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">Past Staff</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* MODAL (same as Board page) */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
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
                    <p className="text-brand-primary font-semibold">{active.role}</p>
                    {active.past && <span className="text-xs text-gray-500">Past Staff</span>}
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

      {/* NEWSLETTER - tight to footer */}
      <NewsletterCTA
        title="Stay up to date with the latest  at"
        subtitle="New International Hope\nFor Refugees And Immigrants"
      />
    </div>
  );
}