// app/blog/page.tsx - FIXED VERSION
import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover: string | null;
  category: string;
  publishedAt: Date;
}

async function getPosts(): Promise<Post[]> {
  // Use Prisma directly - works during build, no fetch needed
  const posts = await prisma.post.findMany({
    where: { 
      published: true,
      deletedAt: null, // Exclude soft-deleted
    },
    orderBy: { publishedAt: 'desc' },
  });
  
  console.log(`Found ${posts.length} posts`); // Debug log
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0]; // Latest post
  const otherPosts = posts.slice(1); // Rest of posts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      <section className="bg-white py-16 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Stories</h1>
            <p className="text-xl text-gray-600">Latest news, impact stories, and updates from New International Hope</p>
          </div>

          {featuredPost ? (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: Large Featured Image */}
                <div className="relative h-96 lg:h-[500px] bg-gray-200">
                  {featuredPost.cover ? (
                    <Image
                      src={featuredPost.cover}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-6xl">📰</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                  <time className="text-gray-500 text-sm mb-3 uppercase tracking-wide">
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-8 line-clamp-4 leading-relaxed">
                    {featuredPost.excerpt || featuredPost.content.slice(0, 300).replace(/<[^>]*>/g, '')}...
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                    >
                      Read Full Story →
                    </Link>
                    <Link 
                      href="/donate"
                      className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-md hover:shadow-lg"
                    >
                      ❤️ Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-100 rounded-2xl">
              <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Read More Section */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Read More Stories</h3>
              <Link href="/blog" className="text-blue-600 hover:underline font-medium">
                View all posts →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      {post.cover ? (
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-4xl">📄</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <time className="text-xs text-gray-500 mb-2 block">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.excerpt || post.content.slice(0, 150).replace(/<[^>]*>/g, '')}...
                      </p>
                      <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-8 text-blue-100">
            Subscribe to our newsletter for the latest stories and updates on our work with refugees and immigrants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg text-gray-900 flex-1 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}