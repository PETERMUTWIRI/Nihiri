// app/programs/basic-needs/page.tsx - BASIC NEEDS PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaUtensils, 
  FaHome, 
  FaBus, 
  FaBoxOpen, 
  FaTshirt, 
  FaPhoneAlt,
  FaFileAlt,
  FaMapMarkedAlt,
  FaBriefcase
} from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function BasicNeedsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-01-hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/hero/kinity6.webp" alt="Basic Needs Support" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                Essential Support
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Basic Needs Assistance
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                We believe that meeting fundamental needs is the foundation for building a stable and successful life. 
                Our Basic Needs program connects refugees and immigrants with essential resources including nutritious food, 
                safe housing, and reliable transportation.
              </p>
              <p className="text-gray-600 mb-8">
                By removing the stress of survival, we enable families to focus on long-term goals like education, 
                employment, and community integration. Every service is provided with dignity, cultural sensitivity, 
                and a commitment to empowering self-sufficiency.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition shadow-lg"
                >
                  Get Assistance <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/volunteer"
                  className="inline-flex items-center bg-white text-brand-text border-2 border-brand-primary px-8 py-4 rounded-lg font-semibold hover:bg-brand-light transition"
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD & BASIC NEEDS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-02-jane-kitchen.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Food Security</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Food & Basic Needs Assistance</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              No family should worry about where their next meal will come from. We help individuals and families 
              access nutritious food and essential supplies through comprehensive support services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Food Banks */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBoxOpen className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Food Bank Connections</h3>
              <p className="text-gray-600">
                We connect clients to local food banks and pantries, ensuring families have consistent access to 
                nutritious groceries and pantry staples that meet their dietary needs and cultural preferences.
              </p>
            </div>

            {/* SNAP/WIC Assistance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUtensils className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SNAP & WIC Applications</h3>
              <p className="text-gray-600">
                Our team provides hands-on assistance with applications for food assistance programs, helping families 
                navigate complex paperwork and understand their eligibility for ongoing nutritional support.
              </p>
            </div>

            {/* Community Meals */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <FaPhoneAlt className="text-3xl text-orange-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Meal Referrals</h3>
              <p className="text-gray-600">
                We maintain partnerships with community organizations offering free meals, soup kitchens, and 
                emergency food distribution events to ensure immediate hunger relief when families need it most.
              </p>
            </div>

            {/* Clothing & Essentials */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaTshirt className="text-3xl text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clothing & Essentials</h3>
              <p className="text-gray-600">
                Guidance on accessing nearby shelters, clothing resources, and essential household items to help 
                families establish comfortable living conditions as they rebuild their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOUSING SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-05-health-nav.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-primary/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-white/80 font-bold text-sm uppercase tracking-wide">Safe Shelter</span>
            <h2 className="text-4xl font-black text-white mt-2">Housing & Resettlement Support</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Safe, stable housing is fundamental to successful integration. We assist families in finding 
              housing options that provide security, dignity, and a foundation for building their new lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Affordable Housing */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaHome className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Housing Referrals</h3>
              <p className="text-gray-600">
                Referrals to affordable housing programs, subsidized housing options, and low-income apartment 
                complexes that welcome refugee and immigrant families.
              </p>
            </div>

            {/* Rental Applications */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rental Application Support</h3>
              <p className="text-gray-600">
                Guidance with rental applications, lease agreements, and understanding tenant rights to ensure 
                families secure housing with fair terms and protections.
              </p>
            </div>

            {/* Home Setup */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBoxOpen className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Home Setup Assistance</h3>
              <p className="text-gray-600">
                Support with utilities setup, furniture acquisition, and basic home necessities to transform 
                an empty space into a comfortable home for families.
              </p>
            </div>

            {/* Emergency Housing */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl md:col-span-2 lg:col-span-3">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt className="text-3xl text-red-600"/>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Housing Referrals</h3>
                  <p className="text-gray-600">
                    For families facing immediate housing crises, we provide rapid referrals to emergency shelters, 
                    transitional housing programs, and crisis intervention services. Our team works quickly to ensure 
                    no family faces homelessness alone, connecting them with safe temporary accommodations while 
                    longer-term housing solutions are secured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORTATION SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Mobility</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Transportation Assistance</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Access to reliable transportation opens doors to employment, healthcare, education, and community 
              connections. We ensure clients can reach the services they need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Appointment Transport */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBus className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medical & Legal Appointment Transport</h3>
              <p className="text-gray-600">
                Providing or coordinating transportation for critical appointments including medical visits, 
                legal consultations, and social services meetings to ensure clients never miss important engagements.
              </p>
            </div>

            {/* Public Transit Navigation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaMapMarkedAlt className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Public Transit Navigation</h3>
              <p className="text-gray-600">
                Hands-on training to navigate local bus routes, train systems, and public transportation networks, 
                empowering clients with the confidence to travel independently throughout their community.
              </p>
            </div>

            {/* Job Interview Transport */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBriefcase className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Employment Transport</h3>
              <p className="text-gray-600">
                Transportation support for job interviews, training programs, and employment-related activities, 
                removing a major barrier to economic self-sufficiency and career advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">500+</span>
              <span className="text-white/80">Families Assisted with Food</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">200+</span>
              <span className="text-white/80">Housing Placements</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">1,000+</span>
              <span className="text-white/80">Transportation Trips</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">24/7</span>
              <span className="text-white/80">Emergency Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Basic Needs in Action</h2>
          </div>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy2.png" alt="Food Distribution" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Community Support" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Housing Support" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy5.png" alt="Transportation Help" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy.jpg" alt="Essential Services" fill className="object-cover" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy2.png" alt="Food Distribution" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Community Support" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Housing Support" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy5.png" alt="Transportation Help" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy.jpg" alt="Essential Services" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}
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

            <Link href="/programs/employment" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">Employment</h3>
                <p className="text-gray-600 mb-4">
                  Job readiness training, career guidance, and economic empowerment for financial independence.
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
