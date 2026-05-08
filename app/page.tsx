import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import HeroCarousel from '@/components/HeroCarousel';
import PartnerLogos from '@/components/PartnerLogos';

import OurStory from '@/components/OurStory';
import BoardStaffPreview from '@/components/BoardStaffPreview';
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
      where: { deletedAt: null, startDate: { gte: new Date() } },
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
      where: { deletedAt: null, startDate: { lt: new Date() } },
      orderBy: { startDate: 'desc' },
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

const getLatestGalleryImages = unstable_cache(
  async () => {
    const prisma = new PrismaClient();
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
    await prisma.$disconnect();
    return images.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      description: img.description?.trim() || null,
    }));
  },
  ['latest-gallery-images'],
  { revalidate: 60 }
);

const getFeaturedSuccessStories = unstable_cache(
  async () => {
    try {
      const prisma = new PrismaClient();
      const stories = await prisma.successStory.findMany({
        where: { approved: true, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 3,
      });
      await prisma.$disconnect();
      return stories.map((story) => ({
        id: story.id,
        name: story.name,
        organization: story.organization,
        imageUrl: story.imageUrl,
        story: story.story.slice(0, 150) + (story.story.length > 150 ? '...' : ''),
      }));
    } catch (error) {
      // Return empty array if table doesn't exist yet
      return [];
    }
  },
  ['featured-success-stories'],
  { revalidate: 60 }
);

export default async function HomePage() {
  const [latestPost, upcomingEvent, latestPastEvent, galleryImages, successStories] = await Promise.all([
    getLatestPost(),
    getUpcomingEvent(),
    getLatestPastEvent(),
    getLatestGalleryImages(),
    getFeaturedSuccessStories(),
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
    <div className="min-h-screen bg-white text-render-premium">
      
      {/* HERO SECTION - Desktop: Carousel + Video | Mobile: Original Layout */}
      <section className="relative flex items-center overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('/images/hero/graduation.jpeg')`}}>
        {/* White overlay with 97% opacity - solid overlay */}
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(255, 255, 255, 0.90)'}}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col px-6 md:px-12 pt-48 pb-4 md:pt-44 md:pb-12 w-full">
          <div className="max-w-7xl mx-auto w-full">
            {/* MOBILE LAYOUT - Keep original */}
            <div className="lg:hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Text & Mobile Video */}
                <ScrollReveal direction="left" className="text-gray-900">
                  <h1 className="heading-editorial text-5xl md:text-6xl mb-6 leading-tight text-center">
                    Our Mission
                  </h1>
                  <p className="hero-subtitle text-gray-600 mb-8 max-w-xl">
                    We are committed to supporting refugees and immigrants by connecting them with essential resources, empowering them with skills, and helping them build a stable and successful life in their new community.
                  </p>
                  
                  {/* Mobile Carousel */}
                  <div className="mb-6">
                    <HeroCarousel />
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
                    <Link 
                      href="/donate" 
                      className="inline-flex items-center justify-center px-4 sm:px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition transform hover:scale-105 text-sm sm:text-base btn-text shadow-lg shadow-cyan-600/25"
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
                <h1 className="heading-editorial text-5xl xl:text-7xl mb-6 leading-tight text-center">
                  Our Mission
                </h1>
                <p className="hero-subtitle text-gray-600 mb-8 max-w-xl">
                  We are committed to supporting refugees and immigrants by connecting them with essential resources, empowering them with skills, and helping them build a stable and successful life in their new community.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-row gap-4 justify-center">
                  <Link 
                    href="/donate" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition transform hover:scale-105 text-base btn-text shadow-lg shadow-cyan-600/25"
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

      {/* BOARD & STAFF PREVIEW */}
      <BoardStaffPreview />

      {/* PROGRAMS OVERVIEW SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-12">
            <span className="kicker-cyan mb-2 block">What We Do</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mt-2">
              Our <span className="heading-accent-cyan">Programs</span>
            </h2>
            <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive support services designed to empower refugee and immigrant families 
              on their journey to independence.
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ESL Program */}
            <ScrollReveal delay={0}>
              <Link href="/programs/esl" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">📚</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">ESL & Education</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    English language classes, digital literacy training, and translation services 
                    to empower effective communication.
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Health Program */}
            <ScrollReveal delay={0.1}>
              <Link href="/programs/health" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">🏥</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">Health & Wellness</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Medical referrals, mental health support, and healthcare navigation 
                    for holistic wellbeing.
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Advocacy Program */}
            <ScrollReveal delay={0.2}>
              <Link href="/programs/advocacy" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">⚖️</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">Advocacy & Legal</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Legal support, immigration guidance, and rights education to protect 
                    and empower our community.
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Basic Needs Program */}
            <ScrollReveal delay={0}>
              <Link href="/programs/basic-needs" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">🏠</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">Basic Needs</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Food assistance, housing support, and transportation services 
                    for stable living conditions.
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Employment Program */}
            <ScrollReveal delay={0.1}>
              <Link href="/programs/employment" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">💼</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">Employment</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Job training, career guidance, resume building, and employer 
                    connections for economic independence.
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Community Program */}
            <ScrollReveal delay={0.2}>
              <Link href="/programs/community" className="group block h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
                    <span className="text-2xl group-hover:text-white transition-colors">🤝</span>
                  </div>
                  <h3 className="card-title-cyan text-xl mb-3">Community</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cultural orientation, youth programs, and family support 
                    for building meaningful connections.
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/programs" 
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
            >
              View All Programs <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      {successStories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-12">
              <span className="kicker-cyan mb-2 block">Community Voices</span>
              <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mt-2">
                Stories of <span className="heading-accent-cyan">Hope</span>
              </h2>
              <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
                Real stories of resilience, growth, and transformation from our community members.
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <ScrollReveal key={story.id} delay={index * 0.1}>
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                    <div className="relative h-56 bg-cyan-100">
                      {story.imageUrl ? (
                        <img
                          src={story.imageUrl}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100">
                          <span className="text-6xl">👤</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="card-title-cyan text-xl mb-1">{story.name}</h3>
                      {story.organization && (
                        <p className="text-cyan-600 text-sm font-medium mb-3">{story.organization}</p>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {story.story}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <div className="text-center mt-10 space-y-4">
              <Link 
                href="/success-stories" 
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
              >
                View All Stories <span>→</span>
              </Link>
              <div>
                <Link 
                  href="/success-stories#submit" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition shadow-lg shadow-cyan-600/25"
                >
                  Share Your Story <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LATEST BLOG SECTION */}
      {latestPost && (
        <section className="relative py-20 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('/images/blog/youth.jpeg')`}}>
          {/* White overlay with 97% opacity - solid overlay */}
          <div className="absolute inset-0" style={{backgroundColor: 'rgba(255, 255, 255, 0.88)'}}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                <div>
                  <span className="kicker-cyan mb-2 block">Stories</span>
                  <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mt-2">
                    From Our <span className="heading-accent-cyan">Blog</span>
                  </h2>
                </div>
                <Link href="/blog" className="text-cyan-600 hover:text-cyan-700 font-semibold mt-4 md:mt-0 btn-text inline-flex items-center gap-1">
                  View All Stories <span>→</span>
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
                      <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                        <span className="text-6xl">📰</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {latestPost.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
              {/* Blog Content */}
              <ScrollReveal direction="right" delay={0.2}>
                <div>
                  <p className="text-cyan-600 text-sm mb-2 font-medium">{formatDate(latestPost.publishedAt || '')}</p>
                  <h3 className="content-title-cyan text-gray-900 mb-4">
                    <Link href={`/blog#${latestPost.slug}`}>
                      {latestPost.title}
                    </Link>
                  </h3>
                  <p className="body-editorial text-gray-600 mb-6">
                    {latestPost.excerpt}
                  </p>
                  <Link 
                    href={`/blog#${latestPost.slug}`}
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition btn-text shadow-lg shadow-cyan-600/25"
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
              <span className="kicker-cyan mb-2 block">Gatherings</span>
              <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mt-2">
                Upcoming & <span className="heading-accent-cyan">Past</span> Events
              </h2>
              <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
                Join us at our upcoming events or explore highlights from our recent gatherings.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upcoming Event - Left */}
              {upcomingEvent && (
                <ScrollReveal direction="left">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full border border-cyan-100">
                    <div className="relative h-64">
                      {upcomingEvent.cover ? (
                        <Image
                          src={upcomingEvent.cover}
                          alt={upcomingEvent.title}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                          <span className="text-6xl">📅</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          Upcoming
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-cyan-600 text-sm font-semibold mb-2 uppercase tracking-wider">{formatDate(upcomingEvent.startDate)}</p>
                      <h3 className="card-title-cyan text-gray-900 mb-3">{upcomingEvent.title}</h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Location:</span> {upcomingEvent.location}
                      </p>
                      <p className="text-gray-600 line-clamp-2 mb-6 body-editorial">{upcomingEvent.excerpt}</p>
                      <div className="flex flex-wrap gap-3">
                        {upcomingEvent.registrationLink ? (
                          <a 
                            href={upcomingEvent.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition btn-text shadow-lg shadow-cyan-600/25"
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

              {/* Latest Past Event - Right */}
              {latestPastEvent && (
                <ScrollReveal direction="right">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full border border-cyan-100">
                    <div className="relative h-64">
                      {latestPastEvent.cover ? (
                        <Image
                          src={latestPastEvent.cover}
                          alt={latestPastEvent.title}
                          fill
                          className="object-contain"
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
                      <p className="text-cyan-600 text-sm font-semibold mb-2 uppercase tracking-wider">{formatDate(latestPastEvent.startDate)}</p>
                      <h3 className="card-title-cyan text-gray-900 mb-3">{latestPastEvent.title}</h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Location:</span> {latestPastEvent.location}
                      </p>
                      <p className="text-gray-600 line-clamp-2 mb-6 body-editorial">{latestPastEvent.excerpt}</p>
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

      {/* GALLERY CAROUSEL SECTION */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal className="text-center mb-10">
              <span className="kicker-cyan mb-2 block">Visual Stories</span>
              <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mt-2">
                Community <span className="heading-accent-cyan">Gallery</span>
              </h2>
              <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
                Moments from our programs, events, and community gatherings.
              </p>
            </ScrollReveal>
            
            {/* Gallery Carousel */}
            <div className="relative">
              <div className="flex gap-4 animate-scroll-right">
                {galleryImages.map((image) => (
                  <Link
                    key={image.id}
                    href="/gallery"
                    className="flex-shrink-0 w-64 md:w-72 group"
                  >
                    <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={image.imageUrl}
                        alt={image.description || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {image.description && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm line-clamp-2">{image.description}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
                {/* Duplicate for seamless loop */}
                {galleryImages.map((image) => (
                  <Link
                    key={`dup-${image.id}`}
                    href="/gallery"
                    className="flex-shrink-0 w-64 md:w-72 group"
                  >
                    <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={image.imageUrl}
                        alt={image.description || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {image.description && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm line-clamp-2">{image.description}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/gallery" 
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
              >
                View Full Gallery <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PARTNERS SECTION */}
      <section className="py-16 bg-white border-t border-cyan-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-10">
            <span className="kicker-cyan mb-2 block">Collaboration</span>
            <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mt-2">
              Our <span className="heading-accent-cyan">Partners</span>
            </h2>
            <p className="body-editorial text-gray-600 mt-4 max-w-2xl mx-auto">
              We are grateful to collaborate with these amazing organizations who share our commitment 
              to supporting refugee and immigrant communities.
            </p>
          </ScrollReveal>
          <PartnerLogos />
        </div>
      </section>

      {/* DONATE CTA SECTION */}
      <section className="relative py-20 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('/images/cto/community.jpeg')`}}>
        {/* White overlay with 97% opacity - solid overlay */}
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(255, 255, 255, 0.90)'}}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <span className="kicker-cyan mb-4 block">Make an Impact</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">
              Help Us Make a <span className="heading-accent-cyan">Difference</span>
            </h2>
            <p className="hero-subtitle text-gray-600 mb-10 max-w-2xl mx-auto">
              Your donation directly supports ESL classes, health navigation, and advocacy 
              services for refugee families rebuilding their lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="inline-flex items-center justify-center px-10 py-5 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-bold rounded-lg transition transform hover:scale-105 shadow-xl btn-text shadow-cyan-600/25"
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

    </div>
  );
}
