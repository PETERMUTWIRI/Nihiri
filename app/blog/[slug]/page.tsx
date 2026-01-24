// app/blog/[slug]/page.tsx - PUBLIC POST VIEW
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  return post;
}

async function getRelatedPosts(currentId: number, category: string) {
  return await prisma.post.findMany({
    where: {
      id: { not: currentId },
      category,
      publishedAt: { not: undefined },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 py-8 pt-24">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="text-brand-primary hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>
          <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-semibold ml-4">
            {post.category}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <time className="text-gray-500 text-sm mb-3 uppercase tracking-wide">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Coming Soon'}
        </time>

        {post.cover && (
          <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Donate CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Support Our Mission</h3>
          <p className="mb-6 text-white/90">
            Your donation helps us continue providing vital services to refugees and immigrants.
          </p>
          <Link 
            href="/donate"
            className="inline-block bg-white text-brand-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Donate Now ❤️
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Stories</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                  <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                    <div className="relative h-40">
                      {related.cover ? (
                        <Image
                          src={related.cover}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-3xl">📄</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-primary transition">
                        {related.title}
                      </h4>
                      <span className="text-brand-accent text-sm">Read more →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}