// app/admin/events/page.tsx - SIMPLIFIED VERSION (matching blog pattern)
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaCalendar, FaClock, FaMapMarkerAlt, FaImage, FaGlobe } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminEventsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <EventEditor />
    </Suspense>
  );
}

function EventEditor() {
  // All fields in one object like blog pattern
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Upcoming' as 'Upcoming' | 'Past',
    location: '',
    startDate: '',
    endDate: '',
    cover: '',
    author: '',
    metaTitle: '',
    metaDesc: '',
    ogImage: '',
    venue: '',
    address: '',
    registrationLink: '',
    maxAttendees: '',
    isFree: true,
    ticketPrice: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'seo'>('details');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  useEffect(() => {
    if (editId) {
      loadEvent(Number(editId));
    }
  }, [editId]);

  const loadEvent = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/events?id=${id}`);
      const event = await res.json();
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || 'Upcoming',
        location: event.location || '',
        startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
        cover: event.cover || '',
        author: event.author || '',
        metaTitle: event.metaTitle || '',
        metaDesc: event.metaDesc || '',
        ogImage: event.ogImage || '',
        venue: event.venue || '',
        address: event.address || '',
        registrationLink: event.registrationLink || '',
        maxAttendees: event.maxAttendees?.toString() || '',
        isFree: event.isFree ?? true,
        ticketPrice: event.ticketPrice || '',
      });
    } catch (error) {
      console.error('Failed to load event:', error);
      alert('Failed to load event');
    } finally {
      setIsLoading(false);
    }
  };

  // Generic handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    console.log(`Field ${name} changed to:`, value); // Debug
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover' | 'ogImage') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const { url } = await res.json();
      setFormData(prev => ({ ...prev, [field]: url }));
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  const saveEvent = async () => {
    const { title, startDate, location } = formData;
    
    console.log('Saving with formData:', formData);
    console.log('Required fields:', { title, startDate, location });

    if (!title.trim() || !startDate || !location.trim()) {
      return alert('Required fields: Title, Start Date, Location');
    }

    setIsLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/events?id=${editId}` : '/api/events';

      const payload = {
        ...formData,
        title: formData.title.trim(),
        location: formData.location.trim(),
        startDate: formData.startDate, // Already in ISO format from datetime-local
        endDate: formData.endDate || null,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : undefined,
        ticketPrice: formData.isFree ? undefined : formData.ticketPrice,
      };

      console.log('Sending payload:', payload);

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save event');
      }

      alert(editId ? 'Event updated!' : 'Event saved!');
      router.push('/admin');
    } catch (error) {
      console.error('Save error:', error);
      alert(error instanceof Error ? error.message : 'Failed to save event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <FaArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-black text-gray-900">
            {editId ? 'Edit' : 'Create'} Event
          </h2>
        </div>
        
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
          formData.category === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {formData.category}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-6 py-3 font-medium flex items-center gap-2 ${
            activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
          }`}
        >
          <FaCalendar /> Event Details
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-3 font-medium flex items-center gap-2 ${
            activeTab === 'seo' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
          }`}
        >
          <FaGlobe /> SEO & Meta
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'details' ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
              <input
                name="title"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Annual Refugee Support Gala 2026"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Organizer</label>
              <input
                name="author"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., New International Hope Team"
                value={formData.author}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Status</label>
              <select
                name="category"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.category}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past Event</option>
              </select>
            </div>

            {/* Date & Time - KEY FIX: Using name attribute like blog */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-1"/> Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={formData.startDate}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {/* Debug */}
                <span className="text-xs text-gray-400">Value: {formData.startDate || 'empty'}</span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-1"/> End Date & Time (optional)
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-1"/> Location *
              </label>
              <input
                name="location"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., Community Center Downtown"
                value={formData.location}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Venue & Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Details</label>
              <input
                name="venue"
                className="w-full px-4 py-3 border rounded-lg mb-2"
                placeholder="e.g., Grand Ballroom, 3rd Floor"
                value={formData.venue}
                onChange={handleChange}
                disabled={isLoading}
              />
              <textarea
                name="address"
                className="w-full px-4 py-3 border rounded-lg h-20"
                placeholder="Full address: 123 Main St, City, State, ZIP"
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Ticket Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Ticket Information</h4>
              
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Free Event</span>
              </label>

              {!formData.isFree && (
                <input
                  name="ticketPrice"
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                  placeholder="Ticket Price (e.g., $25.00)"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              )}

              <input
                type="number"
                name="maxAttendees"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Maximum Attendees (optional)"
                value={formData.maxAttendees}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Registration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Link or Email</label>
              <input
                name="registrationLink"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="https://... or email@example.com"
                value={formData.registrationLink}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="inline mr-1"/> Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                disabled={isLoading}
              />
              {formData.cover && (
                <div className="mt-2 relative inline-block">
                  <img src={formData.cover} alt="Cover" className="h-20 rounded" />
                  <button onClick={() => setFormData(p => ({...p, cover: ''}))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                className="w-full px-4 py-3 border rounded-lg h-40"
                placeholder="Describe the event..."
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
        ) : (
          /* SEO Tab */
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-1">SEO Settings</h3>
              <p className="text-sm text-blue-700">Optimize search engine appearance.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title (60 chars)</label>
              <input
                name="metaTitle"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.metaTitle}
                onChange={handleChange}
                maxLength={60}
              />
              <span className="text-xs text-gray-500">{formData.metaTitle.length}/60</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description (160 chars)</label>
              <textarea
                name="metaDesc"
                className="w-full px-4 py-3 border rounded-lg h-24"
                value={formData.metaDesc}
                onChange={handleChange}
                maxLength={160}
              />
              <span className="text-xs text-gray-500">{formData.metaDesc.length}/160</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Social Media Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'ogImage')}
                disabled={isLoading}
              />
              {formData.ogImage && (
                <div className="mt-2 relative inline-block">
                  <img src={formData.ogImage} alt="OG" className="h-20 rounded" />
                  <button onClick={() => setFormData(p => ({...p, ogImage: ''}))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex gap-4 mt-8 pt-6 border-t">
          <button 
            onClick={saveEvent} 
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaSave /> {isLoading ? 'Saving...' : (editId ? 'Update Event' : 'Save Event')}
          </button>
        </div>
      </div>
    </div>
  );
}