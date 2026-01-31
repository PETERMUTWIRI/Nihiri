
// app/health/page.tsx - HEALTH PROGRAM PAGE
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaHome, FaBrain, FaBaby, FaFemale, FaSyringe, FaBookOpen, FaUsers, FaMicrophone, FaSearch } from 'react-icons/fa';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Image Left, Content Right */}
      <section className="py-20 pt-8 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/programs/health5.png" alt="Health Education Session" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-yellow-400/20" />
            </div>

            {/* Right: Content */}
            <div>
              <span className="inline-block bg-brand-primary text-brand-text px-4 py-2 rounded-full text-sm font-bold mb-6">
                Comprehensive Care
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Health Program
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Our interactive in-home health education program brings licensed healthcare professionals directly into the homes of refugee and immigrant families. We understand that navigating a new healthcare system can be overwhelming, especially when language barriers and cultural differences create additional obstacles to receiving proper care.
              </p>
              <p className="text-gray-600 mb-8">
                We partner with established health systems to deliver education that addresses the unique barriers faced by newcomer populations. Our mission is threefold: to increase health literacy among our clients, to encourage patient autonomy so individuals can advocate for their own wellbeing, and to help families develop sustainable, healthy behaviors that will serve them throughout their lives. Every session includes professional interpretation services to ensure complete understanding, and as with all our programs, these vital health classes are offered completely free of charge.
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

      {/* CORE HEALTH SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Core Health Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mental Health & Parenting */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBrain className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mental Health & Parenting</h3>
              <p className="text-gray-600">
                Addressing the psychological impact of displacement and trauma, our mental health education focuses on coping strategies, stress management, and positive parenting techniques adapted for families rebuilding their lives in a new country.
              </p>
            </div>

            {/* General Health Education */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBookOpen className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health Education</h3>
              <p className="text-gray-600">
                Comprehensive topics ranging from chronic disease management to preventive care, tailored to the specific health concerns and questions raised by our client families. Each curriculum is adapted to address the most pressing needs of the community we serve.
              </p>
            </div>

            {/* Children's Health */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaBaby className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Children's Health Education</h3>
              <p className="text-gray-600">
                Specialized programming for pediatric health, including developmental milestones, nutrition for growing bodies, recognizing signs of illness, and understanding the American pediatric care system to ensure every child receives the attention they deserve.
              </p>
            </div>

            {/* Women's Prenatal Health */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFemale className="text-3xl text-pink-600"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Women's Prenatal Health</h3>
              <p className="text-gray-600">
                Dedicated support for expecting mothers, covering prenatal nutrition, understanding prenatal appointments, preparing for childbirth in the U.S. healthcare system, and postpartum care to ensure healthy outcomes for both mother and baby.
              </p>
            </div>

            {/* Vaccines */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaSyringe className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vaccine Education</h3>
              <p className="text-gray-600">
                Critical information about COVID-19 and routine immunizations, including understanding vaccine safety, accessing vaccination sites, and addressing concerns with culturally sensitive, evidence-based education to protect entire communities.
              </p>
            </div>

            {/* In-Home Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaHome className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">In-Home Delivery</h3>
              <p className="text-gray-600">
                Recognizing that transportation and childcare barriers often prevent families from attending health classes, we bring education directly to their living rooms. This approach ensures maximum participation and comfort while learning sensitive health topics.
              </p>
            </div>
          </div>

          {/* Partners */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">This program is made possible thanks to the generosity of our partners:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-700">
              <span className="bg-white px-4 py-2 rounded-lg shadow">Blossom Hill Foundation</span>
              <span className="bg-white px-4 py-2 rounded-lg shadow">Y-HEALAR</span>
              <span className="bg-white px-4 py-2 rounded-lg shadow">EMPOWER</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION & LITERACY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Education & Literacy Initiatives</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* EMPOWER Program */}
            <div className="bg-gradient-to-br from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">EMPOWER Program</h3>
              <p className="text-gray-600 mb-4">
                In collaboration with Emotion Program Outside the Clinic with Wellness Education for Refugees (EMPOWER), we host an enriching summer program designed specifically for refugee children. This four-week summer camp provides a safe, nurturing environment where children can process their experiences while building essential life skills.
              </p>
              <p className="text-gray-600">
                Families and children engage together in social-emotional learning activities, develop healthy coping mechanisms for stress and trauma, participate in physical activities that promote wellbeing, and strengthen family bonds through emotional literacy exercises. This holistic approach ensures that healing happens not just for individuals, but for entire family units.
              </p>
            </div>

            {/* Ambassador Classes */}
            <div className="bg-gradient-to-br from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <FaMicrophone className="text-3xl text-brand-primary"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ambassador Classes</h3>
              <p className="text-gray-600 mb-4">
                In partnership with Yale Health Education and Literacy for Asylees and Refugees (Y-HEALAR), we operate a comprehensive multi-class ambassador program that trains community members to become health educators themselves. This year, we are proud to have two dedicated health ambassadors participating in the program.
              </p>
              <p className="text-gray-600">
                Throughout the program, participants develop the skills and confidence needed to lead health classes independently within their own communities. By training peers from within the refugee and immigrant communities, we create sustainable health education networks that continue to expand our reach and impact long after formal programming ends.
              </p>
            </div>

            {/* Women's Health Workshops */}
            <div className="bg-gradient-to-br from-brand-background to-white rounded-2xl p-8 border border-brand-primary/30">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <FaFemale className="text-3xl text-pink-600"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Women's Health Workshops</h3>
              <p className="text-gray-600 mb-4">
                These specialized workshops address the unique health concerns of women in our community, covering critical topics including stress management techniques, culturally-informed parenting strategies, mindfulness practices for mental wellness, and nutrition education adapted to available resources and cultural dietary preferences.
              </p>
              <p className="text-gray-600">
                With approximately 120 participants annually, these workshops have become a cornerstone of our community health strategy. The intimate setting allows women to ask questions they might otherwise feel uncomfortable discussing, creating a supportive sisterhood of shared knowledge and mutual empowerment.
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
      </section>

      {/* ADVOCACY SECTION */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center mb-16">Advocacy & Outreach</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Vaccine Clinic Program</h3>
                <p className="text-gray-600 leading-relaxed">
                  Offered both online and in-person, our vaccine awareness initiative is specifically designed to address the unique concerns of refugee communities. We provide comprehensive education about the immune system, explain the critical importance of immunization for community health, and respectfully address common myths and misconceptions about vaccines that may circulate within communities.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  We create welcoming, judgment-free spaces where clients feel safe asking specific questions about their personal health situations. All educational materials are professionally translated and presented in Dari, Pashto, and Arabic, ensuring that language is never a barrier to understanding life-saving health information.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">National Association of Regional Councils (NARC)</h3>
                <p className="text-gray-600 leading-relaxed">
                  The annual NARC Conference and Exhibition stands as the largest national gathering focused on promoting effective regional cooperation and solutions. Our participation allows us to share best practices with leadership from Councils of Government and Metropolitan Planning Organizations across the country.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  This platform enables us to advocate for refugee health needs at the policy level, learning from congressional and state lawmakers, university researchers, and nonprofit leaders about emerging strategies for serving displaced populations. Our presence ensures that refugee voices are represented in regional health planning discussions.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Mental Health America Conference</h3>
                <p className="text-gray-600 leading-relaxed">
                  In June 2022, our representatives took the national stage to share research and expertise on addressing America's refugee mental health crisis. This presentation offered practical, culturally-informed approaches to mental healthcare that respect the diverse backgrounds and experiences of refugee communities.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  By participating in these national conversations, we help shape the broader discourse on refugee mental health, ensuring that service providers across the country understand the unique psychological impacts of forced migration and the specific support structures that promote healing and resilience.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Photovoice Worldwide</h3>
                <p className="text-gray-600 leading-relaxed">
                  In October 2022, our team member Rachel shared insights from a powerful Photovoice activity conducted with refugee youth in collaboration with Wesleyan University. This innovative methodology allows young people to document their lived experiences through photography, creating visual narratives that communicate their challenges, hopes, and perspectives in ways that traditional interviews cannot capture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Research & Academic Partnerships</h2>

          <div className="space-y-8">
            {/* PCORI Project */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FaSearch className="text-3xl text-brand-primary"/>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">PCORI Engagement Award Project</h3>
                  <p className="text-gray-600 leading-relaxed">
                    In collaboration with faculty at the Yale School of Medicine, we are honored to lead a groundbreaking project funded through the Patient-Centered Outcomes Research Institute (PCORI) Eugene Washington PCORI Engagement Award (EASO 30519). This significant research initiative represents a major step forward in refugee health research methodology.
                  </p>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    Our team has established a diverse committee comprising clinicians, academic researchers, community stakeholders, and refugee community members themselves. Together, we are receiving comprehensive training in Patient-Centered Outcomes Research (PCOR) methodologies. Our goal is to develop a shared, community-driven set of research priorities that truly reflect the needs and concerns of refugee populations, ensuring that future health research serves those it aims to help.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Muslim Mental Health Conference */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Muslim Mental Health Conference</h3>
                <p className="text-gray-600 leading-relaxed">
                  This annual gathering provides a vital platform for discussing the intersection of faith, culture, and mental health. Our representatives participate each year, sharing insights about the specific health and cultural considerations affecting refugee children and women from Muslim-majority countries.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  In 2022, we presented important findings about the impact of COVID-19 on refugee mental health, detailing how our organization rapidly adapted our healthcare delivery model in response to the pandemic's unique challenges. This knowledge-sharing helps other organizations serving similar populations develop more effective, culturally-responsive interventions.
                </p>
              </div>

              {/* North American Refugee Health Conference */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">North American Refugee Health Conference</h3>
                <p className="text-gray-600 leading-relaxed">
                  At the 2022 conference in Cleveland, our representatives joined researcher Joseph Williams from Yale's School of Public Health to present important findings on COVID-19's disproportionate impact on refugee families. We shared data on infection rates, vaccine hesitancy factors, and economic consequences within the communities we serve.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  More importantly, we outlined how our organization is striving to help families recover and rebuild as we emerge from the pandemic. This includes expanded mental health services, economic support programs, and continued health education to address long-term COVID effects. Our presentation emphasized the need for sustained support for refugee communities even as broader society returns to normal.
                </p>
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
            <Link href="/esl" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">ESL Program</h3>
                <p className="text-gray-600 mb-4">
                  Our one-on-one English as a Second Language tutoring program is the heart of our mission, providing personalized language instruction with free childcare to remove barriers to learning.
                </p>
                <span className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors">
                  Learn More <FaArrowRight />
                </span>
              </div>
            </Link>

            <Link href="/programs/advocacy" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition">Advocacy</h3>
                <p className="text-gray-600 mb-4">
                  Legal advocacy efforts to address the complex challenges refugees face when navigating immigration systems, housing, employment, and accessing essential services.
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