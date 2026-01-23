import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa6';
import NewsletterCTA from '@/components/NewsletterCTA';

// ----- TYPES (match new schema) -----
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover?: string | null;
  category: string;
  publishedAt: string;
  author?: string | null;
  metaTitle?: string | null;
  metaDesc?: string | null;
  ogImage?: string | null;
  deletedAt?: string | null;
}

// ----- DATA FETCHERS -----
async function getPost(slug: string): Promise<Post | null> {
  try {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${base}/api/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const post: Post = await res.json();
    // soft-delete guard
    if (post.deletedAt) return null;
    return post;
  } catch {
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string, limit = 3): Promise<Post[]> {
  try {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${base}/api/blog?category=${encodeURIComponent(category)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const posts: Post[] = await res.json();
    // filter out self + soft-deleted
    return posts
      .filter((p) => p.slug !== currentSlug && !p.deletedAt)
      .slice(0, limit);
  } catch {
    return [];
  }
}

// ----- SEO -----
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      image: post.ogImage || post.cover || '/images/blog-placeholder.jpg',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'NIHRI'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      images: [post.ogImage || post.cover || '/images/blog-placeholder.jpg'],
    },
  };
}

// ----- PAGE COMPONENT -----
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      {post.cover && (
        <div className="relative h-96 w-full">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* CONTENT */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="flex items-center gap-2 text-brand-accent hover:text-brand-primary mb-6">
          <FaArrowLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-8">
          <span className="text-sm text-brand-accent font-semibold uppercase tracking-wide">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-text mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <FaCalendar size={16} />
            <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {post.author && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1"><FaUser size={14} /> {post.author}</span>
              </>
            )}
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none mb-12 text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-black text-brand-text mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <Link key={relPost.id} href={`/blog/${relPost.slug}`}>
                  <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition">
                    {relPost.cover && (
                      <div className="relative h-40 w-full">
                        <Image
                          src={relPost.cover}
                          alt={relPost.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-brand-accent font-semibold uppercase tracking-wide">{relPost.category}</span>
                      <h3 className="text-lg font-bold text-brand-text mt-2 line-clamp-2">{relPost.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <NewsletterCTA
        title="Stay updated with our latest blog posts"
        subtitle="New International Hope\nFor Refugees And Immigrants"
      />
    </div>
  );
}