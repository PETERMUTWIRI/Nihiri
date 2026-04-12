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
      <div className="min-h-screen bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward size={40} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-gray-600 text-lg">Recognition and awards will be displayed here soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-brand-text">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-brand-primary/20 via-brand-primary/10 to-brand-background py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward size={40} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            We are honored to be recognized for our commitment to serving refugees and immigrants in our community. 
            These awards reflect the dedication of our team, volunteers, and supporters.
          </p>
        </div>
      </section>

      {/* AWARDS GRID */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-3xl border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl bg-white">
              {/* Image Container - Shows full image */}
              <div className="overflow-hidden bg-gray-50 border-b border-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto object-contain transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {item.awardedBy && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-sm font-medium rounded-full">
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
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Support</h2>
          <p className="text-gray-600 leading-relaxed">
            These recognitions would not be possible without the dedication of our volunteers, 
            the trust of our community, and the generosity of our donors. Together, we continue 
            to make a meaningful difference in the lives of refugees and immigrants.
          </p>
        </div>
      </section>
    </div>
  );
}
