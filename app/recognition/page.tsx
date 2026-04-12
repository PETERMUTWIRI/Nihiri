import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { FaAward, FaCalendar, FaUserTie } from 'react-icons/fa';

const prisma = new PrismaClient();

const getRewards = unstable_cache(
  async () => {
    const items = await prisma.rewardRecognition.findMany({
      orderBy: { awardedDate: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      title: item.title,
      description: item.description?.trim() || null,
      awardedBy: item.awardedBy,
      awardedDate: item.awardedDate?.toISOString() || null,
      createdAt: item.createdAt.toISOString(),
    }));
  },
  ['rewards-recognition'],
  { revalidate: 60 }
);

export default async function RecognitionPage() {
  const items = await getRewards();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 text-render-premium py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl border border-cyan-100">
          <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward size={40} className="text-cyan-600" />
          </div>
          <h1 className="heading-editorial text-4xl text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="body-editorial text-gray-600">Recognition and awards will be displayed here soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION - with Background Image */}
      <section className="relative bg-cover bg-center py-24 px-6" style={{backgroundImage: `url('/images/history/history-09-award-ceremony.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward size={40} className="text-cyan-600" />
          </div>
          <span className="kicker-cyan mb-4 block">Honoring Excellence</span>
          <h1 className="heading-editorial text-gray-900 mb-4">Awards & Recognition</h1>
          <div className="hr-cyan mx-auto my-6 max-w-sm"></div>
          <p className="hero-subtitle max-w-3xl mx-auto text-gray-600">
            We are honored to be recognized for our commitment to serving refugees and immigrants in our community. 
            These awards reflect the dedication of our team, volunteers, and supporters.
          </p>
        </div>
      </section>

      {/* AWARDS GRID */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-3xl border border-cyan-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl bg-white">
              {/* Image Container - Shows full image */}
              <div className="overflow-hidden bg-cyan-50/50 border-b border-cyan-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto object-contain transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="card-title-cyan text-gray-900 mb-3">
                  {item.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {item.awardedBy && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full">
                      <FaUserTie size={12} />
                      {item.awardedBy}
                    </span>
                  )}
                  {item.awardedDate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      <FaCalendar size={12} />
                      {new Date(item.awardedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
                
                {item.description ? (
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                ) : (
                  <p className="text-gray-400 text-sm italic">No description provided.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* THANK YOU SECTION */}
      <section className="relative bg-cover bg-center py-16 px-6" style={{backgroundImage: `url('/images/history/history-10-future-mural.jpg')`}}>
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="heading-editorial text-2xl text-gray-900 mb-4">Thank You for Your Support</h2>
          <div className="hr-cyan mx-auto my-6 max-w-xs"></div>
          <p className="body-editorial text-gray-600">
            These recognitions would not be possible without the dedication of our volunteers, 
            the trust of our community, and the generosity of our donors. Together, we continue 
            to make a meaningful difference in the lives of refugees and immigrants.
          </p>
        </div>
      </section>
    </div>
  );
}
