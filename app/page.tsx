import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import HeroCarousel from '@/components/HeroCarousel';
import PartnerLogos from '@/components/PartnerLogos';
import NewsletterCTA from '@/components/NewsletterCTA';
import OurStory from '@/components/OurStory';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

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

const getLatestPastEvent = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const event = await prisma.event.findFirst({
      where: { category: 'Past', deletedAt: null },
      orderBy: { createdAt: 'desc' },
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
  ['latest-past-event'],
  { revalidate: 60 }
);

export default async function HomePage() {
  const [latestPost, upcomingEvent, latestPastEvent] = await Promise.all([
    getLatestPost(),
    getUpcomingEvent(),
    getLatestPastEvent(),
  ]);

  const formatDate = (d: string | null | undefined) => {
    if (!d) return 'Date TBD';
    return new Date(d).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const hasEvents = upcomingEvent || latestPastEvent;

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION - Desktop: Carousel + Video | Mobile: Original Layout */}
      <section className="relative min-h-screen bg-cyan-50/30 overflow-hidden">
        {/* Clean background - no image */}

        {/* Content */}
        <div className="relative z-10 flex flex-col px-6 md:px-12 pt-16 md:pt-20 pb-0 md:pb-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* MOBILE LAYOUT - Keep original */}
            <div className="lg:hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Text & Mobile Video */}
                <ScrollReveal direction="left" className="text-gray-900">
                  <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    <span className="block">Supporting</span>
                    <span className="block text-cyan-600">Refugee</span>
                    <span className="block">Women</span>
                    <span className="block">and Children</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed">
                    At nihri&apos;s hope, we work hard to provide refugee and immigrant families with all the tools they need to cultivate and exercise their individual independence.
                  </p>
                  
                  {/* Mobile Video - Small Preview */}
                  <div className="mb-6">
                    <YouTubeEmbed 
                      videoId="6bfSEk_oX60" 
                      mini={true}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
                    <Link 
                      href="/donate" 
                      className="inline-flex items-center justify-center px-4 sm:px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-bold rounded-lg transition transform hover:scale-105 text-sm sm:text-base"
                    >
                      Donate
                      <span className="ml-1 sm:ml-2">→</span>
                    </Link>
                    <Link 
                      href="/about" 
                      className="inline-flex items-center justify-center px-4 sm:px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition text-sm sm:text-base"
                    >
                      Learn More
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* DESKTOP LAYOUT - New Design */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <ScrollReveal direction="left" className="text-gray-900">
                <h1 className="text-4xl xl:text-5xl font-black mb-6 leading-tight">
                  Supporting{' '}
                  <span className="text-cyan-600">
                    Refugee
                  </span>{' '}
                  Women and Children
                </h1>
                <p className="text-lg xl:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
                  At Nihri's hope, we work hard to provide refugee and immigrant families with all the tools they need to cultivate and exercise their individual independence.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-row gap-4">
                  <Link 
                    href="/donate" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-bold rounded-lg transition transform hover:scale-105 text-base"
                  >
                    Donate
                    <span className="ml-2">→</span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition text-base"
                  >
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>

              {/* Right - Carousel with Video */}
              <ScrollReveal direction="right" delay={0.2}>
                <HeroCarousel />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <OurStory />

      {/* LATEST BLOG SECTION */}
      {latestPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Latest Story</span>
                <h2 className="text-4xl font-black text-gray-900 mt-2">From Our Blog</h2>
              </div>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold mt-4 md:mt-0">
                View All Stories →
              </Link>
            </div>

            </ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Blog Image */}
              <ScrollReveal direction="left">
                <Link href={`/blog#${latestPost.slug}`} className="group block">
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

              </ScrollReveal>
              {/* Blog Content */}
              <ScrollReveal direction="right" delay={0.2}>
              <div>
                <p className="text-gray-500 text-sm mb-2">{formatDate(latestPost.publishedAt || '')}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-cyan-600 transition">
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
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS SECTION - Combined Upcoming & Past */}
      {hasEvents && (
        <section className="py-20 bg-cyan-50/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-12">
              <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Events</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2">Upcoming & Past Events</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Join us at our upcoming events or explore highlights from our recent gatherings.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upcoming Event - Left */}
              {upcomingEvent && (
                <ScrollReveal direction="left">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full">
                  <div className="relative h-64">
                    {upcomingEvent.cover ? (
                      <Image
                        src={upcomingEvent.cover}
                        alt={upcomingEvent.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center">
                        <span className="text-6xl">📅</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-brand-primary text-brand-text px-4 py-1 rounded-full text-sm font-bold">
                        Upcoming
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-cyan-600 text-sm font-semibold mb-2">{formatDate(upcomingEvent.startDate)}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{upcomingEvent.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Location:</span> {upcomingEvent.location}
                    </p>
                    <p className="text-gray-600 line-clamp-2 mb-6">{upcomingEvent.excerpt}</p>
                    <div className="flex flex-wrap gap-3">
                      {upcomingEvent.registrationLink ? (
                        <a 
                          href={upcomingEvent.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-brand-primary hover:bg-brand-dark text-brand-text font-bold rounded-lg transition"
                        >
                          Register 
                          <span className="ml-2">→</span>
                        </a>
                      ) : null}
                      <Link 
                        href="/events"
                        className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              )}

              {/* Latest Past Event - R */}
              {latestPastEvent && (
                <ScrollReveal direction="right">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full">
                  <div className="relative h-64">
                    {latestPastEvent.cover ? (
                      <Image
                        src={latestPastEvent.cover}
                        alt={latestPastEvent.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-6xl">📅</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Past Event
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm font-semibold mb-2">{formatDate(latestPastEvent.startDate)}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{latestPastEvent.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Location:</span> {latestPastEvent.location}
                    </p>
                    <p className="text-gray-600 line-clamp-2 mb-6">{latestPastEvent.excerpt}</p>
                    <Link 
                      href="/events/past"
                      className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition"
                    >
                      View Past Events
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PARTNERS SECTION */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-10">
            <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Our Network</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Partners</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We are grateful to collaborate with these amazing organizations who share our commitment 
              to supporting refugee and immigrant communities.
            </p>
          </ScrollReveal>
          <PartnerLogos />
        </div>
      </section>

      {/* DONATE CTA SECTION */}
      <section className="py-20 bg-cyan-50/50 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Help Us Make a Difference
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Your donation directly supports ESL classes, health navigation, and advocacy 
              services for refugee families rebuilding their lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="inline-flex items-center justify-center px-10 py-5 bg-brand-primary hover:bg-brand-dark text-brand-text text-lg font-bold rounded-lg transition transform hover:scale-105 shadow-xl"
              >
                Donate
                <span className="ml-2">→</span>
              </Link>
              <Link 
                href="/volunteer" 
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-900 text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition"
              >
                Become a Volunteer
              </Link>
            </div>
          </ScrollReveal>
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
