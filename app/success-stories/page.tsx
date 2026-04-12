'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaUpload, FaUser, FaBuilding, FaPen, FaSpinner, FaCircleCheck } from 'react-icons/fa6';
import ScrollReveal from '@/components/ScrollReveal';

interface SuccessStory {
  id: number;
  name: string;
  organization: string | null;
  imageUrl: string | null;
  story: string;
  createdAt: string;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    story: '',
    imageUrl: '',
  });

  // Fetch stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/success-stories');
      const data = await response.json();
      if (data.success) {
        setStories(data.stories);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/success-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setFormData({ name: '', organization: '', story: '', imageUrl: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to submit story');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-render-premium">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/images/history/history-07-youth-circle.jpg')" }}>
        <div className="absolute inset-0 bg-cyan-600/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="kicker text-white/90 mb-4 block">Inspiring Journeys</span>
          <h1 className="heading-editorial text-5xl md:text-6xl text-white mb-6">
            Success <span className="italic font-serif text-cyan-300">Stories</span>
          </h1>
          <div className="hr-white mx-auto my-6" />
          <p className="hero-subtitle text-white/90 max-w-2xl mx-auto">
            Real stories of resilience, growth, and transformation from our community members. 
            Share your own journey and inspire others.
          </p>
        </div>
      </section>

      {/* STORIES GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-12">
            <span className="kicker-cyan mb-2 block">Community Voices</span>
            <h2 className="heading-editorial text-4xl md:text-5xl text-gray-900">
              Stories of <span className="heading-accent-cyan">Hope</span>
            </h2>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center py-12">
              <FaSpinner className="text-4xl text-cyan-600 animate-spin" />
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-cyan-100">
              <p className="text-gray-600 body-editorial">
                No stories yet. Be the first to share your journey!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <ScrollReveal key={story.id} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100 h-full">
                    <div className="relative h-64 bg-cyan-50">
                      {story.imageUrl ? (
                        <img
                          src={story.imageUrl}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100">
                          <span className="text-6xl">👤</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="card-title-cyan text-xl mb-1">{story.name}</h3>
                      {story.organization && (
                        <p className="text-cyan-600 text-sm font-medium mb-3">{story.organization}</p>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
                        {story.story}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT STORY FORM */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-xl border border-cyan-100 overflow-hidden">
              {/* Header */}
              <div className="bg-cyan-600 px-8 py-6">
                <span className="text-cyan-200 text-xs uppercase tracking-[0.2em] font-semibold">Share Your Journey</span>
                <h2 className="heading-editorial text-3xl text-white mt-2">
                  Submit Your <span className="italic font-serif text-cyan-300">Story</span>
                </h2>
              </div>

              {/* Form */}
              <div className="p-8">
                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <FaCircleCheck className="text-6xl text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 body-editorial">{submitMessage}</p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition"
                    >
                      Share Another Story
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          <FaUser className="inline mr-2 text-cyan-600" />
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      {/* Organization Field */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          <FaBuilding className="inline mr-2 text-cyan-600" />
                          Organization (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                          placeholder="Your organization or affiliation"
                        />
                      </div>
                    </div>

                    {/* Image URL Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <FaUpload className="inline mr-2 text-cyan-600" />
                        Photo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        placeholder="https://example.com/your-photo.jpg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Provide a link to your photo (Imgur, Google Drive, etc.)
                      </p>
                    </div>

                    {/* Story Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <FaPen className="inline mr-2 text-cyan-600" />
                        Your Story *
                      </label>
                      <textarea
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none"
                        placeholder="Share your journey, experiences, and how our programs have helped you..."
                        required
                        maxLength={2000}
                      />
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {formData.story.length}/2000 characters
                      </p>
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">
                        {submitMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl transition shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Your Story
                          <FaArrowRight />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Your story will be reviewed before being published. Thank you for sharing!
                    </p>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
