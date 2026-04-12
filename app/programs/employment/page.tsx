// app/programs/employment/page.tsx - EMPLOYMENT PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaBriefcase, 
  FaLaptop, 
  FaHandshake, 
  FaChartLine, 
  FaLightbulb,
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaGraduationCap
} from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function EmploymentPage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-09-award-ceremony.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/hero/kinity1.webp" alt="Employment Support" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="kicker-cyan mb-4 block">Economic Empowerment</span>
              <h1 className="heading-editorial text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
                Employment & <span className="heading-accent-cyan">Economic</span> Empowerment
              </h1>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial mb-6">
                Financial independence is a cornerstone of successful integration. Our Employment program equips 
                refugees and immigrants with the skills, connections, and confidence to build meaningful careers 
                and achieve economic stability.
              </p>
              <p className="body-editorial mb-8">
                From resume writing to entrepreneurship guidance, we provide comprehensive support at every stage 
                of the employment journey. We partner with local employers who value the unique perspectives and 
                work ethic that newcomers bring to the workforce.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="btn-cyan inline-flex items-center px-8 py-4 rounded-lg"
                >
                  Get Career Support <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/volunteer"
                  className="inline-flex items-center bg-white text-gray-900 border-2 border-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition"
                >
                  Become a Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOB READINESS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Career Development</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">Job Readiness <span className="heading-accent-cyan">Training</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial max-w-2xl mx-auto">
              Building confidence and competence for the American workplace through practical skills training 
              and professional development workshops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Resume Writing */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Resume Building</h3>
              <p className="text-gray-600">
                One-on-one assistance crafting professional resumes that highlight transferable skills and 
                experiences. We help clients present their backgrounds effectively to American employers.
              </p>
            </div>

            {/* Interview Preparation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Interview Coaching</h3>
              <p className="text-gray-600">
                Mock interviews and coaching sessions to build confidence, practice common questions, and 
                understand American workplace culture and professional etiquette.
              </p>
            </div>

            {/* Digital Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Digital Job Search</h3>
              <p className="text-gray-600">
                Training on online job boards, professional networking platforms like LinkedIn, email 
                communication, and digital application processes essential for modern job hunting.
              </p>
            </div>

            {/* Career Guidance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChartLine className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Career Guidance</h3>
              <p className="text-gray-600">
                Personalized career counseling to identify strengths, explore career paths, understand 
                credential requirements, and develop long-term professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER PARTNERSHIPS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}
      >
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-white/90 mb-4 block">Partnerships</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">Employer <span className="italic font-serif">Connections</span></h2>
            <div className="hr-white mx-auto my-6"></div>
            <p className="body-editorial text-white/90 max-w-2xl mx-auto">
              We partner with local employers who are committed to diversifying their workforce and recognizing 
              the value that refugees and immigrants bring to their organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Job Matching */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHandshake className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Job Matching</h3>
              <p className="text-gray-600">
                Connecting clients with job opportunities that match their skills, experience, and career goals. 
                We maintain relationships with employers across various industries including healthcare, 
                manufacturing, hospitality, and technology.
              </p>
            </div>

            {/* Application Support */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBuilding className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Application Assistance</h3>
              <p className="text-gray-600">
                Hands-on help completing job applications, writing cover letters, and preparing supporting 
                documents. We ensure applications are professional, complete, and submitted on time.
              </p>
            </div>

            {/* Mentorship */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Professional Mentorship</h3>
              <p className="text-gray-600">
                Pairing clients with professional mentors who provide guidance, industry insights, networking 
                opportunities, and ongoing support as they navigate their careers in a new country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENTREPRENEURSHIP SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="kicker-cyan mb-4 block">Business Development</span>
              <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">Small Business & <span className="heading-accent-cyan">Entrepreneurship</span></h2>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial mb-6">
                For those with entrepreneurial dreams, we offer guidance on starting and growing small businesses. 
                Many refugees and immigrants have valuable skills, trades, and business experience that can be 
                transformed into successful enterprises.
              </p>
              <p className="body-editorial mb-8">
                Our entrepreneurship support includes business plan development, understanding licensing requirements, 
                accessing microfinance opportunities, marketing strategies, and connecting with local business 
                development resources.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaLightbulb className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Business Planning</h4>
                    <p className="text-gray-600 text-sm">Developing viable business plans and market strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHandshake className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Resource Connections</h4>
                    <p className="text-gray-600 text-sm">Accessing microloans, business incubators, and support networks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Growth Support</h4>
                    <p className="text-gray-600 text-sm">Ongoing mentorship for business sustainability and expansion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/esl_founder.png" alt="Entrepreneurship Support" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-400/20" />
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES / IMPACT */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-cyan-300 mb-4 block">Impact</span>
            <h2 className="heading-editorial text-4xl text-white">Our <span className="italic font-serif text-cyan-300">Impact</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial text-white/80 max-w-2xl mx-auto">
              Supporting economic independence and career success for refugee and immigrant families
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <span className="stat-cyan text-5xl block mb-2">350+</span>
              <span className="text-white/80 body-editorial">Job Placements</span>
            </div>
            <div className="p-6">
              <span className="stat-cyan text-5xl block mb-2">50+</span>
              <span className="text-white/80 body-editorial">Employer Partners</span>
            </div>
            <div className="p-6">
              <span className="stat-cyan text-5xl block mb-2">25+</span>
              <span className="text-white/80 body-editorial">Businesses Launched</span>
            </div>
            <div className="p-6">
              <span className="stat-cyan text-5xl block mb-2">85%</span>
              <span className="text-white/80 body-editorial">Job Retention Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/history/history-06-world-refugee-day.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="heading-editorial text-2xl text-gray-900">Employment Success in <span className="heading-accent-cyan">Action</span></h2>
          </div>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl1.png" alt="Job Training" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl2.png" alt="Workshop" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl3.png" alt="Career Event" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl4.png" alt="Mentorship" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl5.png" alt="Success Story" fill className="object-cover" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl1.png" alt="Job Training" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl2.png" alt="Workshop" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl3.png" alt="Career Event" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl4.png" alt="Mentorship" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl5.png" alt="Success Story" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-01-hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="kicker-cyan mb-4 block">Explore</span>
            <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900">Other <span className="heading-accent-cyan">Programs</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/programs/esl" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">ESL Education</h3>
                <p className="text-gray-600 mb-4">
                  English language classes and skill development programs to empower communication and independence.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/basic-needs" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Basic Needs</h3>
                <p className="text-gray-600 mb-4">
                  Food assistance, housing support, and transportation services for stable living conditions.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/health" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Health Services</h3>
                <p className="text-gray-600 mb-4">
                  Medical referrals, wellness programs, and counseling support for holistic wellbeing.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA />
    </div>
  );
}
