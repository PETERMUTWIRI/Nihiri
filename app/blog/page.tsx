// app/blog/page.tsx - HYBRID APPROACH (BUILD-SAFE)
import { prisma } from '@/lib/prisma'; // Direct database query
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BlogClient from './BlogClient'; // Separate client component for interactivity

// Server Component for initial data loading
async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { 
        published: true,
        deletedAt: null,
      },
      orderBy: { publishedAt: 'desc' },
    });
    
    return posts
      .filter(post => post.publishedAt !== null)
      .map(post => ({
        ...post,
        publishedAt: post.publishedAt!.toISOString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        excerpt: post.excerpt || '',
      }));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts available</h2>
          <p className="text-gray-600">Check back soon for new stories!</p>
        </div>
      </div>
    );
  }

  return <BlogClient initialPosts={posts} />;
}