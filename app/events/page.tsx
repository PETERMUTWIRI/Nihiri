// app/events/page.tsx - FIXED for USA timezone
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { FaCalendar, FaLocationDot, FaClock, FaArrowRight } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

const prisma = new PrismaClient();

// Helper to calculate countdown
function getCountdown(startDate: Date): { days: number; hours: number; minutes: number; isExpired: boolean } {
  const now = new Date().getTime();
  const target = new Date(startDate).getTime();
  const difference = target - now;

  if (difference < 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    isExpired: false,
  };
}

// Helper to format date for USA display
function formatDate(date: Date | null): string {
  if (!date) return 'Date TBD';
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York', // USA Eastern Time
  });
}

async function getUpcomingEvents() {
  // Use server's current time - Vercel servers are typically UTC
  // But we'll query by category since that's what admin sets
  const events = await prisma.event.findMany({
    where: {
      category: 'Upcoming', // Just use the category set by admin
      deletedAt: null,
    },
    orderBy: { startDate: 'asc' },
    take: 6,
  });

  console.log('Found upcoming events:', events.length);
  return events;
}

async function getRecentPastEvents() {
  return await prisma.event.findMany({
    where: {
      category: 'Past',
      deletedAt: null,
    },
    orderBy: { startDate: 'desc' },
    take: 3,
  });
}

export default async function EventsPage() {
  const [upcomingEvents, recentPastEvents] = await Promise.all([
    getUpcomingEvents(),
    getRecentPastEvents(),
  ]);

  console.log('Upcoming:', upcomingEvents.length, 'Past:', recentPastEvents.length);

  const featuredEvent = upcomingEvents[0];
  const otherEvents = upcomingEvents.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 text-center bg-gradient-to-b from-blue-600/10 to-gray-50">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Upcoming Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us for ESL circles, health fairs, advocacy trainings and community celebrations.
        </p>
      </section>

      {/* FILTER NAVIGATION */}
      <section className="py-8 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          <Link 
            href="/events" 
            className="px-6 py-3 rounded-full text-sm font-bold bg-brand-primary text-brand-text shadow-lg"
          >
            Upcoming
          </Link>
          <Link 
            href="/events/past" 
            className="px-6 py-3 rounded-full text-sm font-bold bg-white text-gray-700 hover:bg-gray-100 shadow-md transition"
          >
            <FaHistory className="inline mr-2"/> Past Events
          </Link>
        </div>
      </section>

      {/* FEATURED EVENT */}
      {featuredEvent && (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative h-96 lg:h-[500px] bg-gray-200">
                {featuredEvent.cover ? (
                  <Image
                    src={featuredEvent.cover}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-8xl">🎉</span>
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured Event
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Countdown */}
                {!getCountdown(featuredEvent.startDate).isExpired && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">
                      <FaClock className="inline mr-1"/> Starts In
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {(() => {
                        const cd = getCountdown(featuredEvent.startDate);
                        return (
                          <>
                            <div className="bg-brand-primary/10 rounded-xl p-4 text-center">
                              <div className="text-3xl font-black text-brand-primary">{cd.days}</div>
                              <div className="text-xs text-gray-600 uppercase">Days</div>
                            </div>
                            <div className="bg-brand-primary/10 rounded-xl p-4 text-center">
                              <div className="text-3xl font-black text-brand-primary">{cd.hours}</div>
                              <div className="text-xs text-gray-600 uppercase">Hours</div>
                            </div>
                            <div className="bg-brand-primary/10 rounded-xl p-4 text-center">
                              <div className="text-3xl font-black text-brand-primary">{cd.minutes}</div>
                              <div className="text-xs text-gray-600 uppercase">Mins</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                <span className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-2">
                  {featuredEvent.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                  {featuredEvent.description?.replace(/<[^>]*>/g, '').slice(0, 200)}...
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaCalendar className="text-brand-primary" />
                    <span>{formatDate(featuredEvent.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaLocationDot className="text-brand-primary" />
                    <span>{featuredEvent.location}</span>
                    {featuredEvent.venue && <span className="text-gray-500">• {featuredEvent.venue}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/events/${featuredEvent.slug}`}
                    className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-xl font-bold hover:bg-brand-dark transition shadow-lg hover:shadow-xl"
                  >
                    Event Details <FaArrowRight className="ml-2"/>
                  </Link>
                  {featuredEvent.registrationLink && (
                    <a 
                      href={featuredEvent.registrationLink.includes('@') 
                        ? `mailto:${featuredEvent.registrationLink}` 
                        : featuredEvent.registrationLink
                      }
                      target={featuredEvent.registrationLink.includes('@') ? undefined : "_blank"}
                      rel={featuredEvent.registrationLink.includes('@') ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-xl font-bold hover:bg-brand-dark transition shadow-lg"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OTHER EVENTS */}
      {otherEvents.length > 0 && (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">More Upcoming Events</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents.map((ev) => {
              const countdown = getCountdown(ev.startDate);
              return (
                <article key={ev.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <Link href={`/events/${ev.slug}`}>
                    <div className="aspect-video relative overflow-hidden">
                      {ev.cover ? (
                        <Image
                          src={ev.cover}
                          alt={ev.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-5xl">📅</span>
                        </div>
                      )}
                      {!countdown.isExpired && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold">
                          {countdown.days}d {countdown.hours}h left
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">{ev.category}</span>
                      <h4 className="text-xl font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-brand-primary transition">
                        {ev.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {ev.description?.replace(/<[^>]*>/g, '').slice(0, 120)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><FaCalendar /> {new Date(ev.startDate).toLocaleDateString('en-US')}</span>
                        <span className="flex items-center gap-1"><FaLocationDot /> {ev.location}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* NO EVENTS */}
      {upcomingEvents.length === 0 && (
        <section className="py-12 px-6 md:px-12 max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <span className="text-6xl mb-4 block">📭</span>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Upcoming Events</h3>
            <p className="text-gray-600 mb-6">Check back soon for new events.</p>
            <Link 
              href="/events/past"
              className="inline-flex items-center bg-brand-primary text-brand-text px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition"
            >
              <FaHistory className="mr-2"/> View Past Events
            </Link>
          </div>
        </section>
      )}

      {/* PAST EVENTS PREVIEW */}
      {recentPastEvents.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Past Events</h3>
                <p className="text-gray-600 mt-1">Missed these? Check out what happened</p>
              </div>
              <Link 
                href="/events/past"
                className="text-brand-primary font-bold hover:underline flex items-center"
              >
                View All <FaArrowRight className="ml-1"/>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {recentPastEvents.map((ev) => (
                <article key={ev.id} className="bg-white rounded-xl shadow-md overflow-hidden opacity-75 hover:opacity-100 transition">
                  <Link href={`/events/${ev.slug}`}>
                    <div className="aspect-video relative bg-gray-200">
                      {ev.cover ? (
                        <Image src={ev.cover} alt={ev.title} fill className="object-cover grayscale hover:grayscale-0 transition" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
                      )}
                      <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold">
                        PAST
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 line-clamp-1">{ev.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{new Date(ev.startDate).toLocaleDateString('en-US')}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterCTA
        title="Never Miss an Event"
        subtitle="Subscribe to get notified about upcoming events at\nNew International Hope"
      />
    </div>
  );
}