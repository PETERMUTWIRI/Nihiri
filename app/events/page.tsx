// app/events/page.tsx
import { PrismaClient } from '@prisma/client';
import EventsClient from './EventsClient';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

const getCachedUpcoming = unstable_cache(
  async () => {
    const rows = await prisma.event.findMany({
      where: { category: 'Upcoming', deletedAt: null, startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
    });

    return rows.map((e) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description ?? '',
      content: e.content ?? '',
      excerpt: e.excerpt ?? '',
      cover: e.cover,
      category: e.category,
      location: e.location,
      venue: e.venue,
      address: e.address,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate?.toISOString() ?? null,
      author: e.author ?? '',
      registrationLink: e.registrationLink,
      isFree: e.isFree ?? false,
      ticketPrice: e.ticketPrice,
      maxAttendees: e.maxAttendees,
      gallery: (e.gallery as string[]) ?? [],
    }));
  },
  ['events-upcoming'],
  { revalidate: 60 }
);

export default async function UpcomingEventsPage() {
  const events = await getCachedUpcoming();
  if (!events.length)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No upcoming events</h2>
          <p className="text-gray-600">Check back soon!</p>
        </div>
      </div>
    );
  return <EventsClient initialEvents={events} />;
}