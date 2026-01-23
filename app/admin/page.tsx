'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
}

interface Event {
  id: number;
  title: string;
  category: string;
  startDate: string;
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
        fetch('/api/events?category=Upcoming'),
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
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Blog Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Blog Posts</h2>
            <Link href="/admin/blog" className="btn-primary inline-flex items-center gap-2">
              <FaPlus /> New Post
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">No posts yet</p>
          ) : (
            <div className="space-y-3">
              {posts.slice(0, 10).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{post.title}</h3>
                    <p className="text-xs text-gray-500">{post.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/edit/${post.id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-800"
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
            <h2 className="text-2xl font-black">Upcoming Events</h2>
            <Link href="/admin/events" className="btn-primary inline-flex items-center gap-2">
              <FaPlus /> New Event
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500">No events yet</p>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/events/edit/${event.id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800"
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
