// app/blog/page.tsx - FIXED VERSION
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BlogClient from './BlogClient';

const prisma = new PrismaClient();

// Create prisma singleton
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

async function getPosts() {
  try {
    const client = getPrismaClient();
    
    // Get ALL posts to debug
    const allPosts = await client.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('ALL POSTS:', allPosts.map(p => ({
      id: p.id,
      title: p.title,
      published: p.published,
      publishedAt: p.publishedAt,
      deletedAt: p.deletedAt,
      createdAt: p.createdAt
    })));

    // Get only published, non-deleted posts
    const posts = await client.post.findMany({
      where: {
        published: true,
        deletedAt: null,
        publishedAt: {
          not: null,
          lte: new Date() // Published date should be in the past or present
        }
      },
      orderBy: { publishedAt: 'desc' },
    });

    console.log('PUBLISHED POSTS:', posts.length);
    
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
  } finally {
    if (process.env.NODE_ENV !== 'production') {
      await prisma.$disconnect();
    }
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  console.log('BlogPage received posts:', posts.length);
  
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No published posts available</h2>
          <p className="text-gray-600 mb-4">There are no published posts to display.</p>
          <p className="text-sm text-gray-500">Total posts in database: Check console</p>
        </div>
      </div>
    );
  }

  return <BlogClient initialPosts={posts} />;
}