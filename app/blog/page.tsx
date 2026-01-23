import Link from "next/link";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover?: string;
  category: string;
  publishedAt: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blog`, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 pt-32 md:pt-40 lg:pt-48">
      <h1 className="text-5xl font-bold text-brand-text mb-4">Blog</h1>
      <p className="text-lg text-gray-600 mb-12">Latest news, stories, and insights from our organization</p>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {post.cover && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="text-sm text-brand-accent font-semibold">{post.category}</span>
                  <h2 className="text-xl font-bold text-brand-text mt-2 mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <time className="text-xs text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                    <span className="text-brand-accent text-sm font-semibold">Read more →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
