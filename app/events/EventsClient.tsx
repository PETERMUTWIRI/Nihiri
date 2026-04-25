// app/events/EventsClient.tsx - POSTER-FOCUSED + LIGHTBOX + GIVEBUTTER CTA
'use client';
import { useState, useEffect } from 'react';
import { FaCalendar, FaLocationDot, FaChevronLeft, FaChevronRight, FaXmark, FaArrowUpRightFromSquare, FaTicket } from 'react-icons/fa6';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  description: string;
  cover: string | null;
  location: string;
  venue: string | null;
  address: string | null;
  startDate: string;
  endDate: string | null;
  author: string | null;
  gallery: string[];
  registrationLink: string | null;
  isFree: boolean;
  ticketPrice: string | null;
  maxAttendees: number | null;
  createdAt: string;
  category: string;
  excerpt: string;
  eventSource: string;
}

export default function EventsClient({ initialEvents, pageType }: { initialEvents: Event[]; pageType: 'upcoming' | 'past' }) {
  const [events] = useState(initialEvents);
  const [idx, setIdx] = useState(0);
  const [imgErr, setImgErr] = useState<Set<number>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, events.length]);

  const navigate = (dir: 'prev' | 'next') => {
    setIdx((i) => (dir === 'prev' ? (i - 1 + events.length) % events.length : (i + 1) % events.length));
  };
  const select = (i: number) => setIdx(i);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (d: string) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const active = events[idx];
  const isGivebutter = active.eventSource === 'givebutter' || active.registrationLink?.includes('givebutter.com');

  const ctaLabel = () => {
    if (active.registrationLink?.includes('@')) return 'Email to Register';
    if (isGivebutter) return 'Book Event';
    if (active.registrationLink) return 'Join Event';
    return 'Book Event';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-render-premium">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="heading-editorial text-2xl text-gray-900">
            <span className="heading-accent">Events</span>
          </h1>
          <div className="flex gap-2">
            <Link href="/events" className={`px-4 py-2 rounded-lg text-sm font-semibold btn-text ${pageType === 'upcoming' ? 'bg-brand-primary text-brand-text' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Upcoming</Link>
            <Link href="/events/past" className={`px-4 py-2 rounded-lg text-sm font-semibold btn-text ${pageType === 'past' ? 'bg-brand-primary text-brand-text' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Past</Link>
          </div>
        </div>
      </header>

      {/* MAIN SPLIT VIEW */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT: POSTER HERO */}
        <div className="w-full lg:w-1/2 bg-white border-r border-gray-200 p-4 lg:p-8 flex flex-col lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
          <div className="max-w-lg mx-auto w-full flex flex-col h-full">
            <span className="inline-block bg-brand-primary/20 text-brand-dark px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider self-start">
              {pageType === 'upcoming' ? 'Upcoming' : 'Past'}
            </span>

            {/* POSTER IMAGE - CLICK TO EXPAND */}
            <div
              className="relative rounded-xl overflow-hidden mb-6 bg-gray-100 cursor-pointer group flex-1 flex items-center justify-center min-h-[300px] lg:min-h-0"
              onClick={() => active.cover && setLightboxOpen(true)}
            >
              {active.cover && !imgErr.has(active.id) ? (
                <>
                  <img
                    src={active.cover}
                    alt={active.title}
                    className="w-full h-full object-contain max-h-[70vh] lg:max-h-none"
                    loading="eager"
                    onError={() => setImgErr((s) => new Set(s).add(active.id))}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition">
                      Click to expand
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl">📅</span>
                </div>
              )}
            </div>

            {/* EVENT META BELOW POSTER */}
            <h2 className="content-title text-gray-900 mb-2 text-center lg:text-left">{active.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 justify-center lg:justify-start">
              <span>By {active.author || 'Staff Writer'}</span>
              <span>•</span>
              <span>{new Date(active.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 uppercase tracking-wider justify-center lg:justify-start flex-wrap">
              <span className="flex items-center gap-1"><FaCalendar /> {formatDate(active.startDate)}</span>
              <span className="flex items-center gap-1"><FaLocationDot /> {active.location}</span>
            </div>

            {/* CTA */}
            {active.registrationLink && (
              <div className="mt-2 flex justify-center lg:justify-start">
                <a
                  href={active.registrationLink.includes('@') ? `mailto:${active.registrationLink}` : active.registrationLink}
                  target={active.registrationLink.includes('@') ? undefined : '_blank'}
                  rel={active.registrationLink.includes('@') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 bg-brand-primary text-brand-text px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition btn-text shadow-md"
                >
                  {isGivebutter ? <FaTicket /> : <FaArrowUpRightFromSquare />}
                  {ctaLabel()}
                </a>
              </div>
            )}

            {/* NAV BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button onClick={() => navigate('prev')} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition btn-text">
                <FaChevronLeft /> Previous
              </button>
              <button onClick={() => navigate('next')} className="flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-4 py-3 rounded-lg font-semibold transition btn-text">
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="w-full lg:w-1/2 bg-white">
          <div className="h-full overflow-y-auto p-6 lg:p-8" style={{ maxHeight: 'calc(100vh - 73px)' }}>
            <div className="max-w-2xl mx-auto">
              {/* TICKET INFO */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="card-title text-gray-900 mb-4">Event Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Date</span>
                    <span className="font-medium text-gray-900">{formatDate(active.startDate)}</span>
                    {active.endDate && (
                      <span className="block text-gray-600">to {formatDate(active.endDate)}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-500 block">Time</span>
                    <span className="font-medium text-gray-900">{formatTime(active.startDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Location</span>
                    <span className="font-medium text-gray-900">{active.location}</span>
                    {active.venue && <span className="block text-gray-600">{active.venue}</span>}
                  </div>
                  <div>
                    <span className="text-gray-500 block">Admission</span>
                    <span className="font-medium text-gray-900">{active.isFree ? 'Free' : active.ticketPrice || 'Paid'}</span>
                  </div>
                  {active.maxAttendees && (
                    <div>
                      <span className="text-gray-500 block">Capacity</span>
                      <span className="font-medium text-gray-900">{active.maxAttendees} attendees</span>
                    </div>
                  )}
                  {active.address && (
                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block">Address</span>
                      <span className="font-medium text-gray-900">{active.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              {active.description && (
                <div className="mb-8">
                  <h3 className="card-title text-gray-900 mb-4">About this Event</h3>
                  <article className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: active.description }} />
                </div>
              )}

              {/* GALLERY */}
              {active.gallery && active.gallery.length > 0 && (
                <div className="mb-8">
                  <h3 className="card-title text-gray-900 mb-4">Event Gallery</h3>
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
              <div className="pt-8 border-t border-gray-200">
                <h3 className="card-title text-gray-900 mb-4">Share this event</h3>
                <div className="flex gap-4">
                  <button className="bg-brand-primary text-brand-text px-4 py-2 rounded-lg hover:bg-brand-dark font-semibold transition btn-text">Facebook</button>
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 font-semibold transition btn-text">Twitter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CAROUSEL */}
      <div className="bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif font-medium text-lg text-gray-900 mb-4">All Events</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {events.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => select(i)}
                className={`flex-shrink-0 group relative w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  i === idx ? 'ring-2 ring-brand-primary scale-105' : 'hover:scale-105 hover:ring-2 hover:ring-brand-primary/50'
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

      {/* LIGHTBOX */}
      {lightboxOpen && active.cover && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightboxOpen(false)}
          >
            <FaXmark size={32} />
          </button>
          <img
            src={active.cover}
            alt={active.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
