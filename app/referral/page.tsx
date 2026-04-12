import Link from "next/link";

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO - with Background Image */}
      <section className="relative bg-cover bg-center py-32" style={{backgroundImage: `url('/images/history/history-03-first-esl.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="kicker-cyan mb-6 block">Referrals</span>
          <h1 className="heading-editorial text-5xl md:text-6xl text-gray-900 mb-6">
            Service <span className="heading-accent-cyan">Referrals</span>
          </h1>
          <div className="hr-cyan mx-auto my-6"></div>
          <p className="hero-subtitle text-gray-600 max-w-2xl mx-auto">
            Connect refugees and immigrants with our programs through our referral system.
          </p>
        </div>
      </section>

      {/* REFERRAL OPTIONS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* ESL Referral */}
            <Link href="/esl-onboarding" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100 hover:shadow-xl transition hover:-translate-y-1 h-full">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-200 transition">
                  <span className="text-3xl">📚</span>
                </div>
                <h2 className="card-title-cyan text-2xl mb-3">ESL Referral</h2>
                <p className="text-gray-600 mb-4">
                  Refer students to our English language learning program. We offer free one-on-one tutoring 
                  with childcare provided.
                </p>
                <span className="inline-flex items-center text-cyan-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Start ESL Referral <span>→</span>
                </span>
              </div>
            </Link>

            {/* Health Referral */}
            <Link href="/health-referral" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100 hover:shadow-xl transition hover:-translate-y-1 h-full">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-200 transition">
                  <span className="text-3xl">🏥</span>
                </div>
                <h2 className="card-title-cyan text-2xl mb-3">Health Referral</h2>
                <p className="text-gray-600 mb-4">
                  Refer clients to our health education and navigation services. Priority given to 
                  refugee and immigrant women.
                </p>
                <span className="inline-flex items-center text-cyan-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Start Health Referral <span>→</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Eligibility Note */}
          <div className="mt-12 bg-cyan-50 rounded-2xl p-8 border border-cyan-200">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Eligibility</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span>Female refugees and immigrants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span>Residing in Connecticut, particularly New Haven County</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold">•</span>
                <span>All services are provided free of charge</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
