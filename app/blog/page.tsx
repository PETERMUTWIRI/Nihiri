// app/blog/page.tsx - ENTERPRISE VERSION WITH CACHING
import { PrismaClient } from '@prisma/client';
import BlogClient from './BlogClient';
import { unstable_cache } from 'next/cache';
import { revalidatePath } from 'next/cache';

// Create singleton Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    return globalForPrisma.prisma;
  }
}

// Cached data fetching with revalidation
const getCachedPosts = unstable_cache(
  async () => {
    try {
      const client = getPrismaClient();
      
      const posts = await client.post.findMany({
        where: {
          published: true,
          deletedAt: null,
          publishedAt: {
            not: null,
            lte: new Date()
          }
        },
        orderBy: { publishedAt: 'desc' },
      });

      console.log(`[${new Date().toISOString()}] Fetched ${posts.length} published posts`);
      
      return posts.map(post => ({
        ...post,
        publishedAt: post.publishedAt!.toISOString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        excerpt: post.excerpt || post.content.slice(0, 200).replace(/<[^>]*>/g, ''),
      }));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  },
  ['blog-posts'],
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ['blog-posts'],
  }
);

export default async function BlogPage() {
  const posts = await getCachedPosts();
  
  console.log(`[${new Date().toISOString()}] BlogPage rendering with ${posts.length} posts`);
  
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No published posts available</h2>
          <p className="text-gray-600 mb-4">There are no published posts to display.</p>
          <p className="text-sm text-gray-500">Check admin panel to publish your first post</p>
        </div>
      </div>
    );
  }

  return <BlogClient initialPosts={posts} />;
}

// Add revalidation endpoint
export async function revalidateBlog() {
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]');
}