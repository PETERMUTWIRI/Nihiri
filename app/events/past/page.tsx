// app/events/past/page.tsx - PAST EVENTS with Prisma direct
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { FaCalendar, FaLocationDot, FaArrowLeft, FaCalendarCheck } from 'react-icons/fa6';
import NewsletterCTA from '@/components/NewsletterCTA';

const prisma = new PrismaClient();

async function getPastEvents() {
  const now = new Date();
  
  return await prisma.event.findMany({
    where: {
      OR: [
        { startDate: { lt: now } }, // Events that already started
        { category: 'Past' },       // Explicitly marked as past
      ],
      deletedAt: null,
    },
    orderBy: { startDate: 'desc' }, // Most recent first
  });
}

async function getUpcomingPreview() {
  const now = new Date();
  
  // Get 3 upcoming events for cross-linking
  return await prisma.event.findMany({
    where: {
      startDate: { gt: now },
      deletedAt: null,
    },
    orderBy: { startDate: 'asc' },
    take: 3,
  });
}

export default async function PastEventsPage() {
  const [pastEvents, upcomingPreview] = await Promise.all([
    getPastEvents(),
    getUpcomingPreview(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-gray-600/10 to-gray-50">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Past Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Relive our previous ESL circles, health fairs, advocacy trainings and celebrations.
        </p>
      </section>

      {/* FILTER NAVIGATION */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          <Link 
            href="/events" 
            className="px-6 py-3 rounded-full text-sm font-bold bg-white text-gray-700 hover:bg-gray-100 shadow-md transition"
          >
            <FaCalendarCheck className="inline mr-2"/> Upcoming Events
          </Link>
          <Link 
            href="/events/past" 
            className="px-6 py-3 rounded-full text-sm font-bold bg-gray-700 text-white shadow-lg"
          >
            Past Events
          </Link>
        </div>
      </section>

      {/* PAST EVENTS GRID */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        {pastEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((ev) => (
              <article key={ev.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group opacity-90 hover:opacity-100">
                <Link href={`/events/${ev.slug}`}>
                  <div className="aspect-video relative overflow-hidden">
                    {ev.cover ? (
                      <Image
                        src={ev.cover}
                        alt={ev.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <span className="text-5xl grayscale">📸</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-gray-800/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                      COMPLETED
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Past Event</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition">
                      {ev.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {ev.description?.replace(/<[^>]*>/g, '').slice(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4">
                      <span className="flex items-center gap-1"><FaCalendar /> {new Date(ev.startDate).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><FaLocationDot /> {ev.location}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No past events recorded yet.</p>
          </div>
        )}
      </section>

      {/* UPCOMING EVENTS PREVIEW (Cross-linking back) */}
      {upcomingPreview.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
                <p className="text-gray-600 mt-1">Don't miss our next events</p>
              </div>
              <Link 
                href="/events"
                className="text-blue-600 font-bold hover:underline flex items-center"
              >
                View All Upcoming <FaArrowLeft className="ml-1 rotate-180"/>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingPreview.map((ev) => (
                <article key={ev.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <Link href={`/events/${ev.slug}`}>
                    <div className="aspect-video relative bg-gray-200">
                      {ev.cover ? (
                        <Image src={ev.cover} alt={ev.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📅</div>
                      )}
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        UPCOMING
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 line-clamp-1">{ev.title}</h4>
                      <p className="text-sm text-green-600 mt-1 font-medium">
                        {new Date(ev.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay in the Loop"
        subtitle="Get notified about future events at\nNew International Hope"
      />
    </div>
  );
}