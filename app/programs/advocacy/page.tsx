// app/advocacy/page.tsx - ADVOCACY PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaBalanceScale, FaGavel, FaHandsHelping, FaFileAlt, FaYoutube, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function AdvocacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Image Left, Content Right */}
      <section className="py-20 pt-8 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
              {/* Placeholder - Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                <span className="text-8xl">⚖️</span>
              </div>
              <Image src="/images/programs/advocacy.jpg" alt="Advocacy Session" fill className="object-cover" priority />
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                Legal Protection
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Advocacy Program
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                In response to the growing humanitarian crisis affecting displaced populations from Venezuela, Haiti, and Central America in 2022, New International Hope mobilized to expand our advocacy efforts in the legal realm. We recognized that thousands of families arriving at our borders were navigating an impossibly complex immigration system without adequate legal representation or understanding of their rights.
              </p>
              <p className="text-gray-600 mb-8">
                Our advocacy program was born from the urgent need to bridge this gap. We have developed comprehensive legal education initiatives, established partnerships with immigration attorneys across multiple states, and created sustainable support networks that empower refugees to advocate for themselves within the American legal framework. Every family deserves fair representation and clear understanding of their pathway to safety.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-brand-primary text-brand-text px-8 py-4 rounded-lg font-semibold hover:bg-brand-dark transition shadow-lg"
                >
                  Get More Info <FaArrowRight className="ml-2"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY INITIATIVES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Legal Education & Support</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Know Your Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBalanceScale className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Know Your Rights</h3>
              <p className="text-gray-600">
                Monthly educational sessions covering humanitarian parole, Temporary Protected Status (TPS), asylum applications, and Special Immigrant Visas (SIV) for eligible populations.
              </p>
            </div>

            {/* Legal Clinics */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaGavel className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pro Bono Legal Clinics</h3>
              <p className="text-gray-600">
                Partnership with the National Immigration Forum and local bar associations to provide free legal consultations and representation for asylum seekers and refugee families.
              </p>
            </div>

            {/* Community Navigation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaHandsHelping className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Case Navigation</h3>
              <p className="text-gray-600">
                Trained advocates help families understand court documents, prepare for hearings, and connect with social services while their immigration cases proceed through the system.
              </p>
            </div>

            {/* Policy Work */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaFileAlt className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Policy Advocacy</h3>
              <p className="text-gray-600">
                Direct engagement with elected officials in Texas, Florida, New York, and California to advance humane immigration policies and increased refugee resettlement capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section className="py-16 bg-white overflow-hidden">
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
      </section>

      {/* MAJOR EVENTS & INITIATIVES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Recent Advocacy Efforts</h2>

          <div className="space-y-12">
            {/* Event 1 */}
            <div className="bg-gradient-to-r from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">March 2023</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Know Your Rights: Humanitarian Pathways for Venezuelan Nationals</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Following the expansion of humanitarian parole programs for Venezuelan nationals, we hosted a comprehensive virtual session in partnership with the Catholic Legal Immigration Network (CLINIC) and the Texas Civil Rights Project. Over 150 attendees joined from Houston, Dallas, and San Antonio to learn about the new parole process, work authorization applications, and family reunification options.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The session featured immigration attorneys from the South Texas Pro Bono Asylum Representation Project (ProBAR) who provided detailed guidance on documentation requirements and timelines. Community navigators were available in Spanish and Portuguese to ensure full comprehension.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-center">
                    <span className="text-4xl font-black text-brand-primary block">150+</span>
                    <span className="text-gray-500 text-sm">Participants</span>
                  </div>
                  <div className="mt-4 pt-4 border-t text-center">
                    <span className="text-sm text-gray-600">Partners: CLINIC, ProBAR, Texas Civil Rights Project</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-gradient-to-r from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">September 2023</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Immigration Options for Haitian Communities: TPS, Asylum, and Family Sponsorship</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    In response to the ongoing crisis in Haiti and the designation of Temporary Protected Status (TPS) for Haitian nationals, we organized our second major Know Your Rights session in collaboration with the Florida Immigrant Coalition and the Haitian Bridge Alliance. Held in Miami with satellite locations in Orlando and Tampa, this hybrid event reached over 200 community members.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The program covered TPS registration deadlines, asylum application preparation, and the expanded family reunification parole program. Legal teams from Americans for Immigrant Justice provided one-on-one screening for eligible cases. All materials were provided in Haitian Creole, French, and English.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-center">
                    <span className="text-4xl font-black text-brand-primary block">200+</span>
                    <span className="text-gray-500 text-sm">Participants</span>
                  </div>
                  <div className="mt-4 pt-4 border-t text-center">
                    <span className="text-sm text-gray-600">Partners: Florida Immigrant Coalition, Haitian Bridge Alliance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-gradient-to-r from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <span className="text-brand-primary font-bold text-sm uppercase tracking-wide">Ongoing Initiative</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Pro Bono Legal Network Expansion</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    New International Hope is leading a regional initiative to build sustainable pro bono capacity for refugee legal services. We have established partnerships with law firms in Atlanta, Phoenix, and Newark to create dedicated clinics for asylum seekers and humanitarian parole beneficiaries. This network has already secured representation for over 75 families who would otherwise have faced immigration court alone.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our training program prepares volunteer attorneys to handle humanitarian cases with cultural competence, ensuring that legal representation is not only available but truly effective for families navigating trauma and displacement.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-center">
                    <span className="text-4xl font-black text-brand-primary block">75+</span>
                    <span className="text-gray-500 text-sm">Families Represented</span>
                  </div>
                  <div className="mt-4 pt-4 border-t text-center">
                    <span className="text-sm text-gray-600">Cities: Atlanta, Phoenix, Newark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NATIONAL COALITIONS */}
      <section className="py-20 bg-brand-cyan text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center mb-16">National Coalition Participation</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">We Are All America (WAAA)</h3>
              <p className="text-white/80 leading-relaxed">
                As active members of the WAAA coalition, we participate in coordinated national campaigns to advance refugee protection and resettlement. This includes the annual Refugee Advocacy Summit in Washington D.C., where our representatives meet with congressional offices from Illinois, Michigan, and Ohio to advocate for increased refugee admissions ceilings and restored resettlement infrastructure.
              </p>
              <p className="text-white/80 mt-4 leading-relaxed">
                Through WAAA, we have joined successful campaigns to extend and redesignate TPS for multiple countries, protect asylum access at the border, and increase funding for refugee integration services in receiving communities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Refugee Council USA (RCUSA)</h3>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Connect With Us</h2>
          <p className="text-xl text-gray-600 mb-12">
            Follow our social media channels to watch educational recordings, see community updates, and join the conversation on refugee advocacy.
          </p>

          <div className="flex justify-center items-center gap-8 md:gap-16">
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
              <span className="mt-4 font-bold text-gray-700 group-hover:text-red-600 transition">YouTube</span>
              <span className="text-sm text-gray-500">Watch our KYR sessions</span>
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
              <span className="mt-4 font-bold text-gray-700 group-hover:text-black transition">TikTok</span>
              <span className="text-sm text-gray-500">Daily advocacy tips</span>
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
              <span className="mt-4 font-bold text-gray-700 group-hover:text-brand-primary transition">Facebook</span>
              <span className="text-sm text-gray-500">Community updates</span>
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
              <span className="mt-4 font-bold text-gray-700 group-hover:text-pink-600 transition">Instagram</span>
              <span className="text-sm text-gray-500">Stories from our community</span>
            </Link>
          </div>

          
        </div>
      </section>

      {/* OTHER PROGRAMS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Other Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/esl" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">ESL Program</h3>
                <p className="text-gray-600 mb-4">
                  Our one-on-one English as a Second Language tutoring program provides personalized language instruction with free childcare, removing barriers to learning and integration.
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/health" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">Health Program</h3>
                <p className="text-gray-600 mb-4">
                  Interactive in-home health education taught by licensed clinicians, focusing on increasing health literacy and patient autonomy within refugee and immigrant communities.
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