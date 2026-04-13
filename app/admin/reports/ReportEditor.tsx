'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaEye, FaEyeSlash, FaImage, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function ReportEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    title: '',
    cover: '',
    canvaUrl: '',
    content: '',
    excerpt: '',
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [EditorComponent, setEditorComponent] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

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
    if (editId) loadReport(Number(editId));
  }, [editId]);

  // Auto-generate excerpt from content
  useEffect(() => {
    if (form.content && !form.excerpt) {
      const plainText = form.content.replace(/<[^>]*>/g, '');
      setForm((f) => ({ ...f, excerpt: plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '') }));
    }
  }, [form.content]);

  const loadReport = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reports?id=${id}`);
      const data = await res.json();
      setForm({
        year: data.year,
        title: data.title,
        cover: data.cover || '',
        canvaUrl: data.canvaurl || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        published: data.published,
      });
    } catch (e) {
      alert('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.url) setForm((f) => ({ ...f, cover: data.url }));
    } catch {
      alert('Failed to upload image');
    }
  };

  const saveReport = async () => {
    if (!form.title) return alert('Title is required');
    setLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/reports?id=${editId}` : '/api/reports';
      const payload = {
        year: form.year,
        title: form.title,
        cover: form.cover || undefined,
        canvaUrl: form.canvaUrl || undefined,
        content: form.content || undefined,
        excerpt: form.excerpt || undefined,
        published: form.published,
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      alert(editId ? 'Updated!' : 'Saved!');
      router.push('/admin');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (_event: any, editor: any) => {
    setForm((f) => ({ ...f, content: editor.getData() }));
  };

  if (!EditorComponent || !ClassicEditor) {
    return <div className="p-8">Loading rich text editor...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <FaArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-black text-gray-900">{editId ? 'Edit' : 'Create'} Annual Report</h2>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <span className="font-medium text-gray-700">
            {form.published ? <><FaEye className="inline mr-1" /> Published</> : <><FaEyeSlash className="inline mr-1" /> Draft</>}
          </span>
        </label>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-6 py-3 font-medium ${activeTab === 'content' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-3 font-medium ${activeTab === 'preview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Public Preview
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'content' ? (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year *</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Year"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 2024 Annual Impact Report"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaExternalLinkAlt className="inline mr-1" />
                External Link (optional)
              </label>
              <input
                value={form.canvaUrl}
                onChange={(e) => setForm((f) => ({ ...f, canvaUrl: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://... (Canva, PDF, etc.)"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank if you want the report to display natively on the site.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="inline mr-1" />
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={uploadImage} />
                {form.cover && (
                  <div className="relative">
                    <img src={form.cover} alt="cover" className="h-20 w-20 object-cover rounded" />
                    <button
                      onClick={() => setForm((f) => ({ ...f, cover: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short summary for cards and previews..."
                maxLength={500}
              />
              <span className="text-xs text-gray-500">{form.excerpt.length}/500</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Report Content *</label>
              <div className="border rounded-lg overflow-hidden">
                <EditorComponent
                  editor={ClassicEditor}
                  data={form.content}
                  onChange={handleEditorChange}
                  config={{
                    placeholder: 'Write the full annual report here. Use headings, images, tables, etc.',
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 border rounded-2xl p-8">
              <span className="text-sm text-gray-500 uppercase tracking-wider">{form.year}</span>
              <h1 className="text-3xl font-serif font-medium text-gray-900 mt-2 mb-4">{form.title || 'Report Title'}</h1>
              {form.cover && (
                <div className="mb-6 rounded-xl overflow-hidden border">
                  <img src={form.cover} alt="Cover" className="w-full max-h-[50vh] object-contain bg-gray-100" />
                </div>
              )}
              {form.excerpt && (
                <p className="text-lg text-gray-600 italic mb-6 border-l-4 border-cyan-500 pl-4">{form.excerpt}</p>
              )}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: form.content || '<p class="text-gray-500">Start writing content to see the preview...</p>' }}
              />
              {form.canvaUrl && (
                <div className="mt-8 pt-6 border-t">
                  <a
                    href={form.canvaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <FaExternalLinkAlt /> Open External Report
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t">
          <button
            onClick={saveReport}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaSave /> {loading ? 'Saving...' : editId ? 'Update Report' : 'Save Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
