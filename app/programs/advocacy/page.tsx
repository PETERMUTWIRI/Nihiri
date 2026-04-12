// app/programs/advocacy/page.tsx - ADVOCACY & LEGAL SUPPORT PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaBalanceScale, 
  FaGavel, 
  FaHandsHelping, 
  FaFileAlt, 
  FaYoutube, 
  FaTiktok, 
  FaFacebook, 
  FaInstagram,
  FaUserTie,
  FaPassport,
  FaHandshake,
  FaShieldAlt,
  FaPhoneAlt,
  FaScroll,
  FaGlobe
} from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function AdvocacyPage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION - Image Background with Overlay */}
      <section className="relative min-h-[720px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-01-hero.jpeg')" }}>
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/80" />
        <div className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-white">
                <span className="kicker text-white/90 border border-white/30 px-4 py-2 rounded-full inline-block">
                  Legal Protection
                </span>
                <h1 className="heading-editorial text-5xl md:text-6xl leading-tight">
                  Advocacy & <span className="heading-accent-cyan">Legal Support</span>
                </h1>
                <div className="hr-white my-6"></div>
                <p className="hero-subtitle text-slate-200 max-w-2xl">
                  In response to the growing humanitarian crisis affecting displaced populations, New International Hope 
                  provides comprehensive advocacy and legal support services. We guide clients through complex immigration 
                  systems and connect them with trusted legal resources.
                </p>
                <p className="body-editorial text-slate-200 max-w-2xl">
                  We recognize that thousands of families arriving at our borders navigate impossibly complex systems 
                  without adequate legal representation. Our team works tirelessly to ensure every refugee and immigrant 
                  understands their rights and has access to quality legal guidance.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="btn-cyan inline-flex items-center px-8 py-4 rounded-lg"
                  >
                    Get More Info <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative h-96">
                  <Image src="/images/WhatsApp Image 2026-04-08 at 7.40.16 PM.jpeg" alt="Advocacy Flyer" fill className="object-contain" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY INITIATIVES */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-02-jane-kitchen.jpg')" }}>
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Services</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">Legal Education & <span className="heading-accent-cyan">Support</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Know Your Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBalanceScale className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Know Your Rights</h3>
              <p className="text-gray-600">
                Monthly educational sessions covering humanitarian parole, Temporary Protected Status (TPS), asylum applications, and Special Immigrant Visas (SIV) for eligible populations.
              </p>
            </div>

            {/* Legal Clinics */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaGavel className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Pro Bono Legal Clinics</h3>
              <p className="text-gray-600">
                Partnership with the National Immigration Forum and local bar associations to provide free legal consultations and representation for asylum seekers and refugee families.
              </p>
            </div>

            {/* Community Navigation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHandsHelping className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Case Navigation</h3>
              <p className="text-gray-600">
                Trained advocates help families understand court documents, prepare for hearings, and connect with social services while their immigration cases proceed through the system.
              </p>
            </div>

            {/* Policy Work */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Policy Advocacy</h3>
              <p className="text-gray-600">
                Direct engagement with elected officials in Texas, Florida, New York, and California to advance humane immigration policies and increased refugee resettlement capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section className="relative py-16 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-03-first-esl.jpg')" }}>
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12 text-center">
            <span className="kicker text-cyan-300 mb-4 block">Advocacy Highlights</span>
            <h2 className="heading-editorial text-4xl text-white">Community Impact In <span className="italic font-serif text-cyan-300">Motion</span></h2>
          </div>
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              {/* Image 1 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy2.png" alt="Advocacy Session 1" fill className="object-cover" />
              </div>
              {/* Image 2 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Advocacy Session 2" fill className="object-cover" />
              </div>
              {/* Image 3 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Advocacy Session 3" fill className="object-cover" />
              </div>
              {/* Image 4 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy5.png" alt="Advocacy Session 4" fill className="object-cover" />
              </div>
              {/* Image 5 */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy.jpg" alt="Advocacy Session 5" fill className="object-cover" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy2.png" alt="Advocacy Session 1" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy3.png" alt="Advocacy Session 2" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy4.png" alt="Advocacy Session 3" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy5.png" alt="Advocacy Session 4" fill className="object-cover" />
              </div>
              <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg relative">
                <Image src="/images/programs/advocacy.jpg" alt="Advocacy Session 5" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAJOR EVENTS & INITIATIVES */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-05-health-nav.jpg')" }}>
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-white/90 mb-4 block">Impact</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-white">Recent Advocacy <span className="italic font-serif">Efforts</span></h2>
          </div>

          <div className="space-y-12">
            {/* Event 1 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 border border-white/30 shadow-xl">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-cyan-600 font-bold text-sm uppercase tracking-wide">March 2023</span>
                  <h3 className="card-title-cyan text-2xl mt-2 mb-4">Know Your Rights: Humanitarian Pathways for Venezuelan Nationals</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Following the expansion of humanitarian parole programs for Venezuelan nationals, we hosted a comprehensive virtual session in partnership with the Catholic Legal Immigration Network (CLINIC) and the Texas Civil Rights Project. Over 150 attendees joined from Houston, Dallas, and San Antonio to learn about the new parole process, work authorization applications, and family reunification options.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The session featured immigration attorneys from the South Texas Pro Bono Asylum Representation Project (ProBAR) who provided detailed guidance on documentation requirements and timelines. Community navigators were available in Spanish and Portuguese to ensure full comprehension.
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-6 shadow-md border border-cyan-100">
                  <div className="text-center">
                    <span className="stat-cyan text-4xl block mb-2">150+</span>
                    <span className="text-gray-500 text-sm">Participants</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-cyan-200 text-center">
                    <span className="text-sm text-gray-600">Partners: CLINIC, ProBAR, Texas Civil Rights Project</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 border border-white/30 shadow-xl">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-cyan-600 font-bold text-sm uppercase tracking-wide">September 2023</span>
                  <h3 className="card-title-cyan text-2xl mt-2 mb-4">Immigration Options for Haitian Communities: TPS, Asylum, and Family Sponsorship</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    In response to the ongoing crisis in Haiti and the designation of Temporary Protected Status (TPS) for Haitian nationals, we organized our second major Know Your Rights session in collaboration with the Florida Immigrant Coalition and the Haitian Bridge Alliance. Held in Miami with satellite locations in Orlando and Tampa, this hybrid event reached over 200 community members.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The program covered TPS registration deadlines, asylum application preparation, and the expanded family reunification parole program. Legal teams from Americans for Immigrant Justice provided one-on-one screening for eligible cases. All materials were provided in Haitian Creole, French, and English.
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-6 shadow-md border border-cyan-100">
                  <div className="text-center">
                    <span className="stat-cyan text-4xl block mb-2">200+</span>
                    <span className="text-gray-500 text-sm">Participants</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-cyan-200 text-center">
                    <span className="text-sm text-gray-600">Partners: Florida Immigrant Coalition, Haitian Bridge Alliance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 border border-white/30 shadow-xl">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-cyan-600 font-bold text-sm uppercase tracking-wide">Ongoing Initiative</span>
                  <h3 className="card-title-cyan text-2xl mt-2 mb-4">Pro Bono Legal Network Expansion</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    New International Hope is leading a regional initiative to build sustainable pro bono capacity for refugee legal services. We have established partnerships with law firms in Atlanta, Phoenix, and Newark to create dedicated clinics for asylum seekers and humanitarian parole beneficiaries. This network has already secured representation for over 75 families who would otherwise have faced immigration court alone.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our training program prepares volunteer attorneys to handle humanitarian cases with cultural competence, ensuring that legal representation is not only available but truly effective for families navigating trauma and displacement.
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-6 shadow-md border border-cyan-100">
                  <div className="text-center">
                    <span className="stat-cyan text-4xl block mb-2">75+</span>
                    <span className="text-gray-500 text-sm">Families Represented</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-cyan-200 text-center">
                    <span className="text-sm text-gray-600">Cities: Atlanta, Phoenix, Newark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL & IMMIGRATION SUPPORT */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-06-world-refugee-day.jpg')" }}>
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker-cyan mb-4 block">Legal Guidance</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">Legal & Immigration <span className="heading-accent-cyan">Support</span></h2>
            <div className="hr-cyan mx-auto my-6"></div>
            <p className="body-editorial max-w-2xl mx-auto">
              Navigating immigration processes and legal systems can be overwhelming. We guide clients to trusted 
              legal help and provide support in understanding documentation, processes, and rights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Immigration Attorney Referrals */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaUserTie className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Immigration Attorney Referrals</h3>
              <p className="text-gray-600">
                Connections to trusted immigration attorneys and legal aid organizations providing pro bono 
                or low-cost services for asylum seekers, refugees, and immigrant families navigating complex 
                immigration processes.
              </p>
            </div>

            {/* Legal Aid Organizations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaBalanceScale className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Legal Aid Connections</h3>
              <p className="text-gray-600">
                Referrals to legal aid organizations specializing in refugee and immigrant services, 
                including help with work authorization, family reunification, and permanent residency applications.
              </p>
            </div>

            {/* Documentation Assistance */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Documentation Guidance</h3>
              <p className="text-gray-600">
                Assistance understanding required documentation, forms, and processes for various immigration 
                pathways including asylum applications, TPS, humanitarian parole, and naturalization.
              </p>
            </div>

            {/* Asylum Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaShieldAlt className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Asylum & Refugee Support</h3>
              <p className="text-gray-600">
                Connections to asylum support services, refugee resettlement agencies, and specialized 
                legal resources for individuals seeking protection and beginning new lives in safety.
              </p>
            </div>

            {/* Know Your Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaScroll className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Know Your Rights Education</h3>
              <p className="text-gray-600">
                Educational sessions on immigrant rights, what to do during encounters with immigration 
                officials, workplace rights, and how to protect oneself and family members in various situations.
              </p>
            </div>

            {/* Family Reunification */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <FaHandshake className="text-3xl text-cyan-600"/>
              </div>
              <h3 className="card-title-cyan text-xl mb-3">Family Reunification Help</h3>
              <p className="text-gray-600">
                Guidance on family reunification processes, humanitarian parole programs, and resources 
                for bringing family members to safety and keeping families together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NATIONAL COALITIONS */}
      <section className="relative py-20 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/history/history-08-board-2020.jpg')" }}>
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="kicker text-cyan-300 mb-4 block">Partnerships</span>
            <h2 className="heading-editorial text-4xl md:text-5xl">National Coalition <span className="italic font-serif text-cyan-300">Participation</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-serif font-medium mb-4">We Are All America (WAAA)</h3>
              <p className="text-white/80 leading-relaxed">
                As active members of the WAAA coalition, we participate in coordinated national campaigns to advance refugee protection and resettlement. This includes the annual Refugee Advocacy Summit in Washington D.C., where our representatives meet with congressional offices from Illinois, Michigan, and Ohio to advocate for increased refugee admissions ceilings and restored resettlement infrastructure.
              </p>
              <p className="text-white/80 mt-4 leading-relaxed">
                Through WAAA, we have joined successful campaigns to extend and redesignate TPS for multiple countries, protect asylum access at the border, and increase funding for refugee integration services in receiving communities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-serif font-medium mb-4">Refugee Council USA (RCUSA)</h3>
              <p className="text-white/80 leading-relaxed">
                Our policy team regularly participates in RCUSA working groups focused on asylum reform, unaccompanied child protection, and Afghan evacuation efforts. We contribute field perspectives from our direct service work to inform national policy recommendations and legislative strategies.
              </p>
              <p className="text-white/80 mt-4 leading-relaxed">
                In 2023, our executive director joined the RCUSA delegation to the United Nations High Commissioner for Refugees (UNHCR) consultations in Geneva, representing grassroots organizations working with newly arrived populations in non-traditional resettlement locations.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
              At New International Hope, our commitment to advocacy and legal support remains unwavering. We invite you to join us in our ongoing efforts to create a more inclusive society, where the rights and dignity of refugees are upheld and protected through every available legal pathway.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA RESOURCES - Big Icons */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-09-award-ceremony.jpg')" }}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="kicker text-cyan-300 mb-4 block">Connect</span>
          <h2 className="heading-editorial text-4xl text-white mb-6">Connect With <span className="italic font-serif text-cyan-300">Us</span></h2>
          <p className="hero-subtitle text-slate-200 mb-12">
            Follow our social media channels to watch educational recordings, see community updates, and join the conversation on refugee advocacy.
          </p>

          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            {/* YouTube */}
            <Link
              href="https://youtube.com/newinternationalhope"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <FaYoutube className="text-5xl md:text-6xl text-white" />
              </div>
              <span className="mt-4 font-bold text-white group-hover:text-red-300 transition">YouTube</span>
              <span className="text-sm text-slate-300">Watch our KYR sessions</span>
            </Link>

            {/* TikTok */}
            <Link
              href="https://tiktok.com/@newinternationalhope"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <FaTiktok className="text-5xl md:text-6xl text-white" />
              </div>
              <span className="mt-4 font-bold text-white group-hover:text-slate-200 transition">TikTok</span>
              <span className="text-sm text-slate-300">Daily advocacy tips</span>
            </Link>

            {/* Facebook */}
            <Link
              href="https://facebook.com/newinternationalhope"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <FaFacebook className="text-5xl md:text-6xl text-white" />
              </div>
              <span className="mt-4 font-bold text-white group-hover:text-blue-200 transition">Facebook</span>
              <span className="text-sm text-slate-300">Community updates</span>
            </Link>

            {/* Instagram */}
            <Link
              href="https://instagram.com/newinternationalhope"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                <FaInstagram className="text-5xl md:text-6xl text-white" />
              </div>
              <span className="mt-4 font-bold text-white group-hover:text-pink-200 transition">Instagram</span>
              <span className="text-sm text-slate-300">Stories from our community</span>
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-10-future-mural.jpg')" }}>
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
                  English language classes, digital literacy, and translation services for effective communication.
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

            <Link href="/programs/community" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
                <h3 className="card-title-cyan text-2xl mb-3">Community Integration</h3>
                <p className="text-gray-600 mb-4">
                  Cultural orientation, youth programs, and community events for meaningful connections.
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
