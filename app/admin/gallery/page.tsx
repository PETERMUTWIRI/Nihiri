// app/admin/gallery/page.tsx - ADMIN GALLERY UPLOAD
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaImage, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminGalleryPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading gallery editor...</div>}>
      <GalleryEditor />
    </Suspense>
  );
}

function GalleryEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (editId) loadGalleryItem(Number(editId));
  }, [editId]);

  const loadGalleryItem = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/gallery?id=${id}`);
      const item = await res.json();
      if (!res.ok) throw new Error(item.error || 'Failed to load item');
      setImageUrl(item.imageUrl || '');
      setDescription(item.description || '');
    } catch (error) {
      console.error(error);
      alert('Unable to load gallery item');
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

  const saveGallery = async () => {
    if (!imageUrl) return alert('Please upload an image first');

    setIsLoading(true);
    try {
      const payload = {
        imageUrl,
        description: description.trim() || null,
      };
      const url = editId ? `/api/gallery?id=${editId}` : '/api/gallery';
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

      alert(editId ? 'Gallery item updated successfully.' : 'Image uploaded successfully.');
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Unable to save gallery item.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGalleryItem = async () => {
    if (!editId || !confirm('Delete this gallery image?')) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/gallery?id=${editId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      alert('Gallery item removed.');
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('Unable to delete gallery item.');
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
            <h2 className="text-2xl font-black text-gray-900">{editId ? 'Edit' : 'Add'} Gallery Image</h2>
            <p className="text-sm text-gray-600">Upload a photo for the public gallery. Description is optional.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {editId && (
            <button
              onClick={deleteGalleryItem}
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              <FaTrash /> Delete
            </button>
          )}
          <button
            onClick={saveGallery}
            disabled={isLoading || uploadLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FaSave /> {isLoading ? 'Saving...' : editId ? 'Save Changes' : 'Upload Image'}
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading || isLoading}
                className="w-full text-sm text-gray-700"
              />
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WEBP. Image upload uses your existing admin image service.</p>
              {uploadLoading && <p className="text-blue-600 text-sm mt-2">Uploading image...</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Description <span className="text-gray-400">(optional)</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short description for the gallery image..."
                className="w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500"
                rows={6}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Preview</h3>
              {imageUrl ? (
                <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
                  <img src={imageUrl} alt={description || 'Gallery image preview'} className="w-full h-80 object-cover" />
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white text-gray-500">
                  Select an image to preview it here.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Image URL is stored in the database and rendered on the public gallery page.</li>
                <li>• Description is optional and will only show when provided.</li>
                <li>• Use the public <code>/gallery</code> page to preview all uploaded images.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
