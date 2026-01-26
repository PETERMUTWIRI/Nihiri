// app/esl/page.tsx - ESL PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaChild, FaCar, FaUsers, FaLaptop } from 'react-icons/fa';

export default function ESLPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Image Left, Content Right */}
      <section className="py-20 pt-32 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              {/* Placeholder - Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-8xl">📚</span>
              </div>
              {/* <Image src="/images/esl-hero.jpg" alt="ESL Class" fill className="object-cover" priority /> */}
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                Flagship Program
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                ESL Program
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Our one-on-one English as a Second Language tutoring program is the heart of New International Hope. 
                We provide free childcare during sessions, allowing women to focus on their personal growth 
                without barriers.
              </p>
              <p className="text-gray-600 mb-8">
                Our customizable curriculum focuses on practical, working ESL skills—preparing clients 
                to embrace independence and navigate their new communities with confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                >
                  Get More Info <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/referral"
                  className="inline-flex items-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition"
                >
                  ESL Referral
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Transforming Lives Through Language</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Through our ESL programs, refugee women develop essential language skills, build confidence, 
            and foster meaningful social connections. Improved communication reduces isolation, enhances 
            access to healthcare, and opens pathways to employment—positively impacting mental and 
            physical well-being.
          </p>
        </div>
      </section>

      {/* ESL INITIATIVES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">ESL Initiatives</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Driving Permit */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaCar className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Driving Permit</h3>
              <p className="text-gray-600">
                Empowering independence by preparing clients for the DMV driver's license examination. 
                We foster cross-cultural friendships and safe spaces for cultural exchange.
              </p>
            </div>

            {/* Refugee Women Circle */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Refugee Women Circle</h3>
              <p className="text-gray-600">
                A 5-week empowerment program covering health insurance, job skills, childcare practices, 
                and more—taught by our dedicated staff in collaboration with community partners.
              </p>
            </div>

            {/* Online ESL */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Online ESL</h3>
              <p className="text-gray-600">
                Personalized one-on-one tutoring specialized to each woman's literacy level. 
                100% free with flexible scheduling in Dari, Farsi, Pashto, and Arabic.
              </p>
            </div>

            {/* Free Childcare */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChild className="text-3xl text-orange-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Childcare</h3>
              <p className="text-gray-600">
                Quality childcare provided during all ESL sessions, removing barriers and allowing 
                mothers to fully engage in their learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL - 5 Images Visible, Moving Right to Left */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our ESL Community</h2>
          <p className="text-gray-600 mt-2">Moments from our classes and community gatherings</p>
        </div>
        
        {/* Carousel Container - All 5 visible, scrolling */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll-left">
            {/* Image 1 */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                <span className="text-4xl">👩‍🏫</span>
              </div>
            </div>
            {/* Image 2 */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
            </div>
            {/* Image 3 */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            </div>
            {/* Image 4 */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            {/* Image 5 */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-4xl">🌍</span>
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                <span className="text-4xl">👩‍🏫</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-4xl">🌍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Other Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/programs/advocacy" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">Advocacy</h3>
                <p className="text-gray-600 mb-4">
                  Legal advocacy efforts to address the influx of refugees who desperately need assistance navigating complex systems.
                </p>
                <span className="text-blue-600 font-semibold flex items-center gap-2">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/health" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">Health</h3>
                <p className="text-gray-600 mb-4">
                  Interactive, accessible educational programs taught by licensed clinicians to promote wellness and health literacy.
                </p>
                <span className="text-blue-600 font-semibold flex items-center gap-2">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}