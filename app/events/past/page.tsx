// app/events/past/page.tsx - PAST EVENTS (blog-pattern)
import { PrismaClient } from '@prisma/client';
import EventsClient from '../EventsClient';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

const getCachedPast = unstable_cache(
  async () => {
    const rows = await prisma.event.findMany({
      where: { category: 'Past', deletedAt: null },
      orderBy: { startDate: 'desc' },
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
  ['events-past'],
  { revalidate: 60 }
);

export default async function PastEventsPage() {
  const events = await getCachedPast();
  if (!events.length)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No past events</h2>
          <p className="text-gray-600">Check upcoming events!</p>
        </div>
      </div>
    );
  return <EventsClient initialEvents={events} />;
}