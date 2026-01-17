'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    mediaType: 'written' as 'written' | 'video' | 'audio',
    mediaUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        date: new Date().toISOString(),
      }),
    });
    alert('Post created!');
    setFormData({ ...formData, title: '', content: '' });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-brand-text mb-8">Admin - Create Post</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            required
            rows={8}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
          <select
            value={formData.mediaType}
            onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as any })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
          >
            <option value="written">Written</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        {formData.mediaType !== 'written' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.mediaType === 'video' ? 'Video URL' : 'Audio URL'}
            </label>
            <input
              type="url"
              value={formData.mediaUrl}
              onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
        )}

        <button type="submit" className="btn-primary w-full">
          Publish Post
        </button>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 border border-brand-light rounded-lg">
        <p className="text-sm text-brand-text">
          <strong>Note:</strong> This is a temporary admin interface. For production, add authentication!
        </p>
      </div>
    </div>
  );
}
