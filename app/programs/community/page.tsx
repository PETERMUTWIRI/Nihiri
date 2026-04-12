// app/programs/community/page.tsx - COMMUNITY INTEGRATION PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaUsers, 
  FaGlobe, 
  FaGraduationCap, 
  FaChild, 
  FaHandHoldingHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaComments,
  FaStar
} from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/health3.png" alt="Community Event" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                Belonging & Connection
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Community Integration & Support
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Building bridges between cultures and creating a welcoming community where refugees and immigrants 
                feel valued, connected, and empowered to contribute their unique gifts.
              </p>
              <p className="text-gray-600 mb-8">
                Integration goes beyond learning a language—it is about feeling at home. Our Community Integration 
                program fosters meaningful connections through cultural orientation, mentorship, youth programs, 
                and community events that celebrate diversity while building shared understanding.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition shadow-lg"
                >
                  Get Connected <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/events"
                  className="inline-flex items-center bg-white text-brand-text border-2 border-brand-primary px-8 py-4 rounded-lg font-semibold hover:bg-brand-light transition"
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURAL ORIENTATION SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-05-health-nav.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-primary/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-white/80 font-bold text-sm uppercase tracking-wide">Welcome</span>
            <h2 className="text-4xl font-black text-white mt-2">Cultural Orientation Programs</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Understanding American systems, customs, and expectations to navigate daily life with confidence 
              while maintaining cultural identity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Life Skills */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaMapMarkerAlt className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Navigating Daily Life</h3>
              <p className="text-gray-600">
                Practical guidance on using public transportation, banking systems, grocery shopping, 
                understanding mail and bills, and accessing community services. We demystify the 
                everyday systems that can feel overwhelming to newcomers.
              </p>
            </div>

            {/* Cultural Customs */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGlobe className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Bridge-Building</h3>
              <p className="text-gray-600">
                Understanding American social norms, workplace culture, educational expectations, and 
                community participation while honoring and preserving one's own cultural heritage. 
                Integration is additive, not replacement.
              </p>
            </div>

            {/* Systems Navigation */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FaComments className="text-3xl text-purple-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Communication Skills</h3>
              <p className="text-gray-600">
                Beyond language—understanding non-verbal communication, conflict resolution styles, 
                professional correspondence, and advocacy skills for navigating institutions and 
                asserting needs effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTH PROGRAMS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Next Generation</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Youth & Family Support</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Supporting children and families through the unique challenges of navigating two cultures 
              while building strong foundations for success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Enrollment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">School Enrollment Support</h3>
              <p className="text-gray-600">
                Assistance with school registration, understanding the American education system, 
                parent-teacher communication, and advocating for children's educational needs 
                including ESL services and special education resources.
              </p>
            </div>

            {/* Youth Mentorship */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChild className="text-3xl text-blue-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Youth Mentorship Programs</h3>
              <p className="text-gray-600">
                Pairing refugee and immigrant youth with mentors who provide guidance, homework help, 
                college preparation, and supportive relationships that help young people navigate 
                the challenges of growing up between cultures.
              </p>
            </div>

            {/* Family Activities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-3xl text-orange-600"/>
              </div>
              <h3 className="texttext-xl font-bold text-gray-900 mb-3">Family Strengthening</h3>
              <p className="text-gray-600">
                Programs that help families maintain strong bonds across cultural transitions, 
                addressing intergenerational differences and supporting parents in raising children 
                in a new cultural context.
              </p>
            </div>

            {/* Youth Activities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FaStar className="text-3xl text-green-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Youth Activities</h3>
              <p className="text-gray-600">
                Sports, arts, and recreational programs that help children build friendships, 
                develop talents, and experience the joy of childhood while building confidence 
                and social skills in their new community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY EVENTS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-06-world-refugee-day.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Coming Together</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 mb-6">Community Events & Networking</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Creating spaces where refugees, immigrants, and receiving community members can meet, 
                share stories, and build friendships. Our events celebrate the rich diversity of our 
                community while fostering the connections that make integration meaningful.
              </p>
              <p className="text-gray-600 mb-8">
                From cultural festivals showcasing music, dance, and cuisine from around the world to 
                networking events connecting newcomers with established community members, we create 
                opportunities for genuine human connection.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-brand-primary"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Cultural Celebrations</h4>
                    <p className="text-gray-600 text-sm">Festivals, potlucks, and heritage celebrations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUsers className="text-blue-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Networking Gatherings</h4>
                    <p className="text-gray-600 text-sm">Professional and social networking opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHandHoldingHeart className="text-green-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Welcome Circles</h4>
                    <p className="text-gray-600 text-sm">Small group gatherings for deeper connections</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/health4.png" alt="Community Gathering" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
            </div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER MENTORSHIP SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Friendship & Mentorship</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our community volunteers provide invaluable friendship and guidance to newcomers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Friendship Partners</h3>
              <p className="text-white/80">
                Matched friendships between newcomer families and established community members who 
                provide informal support, companionship, and introduction to community life.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cultural Ambassadors</h3>
              <p className="text-white/80">
                Former refugees and immigrants who have successfully integrated share their experiences 
                and provide peer support to newcomers walking a similar path.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaStar className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Sponsorship</h3>
              <p className="text-white/80">
                Groups of community members who come together to support a family's integration journey, 
                providing friendship, guidance, and practical assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">200+</span>
              <span className="text-gray-600">Youth Mentored</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">50+</span>
              <span className="text-gray-600">Community Events</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">150+</span>
              <span className="text-gray-600">Friendship Matches</span>
            </div>
            <div className="p-6">
              <span className="text-5xl font-black text-brand-primary block mb-2">30+</span>
              <span className="text-gray-600">Cultures Represented</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/history/history-02-jane-kitchen.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Community in Action</h2>
          </div>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health1.png" alt="Community Event" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health2.png" alt="Youth Activity" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl4.png" alt="Cultural Celebration" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Friendship Circle" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Community Support" fill className="object-cover" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health1.png" alt="Community Event" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health2.png" alt="Youth Activity" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/esl4.png" alt="Cultural Celebration" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Friendship Circle" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Community Support" fill className="object-cover" />
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
