import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

const getGalleryItems = unstable_cache(
  async () => {
    const items = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      description: item.description?.trim() || null,
      createdAt: item.createdAt.toISOString(),
    }));
  },
  ['gallery-items'],
  { revalidate: 60 }
);

export default async function GalleryPage() {
  const items = await getGalleryItems();

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 text-render-premium py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-xl border border-cyan-100">
          <h1 className="heading-editorial text-4xl text-gray-900 mb-4">Community Gallery</h1>
          <p className="body-editorial text-gray-600">We are working on fresh stories and images. Check back soon for the gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION - with Background Image */}
      <section className="relative bg-cover bg-center py-24 px-6" style={{backgroundImage: `url('/images/history/history-06-world-refugee-day.jpg')`}}>
        <div className="absolute inset-0 bg-cyan-600/85"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="kicker text-white/90 mb-4 block">Visual Stories</span>
          <h1 className="heading-editorial text-white mb-4">Community Gallery</h1>
          <div className="hr-white my-6 max-w-md"></div>
          <p className="text-lg text-white/90 leading-relaxed max-w-3xl">
            Explore our photo gallery and see the people, places, and programs shaping the community.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-3xl border border-cyan-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.description || 'Community image'}
                  className="w-full h-auto object-contain transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {item.description ? (
                <div className="p-5 bg-white border-t border-cyan-50">
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              ) : (
                <div className="p-5 bg-white border-t border-cyan-50">
                  <p className="text-sm text-gray-500">No description provided.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
