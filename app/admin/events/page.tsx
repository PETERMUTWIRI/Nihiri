'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminEventsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [cover, setCover] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setTitle(event.title);
      setDescription(event.description || '');
      setCategory(event.category);
      setLocation(event.location);
      setCover(event.cover || '');
      if (event.startDate) {
        setStartDate(new Date(event.startDate).toISOString().slice(0, 16));
      }
      if (event.endDate) {
        setEndDate(new Date(event.endDate).toISOString().slice(0, 16));
      }
    } catch (error) {
      console.error('Failed to load event:', error);
      alert('Failed to load event');
    } finally {
      setIsLoading(false);
    }
  };

  const saveEvent = async () => {
    if (!title || !startDate || !location) return alert('Required fields missing');
    
    setIsLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/events?id=${editId}` : '/api/events';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, cover, startDate, endDate, location }),
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
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-gray-600 hover:text-gray-900">
          <FaArrowLeft size={20} />
        </Link>
        <h2 className="text-3xl font-black">{editId ? 'Edit' : 'Create'} Event</h2>
      </div>

      <input 
        className="w-full mb-4 px-4 py-3 border rounded-lg" 
        placeholder="Event title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <textarea 
        className="w-full mb-4 px-4 py-3 border rounded-lg" 
        placeholder="Description (HTML ok)" 
        rows={6} 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input 
          type="datetime-local" 
          className="px-4 py-3 border rounded-lg" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)}
          disabled={isLoading}
        />
        <input 
          type="datetime-local" 
          className="px-4 py-3 border rounded-lg" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <input 
        className="w-full mb-4 px-4 py-3 border rounded-lg" 
        placeholder="Location / Venue" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)}
        disabled={isLoading}
      />

      <select 
        className="mb-4 px-4 py-3 border rounded-lg" 
        value={category} 
        onChange={(e) => setCategory(e.target.value as 'Upcoming' | 'Past')}
        disabled={isLoading}
      >
        <option value="Upcoming">Upcoming</option>
        <option value="Past">Past</option>
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

      <button 
        onClick={saveEvent} 
        className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
        disabled={isLoading}
      >
        <FaSave /> {editId ? 'Update' : 'Save'} Event
      </button>
    </div>
  );
}