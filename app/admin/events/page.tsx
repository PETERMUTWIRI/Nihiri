// app/admin/events/page.tsx - ENTERPRISE EVENTS ADMIN
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSave, FaArrowLeft, FaCalendar, FaClock, FaMapMarkerAlt, FaImage, FaGlobe } from 'react-icons/fa';
import Link from 'next/link';

// Countdown component for preview
function CountdownPreview({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (!targetDate) return;
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference < 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsPast(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) return <div className="text-gray-500">Set start date to see countdown</div>;

  return (
    <div className={`p-4 rounded-lg ${isPast ? 'bg-red-50' : 'bg-blue-50'}`}>
      <div className="text-sm font-semibold mb-2 text-gray-700">
        {isPast ? '⚠️ Event has already started/passed' : '⏰ Live Countdown Preview'}
      </div>
      {!isPast && (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded p-2 shadow">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
            <div className="text-xs text-gray-500">Days</div>
          </div>
          <div className="bg-white rounded p-2 shadow">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
            <div className="text-xs text-gray-500">Hours</div>
          </div>
          <div className="bg-white rounded p-2 shadow">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-500">Mins</div>
          </div>
          <div className="bg-white rounded p-2 shadow">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-500">Secs</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper with Suspense
export default function AdminEventsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <EventEditor />
    </Suspense>
  );
}

function EventEditor() {
  // Core fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [cover, setCover] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // SEO & Meta fields (NEW)
  const [author, setAuthor] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [ogImage, setOgImage] = useState('');
  
  // Event specific (NEW)
  const [venue, setVenue] = useState(''); // Detailed venue name
  const [address, setAddress] = useState(''); // Full address
  const [registrationLink, setRegistrationLink] = useState(''); // External registration URL
  const [maxAttendees, setMaxAttendees] = useState<number | ''>('');
  const [isFree, setIsFree] = useState(true);
  const [ticketPrice, setTicketPrice] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState<'details' | 'seo' | 'preview'>('details');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  useEffect(() => {
    if (editId) {
      loadEvent(Number(editId));
    }
  }, [editId]);

  // Auto-generate meta fields
  useEffect(() => {
    if (title && !metaTitle) {
      setMetaTitle(`${title} | New International Hope`);
    }
  }, [title]);

  useEffect(() => {
    if (description && !metaDesc) {
      const plainText = description.replace(/<[^>]*>/g, '');
      setMetaDesc(plainText.slice(0, 160));
    }
  }, [description]);

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
      setAuthor(event.author || '');
      setMetaTitle(event.metaTitle || '');
      setMetaDesc(event.metaDesc || '');
      setOgImage(event.ogImage || '');
      setVenue(event.venue || '');
      setAddress(event.address || '');
      setRegistrationLink(event.registrationLink || '');
      setMaxAttendees(event.maxAttendees || '');
      setIsFree(event.isFree ?? true);
      setTicketPrice(event.ticketPrice || '');
      
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
    if (!title || !startDate || !location) return alert('Required fields: Title, Start Date, Location');
    
    setIsLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/events?id=${editId}` : '/api/events';

      const payload = {
        title,
        description,
        category,
        cover,
        startDate,
        endDate,
        location,
        author: author || undefined,
        metaTitle: metaTitle || undefined,
        metaDesc: metaDesc || undefined,
        ogImage: ogImage || undefined,
        venue: venue || undefined,
        address: address || undefined,
        registrationLink: registrationLink || undefined,
        maxAttendees: maxAttendees || undefined,
        isFree,
        ticketPrice: isFree ? undefined : ticketPrice,
      };

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const body = new FormData();
    body.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const { url } = await res.json();
      setter(url);
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  // Format date for display
  const formatEventDate = () => {
    if (!startDate) return 'Date TBD';
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    if (end && start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return start.toLocaleDateString('en-US', options);
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
        
        {/* Category Badge */}
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
          category === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {category}
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
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-3 font-medium flex items-center gap-2 ${
            activeTab === 'preview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
          }`}
        >
          <FaClock /> Live Preview
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
              <input
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Annual Refugee Support Gala 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Organizer</label>
              <input
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., New International Hope Team"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Category Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Status</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCategory('Upcoming')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition ${
                    category === 'Upcoming' 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  🟢 Upcoming
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('Past')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition ${
                    category === 'Past' 
                      ? 'border-gray-500 bg-gray-50 text-gray-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  ⚪ Past Event
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-1"/> Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-1"/> End Date & Time (optional)
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-1"/> Location/Venue Name *
                </label>
                <input
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., Community Center Downtown"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Venue Name</label>
                <input
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., Grand Ballroom, 3rd Floor"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                <textarea
                  className="w-full px-4 py-3 border rounded-lg h-20"
                  placeholder="123 Main St, City, State, ZIP"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Ticket Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Ticket Information</h4>
              
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={isFree}
                    onChange={() => setIsFree(true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Free Event</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isFree}
                    onChange={() => setIsFree(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Paid Event</span>
                </label>
              </div>

              {!isFree && (
                <input
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                  placeholder="Ticket Price (e.g., $25.00)"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  disabled={isLoading}
                />
              )}

              <input
                type="number"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Maximum Attendees (optional)"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value ? Number(e.target.value) : '')}
                disabled={isLoading}
              />
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                External Registration Link (optional)
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="https://eventbrite.com/..."
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="inline mr-1"/> Event Cover Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setCover)}
                  disabled={isLoading}
                  className="flex-1"
                />
                {cover && (
                  <div className="relative">
                    <img src={cover} alt="cover" className="h-20 w-20 object-cover rounded" />
                    <button 
                      onClick={() => setCover('')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Description</label>
              <textarea
                className="w-full px-4 py-3 border rounded-lg h-40"
                placeholder="Describe the event, agenda, speakers, etc. HTML allowed."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-1">SEO Settings</h3>
              <p className="text-sm text-blue-700">Optimize how this event appears in search engines and social media.</p>
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Title (60 chars max)
              </label>
              <input
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="SEO title for search results..."
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                maxLength={60}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{metaTitle.length}/60</span>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description (160 chars max)
              </label>
              <textarea
                className="w-full px-4 py-3 border rounded-lg h-24"
                placeholder="Brief description for search results..."
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                maxLength={160}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{metaDesc.length}/160</span>
              </div>
            </div>

            {/* OG Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Social Media Image (Open Graph)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setOgImage)}
                  disabled={isLoading}
                  className="flex-1"
                />
                {ogImage && (
                  <div className="relative">
                    <img src={ogImage} alt="og" className="h-20 w-20 object-cover rounded" />
                    <button 
                      onClick={() => setOgImage('')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended: 1200×630 pixels</p>
            </div>

            {/* Google Preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Google Search Preview</h4>
              <div className="bg-white p-4 rounded border">
                <div className="text-blue-800 text-lg truncate" style={{color: '#1a0dab'}}>
                  {metaTitle || title || 'Event Title'}
                </div>
                <div className="text-green-700 text-sm truncate">
                  nihiri.com › events › {title.toLowerCase().replace(/\s+/g, '-')}
                </div>
                <div className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {metaDesc || description?.replace(/<[^>]*>/g, '').slice(0, 160) || 'No description...'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-1">Live Event Preview</h3>
              <p className="text-sm text-blue-700">This is exactly how your event will appear to the public.</p>
            </div>

            {/* Event Card Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border max-w-2xl mx-auto">
              {cover && (
                <div className="relative h-48 bg-gray-200">
                  <img src={cover} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title || 'Event Title'}</h2>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <FaCalendar className="mr-2" />
                  {formatEventDate()}
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  {location || 'Location TBD'}
                  {venue && ` - ${venue}`}
                </div>

                {/* Countdown */}
                <div className="mb-4">
                  <CountdownPreview targetDate={startDate} />
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {description?.replace(/<[^>]*>/g, '') || 'No description provided.'}
                </p>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold">
                    Register Now
                  </button>
                  {!isFree && ticketPrice && (
                    <div className="px-4 py-3 bg-gray-100 rounded-lg font-semibold text-gray-700">
                      {ticketPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t">
          <button 
            onClick={saveEvent} 
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isLoading}
          >
            <FaSave /> {editId ? 'Update Event' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  );
}