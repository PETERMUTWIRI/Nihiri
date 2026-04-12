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
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-09-award-ceremony.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/hero/kinity1.webp" alt="Employment Support" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                Economic Empowerment
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Employment & Economic Empowerment
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Financial independence is a cornerstone of successful integration. Our Employment program equips 
                refugees and immigrants with the skills, connections, and confidence to build meaningful careers 
                and achieve economic stability.
              </p>
              <p className="text-gray-600 mb-8">
                From resume writing to entrepreneurship guidance, we provide comprehensive support at every stage 
                of the employment journey. We partner with local employers who value the unique perspectives and 
                work ethic that newcomers bring to the workforce.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition shadow-lg"
                >
                  Get Career Support <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/volunteer"
                  className="inline-flex items-center bg-white text-brand-text border-2 border-brand-primary px-8 py-4 rounded-lg font-semibold hover:bg-brand-light transition"
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
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Career Development</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Job Readiness Training</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Building confidence and competence for the American workplace through practical skills training 
              and professional development workshops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Resume Writing */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resume Building</h3>
              <p className="text-gray-600">
                One-on-one assistance crafting professional resumes that highlight transferable skills and 
                experiences. We help clients present their backgrounds effectively to American employers.
              </p>
            </div>

            {/* Interview Preparation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interview Coaching</h3>
              <p className="text-gray-600">
                Mock interviews and coaching sessions to build confidence, practice common questions, and 
                understand American workplace culture and professional etiquette.
              </p>
            </div>

            {/* Digital Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Job Search</h3>
              <p className="text-gray-600">
                Training on online job boards, professional networking platforms like LinkedIn, email 
                communication, and digital application processes essential for modern job hunting.
              </p>
            </div>

            {/* Career Guidance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChartLine className="text-3xl text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Guidance</h3>
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
        <div className="absolute inset-0 bg-brand-primary/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-white/80 font-bold text-sm uppercase tracking-wide">Partnerships</span>
            <h2 className="text-4xl font-black text-white mt-2">Employer Connections</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              We partner with local employers who are committed to diversifying their workforce and recognizing 
              the value that refugees and immigrants bring to their organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Job Matching */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHandshake className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Job Matching</h3>
              <p className="text-gray-600">
                Connecting clients with job opportunities that match their skills, experience, and career goals. 
                We maintain relationships with employers across various industries including healthcare, 
                manufacturing, hospitality, and technology.
              </p>
            </div>

            {/* Application Support */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBuilding className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Application Assistance</h3>
              <p className="text-gray-600">
                Hands-on help completing job applications, writing cover letters, and preparing supporting 
                documents. We ensure applications are professional, complete, and submitted on time.
              </p>
            </div>

            {/* Mentorship */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Mentorship</h3>
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
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Business Development</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 mb-6">Small Business & Entrepreneurship</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                For those with entrepreneurial dreams, we offer guidance on starting and growing small businesses. 
                Many refugees and immigrants have valuable skills, trades, and business experience that can be 
                transformed into successful enterprises.
              </p>
              <p className="text-gray-600 mb-8">
                Our entrepreneurship support includes business plan development, understanding licensing requirements, 
                accessing microfinance opportunities, marketing strategies, and connecting with local business 
                development resources.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaLightbulb className="text-brand-primary"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Business Planning</h4>
                    <p className="text-gray-600 text-sm">Developing viable business plans and market strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHandshake className="text-green-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Resource Connections</h4>
                    <p className="text-gray-600 text-sm">Accessing microloans, business incubators, and support networks</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-blue-600"/>
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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
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
            <h2 className="text-4xl font-black text-white mb-4">Our Impact</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Supporting economic independence and career success for refugee and immigrant families
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">350+</span>
              <span className="text-white/80">Job Placements</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">50+</span>
              <span className="text-white/80">Employer Partners</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">25+</span>
              <span className="text-white/80">Businesses Launched</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">85%</span>
              <span className="text-white/80">Job Retention Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/history/history-06-world-refugee-day.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Employment Success in Action</h2>
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
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Other Programs</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/programs/esl" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">ESL Education</h3>
                <p className="text-gray-600 mb-4">
                  English language classes and skill development programs to empower communication and independence.
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/basic-needs" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">Basic Needs</h3>
                <p className="text-gray-600 mb-4">
                  Food assistance, housing support, and transportation services for stable living conditions.
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/health" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">Health Services</h3>
                <p className="text-gray-600 mb-4">
                  Medical referrals, wellness programs, and counseling support for holistic wellbeing.
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
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
