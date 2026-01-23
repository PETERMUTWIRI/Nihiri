// app/events/page.tsx
export const dynamic = 'force-dynamic'; 
import Link from 'next/link';
import { FaCalendar, FaLocationDot } from 'react-icons/fa6';
import NewsletterCTA from '@/components/NewsletterCTA';

type Event = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string | null;
  startDate: string;
  location: string;
};

async function getEvents(): Promise<Event[]> {
  // Use VERCEL_URL (auto-set) or fallback to localhost
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
  const res = await fetch(`${base}/api/events`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-brand-background">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-brand-primary/20 to-brand-background">
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Events</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Join us for ESL circles, health fairs, advocacy trainings and community celebrations.
        </p>
      </section>

      {/* FILTER LINKS */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/events" className="px-4 py-2 rounded-full text-sm font-extrabold bg-brand-primary text-black">
            Upcoming
          </Link>
          <Link href="/events/past" className="px-4 py-2 rounded-full text-sm font-extrabold bg-white text-brand-text hover:bg-brand-primary/20">
            Past
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev) => (
            <article key={ev.id} className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden group">
              <Link href={`/events/${ev.slug}`}>
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={ev.cover || '/images/event-placeholder.jpg'}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-extrabold text-brand-primary uppercase tracking-wider">{ev.category}</span>
                  <h2 className="text-xl font-black text-brand-text mt-1 mb-2">{ev.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{ev.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><FaCalendar /> {new Date(ev.startDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><FaLocationDot /> {ev.location}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay up to date with the latest  at"
        subtitle="New International Hope\nFor Refugees And Immigrants"
      />
    </div>
  );
}