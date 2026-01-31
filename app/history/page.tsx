'use client';

import Image from 'next/image';
import Link from 'next/link';
import HistoryCarousel from '@/components/HistoryCarousel';
import NewsletterCTA from '@/components/NewsletterCTA';

const milestones = [
  { year: '2000', title: 'A New Beginning', desc: 'Jane and Isaac Newton Kinity arrive in New Haven after two years in a Ugandan refugee camp, resettled by IRIS.' },
  { year: '2000-2005', title: 'Seeds of Hope', desc: 'Jane begins informal support for refugee neighbors, drawing from her experience as an educator in Kenya.' },
  { year: '2005', title: 'First ESL Circle', desc: 'Weekly English classes begin in Jane\'s living room, creating a safe space for women to learn and connect.' },
  { year: '2012', title: 'Official Recognition', desc: 'International New Hope for Refugees & Immigrants Center receives 501(c)(3) nonprofit status.' },
  { year: '2016', title: 'Health Navigation', desc: 'Launch of health navigation program with first on-staff nurse providing medical appointment accompaniment.' },
  { year: '2019', title: 'World Refugee Day Festival', desc: 'Annual community celebration launches, drawing over 1,200 attendees to honor refugee contributions.' },
  { year: '2025', title: 'Leadership Recognition', desc: 'Jane receives the Elena\'s Light Leadership & Social Service Award for creating opportunities for families.' },
];

const externalLinks = [
  { name: 'IRIS - Integrated Refugee & Immigrant Services', url: 'https://irisct.org/', desc: 'The organization that resettled Jane and her family in New Haven' },
  { name: 'Elena\'s Light', url: 'https://elenaslight.org/', desc: 'Recognizing Jane\'s leadership with the 2025 Leadership Award' },
  { name: 'UNHCR - The UN Refugee Agency', url: 'https://www.unhcr.org/', desc: 'Learn more about global refugee resettlement efforts' },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Our History
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From a refugee camp in Uganda to a beacon of hope in New Haven, 
            our story is one of resilience, community, and transformative education.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about/Nihiri_founder.jpeg"
                  alt="Jane Kinity, Founder"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-primary rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-black text-brand-text">25+</p>
                <p className="text-sm text-brand-text/80">Years of Service</p>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                The Story of Jane Kinity
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Before arriving in the United States, <strong>Jane Kinity</strong> was an educator in Kenya 
                  alongside her husband, <strong>Isaac Newton Kinity</strong>. Their lives were forever changed 
                  when political persecution and threats forced them to flee their home, leaving everything behind.
                </p>
                <p>
                  For two years, Jane and her family lived in a refugee camp in Uganda, enduring hardships 
                  that would break many spirits. But Jane\'s commitment to education and community never wavered. 
                  In 2000, they were resettled in New Haven, Connecticut, by 
                  <Link href="https://irisct.org/" target="_blank" className="text-brand-primary hover:underline font-semibold"> Integrated Refugee & Immigrant Services (IRIS)</Link>.
                </p>
                <p>
                  What began as informal support for fellow refugees grew into weekly English classes in her 
                  living room. Jane understood that language was the key to independence, employment, and dignity. 
                  Her kitchen became a classroom, her neighbors became students, and her compassion became a movement.
                </p>
                <p>
                  In 2012, this grassroots effort was formalized into the <strong>International New Hope for 
                  Refugees and Immigrants Center</strong>. Today, the organization has expanded beyond ESL to 
                  include health navigation, advocacy, and the annual World Refugee Day festival that brings 
                  together over 1,200 community members.
                </p>
                <p className="text-brand-primary font-semibold">
                  In 2025, Jane\'s dedication was recognized with the Elena\'s Light Leadership and Social 
                  Service Award — a testament to a life devoted to creating opportunities for families 
                  rebuilding their lives.
                </p>
              </div>

              {/* External Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Learn More</h3>
                <div className="space-y-3">
                  {externalLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <span className="text-brand-primary mt-1">→</span>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-brand-primary transition">
                          {link.name}
                        </p>
                        <p className="text-sm text-gray-500">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL - Marquee Style */}
      <section className="py-12 bg-brand-background border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Moments Through the Years
          </h2>
          <HistoryCarousel />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-16">
            Key Milestones
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/30 md:-translate-x-1/2" />
            
            {milestones.map((milestone, idx) => (
              <div 
                key={milestone.year}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-primary border-4 border-white shadow-md md:-translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="inline-block bg-brand-primary/10 text-brand-text px-3 py-1 rounded-full text-sm font-bold mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '25+', label: 'Years of Service' },
              { number: '500+', label: 'Families Served' },
              { number: '50+', label: 'Countries Represented' },
              { number: '150+', label: 'Active Volunteers' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 italic leading-tight mb-8">
            “Empowerment through education—turning the challenges of displacement into the triumphs of new beginnings.”
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-brand-text font-bold text-lg">J</span>
            </div>
            <div className="text-left">
              <cite className="not-italic font-bold text-gray-900 block">Jane Kinity</cite>
              <span className="text-gray-600 text-sm">Founder & Executive Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us in continuing Jane\'s legacy of empowerment through education. 
            Whether as a volunteer, donor, or partner, you can help write the next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/volunteer" 
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition"
            >
              Volunteer With Us
            </Link>
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay Connected"
        subtitle="Follow our journey and stay updated on our impact"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
