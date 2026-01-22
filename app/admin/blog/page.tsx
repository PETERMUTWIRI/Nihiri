'use client';

import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaSave, FaImage } from 'react-icons/fa';

export default function AdminBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('News');
  const [cover, setCover] = useState('');

  const savePost = async () => {
    if (!title || !content) return alert('Title & content required');
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category, cover }),
    });
    if (res.ok) {
      alert('Post published!');
      setTitle(''); setContent(''); setCover('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-black mb-6">Create Blog Post</h2>

      <input
        className="w-full mb-4 px-4 py-3 border rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="mb-4 px-4 py-3 border rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {['News', 'Impact Story', 'Event Recap', 'Advocacy', 'Opinion'].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Cover image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const body = new FormData();
            body.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body });
            const { url } = await res.json();
            setCover(url);
          }}
        />
        {cover && <img src={cover} alt="cover" className="mt-2 h-32 rounded" />}
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(_event, editor) => setContent(editor.getData())}
      />

      <button onClick={savePost} className="mt-6 btn-primary inline-flex items-center gap-2">
        <FaSave /> Publish
      </button>
    </div>
  );
}