// app/admin/rewards/page.tsx - ADMIN REWARDS & RECOGNITION UPLOAD
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaAward, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminRewardsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading rewards editor...</div>}>
      <RewardsEditor />
    </Suspense>
  );
}

function RewardsEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [awardedBy, setAwardedBy] = useState('');
  const [awardedDate, setAwardedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (editId) loadRewardItem(Number(editId));
  }, [editId]);

  const loadRewardItem = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/rewards?id=${id}`);
      const item = await res.json();
      if (!res.ok) throw new Error(item.error || 'Failed to load item');
      setImageUrl(item.imageUrl || '');
      setTitle(item.title || '');
      setDescription(item.description || '');
      setAwardedBy(item.awardedBy || '');
      setAwardedDate(item.awardedDate ? item.awardedDate.split('T')[0] : '');
    } catch (error) {
      console.error(error);
      alert('Unable to load reward item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const saveReward = async () => {
    if (!imageUrl) return alert('Please upload an image first');
    if (!title.trim()) return alert('Please enter a title');

    setIsLoading(true);
    try {
      const payload = {
        imageUrl,
        title: title.trim(),
        description: description.trim() || null,
        awardedBy: awardedBy.trim() || null,
        awardedDate: awardedDate || null,
      };
      const url = editId ? `/api/rewards?id=${editId}` : '/api/rewards';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Save failed');
      }

      alert(editId ? 'Reward updated successfully.' : 'Award/Certificate added successfully.');
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Unable to save reward item.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRewardItem = async () => {
    if (!editId || !confirm('Delete this award/certificate?')) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/rewards?id=${editId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      alert('Award/Certificate removed.');
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Unable to delete reward item.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gray-50 border-b px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <FaArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-black text-gray-900">{editId ? 'Edit' : 'Add'} Award/Certificate</h2>
            <p className="text-sm text-gray-600">Upload a certificate, award, or recognition for the public page.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {editId && (
            <button
              onClick={deleteRewardItem}
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              <FaTrash /> Delete
            </button>
          )}
          <button
            onClick={saveReward}
            disabled={isLoading || uploadLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FaSave /> {isLoading ? 'Saving...' : editId ? 'Save Changes' : 'Add Award'}
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Certificate/Award Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading || isLoading}
                className="w-full text-sm text-gray-700"
              />
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WEBP. Upload certificates, awards, or recognition documents.</p>
              {uploadLoading && <p className="text-blue-600 text-sm mt-2">Uploading image...</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Community Service Award 2024"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Awarded By <span className="text-gray-400">(optional)</span></label>
              <input
                type="text"
                value={awardedBy}
                onChange={(e) => setAwardedBy(e.target.value)}
                placeholder="e.g., City of New Haven"
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Award Date <span className="text-gray-400">(optional)</span></label>
              <input
                type="date"
                value={awardedDate}
                onChange={(e) => setAwardedDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description <span className="text-gray-400">(optional)</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description about this award or recognition..."
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                rows={4}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview</h3>
              {imageUrl ? (
                <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
                  <img src={imageUrl} alt={title || 'Award preview'} className="w-full h-80 object-contain bg-white" />
                  <div className="p-4 bg-white border-t">
                    <h4 className="font-bold text-gray-900">{title || 'Untitled Award'}</h4>
                    {awardedBy && <p className="text-sm text-gray-600">Awarded by: {awardedBy}</p>}
                    {awardedDate && <p className="text-sm text-gray-500">{new Date(awardedDate).toLocaleDateString()}</p>}
                  </div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white text-gray-500">
                  <div className="text-center">
                    <FaAward size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Select an image to preview it here.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload certificates, awards, or recognition documents.</li>
                <li>• Title is required and will be displayed prominently.</li>
                <li>• Awarded By and Date help provide context for visitors.</li>
                <li>• Use the public <code>/recognition</code> page to view all awards.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
