import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import PartnerLogos from '@/components/PartnerLogos';
import NewsletterCTA from '@/components/NewsletterCTA';
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
      
      {/* HERO SECTION - Cinematic */}
      <section className="relative min-h-screen bg-cyan-50/30 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-brand-primary/10 animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Background Image with Faint Cyan Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/programs/esl3.png"
            alt="Community support"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-cyan-50/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col px-6 md:px-12 pt-20 md:pt-28 pb-32 md:pb-40">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text & Mobile Video */}
              <ScrollReveal direction="left" className="text-gray-900">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                  Supporting{' '}
                  <span className="text-cyan-600">
                    Refugee
                  </span>{' '}
                  Women and Children
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed">
                  From a refugee camp in Uganda to a beacon of hope in New Haven, 
                  we empower families with education, health navigation, and community.
                </p>
                
                {/* Mobile Video - Small Preview (before buttons) */}
                <div className="lg:hidden mb-6">
                  <YouTubeEmbed 
                    videoId="6bfSEk_oX60" 
                    mini={true}
                  />
                </div>

                {/* Buttons - 2 columns on mobile, horizontal on sm+ */}
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

              {/* Right - Desktop Video Card (hidden on mobile) */}
              <ScrollReveal direction="right" delay={0.2} className="hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <YouTubeEmbed videoId="6bfSEk_oX60" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Stats Bar - Positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-black text-cyan-600">25+</p>
                <p className="text-gray-600 text-sm">Years of Service</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-cyan-600">500+</p>
                <p className="text-gray-600 text-sm">Families Served</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-cyan-600">150+</p>
                <p className="text-gray-600 text-sm">Volunteers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-cyan-600">50+</p>
                <p className="text-gray-600 text-sm">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION - Structured like Elena's Light: content-driven with profile accent */}
      <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <ScrollReveal className="text-center mb-12">
            <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
              A Journey of Resilience
            </h2>
          </ScrollReveal>

          {/* Founder Statement with Profile Image - Text is primary, image accent on edge */}
          <div className="relative max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 pr-24 md:pr-32">
                {/* Profile Image - Small, circular, positioned at right edge */}
                <div className="absolute top-8 right-4 md:right-6">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-brand-primary shadow-lg">
                      <Image
                        src="/images/hero/kinity.jpeg"
                        alt="Jane Kinity"
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-1 rounded-full border-2 border-cyan-200/50"></div>
                  </div>
                </div>

                {/* Statement Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4 pr-16 md:pr-8">
                    <strong className="text-gray-900">Jane Kinity</strong> is the CEO and founder of International New Hope for Refugees and Immigrants. A passionate advocate for displaced communities, she serves as an elected <strong>Refugee Congress Delegate</strong> representing the State of Connecticut.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    She is also an elected <strong>Democratic Delegate</strong> for the City of New Haven and the <strong>Co-Chair of the Democratic Party</strong> for the Dwight neighborhood in New Haven. In addition, she represents the City of New Haven as a Connecticut Delegate for the <strong>Communist Party USA (CPUSA)</strong>.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Jane works per diem as a <strong>Swahili translator at IRIS</strong> (Integrated Refugee & Immigrant Services), helping bridge communication gaps for new arrivals. Her dedication has been recognized widely: in 2012, she received an honorary award during the Connecticut Immigration Day Celebration, accompanied by an official statement from Governor Dannel Malloy. She also works at Middle Town private code conservator.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A graduate from University of Bridgeport, she is currently pursuing her career in Ashwood University to become a Psychologist and a Chancellor.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    She holds a <strong>Community Service Award</strong> from her Organization&apos;s Management Team recognizing her outstanding contributions to the Community. Through every role, she remains committed to empowering Refugees and Immigrants, and marginalized Communities across Connecticut and beyond.
                  </p>
                </div>

                {/* CTA Link */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link 
                    href="/history" 
                    className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold group"
                  >
                    Read the Full Story
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Decorative Elements - Visual connection to other sections */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-brand-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

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
                          Register Now
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

              {/* Latest Past Event - Right */}
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
