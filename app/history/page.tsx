'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import HistoryCarousel from '@/components/HistoryCarousel';
import NewsletterCTA from '@/components/NewsletterCTA';
export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-brand-primary/20 to-brand-background">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">
             Our History
          </h1>
      </section>

      {/* CAROUSEL */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <HistoryCarousel />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-12">Key Milestones</h2>
        <div className="space-y-12 border-l-2 border-brand-primary/40 pl-8 md:pl-12">
          {[
            { year: '2000', title: 'Arrival in New Haven', desc: 'Jane Kinity arrives from Kenya and begins informal support for neighbours.' },
            { year: '2005', title: 'First ESL Circle', desc: 'Weekly English classes start in Jane’s living-room.' },
            { year: '2012', title: '501(c)(3) Status', desc: 'International New Hope for Refugees & Immigrants Center is officially born.' },
            { year: '2016', title: 'Health-Navigation Launch', desc: 'First on-staff nurse begins medical-appointment accompaniment.' },
            { year: '2019', title: 'World Refugee Day Festival', desc: 'Annual community-wide celebration draws 1 200+ attendees.' },
            { year: '2025', title: 'Leadership Award', desc: 'Jane receives the Elena’s Light Leadership & Social Service Award.' },
          ].map((m) => (
            <li key={m.year} className="relative list-none">
              <span className="absolute -left-[42px] top-1 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-sm">
                {m.year}
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{m.title}</h3>
              <p className="text-gray-700 leading-relaxed">{m.desc}</p>
            </li>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-black text-gray-900 italic">
            “Empowerment through education—turning the challenges of displacement into the triumphs of new beginnings.”
          </blockquote>
          <cite className="mt-4 block text-brand-primary font-extrabold">— Jane Kinity, Founder</cite>
        </div>
      </section>

      {/* CTA */}
      <NewsletterCTA
              title="Stay up to date with the latest  at"
              subtitle="New International Hope\nFor Refugees And Immigrants"
      />
    </div>
  );
}