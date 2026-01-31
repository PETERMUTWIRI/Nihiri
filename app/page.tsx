import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import PartnerLogos from '@/components/PartnerLogos';
import NewsletterCTA from '@/components/NewsletterCTA';

// Cache the database queries
const getLatestPost = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const post = await prisma.post.findFirst({
      where: { published: true, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
    });
    await prisma.$disconnect();
    return post ? {
      ...post,
      publishedAt: post.publishedAt?.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      excerpt: post.excerpt || post.content.slice(0, 200).replace(/<[^>]*>/g, '') + '...',
    } : null;
  },
  ['latest-post'],
  { revalidate: 60 }
);

const getUpcomingEvent = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const event = await prisma.event.findFirst({
      where: { category: 'Upcoming', deletedAt: null },
      orderBy: { startDate: 'asc' },
    });
    await prisma.$disconnect();
    return event ? {
      ...event,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate?.toISOString() || null,
      createdAt: event.createdAt.toISOString(),
      excerpt: event.excerpt || (event.description?.slice(0, 150).replace(/<[^>]*>/g, '') || '') + '...',
    } : null;
  },
  ['upcoming-event'],
  { revalidate: 60 }
);

const getPastEvents = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const events = await prisma.event.findMany({
      where: { category: 'Past', deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
    await prisma.$disconnect();
    return events.map(e => ({
      ...e,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate?.toISOString() || null,
      createdAt: e.createdAt.toISOString(),
    }));
  },
  ['past-events'],
  { revalidate: 60 }
);

export default async function HomePage() {
  const [latestPost, upcomingEvent, pastEvents] = await Promise.all([
    getLatestPost(),
    getUpcomingEvent(),
    getPastEvents(),
  ]);

  const formatDate = (d: string | null | undefined) => {
    if (!d) return 'Date TBD';
    return new Date(d).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION - Cinematic */}
      <section className="relative min-h-screen bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/programs/esl3.png"
            alt="Community support"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div className="text-white">
                <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                  501(c)(3) Nonprofit Organization
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                  Supporting{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400">
                    Refugee
                  </span>{' '}
                  Women and Children
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                  From a refugee camp in Uganda to a beacon of hope in New Haven, 
                  we empower families with education, health navigation, and community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/donate" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-bold rounded-lg transition transform hover:scale-105"
                  >
                    Donate Now
                    <span className="ml-2">→</span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition"
                  >
                    Learn Our Story
                  </Link>
                </div>
              </div>

              {/* Right - Video Card */}
              <div className="hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <YouTubeEmbed videoId="6bfSEk_oX60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-black text-brand-primary">25+</p>
                <p className="text-white/80 text-sm">Years of Service</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-brand-primary">500+</p>
                <p className="text-white/80 text-sm">Families Served</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-brand-primary">150+</p>
                <p className="text-white/80 text-sm">Volunteers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-brand-primary">50+</p>
                <p className="text-white/80 text-sm">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/Nihiri_founder.jpeg"
                  alt="Jane Kinity, Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-primary rounded-xl p-5 shadow-lg">
                <p className="text-sm text-brand-text/80 mb-1">Founded by</p>
                <p className="text-xl font-bold text-brand-text">Jane Kinity</p>
                <p className="text-sm text-brand-text/80">2025 Award Recipient</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-brand-primary font-semibold uppercase tracking-wide text-sm">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">
                A Journey of Resilience
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Before arriving in the United States, <strong>Jane Kinity</strong> was an educator in Kenya 
                  alongside her husband, Isaac Newton Kinity. Political persecution forced them to flee, 
                  spending two years in a Ugandan refugee camp.
                </p>
                <p>
                  In 2000, they were resettled in New Haven by IRIS. What began as informal support for 
                  fellow refugees grew into weekly English classes in Jane&apos;s living room. Her kitchen 
                  became a classroom, her compassion a movement.
                </p>
                <p>
                  In 2012, this grassroots effort became the International New Hope for Refugees and 
                  Immigrants Center. Today, we serve over 500 families annually.
                </p>
              </div>
              <Link 
                href="/history" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mt-6 group"
              >
                Read the Full Story
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST BLOG SECTION */}
      {latestPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-brand-primary font-semibold uppercase tracking-wide text-sm">Latest Story</span>
                <h2 className="text-4xl font-black text-gray-900 mt-2">From Our Blog</h2>
              </div>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold mt-4 md:mt-0">
                View All Stories →
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Blog Image */}
              <Link href={`/blog#${latestPost.slug}`} className="group">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  {latestPost.cover ? (
                    <Image
                      src={latestPost.cover}
                      alt={latestPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-cyan-200 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-brand-primary text-brand-text px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {latestPost.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Blog Content */}
              <div>
                <p className="text-gray-500 text-sm mb-2">{formatDate(latestPost.publishedAt || '')}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-brand-primary transition">
                  <Link href={`/blog#${latestPost.slug}`}>
                    {latestPost.title}
                  </Link>
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {latestPost.excerpt}
                </p>
                <Link 
                  href={`/blog#${latestPost.slug}`}
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-6 py-3 rounded-lg font-semibold transition"
                >
                  Read Full Story
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING EVENT SECTION */}
      {upcomingEvent && (
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-brand-primary font-semibold uppercase tracking-wide text-sm">Join Us</span>
                <h2 className="text-4xl font-black mt-2">Upcoming Event</h2>
              </div>
              <Link href="/events" className="text-white/80 hover:text-white font-semibold mt-4 md:mt-0">
                View All Events →
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Event Content */}
              <div className="order-2 lg:order-1">
                <span className="inline-block bg-brand-primary text-brand-text px-4 py-1 rounded-full text-sm font-bold mb-4">
                  {upcomingEvent.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{upcomingEvent.title}</h3>
                <div className="flex flex-col sm:flex-row gap-6 mb-6 text-white/80">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-white/60">Date</p>
                    <p className="font-semibold">{formatDate(upcomingEvent.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-white/60">Location</p>
                    <p className="font-semibold">{upcomingEvent.location}</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed mb-8">
                  {upcomingEvent.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {upcomingEvent.registrationLink ? (
                    <a 
                      href={upcomingEvent.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-bold rounded-lg transition"
                    >
                      Register Now
                      <span className="ml-2">→</span>
                    </a>
                  ) : null}
                  <Link 
                    href="/events"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Event Image */}
              <div className="order-1 lg:order-2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  {upcomingEvent.cover ? (
                    <Image
                      src={upcomingEvent.cover}
                      alt={upcomingEvent.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-primary/30 to-cyan-600/30 flex items-center justify-center">
                      <span className="text-8xl">📅</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PAST EVENTS GRID */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-brand-background">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <span className="text-brand-primary font-semibold uppercase tracking-wide text-sm">Looking Back</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2">Past Events</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Explore the remarkable events and milestones that define our journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.map((event) => (
                <Link 
                  key={event.id} 
                  href="/events/past"
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  <div className="relative h-48 overflow-hidden">
                    {event.cover ? (
                      <Image
                        src={event.cover}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-4xl">📅</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-1">{formatDate(event.startDate)}</p>
                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-brand-primary transition">
                      {event.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                href="/events/past" 
                className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                View All Past Events
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PARTNERS SECTION */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <span className="text-brand-primary font-semibold uppercase tracking-wide text-sm">Our Network</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Partners</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We are grateful to collaborate with these amazing organizations who share our commitment 
              to supporting refugee and immigrant communities.
            </p>
          </div>
          <PartnerLogos />
        </div>
      </section>

      {/* DONATE CTA SECTION */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Help Us Make a Difference
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your donation directly supports ESL classes, health navigation, and advocacy 
            services for refugee families rebuilding their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-primary hover:bg-brand-dark text-brand-text text-lg font-bold rounded-lg transition transform hover:scale-105 shadow-xl"
            >
              Donate Now
              <span className="ml-2">→</span>
            </Link>
            <Link 
              href="/volunteer" 
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition"
            >
              Become a Volunteer
            </Link>
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            New International Hope is a registered 501(c)(3) nonprofit. All donations are tax-deductible.
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay Connected"
        subtitle="Get the latest stories, events, and updates from our community"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
