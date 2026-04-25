'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

type BoardMember = {
  name: string;
  role: string;
  img: string;
};

type StaffMember = {
  name: string;
  role: string;
  team: string;
  img: string;
};

const boardMembers: BoardMember[] = [
  { name: 'Jane Kinity', role: 'Founder & Executive Director', img: '/images/employees/Jane-Kinity.avif' },
  { name: 'Eshe Abood', role: 'Vice Chair', img: '/images/employees/Eshe-Abood.avif' },
  { name: 'Ann Mbugwa', role: 'Secretary', img: '/images/employees/Ann-Mbugwa.avif' },
  { name: 'Joseph Kazadi', role: 'Vice-President', img: '/images/employees/Joseph-Kazadi.avif' },
  { name: 'Rahab', role: 'Treasurer', img: '/images/employees/Rahab.jpg' },
];

const staffMembers: StaffMember[] = [
  { name: 'Jane Kinity', role: 'Founder & Executive Director', team: 'Leadership', img: '/images/employees/Jane-Kinity.avif' },
  { name: 'Joseph Kazadi', role: 'Vice-President', team: 'Leadership', img: '/images/employees/Joseph-Kazadi.avif' },
  { name: 'Rahab', role: 'Treasurer', team: 'Leadership', img: '/images/employees/Rahab.jpg' },
  { name: 'Annie Phiri', role: 'Case Manager', team: 'Case Management', img: '/images/employees/AnniePhiri.avif' },
  { name: 'Martine Kabanga', role: 'Youth Coordinator', team: 'Youth Programs', img: '/images/employees/Martine-Kabanga.avif' },
  { name: 'Mary Njoki', role: 'Assistant Youth Coordinator', team: 'Youth Programs', img: '/images/employees/Mary-Njoki.avif' },
];

export default function BoardStaffPreview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Board of Directors */}
        <ScrollReveal className="text-center mb-12">
          <span className="kicker-cyan mb-2 block">Leadership</span>
          <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mt-2">
            Board of <span className="heading-accent-cyan">Directors</span>
          </h2>
          <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
            Meet the dedicated leaders who guide our mission with compassion.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {boardMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <div className="group text-center">
                <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-cyan-50 group-hover:ring-cyan-200 transition-all duration-300 shadow-lg">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className={`transition-transform duration-300 group-hover:scale-105 ${member.name === 'Jane Kinity' ? 'object-cover object-top' : 'object-cover'}`}
                    />
                  </div>
                </div>
                <h3 className="card-title-cyan text-gray-900 text-base md:text-lg">{member.name}</h3>
                <p className="text-xs md:text-sm font-semibold text-cyan-600 mt-1 uppercase tracking-wider">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mb-16">
          <Link
            href="/board"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
          >
            View All Board Members <span>→</span>
          </Link>
        </div>

        {/* Staff */}
        <ScrollReveal className="text-center mb-12">
          <span className="kicker-cyan mb-2 block">The People Behind Our Mission</span>
          <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mt-2">
            Our <span className="heading-accent-cyan">Team</span>
          </h2>
          <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
            Meet the passionate people who power our programs every day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
          {staffMembers.map((member, index) => (
            <ScrollReveal key={`${member.name}-${member.team}`} delay={index * 0.08}>
              <div className="group text-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-cyan-50 group-hover:ring-cyan-200 transition-all duration-300 shadow-lg">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className={`transition-transform duration-300 group-hover:scale-105 ${member.name === 'Jane Kinity' ? 'object-cover object-top' : 'object-cover'}`}
                    />
                  </div>
                </div>
                <h3 className="card-title-cyan text-gray-900 text-sm md:text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-cyan-600 mt-1 uppercase tracking-wider">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/staff"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
          >
            View All Staff <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
