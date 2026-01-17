import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-brand-text mb-12">Blog & News</h1>
      
      {posts.length === 0 && (
        <div className="bg-yellow-50 border border-brand-light p-8 rounded-lg">
          <p className="text-lg">No posts yet. Add your first blog post to get started!</p>
          <Link href="/admin" className="text-brand-primary hover:underline mt-4 inline-block">
            Go to Admin →
          </Link>
        </div>
      )}

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold text-brand-text mb-4">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <div className="text-sm text-gray-600 mb-4">
              By {post.author} on {new Date(post.date).toLocaleDateString()}
            </div>
            {post.mediaType !== 'written' && post.mediaUrl && (
              <span className="inline-block bg-brand-light text-brand-text px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.mediaType === 'video' ? '🎥 Video' : '🎵 Audio'}
              </span>
            )}
            <p className="text-gray-700 line-clamp-3">{post.content.substring(0, 200)}...</p>
            <Link href={`/blog/${post.slug}`} className="text-brand-primary font-semibold mt-4 inline-block hover:underline">
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}