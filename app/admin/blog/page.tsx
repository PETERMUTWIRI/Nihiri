'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

// Wrapper with Suspense for useSearchParams
export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <BlogEditor />
    </Suspense>
  );
}

function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('News');
  const [cover, setCover] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [EditorComponent, setEditorComponent] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // Load CKEditor client-side only
  useEffect(() => {
    let mounted = true;
    
    const loadEditor = async () => {
      const [{ CKEditor }, ClassicEditorBuild] = await Promise.all([
        import('@ckeditor/ckeditor5-react'),
        import('@ckeditor/ckeditor5-build-classic'),
      ]);
      
      if (mounted) {
        setEditorComponent(() => CKEditor);
        setClassicEditor(() => ClassicEditorBuild.default);
      }
    };
    
    loadEditor();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (editId) {
      loadPost(Number(editId));
    }
  }, [editId]);

  const loadPost = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/blog?id=${id}`);
      const post = await res.json();
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setCover(post.cover || '');
    } catch (error) {
      console.error('Failed to load post:', error);
      alert('Failed to load post');
    } finally {
      setIsLoading(false);
    }
  };

  const savePost = async () => {
    if (!title || !content) return alert('Title & content required');
    
    setIsLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/blog?id=${editId}` : '/api/blog';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, cover }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save post');
      }

      alert(editId ? 'Post updated!' : 'Post published!');
      router.push('/admin');
    } catch (error) {
      console.error('Save error:', error);
      alert(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange = (_event: any, editor: any) => {
    setContent(editor.getData());
  };

  if (!EditorComponent || !ClassicEditor) {
    return <div className="p-8">Loading rich text editor...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-gray-600 hover:text-gray-900">
          <FaArrowLeft size={20} />
        </Link>
        <h2 className="text-3xl font-black">{editId ? 'Edit' : 'Create'} Blog Post</h2>
      </div>

      <input
        className="w-full mb-4 px-4 py-3 border rounded-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />

      <select
        className="mb-4 px-4 py-3 border rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isLoading}
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
          disabled={isLoading}
        />
        {cover && <img src={cover} alt="cover" className="mt-2 h-32 rounded" />}
      </div>

      <EditorComponent
        editor={ClassicEditor}
        data={content}
        onChange={handleEditorChange}
      />

      <button 
        onClick={savePost} 
        className="mt-6 btn-primary inline-flex items-center gap-2 disabled:opacity-50"
        disabled={isLoading}
      >
        <FaSave /> {editId ? 'Update' : 'Publish'}
      </button>
    </div>
  );
}