'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaImage } from 'react-icons/fa';

export default function ReportEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [form, setForm] = useState({ year: new Date().getFullYear(), title: '', cover: '', canvaUrl: '', published: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (editId) loadReport(Number(editId)); }, [editId]);

  const loadReport = async (id: number) => {
    const res = await fetch(`/api/reports?id=${id}`);
    const data = await res.json();
    setForm(data);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append('image', file);
    const res = await fetch('/api/upload', { method: 'POST', body });
    const data = await res.json();
    if (data.url) setForm(p => ({ ...p, cover: data.url }));
  };

  const saveReport = async () => {
    setLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/reports?id=${editId}` : '/api/reports';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Save failed');
      alert(editId ? 'Updated!' : 'Saved!');
      router.push('/admin');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button onClick={() => router.push('/admin')} className="text-gray-600 hover:text-gray-900"><FaArrowLeft size={20} /></button>
        <h2 className="text-2xl font-black text-gray-900">{editId ? 'Edit' : 'Create'} Annual Report</h2>
      </div>

      <div className="space-y-6">
        <input type="number" value={form.year} onChange={(e) => setForm(p => ({ ...p, year: Number(e.target.value) }))} className="w-full px-4 py-3 border rounded-lg" placeholder="Year" />
        <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 border rounded-lg" placeholder="Title" />
        <input value={form.canvaUrl} onChange={(e) => setForm(p => ({ ...p, canvaUrl: e.target.value }))} className="w-full px-4 py-3 border rounded-lg" placeholder="Canva share link" />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={uploadImage} />
          {form.cover && <img src={form.cover} alt="cover" className="h-32 rounded mt-2" />}
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm(p => ({ ...p, published: e.target.checked }))} />
          <span>Published</span>
        </label>

        <button onClick={saveReport} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? 'Saving...' : (editId ? 'Update' : 'Save')}
        </button>
      </div>
    </div>
  );
}