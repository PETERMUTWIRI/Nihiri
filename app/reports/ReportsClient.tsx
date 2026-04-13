// app/reports/ReportsClient.tsx - NATIVE ANNUAL REPORT RENDERER
'use client';
import { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Report {
  id: number;
  year: number;
  title: string;
  cover: string | null;
  canvaUrl: string | null;
  content: string | null;
  excerpt: string | null;
}

export default function ReportsClient({ initialReports }: { initialReports: Report[] }) {
  const [reports] = useState(initialReports);
  const [idx, setIdx] = useState(0);
  const mounted = typeof window !== 'undefined';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + reports.length) % reports.length);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1 + reports.length) % reports.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reports.length]);

  if (!mounted || !reports.length) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  const active = reports[idx];
  const hasContent = !!(active.content && active.content.trim().length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-render-premium">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="heading-editorial text-2xl text-gray-900">
            Annual <span className="heading-accent">Reports</span>
          </h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT: teaser */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-8 flex flex-col justify-center lg:sticky lg:top-[73px] lg:h-screen lg:overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <span className="kicker mb-4 block">{active.year}</span>
            <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-100 flex justify-center">
              {active.cover ? (
                <img src={active.cover} alt={active.title} className="w-full max-h-[60vh] object-contain" loading="lazy" />
              ) : (
                <div className="w-full aspect-[4/5] bg-gradient-to-br from-brand-primary/20 to-brand-light flex items-center justify-center"><span className="text-6xl">📊</span></div>
              )}
            </div>
            <h2 className="content-title text-gray-900 mb-4">{active.title}</h2>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setIdx((i) => (i - 1 + reports.length) % reports.length)} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold transition btn-text"><FaChevronLeft /> Previous</button>
              <button onClick={() => setIdx((i) => (i + 1 + reports.length) % reports.length)} className="flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-4 py-3 rounded-lg font-semibold transition btn-text">Next <FaChevronRight /></button>
            </div>
          </div>
        </div>

        {/* RIGHT: full content */}
        <div className="w-full lg:w-1/2 bg-white p-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 73px)' }}>
          <div className="max-w-2xl mx-auto">
            <span className="kicker mb-4 block">Report Details</span>
            <h3 className="content-title text-gray-900 mb-4">{active.title}</h3>

            {active.excerpt && (
              <p className="body-editorial text-gray-600 italic mb-6 border-l-4 border-cyan-500 pl-4">
                {active.excerpt}
              </p>
            )}

            {!active.excerpt && (
              <p className="body-editorial text-gray-600 mb-6">
                Annual report for year {active.year}. View our impact, financials, and program outcomes.
              </p>
            )}

            {hasContent ? (
              <article
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: active.content! }}
              />
            ) : active.canvaUrl ? (
              <a
                href={active.canvaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-6 py-3 rounded-lg font-semibold transition btn-text"
              >
                <FaExternalLinkAlt /> Open Interactive Report
              </a>
            ) : (
              <p className="text-gray-500">Full report content coming soon.</p>
            )}

            {hasContent && active.canvaUrl && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href={active.canvaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-6 py-3 rounded-lg font-semibold transition btn-text"
                >
                  <FaExternalLinkAlt /> Open Interactive Report
                </a>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-serif font-medium text-lg text-gray-900 mb-4">Share this report</h4>
              <div className="flex gap-4">
                <button className="bg-brand-primary hover:bg-brand-dark text-brand-text px-4 py-2 rounded-lg font-semibold transition btn-text">Facebook</button>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition btn-text">Twitter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAROUSEL: ALL REPORTS */}
      <div className="bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif font-medium text-lg text-gray-900 mb-4">All Reports</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {reports.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 group relative w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  i === idx ? 'ring-2 ring-brand-primary scale-105' : 'hover:scale-105 hover:ring-2 hover:ring-brand-primary/50'
                }`}
              >
                {r.cover ? (
                  <img src={r.cover} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"><span className="text-2xl">📊</span></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white text-sm font-medium line-clamp-2">{r.title}</h4>
                  <p className="text-white/80 text-xs mt-1">Year: {r.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
