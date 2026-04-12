'use client';

import Image from 'next/image';
import Link from 'next/link';
import HistoryCarousel from '@/components/HistoryCarousel';


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
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION */}
      <section className="relative bg-cover bg-center pt-32 pb-20" style={{backgroundImage: `url('/images/history/history-01-hero.jpeg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="kicker-cyan mb-6 block">Our Journey</span>
          <h1 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Our <span className="heading-accent-cyan">History</span>
          </h1>
          <div className="hr-cyan my-6 mx-auto"></div>
          <p className="hero-subtitle text-gray-600 max-w-2xl mx-auto">
            From a refugee camp in Uganda to a beacon of hope in New Haven, 
            our story is one of resilience, community, and transformative education.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY - Two Column Text Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text - Two Columns */}
            <div className="order-2 lg:order-1">
              <span className="kicker-cyan mb-4 block">The Founder</span>
              <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-6">
                The Story of <span className="heading-accent-cyan">Jane Kinity</span>
              </h2>
              <div className="hr-cyan mb-6"></div>
              
              {/* Two Column Text Layout */}
              <div className="grid md:grid-cols-2 gap-6 text-gray-600 body-editorial text-sm">
                <div className="space-y-4">
                  <p>
                    Before arriving in the United States, <strong className="text-gray-900">Jane Kinity</strong> was an educator in Kenya 
                    alongside her husband, <strong className="text-gray-900">Isaac Newton Kinity</strong>. Their lives were forever changed 
                    when political persecution and threats forced them to flee their home.
                  </p>
                  <p>
                    For two years, Jane and her family lived in a refugee camp in Uganda, enduring hardships 
                    that would break many spirits. But Jane&apos;s commitment to education never wavered.
                  </p>
                  <p>
                    In 2000, they were resettled in New Haven, Connecticut, by 
                    <Link href="https://irisct.org/" target="_blank" className="text-brand-dark hover:underline font-semibold"> IRIS</Link>.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    What began as informal support grew into weekly English classes in her 
                    living room. Jane understood that language was the key to independence.
                  </p>
                  <p>
                    In 2012, this effort became the <strong className="text-gray-900">International New Hope for 
                    Refugees and Immigrants Center</strong>, expanding to health navigation and advocacy.
                  </p>
                  <p className="text-brand-dark font-semibold">
                    In 2025, Jane received the Elena&apos;s Light Leadership Award for her lifelong dedication.
                  </p>
                </div>
              </div>

              {/* External Links - Cyan Style */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-serif font-medium text-gray-900 mb-4">Learn More</h3>
                <div className="space-y-3">
                  {externalLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-cyan-50 transition group"
                    >
                      <span className="text-cyan-600 mt-1">→</span>
                      <div>
                        <p className="font-medium text-cyan-700 group-hover:underline">
                          {link.name}
                        </p>
                        <p className="text-sm text-gray-500">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl img-zoom">
                <Image
                  src="/images/about/Nihiri_founder.jpeg"
                  alt="Jane Kinity, Founder"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-cyan-600 rounded-xl p-4 shadow-lg">
                <p className="stat-number text-3xl text-white">25+</p>
                <p className="text-sm text-white/80">Years of Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL - Marquee Style */}
      <section className="relative py-16 bg-cover bg-center border-y border-gray-200" style={{backgroundImage: `url('/images/history/history-02-jane-kitchen.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <span className="kicker-cyan mb-4 block">Gallery</span>
            <h2 className="heading-editorial text-2xl md:text-3xl text-gray-900">
              Moments Through the <span className="heading-accent-cyan">Years</span>
            </h2>
            <div className="hr-cyan mx-auto my-4"></div>
          </div>
          <HistoryCarousel />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Timeline</span>
            <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
              Key <span className="heading-accent-cyan">Milestones</span>
            </h2>
            <div className="hr-cyan mx-auto my-6"></div>
          </div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-cyan-600/30 md:-translate-x-1/2" />
            
            {milestones.map((milestone, idx) => (
              <div 
                key={milestone.year}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-cyan-600 border-4 border-white shadow-md md:-translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wider">
                    {milestone.year}
                  </span>
                  <h3 className="card-title-cyan text-xl mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed body-editorial">
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
      <section className="relative py-20 bg-cover bg-center" style={{backgroundImage: `url('/images/history/history-04-501c3.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="kicker-cyan mb-4 block">Impact</span>
            <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-4">
              Our <span className="heading-accent-cyan">Numbers</span>
            </h2>
            <div className="hr-cyan mx-auto my-6"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '25+', label: 'Years of Service' },
              { number: '500+', label: 'Families Served' },
              { number: '50+', label: 'Countries Represented' },
              { number: '150+', label: 'Active Volunteers' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="stat-cyan text-4xl md:text-5xl mb-2">{stat.number}</p>
                <p className="text-gray-600 body-editorial">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote className="quote-editorial text-gray-900 mb-8">
            &ldquo;Empowerment through education—turning the challenges of displacement into the triumphs of new beginnings.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="text-left">
              <cite className="not-italic font-serif font-medium text-gray-900 block">Jane Kinity</cite>
              <span className="text-gray-600 text-sm">Founder & Executive Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - With Background */}
      <section className="relative py-20 bg-cover bg-center" style={{backgroundImage: `url('/images/history/history-09-award-ceremony.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="kicker-cyan mb-4 block">Join Us</span>
          <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-6">
            Be Part of Our <span className="heading-accent-cyan">Story</span>
          </h2>
          <div className="hr-cyan mx-auto my-6"></div>
          <p className="hero-subtitle text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in continuing Jane&apos;s legacy of empowerment through education. 
            Whether as a volunteer, donor, or partner, you can help write the next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/volunteer" 
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition btn-text"
            >
              Volunteer With Us
            </Link>
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white font-semibold rounded-lg transition"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
