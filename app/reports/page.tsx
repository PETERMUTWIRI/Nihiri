'use client';

import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

type Report = {
  year: number;
  title: string;
  thumbnail: string;
  canvaUrl: string;
};

const reports: Report[] = [
  {
    year: 2024,
    title: 'Annual Report 2024',
    thumbnail: '/images/reports/2024-cover.jpg',
    canvaUrl: 'https://www.canva.com/design/DAGZaorq6hk/q31gCxNSRFS2qFJyTolt7Q/view?utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks',
  },
  {
    year: 2023,
    title: 'Annual Report 2023',
    thumbnail: '/images/reports/2023-cover.jpg',
    canvaUrl: 'https://www.canva.com/design/DAGFZq6hk/q31gCxNSRFS2qFJyTolt7Q/view?utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks',
  },
  {
    year: 2022,
    title: 'Annual Report 2022',
    thumbnail: '/images/reports/2022-cover.jpg',
    canvaUrl: 'https://www.canva.com/design/DAGZZq6hk/q31gCxNSRFS2qFJyTolt7Q/view?utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks',
  },
];

export default function AnnualReportsPage() {
  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-brand-primary/20 to-brand-background">
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Annual Reports</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          These reports highlight key milestones, success stories, and the invaluable support from our community,
          showcasing our dedication to transparency and impact.
        </p>
      </section>

      {/* GRID */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((r) => (
            <a
              key={r.year}
              href={r.canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={r.thumbnail}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-black">{r.year}</h3>
                  <p className="text-sm opacity-90">Click to open interactive report</p>
                </div>
                <FaExternalLinkAlt className="absolute top-4 right-4 text-white/70 group-hover:text-white transition" />
              </div>
              <div className="p-4">
                <h4 className="font-extrabold text-brand-text">{r.title}</h4>
                <p className="text-xs text-gray-500 mt-1">Opens in Canva →</p>
              </div>
            </a>
          ))}
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