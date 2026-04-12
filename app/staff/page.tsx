'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';

type Member = {
  id: number;
  name: string;
  role: string;
  team: string;
  img: string;
  bio: string;
  quote?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
};

const staff: Member[] = [
  /* ----- Leadership ----- */
  {
    id: 1,
    name: 'Jane Kinity',
    role: 'Founder & Executive Director',
    team: 'Leadership',
    img: '/images/employees/Jane-Kinity.avif',
    bio: 'Refugee Congress Woman for the state of Connecticut, Elected democrat city of New Haven town committee, Elected Ward 2 Co-chair 10 years, Appointed by the Court as Conservator Middleton Court. Jane Kinity moved to New Haven, Connecticut in 2000. She aims to support the community through English literacy, youth mentoring, health promotion, economic development, and counseling.',
    quote: 'I am passionate about helping others succeed and improve their lives. I believe that God opened the door for me so that I can do the same for others.',
    email: 'jane@nihri.com',
  },
  {
    id: 2,
    name: 'Joseph Kazadi',
    role: 'Vice-President',
    team: 'Leadership',
    img: '/images/employees/Joseph-Kazadi.avif',
    bio: 'Joseph Kazadi is a machine operator for Towels laboratories LTD from the Democratic Republic of Congo. He is an active member in his community, volunteering for Old Lyme fire department. He also serves as Associate Refugee Congress Delegate of Connecticut.',
    quote: 'As Vice-President, I aim to help my community come together and lead us to a happy life.',
  },
  {
    id: 3,
    name: 'Eshe Abood',
    role: 'Vice Chair',
    team: 'Leadership',
    img: '/images/employees/Eshe-Abood.avif',
    bio: 'Eshe Abood brings a wealth of experience and a deep commitment to humanitarian causes. With a background in social work and international development, Eshe has dedicated her career to advocating for the rights and well-being of displaced individuals and marginalized communities around the globe.',
  },
  {
    id: 4,
    name: 'Ann Mbugwa',
    role: 'Secretary',
    team: 'Leadership',
    img: '/images/employees/Ann-Mbugwa.avif',
    bio: 'Anne Mbugwa graduated with BSBA in Human Resource Management on May 7, 2022. She believes that determined people working together can accomplish anything. Member of SHRM RI Society for Human Resource Management.',
  },

  /* ----- Case Management ----- */
  {
    id: 5,
    name: 'Annie Phiri',
    role: 'Case Manager',
    team: 'Case Management',
    img: '/images/employees/AnniePhiri.avif',
    bio: 'Annie Phiri provides dedicated case management services to refugees and immigrants in our community. She works directly with families to connect them with essential resources, navigate systems, and overcome barriers to success.',
    quote: 'Do not feel alone, I am here to help.',
  },

  /* ----- Youth Programs ----- */
  {
    id: 6,
    name: 'Martine Kabanga',
    role: 'Youth Coordinator',
    team: 'Youth Programs',
    img: '/images/employees/Martine-Kabanga.avif',
    bio: 'Martine Kabanga leads our youth programs, creating safe spaces and opportunities for young people in the New Haven community. She develops and implements activities that promote leadership, education, and personal growth.',
    quote: 'I want the youth of New Haven to feel safe and heard.',
  },
  {
    id: 7,
    name: 'Mary Njoki',
    role: 'Assistant Youth Coordinator',
    team: 'Youth Programs',
    img: '/images/employees/Mary-Njoki.avif',
    bio: 'Mary Njoki supports youth programming by assisting with activity coordination, mentoring young participants, and helping to build a supportive community environment where youth can thrive.',
    quote: 'We care about the youth in our community.',
  },
];

const teams = ['All', 'Leadership', 'Case Management', 'Youth Programs'];

const teamDescriptions: Record<string, string> = {
  'All': 'Meet our dedicated team working together to support our community.',
  'Leadership': 'Our leadership team guides the organization with vision and dedication.',
  'Case Management': 'Our case managers provide direct support and advocacy for families.',
  'Youth Programs': 'Our youth coordinators create safe spaces and opportunities for young people.',
};

export default function StaffPage() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<Member | null>(null);

  const filtered = filter === 'All' ? staff : staff.filter((s) => s.team === filter);

  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/kinity1.webp"
            alt="Our Team Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg"
          >
            Our <span className="text-brand-primary">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            Meet the passionate people who power our programs every day, 
            dedicated to empowering refugees and immigrants in our community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <span className="inline-block w-20 h-1 bg-brand-primary rounded-full"></span>
          </motion.div>
        </div>
      </section>

      {/* FILTER PILLS */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                filter === t
                  ? 'bg-brand-primary text-black shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-brand-primary/20 shadow-sm hover:shadow'
              }`}
            >
              {t}
            </button>
          ))}
        </motion.div>
        
        {/* Team description */}
        <motion.p 
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-6 max-w-xl mx-auto"
        >
          {teamDescriptions[filter]}
        </motion.p>
      </section>

      {/* GRID */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((member, index) => (
              <motion.button
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setActive(member)}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 text-left"
              >
                {/* Image container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-brand-primary/10 text-brand-primary rounded-full mb-2">
                    {member.team}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                  {member.quote && (
                    <p className="text-gray-500 text-sm mt-2 italic line-clamp-2">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* JOIN US CTA */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 rounded-3xl p-8 md:p-12 text-center border border-brand-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            We are always looking for passionate individuals who want to make a difference 
            in the lives of refugees and immigrants in our community.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-black font-bold rounded-full hover:bg-brand-primary/90 transition shadow-md hover:shadow-lg"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
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
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: '-45%' }}
              animate={{ scale: 1, opacity: 1, y: '-50%' }}
              exit={{ scale: 0.9, opacity: 0, y: '-45%' }}
            >
              {/* Image header */}
              <div className="relative h-48 sm:h-56">
                <Image
                  src={active.img}
                  alt={active.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 transition shadow-md"
                  aria-label="Close modal"
                >
                  <FaTimes size={18} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 text-xs font-bold bg-brand-primary text-black rounded-full mb-2">
                    {active.team}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold">{active.name}</h2>
                  <p className="text-blue-300 font-medium">{active.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{active.bio}</p>
                  
                  {active.quote && (
                    <blockquote className="border-l-4 border-brand-primary pl-4 py-3 bg-brand-primary/5 rounded-r-lg">
                      <p className="text-gray-700 italic">&ldquo;{active.quote}&rdquo;</p>
                    </blockquote>
                  )}
                </div>

                {/* Contact buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                  {active.email && (
                    <a
                      href={`mailto:${active.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-black font-semibold rounded-full hover:bg-brand-primary/90 transition shadow-sm hover:shadow-md"
                    >
                      <FaEnvelope size={16} /> 
                      <span>Email</span>
                    </a>
                  )}
                  {active.phone && (
                    <a
                      href={`tel:${active.phone}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition"
                    >
                      <FaPhone size={16} /> 
                      <span>Call</span>
                    </a>
                  )}
                  {active.linkedin && (
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition shadow-sm hover:shadow-md"
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

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay up to date with the latest at"
        subtitle="New International Hope
For Refugees And Immigrants"
      />
    </div>
  );
}
