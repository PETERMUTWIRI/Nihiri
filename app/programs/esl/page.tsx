// app/programs/esl/page.tsx - ESL & EDUCATION PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaChild, 
  FaCar, 
  FaUsers, 
  FaLaptop, 
  FaLanguage,
  FaFileAlt,
  FaGraduationCap,
  FaKeyboard,
  FaGlobe,
  FaVideo
} from 'react-icons/fa';


export default function ESLPage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION - Image Left, Content Right */}
      <section
        className="relative py-20 pt-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/esl3.png" alt="ESL Class" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="kicker-cyan mb-4 block">Flagship Program</span>
              <h1 className="heading-editorial text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
                ESL & <span className="heading-accent-cyan">Education</span> Programs
              </h1>
              <div className="hr-cyan my-6"></div>
              <p className="body-editorial text-gray-600 mb-6">
                Our comprehensive language and education programs are the heart of New International Hope. 
                From English language instruction to digital literacy and translation services, we provide 
                the tools for effective communication and lifelong learning.
              </p>
              <p className="body-editorial text-gray-600 mb-8">
                We offer free childcare during sessions, allowing women to focus on their personal growth 
                without barriers. Our customizable curriculum focuses on practical, working skills—preparing 
                clients to embrace independence and navigate their new communities with confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="btn-cyan inline-flex items-center px-8 py-4 rounded-lg"
                >
                  Get More Info <FaArrowRight className="ml-2"/>
                </Link>
                <Link 
                  href="/referral"
                  className="inline-flex items-center bg-white text-gray-900 border-2 border-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-50 transition"
                >
                  ESL Referral
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="kicker-cyan mb-4 block">Transforming Lives</span>
          <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-6">Transforming Lives Through <span className="heading-accent-cyan">Language</span></h2>
          <div className="hr-cyan mx-auto my-6"></div>
          <p className="body-editorial text-gray-600">
            Through our ESL programs, refugee women develop essential language skills, build confidence, 
            and foster meaningful social connections. Improved communication reduces isolation, enhances 
            access to healthcare, and opens pathways to employment—positively impacting mental and 
            physical well-being.
          </p>
        </div>
      </section>

      {/* ESL INITIATIVES */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Programs</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">ESL <span className="heading-accent-cyan">Initiatives</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Driving Permit */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaCar className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Driving Permit</h3>
              <p className="text-gray-600">
                Empowering independence by preparing clients for the DMV driver's license examination. 
                We foster cross-cultural friendships and safe spaces for cultural exchange.
              </p>
            </div>

            {/* Refugee Women Circle */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Refugee Women Circle</h3>
              <p className="text-gray-600">
                A 5-week empowerment program covering health insurance, job skills, childcare practices, 
                and more—taught by our dedicated staff in collaboration with community partners.
              </p>
            </div>

            {/* Online ESL */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Online ESL</h3>
              <p className="text-gray-600">
                Personalized one-on-one tutoring specialized to each woman's literacy level. 
                100% free with flexible scheduling in Dari, Farsi, Pashto, and Arabic.
              </p>
            </div>

            {/* Free Childcare */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaChild className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Free Childcare</h3>
              <p className="text-gray-600">
                Quality childcare provided during all ESL sessions, removing barriers and allowing 
                mothers to fully engage in their learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section
        className="relative py-16 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/images/history/history-02-jane-kitchen.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10">
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              {/* Image 1 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health1.png" alt="Health Session 1" fill className="object-cover" />
              </div>
              {/* Image 2 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health2.png" alt="Health Session 2" fill className="object-cover" />
              </div>
              {/* Image 3 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health3.png" alt="Health Session 3" fill className="object-cover" />
              </div>
              {/* Image 4 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health4.png" alt="Health Session 4" fill className="object-cover" />
              </div>
              {/* Image 5 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health5.png" alt="Health Session 5" fill className="object-cover" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health1.png" alt="Health Session 1" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health2.png" alt="Health Session 2" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health3.png" alt="Health Session 3" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health4.png" alt="Health Session 4" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/health5.png" alt="Health Session 5" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGLISH LANGUAGE LEARNING SECTION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}
      >
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-white/90 mb-4 block">Language Mastery</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">English Language <span className="italic font-serif">Learning</span></h2>
            <div className="hr-white mx-auto my-6"></div>
            <p className="body-editorial text-white/90 max-w-2xl mx-auto">
              Comprehensive ESL instruction from beginner to advanced levels, helping clients improve 
              communication skills for daily life, work, and community participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Beginner to Advanced Classes */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">All Levels Welcome</h3>
              <p className="text-gray-600">
                Structured classes from beginner to advanced, ensuring every learner finds their 
                appropriate level and progresses at a comfortable pace with personalized attention.
              </p>
            </div>

            {/* Conversation Practice */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Conversation Groups</h3>
              <p className="text-gray-600">
                Practice speaking in a supportive group environment. These sessions build confidence 
                through real-world conversations on topics relevant to daily life and work.
              </p>
            </div>

            {/* Literacy Support */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Literacy Support</h3>
              <p className="text-gray-600">
                Specialized support for adults and youth developing reading and writing skills, 
                including phonics instruction and practical literacy for everyday tasks.
              </p>
            </div>

            {/* Certified ESL Referrals */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGlobe className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Certified ESL Referrals</h3>
              <p className="text-gray-600">
                Referrals to accredited ESL programs for clients seeking formal certification, 
                advanced academic English, or specialized professional language training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & SKILL DEVELOPMENT */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-05-health-nav.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Digital Age Skills</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">Education & Skill <span className="heading-accent-cyan">Development</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial text-gray-600 max-w-2xl mx-auto">
              Empowering individuals with essential digital and professional skills for independence 
              and employment in today's technology-driven world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Computer Training */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Basic Computer Skills</h3>
              <p className="text-gray-600">
                Foundational training in computer use, email management, internet navigation, and 
                essential software applications needed for modern life and employment.
              </p>
            </div>

            {/* Digital Literacy */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaKeyboard className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Digital Literacy Classes</h3>
              <p className="text-gray-600">
                Comprehensive digital literacy covering online safety, using smartphones and tablets, 
                accessing government services online, and navigating digital platforms confidently.
              </p>
            </div>

            {/* Job Readiness */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Job Search Skills</h3>
              <p className="text-gray-600">
                Training on online job searching, creating professional profiles, submitting digital 
                applications, and using technology to find and secure employment opportunities.
              </p>
            </div>

            {/* Career Mentorship */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Career Guidance</h3>
              <p className="text-gray-600">
                Mentorship and guidance on career pathways, credential recognition, continuing education 
                options, and professional development opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSLATION & INTERPRETATION */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-cyan-300 mb-4 block">Breaking Barriers</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">Translation & <span className="italic font-serif text-cyan-300">Interpretation</span> Services</h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial text-white/80 max-w-2xl mx-auto">
              Bridging language barriers to ensure clear communication in critical situations including 
              medical appointments, legal proceedings, and educational settings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Document Translation */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">Document Translation</h3>
              <p className="text-white/80">
                Professional translation of essential documents including medical records, legal paperwork, 
                school transcripts, employment documents, and immigration forms to ensure accurate 
                understanding and proper processing.
              </p>
            </div>

            {/* In-Person Interpretation */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaLanguage className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">In-Person & Virtual Interpretation</h3>
              <p className="text-white/80">
                Skilled interpreters available for in-person appointments and virtual meetings, ensuring 
                clear two-way communication between clients and service providers in any setting.
              </p>
            </div>

            {/* Appointment Support */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FaVideo className="text-3xl text-white"/>
              </div>
              <h3 className="text-xl font-serif font-medium text-white mb-3">Appointment Assistance</h3>
              <p className="text-white/80">
                Interpretation support during medical visits, legal consultations, social services 
                meetings, and educational conferences—ensuring clients fully understand and can 
                participate in important conversations about their lives.
              </p>
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
            <Link href="/programs/advocacy" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Advocacy</h3>
                <p className="text-gray-600 mb-4">
                  Legal advocacy and immigration support for navigating complex systems and understanding rights.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/health" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Health</h3>
                <p className="text-gray-600 mb-4">
                  Health education, medical referrals, and counseling support for holistic wellbeing.
                </p>
                <span className="text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/employment" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Employment</h3>
                <p className="text-gray-600 mb-4">
                  Job readiness training and career support for economic independence.
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
