'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa6';
import NewsletterCTA from '@/components/NewsletterCTA';

type Event = {
  id: number;
  title: string;
  description: string;
  cover: string | null;
  startDate: string;
  endDate: string | null;
  location: string;
};

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then((r) => r.json())
      .then(setEvent)
      .catch(() => setEvent(null));
  }, [params.id]);

  if (!event) return <p className="p-6">Event not found.</p>;

  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;

  return (
    <div className="min-h-screen bg-brand-background">
      {/* COVER */}
      <div className="relative w-full h-80 md:h-96">
        <img
          src={event.cover || '/images/event-placeholder.jpg'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-black">{event.title}</h1>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm opacity-90">
            <span className="flex items-center gap-1"><FaCalendarAlt /> {start.toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {event.location}</span>
            {end && <span className="flex items-center gap-1"><FaClock /> {end.toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <article className="py-12 px-6 md:px-12 max-w-4xl mx-auto prose prose-lg prose-gray">
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      </article>

      {/* BACK LINK */}
      <div className="py-8 px-6 md:px-12">
        <a href="/events" className="inline-flex items-center gap-2 text-brand-primary font-extrabold hover:underline">
          ← Back to events
        </a>
      </div>

      <NewsletterCTA
        title="Stay up to date with the latest  at"
        subtitle="New International Hope\nFor Refugees And Immigrants"
      />
    </div>
  );
}