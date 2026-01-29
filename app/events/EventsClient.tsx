// app/events/EventsClient.tsx - SPLIT-VIEW + CAROUSEL
'use client';
import { useState, useEffect, useRef } from 'react';
import { FaCalendar, FaLocationDot, FaChevronLeft, FaChevronRight, FaTicket, FaUsers } from 'react-icons/fa6';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  description: string;
  cover: string | null;
  location: string;
  venue: string | null;
  startDate: string;
  endDate: string | null;
  author: string | null;
  gallery: string[] | null;
  registrationLink: string | null;
  isFree: boolean;
  ticketPrice: string | null;
  maxAttendees: number | null;
}

export default function EventsClient({ initialEvents }: { initialEvents: Event[] }) {
  const [events] = useState(initialEvents);
  const [idx, setIdx] = useState(0);
  const [imgErr, setImgErr] = useState<Set<number>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);

  const mounted = typeof window !== 'undefined';
  useEffect(() => { window.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') navigate('prev'); if (e.key === 'ArrowRight') navigate('next'); }); }, []);

  const navigate = (dir: 'prev' | 'next') => setIdx((i) => (dir === 'prev' ? (i - 1 + events.length) % events.length : (i + 1) % events.length));
  const select = (i: number) => { setIdx(i); contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (!mounted || !events.length) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  const active = events[idx];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <div className="flex gap-2">
            <Link href="/events" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">Upcoming</Link>
            <Link href="/events/past" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium">Past</Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT: teaser */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-8 flex flex-col justify-center lg:sticky lg:top-[73px] lg:h-screen lg:overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">Upcoming</span>
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
              {active.cover && !imgErr.has(active.id) ? (
                <img src={active.cover} alt={active.title} className="w-full h-full object-cover" loading="lazy" onError={() => setImgErr((s) => new Set(s).add(active.id))} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"><span className="text-6xl">📅</span></div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{active.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4"><FaCalendar /><span>{formatDate(active.startDate)}</span><FaLocationDot /><span>{active.location}</span></div>
            <p className="text-gray-600 leading-relaxed">{active.description?.replace(/<[^>]*>/g, '').slice(0, 200)}...</p>

            <div className="flex gap-4 mt-8">
              <button onClick={() => navigate('prev')} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition"><FaChevronLeft /> Previous</button>
              <button onClick={() => navigate('next')} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition">Next <FaChevronRight /></button>
            </div>
          </div>
        </div>

        {/* RIGHT: full content */}
        <div className="w-full lg:w-1/2 bg-white" ref={contentRef}>
          <div className="h-full overflow-y-auto p-8" style={{ maxHeight: 'calc(100vh - 73px)' }}>
            <div className="max-w-2xl mx-auto">
              <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: active.description || '' }} />

              {/* GALLERY */}
              {active.gallery && active.gallery.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {active.gallery.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden">
                        <img src={url} alt={`gallery-${i}`} className="w-full h-32 object-cover hover:scale-105 transition" loading="lazy" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* SHARE */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this event</h3>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Facebook</button>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">Twitter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAROUSEL: ALL EVENTS */}
      <div className="bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Events</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {events.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => select(i)}
                className={`flex-shrink-0 group relative w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  i === idx ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105 hover:ring-2 hover:ring-blue-300'
                }`}
              >
                {ev.cover && !imgErr.has(ev.id) ? (
                  <img src={ev.cover} alt={ev.title} className="w-full h-full object-cover" loading="lazy" onError={() => setImgErr((s) => new Set(s).add(ev.id))} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"><span className="text-2xl">📅</span></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white text-sm font-medium line-clamp-2">{ev.title}</h4>
                  <p className="text-white/80 text-xs mt-1">{formatDate(ev.startDate)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}