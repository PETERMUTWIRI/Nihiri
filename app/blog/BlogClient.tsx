// app/blog/BlogClient.tsx - CLIENT COMPONENT FOR INTERACTIVITY
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  cover: string | null;
  category: string;
  author: string | null;
  publishedAt: string;
  slug: string;
}

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts] = useState<BlogPost[]>(initialPosts); // No API calls needed!
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(initialPosts[0]);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const selectPost = (post: BlogPost) => {
    setCurrentPost(post);
    const contentArea = document.getElementById('scrollable-content');
    if (contentArea) contentArea.scrollTop = 0;
  };

  const navigatePost = (direction: 'prev' | 'next') => {
    if (!currentPost || posts.length === 0) return;
    
    const currentIndex = posts.findIndex(p => p.id === currentPost.id);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0) newIndex = posts.length - 1;
    if (newIndex >= posts.length) newIndex = 0;
    
    selectPost(posts[newIndex]);
  };

  if (!isClient || !currentPost) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Our Stories</h1>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex">
        {/* Left Side - Post Preview (Fixed) */}
        <div className="w-1/2 bg-white border-r border-gray-200 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentPost.category}
              </span>
            </div>

            {/* Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
              {currentPost.cover ? (
                <Image
                  src={currentPost.cover}
                  alt={currentPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {currentPost.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <FaUser className="text-gray-400" />
                <span>{currentPost.author || 'Staff Writer'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />
                <span>{formatDate(currentPost.publishedAt)}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-gray-600 leading-relaxed">
              {currentPost.excerpt}
            </p>

            {/* Navigation Arrows */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigatePost('prev')}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition"
              >
                <FaChevronLeft /> Previous
              </button>
              <button
                onClick={() => navigatePost('next')}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="w-1/2 bg-white">
          <div 
            id="scrollable-content"
            className="h-full overflow-y-auto p-8 blog-scrollbar"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            <div className="max-w-2xl mx-auto">
              <article 
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this story</h3>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Share on Facebook
                  </button>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
                    Share on Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Carousel */}
      <div className="bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">More Stories</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => selectPost(post)}
                className={`flex-shrink-0 group relative w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  currentPost.id === post.id 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'hover:scale-105 hover:ring-2 hover:ring-blue-300'
                }`}
              >
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white text-sm font-medium line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-white/80 text-xs mt-1">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}