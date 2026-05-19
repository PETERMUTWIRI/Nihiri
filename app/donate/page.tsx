import Link from "next/link";
import { FaHeart, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION */}
      <section className="relative bg-cover bg-center pt-32 pb-20" style={{backgroundImage: `url('/images/history/history-06-world-refugee-day.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="kicker mb-6 block">Support Our Mission</span>
          <h1 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Support <span className="heading-accent">Nihri&apos;s Hope</span>
          </h1>
          <div className="hr-elegant mx-auto my-6"></div>
          <p className="hero-subtitle text-gray-600 mb-8 max-w-2xl mx-auto">
            Your donation helps us continue our mission to support refugee and immigrant families 
            with education, health navigation, and advocacy services.
          </p>
          
          {/* Impact Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <FaHeart className="w-8 h-8 text-brand-dark mx-auto mb-3" />
              <p className="stat-number text-3xl text-gray-900 mb-1">$25</p>
              <p className="text-sm text-gray-600">Provides ESL materials for one student</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <FaHandHoldingHeart className="w-8 h-8 text-brand-dark mx-auto mb-3" />
              <p className="stat-number text-3xl text-gray-900 mb-1">$50</p>
              <p className="text-sm text-gray-600">Supports a health navigation appointment</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <FaUsers className="w-8 h-8 text-brand-dark mx-auto mb-3" />
              <p className="stat-number text-3xl text-gray-900 mb-1">$100</p>
              <p className="text-sm text-gray-600">Funds a month of youth programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION FORM SECTION */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <span className="kicker mb-4 block">Secure Donation</span>
              <h2 className="heading-editorial text-2xl md:text-3xl text-gray-900 mb-4">
                Make Your <span className="heading-accent">Contribution</span>
              </h2>
              <p className="body-editorial text-gray-600 mb-8">
                Your donation is securely processed through Givebutter. All contributions are tax-deductible.
              </p>
              <iframe
                src="https://givebutter.com/embed/c/new-international-pndnxj"
                width="100%"
                height="600"
                style={{ border: 'none' }}
                title="Donate to Nihri's Hope"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER WAYS TO HELP */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="kicker mb-4 block">More Ways to Help</span>
            <h2 className="heading-editorial text-3xl md:text-4xl text-gray-900 mb-4">
              Other Ways to <span className="heading-accent">Support</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="card-title text-gray-900 mb-2">Volunteer</h3>
              <p className="body-editorial text-gray-600 mb-4">Share your time and skills to make a direct impact.</p>
              <Link href="/volunteer" className="text-brand-dark hover:text-brand-text font-semibold btn-text inline-flex items-center gap-1">
                Learn More <span>→</span>
              </Link>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📢</span>
              </div>
              <h3 className="card-title text-gray-900 mb-2">Spread the Word</h3>
              <p className="body-editorial text-gray-600 mb-4">Share our mission with your network and community.</p>
              <div className="flex justify-center gap-3">
                {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                  <button key={social} className="px-4 py-2 bg-gray-100 hover:bg-brand-primary hover:text-brand-text rounded-lg text-sm font-medium text-gray-700 transition btn-text">
                    {social}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="card-title text-gray-900 mb-2">Corporate Partnership</h3>
              <p className="body-editorial text-gray-600 mb-4">Partner with us to create lasting community impact.</p>
              <Link href="/contact" className="text-brand-dark hover:text-brand-text font-semibold btn-text inline-flex items-center gap-1">
                Contact Us <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
