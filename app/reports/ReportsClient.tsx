// app/reports/ReportsClient.tsx - SPLIT-VIEW LIKE BLOG
'use client';
import { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Report {
  id: number;
  year: number;
  title: string;
  cover: string | null;
  canvaUrl: string;
}

export default function ReportsClient({ initialReports }: { initialReports: Report[] }) {
  const [reports] = useState(initialReports);
  const [idx, setIdx] = useState(0);
  const mounted = typeof window !== 'undefined';

  useEffect(() => { window.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + reports.length) % reports.length); if (e.key === 'ArrowRight') setIdx((i) => (i + 1 + reports.length) % reports.length); }); }, []);

  if (!mounted || !reports.length) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  const active = reports[idx];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Annual Reports</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT: teaser */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-8 flex flex-col justify-center lg:sticky lg:top-[73px] lg:h-screen lg:overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-gray-100">
              {active.cover ? (
                <img src={active.cover} alt={active.title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"><span className="text-6xl">📊</span></div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{active.title}</h2>
            <p className="text-gray-600 mb-6">Year: {active.year}</p>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setIdx((i) => (i - 1 + reports.length) % reports.length)} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition"><FaChevronLeft /> Previous</button>
              <button onClick={() => setIdx((i) => (i + 1 + reports.length) % reports.length)} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition">Next <FaChevronRight /></button>
            </div>
          </div>
        </div>

        {/* RIGHT: full content */}
        <div className="w-full lg:w-1/2 bg-white p-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 73px)' }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{active.title}</h3>
            <p className="text-gray-600 mb-6">Annual report for year {active.year}.</p>
            <a
              href={active.canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <FaExternalLinkAlt /> Open Interactive Report
            </a>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Share this report</h4>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Facebook</button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">Twitter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAROUSEL: ALL REPORTS */}
      <div className="bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Reports</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {reports.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 group relative w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  i === idx ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105 hover:ring-2 hover:ring-blue-300'
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