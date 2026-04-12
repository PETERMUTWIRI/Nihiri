import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import NewsletterCTA from '@/components/NewsletterCTA';
import PartnerLogos from '@/components/PartnerLogos';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-background text-render-premium">
      
      {/* HERO SECTION - Premium Editorial Style */}
      <section className="relative min-h-[70vh] bg-gradient-to-b from-brand-primary/20 to-brand-background flex items-center justify-center text-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 px-6 flex flex-col items-center w-full">
          {/* Kicker */}
          <span className="kicker mb-6 text-brand-neutral/80">
            Established 2018 • New Haven, CT
          </span>
          
          {/* Main Title - Black with Serif Accent */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tight-premium">
            Who We <span className="heading-accent text-brand-dark">Are</span>
          </h1>
          
          {/* Elegant Divider */}
          <div className="hr-elegant my-6"></div>
          
          {/* Subtitle - Light Weight for Contrast */}
          <p className="hero-subtitle text-gray-600 mb-12 max-w-3xl">
            Building brighter futures for refugee women and children through 
            <span className="font-medium text-gray-800"> compassion, education, and community.</span>
          </p>
          
          <div className="w-full max-w-4xl mx-auto">
            <YouTubeEmbed videoId="6bfSEk_oX60" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-brand-background"></div>
      </section>

      {/* MISSION & VISION - Editorial Layout */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="text-right pr-8 md:pr-12">
            <span className="label-premium text-brand-primary mb-4 block">01</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">
              Our <span className="heading-accent">Mission</span>
            </h2>
            <p className="body-editorial text-gray-600 text-lg">
              We equip refugee women and children with the tools, education, and support systems necessary 
              to build independent, thriving futures in their new communities.
            </p>
          </div>
          <div className="text-left pl-8 md:pl-12 border-l-2 border-brand-primary/30">
            <span className="label-premium text-brand-primary mb-4 block">02</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">
              Our <span className="heading-accent">Vision</span>
            </h2>
            <p className="body-editorial text-gray-600 text-lg">
              We envision communities where diversity is celebrated, opportunity is equitable, and every 
              refugee family has the resources to achieve self-sufficiency and dignity.
            </p>
          </div>
        </div>
      </section>

      {/* OUR HISTORY - Storytelling Layout */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white/50 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl img-zoom">
            <Image 
              src="/images/about/Nihiri_founder.jpeg"
              alt="Jane Kinity, Founder & Executive Director"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif italic text-lg">Jane Kinity</p>
              <p className="text-white/80 text-sm">Founder & Executive Director</p>
            </div>
          </div>
          <div className="pl-0 md:pl-8">
            <span className="kicker mb-4 block">Our Story</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-black mb-6">
              A Journey of <span className="heading-accent">Purpose</span>
            </h2>
            <div className="w-16 h-1 bg-brand-primary rounded-full mb-6"></div>
            <p className="body-editorial text-gray-600 mb-5">
              <strong className="text-gray-900 font-semibold">Jane Kinity, founder & Executive Director of New International Hope for Refugee.</strong> 
              She arrived in New Haven, CT as a refugee advocate in 2016, witnessing 
              firsthand the systemic barriers families face—language isolation, healthcare confusion, and social exclusion.
            </p>
            <p className="body-editorial text-gray-600 mb-6">
              The gaps in support she observed inspired a clear mission: no family should rebuild alone. 
              In 2018, Jane founded Nihiri to deliver practical, culturally-sensitive solutions she knew 
              could transform lives.
            </p>
            <Link href="/history" className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-text font-semibold transition-colors group btn-text">
              Explore Our Journey 
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES - Premium Card Design */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="kicker mb-4 block">What Drives Us</span>
          <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-black mb-4">
            Our Core <span className="heading-accent">Values</span>
          </h2>
          <div className="hr-elegant my-6"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Compassion", desc: "Empathy drives every action. We build bridges of understanding in an era of division, creating safe spaces where every person feels valued and welcomed." },
            { title: "Excellence", desc: "Quality isn't optional. From volunteers to leadership, we hold ourselves to the highest standards across every program and service." },
            { title: "Diversity", desc: "Our differences strengthen us. We actively celebrate and amplify diverse backgrounds, identities, and perspectives in all we do." },
            { title: "Independence", desc: "Self-determination is a human right. We provide tools for families to forge their own paths with dignity and autonomy." },
            { title: "Community", desc: "Belonging transforms lives. We foster genuine connections that turn strangers into neighbors and neighbors into family." },
            { title: "Iktsuarpok", desc: "An Inuit word meaning 'the anticipation of arrival.' It embodies our vision: a community where everyone feels that joyful sense of belonging." },
          ].map((value, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <span className="stat-number text-5xl text-brand-primary/30 mb-4 block">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="card-title text-gray-900 mb-4 group-hover:text-brand-dark transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE FULFILL OUR MISSION */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-200/60">
        <div className="text-center mb-16">
          <span className="kicker mb-4 block">What We Do</span>
          <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-black mb-4">
            Our <span className="heading-accent">Programs</span> & Services
          </h2>
          <div className="hr-elegant my-6"></div>
          <p className="body-editorial text-gray-600 max-w-2xl mx-auto text-lg">
            We offer comprehensive support across six key areas, empowering refugee and immigrant families to build independent, thriving lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "ESL & Education", 
              desc: "English language classes, digital literacy training, and translation services to empower communication and independence.",
              href: "/programs/esl"
            },
            { 
              title: "Health & Wellness", 
              desc: "Medical referrals, mental health counseling, healthcare navigation, and wellness programs for holistic wellbeing.",
              href: "/programs/health"
            },
            { 
              title: "Advocacy & Legal", 
              desc: "Legal support, immigration guidance, rights education, and assistance navigating complex systems.",
              href: "/programs/advocacy"
            },
            { 
              title: "Basic Needs", 
              desc: "Food assistance, housing support, transportation services, and essential resources for stable living conditions.",
              href: "/programs/basic-needs"
            },
            { 
              title: "Employment", 
              desc: "Job readiness training, career guidance, resume building, interview coaching, and employer connections.",
              href: "/programs/employment"
            },
            { 
              title: "Community", 
              desc: "Cultural orientation, youth programs, community integration support, and cross-cultural friendship programs.",
              href: "/programs/community"
            },
          ].map((program, idx) => (
            <Link 
              key={idx} 
              href={program.href}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <span className="stat-number text-5xl text-brand-primary/30 mb-4 block group-hover:text-brand-primary/50 transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="card-title text-gray-900 mb-3 group-hover:text-brand-dark transition-colors">
                {program.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {program.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-dark group-hover:text-brand-text transition-colors btn-text">
                Learn more
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Additional Services List */}
        <div className="mt-16 bg-brand-primary/5 rounded-3xl p-8 md:p-12">
          <h3 className="heading-editorial text-2xl md:text-3xl text-center text-gray-900 mb-8">
            Additional <span className="heading-accent">Services</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "In-home ESL classes with customizable, culturally-competent curricula",
              "Health education to bridge care gaps and establish healthy behaviors",
              "Teaching families to navigate the American healthcare system",
              "CT DMV driver's license examination preparation",
              "Cultural exchange through cross-cultural friendship programs",
              "Safe youth spaces for cultural exchange and community building",
              "All services provided completely free of charge to families",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 group list-none">
                <span className="w-6 h-6 rounded-full bg-brand-primary text-brand-text flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="kicker mb-4 block">Collaboration</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-4">
              Our <span className="heading-accent">Partners</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg body-editorial">
              We are grateful to collaborate with these amazing organizations who share our commitment to supporting refugee and immigrant communities.
            </p>
          </div>
          <PartnerLogos />
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA 
        title="Stay up to date with the latest at"
        placeholder="Enter your email address"
        buttonText="Subscribe →"
      />
    </div>
  );
}
