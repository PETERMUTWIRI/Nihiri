'use client';

import { useState } from 'react';
import { FaSave, FaImage } from 'react-icons/fa';

export default function AdminEventsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [cover, setCover] = useState('');

  const saveEvent = async () => {
    if (!title || !startDate || !location) return alert('Required fields missing');
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, category, cover, startDate, endDate, location }),
    });
    if (res.ok) {
      alert('Event saved!');
      // reset form
      setTitle(''); setDescription(''); setStartDate(''); setEndDate(''); setLocation(''); setCover('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-black mb-6">Create / Edit Event</h2>

      <input className="w-full mb-4 px-4 py-3 border rounded-lg" placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full mb-4 px-4 py-3 border rounded-lg" placeholder="Description (HTML ok)" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input type="datetime-local" className="px-4 py-3 border rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="datetime-local" className="px-4 py-3 border rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <input className="w-full mb-4 px-4 py-3 border rounded-lg" placeholder="Location / Venue" value={location} onChange={(e) => setLocation(e.target.value)} />

      <select className="mb-4 px-4 py-3 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value as 'Upcoming' | 'Past')}>
        <option value="Upcoming">Upcoming</option>
        <option value="Past">Past</option>
      </select>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Cover image</label>
        <input type="file" accept="image/*" onChange={async (e) => {
          const file = e.target.files?.[0]; if (!file) return;
          const body = new FormData(); body.append('file', file);
          const res = await fetch('/api/upload', { method: 'POST', body });
          const { url } = await res.json(); setCover(url);
        }} />
        {cover && <img src={cover} alt="cover" className="mt-2 h-32 rounded" />}
      </div>

      <button onClick={saveEvent} className="btn-primary inline-flex items-center gap-2">
        <FaSave /> Save Event
      </button>
    </div>
  );
}