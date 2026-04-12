// app/programs/health/page.tsx - HEALTH PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaHandHoldingHeart,
  FaHeartbeat,
  FaBrain,
  FaUserMd,
  FaHospital,
  FaBookMedical,
  FaFemale,
  FaHeart,
  FaLeaf,
  FaMobileAlt,
  FaRunning,
  FaUtensils,
  FaChevronRight,
  FaUsers
} from 'react-icons/fa';


export default function HealthPage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-05-health-nav.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/health3.png" alt="Health Support" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-green-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="kicker-cyan mb-4 block">Holistic Wellbeing</span>
              <h1 className="heading-editorial text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
                Health & <span className="heading-accent-cyan">Wellness</span>
              </h1>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial text-gray-600 mb-6">
                Health is more than just medical care—it's mental wellbeing, preventive education, 
                and access to essential resources. Our Health program provides comprehensive support 
                to help refugees and immigrants thrive physically, mentally, and emotionally.
              </p>
              <p className="body-editorial text-gray-600 mb-8">
                From health education to counseling referrals, medical navigation to hygiene assistance, 
                we ensure that health disparities don't prevent our community members from achieving 
                their full potential.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="btn-cyan inline-flex items-center px-8 py-4 rounded-lg"
                >
                  Get Health Support <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/referral"
                  className="inline-flex items-center bg-white text-gray-900 border-2 border-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition"
                >
                  Submit Referral
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH EDUCATION SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-06-world-refugee-day.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Knowledge is Health</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">Health <span className="heading-accent-cyan">Education</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial text-gray-600 max-w-2xl mx-auto">
              Empowering refugees and immigrants with vital health knowledge to navigate the U.S. 
              healthcare system and maintain their wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Medical Navigation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHospital className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Medical System Navigation</h3>
              <p className="text-gray-600">
                Comprehensive workshops teaching how to access healthcare services, understand insurance 
                coverage, schedule appointments, and communicate effectively with healthcare providers 
                in the U.S. system.
              </p>
            </div>

            {/* Preventive Care */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHeartbeat className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Preventive Care</h3>
              <p className="text-gray-600">
                Education on the importance of regular check-ups, vaccinations, screenings, and healthy 
                lifestyle choices that can prevent serious health issues before they develop.
              </p>
            </div>

            {/* Mental Health Awareness */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBrain className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Mental Health Awareness</h3>
              <p className="text-gray-600">
                Destigmatizing mental health and teaching coping strategies for stress, trauma, and 
                cultural adjustment. Promoting understanding that mental health is just as important 
                as physical health.
              </p>
            </div>

            {/* Nutrition & Wellness */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUtensils className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Nutrition & Wellness</h3>
              <p className="text-gray-600">
                Workshops on healthy eating on a budget, understanding food labels, adapting traditional 
                diets to local ingredients, and maintaining physical health through proper nutrition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEDICAL REFERRALS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-04-welcome-dinner.jpg')" }}
      >
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-white/90 mb-4 block">Connecting to Care</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">Medical & Counseling <span className="italic font-serif">Referrals</span></h2>
            <div className="hr-white mx-auto my-6"></div>
            <p className="body-editorial text-white/90 max-w-2xl mx-auto">
              Facilitating access to essential medical and mental health services through trusted 
              partnerships with local healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Primary Care */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUserMd className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Primary Care Access</h3>
              <p className="text-gray-600">
                Referrals to clinics and physicians who provide comprehensive primary care services, 
                including routine check-ups, chronic disease management, and preventive screenings 
                regardless of insurance status.
              </p>
            </div>

            {/* Mental Health Services */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBrain className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Mental Health Services</h3>
              <p className="text-gray-600">
                Connections to culturally sensitive counselors and therapists who understand the unique 
                challenges refugees face. Support for trauma, anxiety, depression, and family counseling 
                with multilingual providers when possible.
              </p>
            </div>

            {/* Medical Navigation */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHospital className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Medical Navigation</h3>
              <p className="text-gray-600">
                Accompanying clients to appointments, helping complete medical forms, explaining 
                treatment plans, and ensuring clients understand their healthcare options and rights. 
                Acting as a bridge between clients and providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WOMEN'S HEALTH SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="kicker-cyan mb-4 block">Specialized Care</span>
              <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">Women's <span className="heading-accent-cyan">Health</span></h2>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial text-gray-600 mb-6">
                Addressing the unique health needs of refugee and immigrant women through education 
                and access to specialized services. We create safe spaces for women to learn about 
                their health and access culturally appropriate care.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaFemale className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Reproductive Health Education</h4>
                    <p className="text-gray-600 text-sm">
                      Comprehensive education on reproductive health, family planning, prenatal care, 
                      and maternal health in a culturally sensitive manner.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHeartbeat className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Cancer Screenings & Prevention</h4>
                    <p className="text-gray-600 text-sm">
                      Education and referral services for breast cancer screenings, cervical cancer 
                      prevention, and other women's health screenings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaHeart className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Safe Space Support Groups</h4>
                    <p className="text-gray-600 text-sm">
                      Women's health circles where participants can discuss health concerns, share 
                      experiences, and support each other in a confidential environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/esl_founder.png" alt="Women's Health Support" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-400/20" />
            </div>
          </div>
        </div>
      </section>

      {/* HYGIENE ASSISTANCE SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-cyan-300 mb-4 block">Essential Support</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">Hygiene & Basic Needs <span className="italic font-serif text-cyan-300">Assistance</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial text-white/80 max-w-2xl mx-auto">
              Providing essential hygiene products and resources to ensure dignity and health for 
              individuals and families facing financial hardship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Hygiene Kits */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">Hygiene Kits Distribution</h3>
              <p className="text-white/80">
                Providing essential hygiene items including soap, shampoo, toothpaste, feminine hygiene 
                products, and other personal care necessities to families in need.
              </p>
            </div>

            {/* Hygiene Education */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBookMedical className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">Hygiene Education</h3>
              <p className="text-white/80">
                Workshops on personal hygiene practices, home sanitation, food safety, and preventing 
                common illnesses through proper hygiene habits.
              </p>
            </div>

            {/* Emergency Assistance */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaMobileAlt className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">Emergency Support</h3>
              <p className="text-white/80">
                Rapid response assistance for families facing urgent health-related needs, including 
                prescription medication support and emergency hygiene supplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENTAL HEALTH & TRAUMA SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-09-award-ceremony.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/community1.png" alt="Mental Health Support" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-400/20" />
            </div>

            <div className="order-1 lg:order-2">
              <span className="kicker-cyan mb-4 block">Healing & Recovery</span>
              <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900 mb-6">Mental Health & <span className="heading-accent-cyan">Trauma</span> Support</h2>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial text-gray-600 mb-6">
                Many refugees have experienced profound trauma before and during their journey to safety. 
                We provide compassionate support and connections to specialized mental health services 
                that understand the unique challenges of displacement and cultural adjustment.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaBrain className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Trauma-Informed Care</h4>
                    <p className="text-gray-600 text-sm">
                      Connecting clients with therapists trained in trauma-informed care who understand 
                      the psychological impact of war, displacement, and resettlement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUsers className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Support Groups</h4>
                    <p className="text-gray-600 text-sm">
                      Peer support groups where individuals can share experiences, reduce isolation, 
                      and build community with others who understand their journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaLeaf className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Wellness Activities</h4>
                    <p className="text-gray-600 text-sm">
                      Yoga, meditation, and mindfulness sessions designed to reduce stress, improve 
                      mental wellbeing, and provide tools for managing anxiety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaRunning className="text-cyan-600"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Cultural Adjustment Support</h4>
                    <p className="text-gray-600 text-sm">
                      Specialized support for navigating the emotional challenges of adapting to a new 
                      culture while maintaining identity and traditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}
      >
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-white/90 mb-4 block">Our Impact</span>
            <h2 className="heading-editorial text-4xl text-white">Health Program <span className="italic font-serif">Outcomes</span></h2>
            <div className="hr-white mx-auto my-6"></div>
            <p className="body-editorial text-white/90 max-w-2xl mx-auto">
              Making a measurable difference in the health and wellbeing of our community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <span className="stat-cyan text-5xl block mb-2 text-white">500+</span>
              <span className="text-white/80 body-editorial">Health Education Sessions</span>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <span className="stat-cyan text-5xl block mb-2 text-white">200+</span>
              <span className="text-white/80 body-editorial">Medical Referrals</span>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <span className="stat-cyan text-5xl block mb-2 text-white">300+</span>
              <span className="text-white/80 body-editorial">Hygiene Kits Distributed</span>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <span className="stat-cyan text-5xl block mb-2 text-white">150+</span>
              <span className="text-white/80 body-editorial">Mental Health Connections</span>
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

            <Link href="/programs/community" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Community</h3>
                <p className="text-gray-600 mb-4">
                  Youth programs, cultural orientation, and family support for building connections.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
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
