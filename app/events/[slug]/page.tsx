// app/events/[slug]/page.tsx - SINGLE EVENT PAGE (enterprise grade)
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendar, FaLocationDot, FaClock, FaArrowLeft, FaTicket, FaUsers, FaMapPin } from 'react-icons/fa6';

const prisma = new PrismaClient();

async function getEvent(slug: string) {
  const event = await prisma.event.findUnique({
    where: { slug, deletedAt: null },
  });
  return event;
}

async function getRelatedEvents(currentId: number, category: string, isPast: boolean) {
  const now = new Date();
  
  return await prisma.event.findMany({
    where: {
      id: { not: currentId },
      category: isPast ? 'Past' : 'Upcoming',
      deletedAt: null,
      // For upcoming, show future dates. For past, show past dates
      ...(isPast ? { startDate: { lt: now } } : { startDate: { gt: now } }),
    },
    orderBy: isPast ? { startDate: 'desc' } : { startDate: 'asc' },
    take: 3,
  });
}

// Helper for countdown
function getCountdown(startDate: Date) {
  const now = new Date().getTime();
  const target = new Date(startDate).getTime();
  const diff = target - now;
  
  if (diff < 0) return null;
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.startDate) < new Date() || event.category === 'Past';
  const countdown = !isPast ? getCountdown(event.startDate) : null;
  const relatedEvents = await getRelatedEvents(event.id, event.category, isPast);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href={isPast ? "/events/past" : "/events"}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <FaArrowLeft className="mr-2"/> Back to {isPast ? 'Past Events' : 'Upcoming Events'}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Badge */}
          <div className="pt-8 mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              isPast ? 'bg-gray-200 text-gray-700' : 'bg-brand-primary/20 text-brand-primary'
            }`}>
              {isPast ? 'Past Event' : 'Upcoming Event'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Countdown (only for upcoming) */}
          {countdown && (
            <div className="mb-8 p-6 bg-brand-primary/10 rounded-2xl inline-block">
              <p className="text-sm text-brand-primary font-bold mb-3 uppercase tracking-wide">
                <FaClock className="inline mr-2"/> Event Starts In
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-black text-brand-primary">{countdown.days}</div>
                  <div className="text-xs text-gray-600 uppercase">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-brand-primary">{countdown.hours}</div>
                  <div className="text-xs text-gray-600 uppercase">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-brand-primary">{countdown.minutes}</div>
                  <div className="text-xs text-gray-600 uppercase">Mins</div>
                </div>
              </div>
            </div>
          )}

          {/* Event Meta Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-brand-primary/10 p-3 rounded-lg">
                <FaCalendar className="text-brand-primary text-xl"/>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                <p className="text-gray-900 font-semibold">
                  {new Date(event.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-600">
                  {new Date(event.startDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-brand-primary/10 p-3 rounded-lg">
                <FaLocationDot className="text-brand-primary text-xl"/>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-gray-900 font-semibold">{event.location}</p>
                {event.venue && <p className="text-gray-600">{event.venue}</p>}
                {event.address && <p className="text-gray-500 text-sm">{event.address}</p>}
              </div>
            </div>

            {!isPast && (
              <div className="flex items-start gap-3">
                <div className="bg-brand-primary/10 p-3 rounded-lg">
                    <FaTicket className="text-brand-primary text-xl"/>
                  </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Admission</p>
                  <p className="text-gray-900 font-semibold">
                    {event.isFree ? 'Free' : event.ticketPrice || 'See details'}
                  </p>
                  {event.maxAttendees && (
                    <p className="text-gray-500 text-sm">
                      <FaUsers className="inline mr-1"/> Limited to {event.maxAttendees} attendees
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-2">
              {event.cover && (
                <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <Image
                    src={event.cover}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: event.description || '<p>No description available.</p>' }}
                />
              </div>

              {/* Organizer */}
              {event.author && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Organized by</h3>
                  <p className="text-gray-600">{event.author}</p>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              {!isPast ? (
                <div className="bg-brand-primary text-brand-text rounded-2xl p-6 shadow-xl sticky top-8">
                  <h3 className="text-xl font-bold mb-4">Register for this Event</h3>
                  <p className="text-brand-text/80 mb-6">Secure your spot today. Spaces may be limited.</p>
                  
                  {event.registrationLink ? (
                    <a 
                      href={event.registrationLink.includes('@') 
                        ? `mailto:${event.registrationLink}?subject=Registration for ${event.title}` 
                        : event.registrationLink
                      }
                      target={event.registrationLink.includes('@') ? undefined : "_blank"}
                      rel={event.registrationLink.includes('@') ? undefined : "noopener noreferrer"}
                      className="block w-full bg-white text-brand-primary text-center py-4 rounded-xl font-bold hover:bg-gray-100 transition"
                    >
                      {event.registrationLink.includes('@') ? 'Register via Email' : 'Register Now'}
                    </a>
                  ) : (
                    <button className="block w-full bg-white text-brand-primary py-4 rounded-xl font-bold cursor-not-allowed opacity-75">
                      Registration Closed
                    </button>
                  )}
                  
                  {event.maxAttendees && (
                    <p className="text-sm text-brand-text/70 mt-4 text-center">
                      Limited availability
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-6 text-center">
                  <span className="text-4xl mb-2 block">✅</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Event Completed</h3>
                  <p className="text-gray-600 text-sm">This event has already taken place.</p>
                  <Link 
                    href="/events"
                    className="mt-4 inline-block text-brand-primary font-bold hover:underline"
                  >
                    View Upcoming Events →
                  </Link>
                </div>
              )}

              {/* Map placeholder if address exists */}
              {event.address && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FaMapPin className="mr-2 text-red-500"/> Venue
                  </h3>
                  <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                    <p className="text-gray-500 text-center px-4">
                      {event.venue}<br/>
                      <span className="text-sm">{event.address}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-16 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {isPast ? 'More Past Events' : 'Other Upcoming Events'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((ev) => (
                <Link key={ev.id} href={`/events/${ev.slug}`} className="group">
                  <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
                    <div className="aspect-video relative bg-gray-200">
                      {ev.cover ? (
                        <Image src={ev.cover} alt={ev.title} fill className="object-cover group-hover:scale-105 transition" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">📅</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 group-hover:text-brand-primary transition line-clamp-1">
                        {ev.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(ev.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}