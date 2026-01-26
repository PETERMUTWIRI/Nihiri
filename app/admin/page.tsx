// app/admin/page.tsx - FIXED EDIT LINKS
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
  cover?: string;
}

interface Event {
  id: number;
  title: string;
  category: string;
  startDate: string;
  cover?: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, eventsRes] = await Promise.all([
        fetch('/api/blog'),
        fetch('/api/events'),
      ]);
      const postsData = await postsRes.json();
      const eventsData = await eventsRes.json();
      setPosts(postsData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Blog Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Blog Posts</h2>
            <Link 
              href="/admin/blog" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700"
            >
              <FaPlus /> New Post
            </Link>
          </div>
          
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts yet</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                  {/* Show thumbnail if exists */}
                  {post.cover && (
                    <img 
                      src={post.cover} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                    <p className="text-xs text-gray-500">{post.category}</p>
                  </div>
                  <div className="flex gap-2">
                    {/* FIXED EDIT LINK */}
                    <Link 
                      href={`/admin/blog?id=${post.id}`}
                      className="text-blue-600 hover:text-blue-800 p-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Events</h2>
            <Link 
              href="/admin/events" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-green-700"
            >
              <FaPlus /> New Event
            </Link>
          </div>
          
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500">No events yet</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                  {/* Show thumbnail if exists */}
                  {event.cover && (
                    <img 
                      src={event.cover} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* FIXED EDIT LINK */}
                    <Link 
                      href={`/admin/events?id=${event.id}`}
                      className="text-blue-600 hover:text-blue-800 p-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}