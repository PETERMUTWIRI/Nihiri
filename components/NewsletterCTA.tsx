'use client';

import { useState } from 'react';
import { FaArrowRight, FaPaperPlane, FaEnvelope } from 'react-icons/fa6';
import { useNewsletter } from '@/lib/hooks/useNewsletter';

interface NewsletterCTAProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  compact?: boolean;
}

export default function NewsletterCTA({ 
  title = "Stay up to date with the latest",
  subtitle = "Nihri's hope\nFor Refugees And Immigrants",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  compact = false
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { subscribe, loading } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    const result = await subscribe(email);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  const [line1, line2] = subtitle.split('\n');

  if (compact) {
    // Compact version for footer
    return (
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
              <FaEnvelope className="text-xl text-cyan-600" />
            </div>
          </div>
          <div className="flex-1 w-full">
            <h4 className="font-serif text-lg font-medium text-white mb-1">
              Stay <span className="italic text-cyan-300">Connected</span>
            </h4>
            <p className="text-sm text-white/70 mb-3">Get updates on our programs and impact</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-white placeholder-white/50 text-sm"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                {loading ? '...' : buttonText}
              </button>
            </form>
            
            {message && (
              <p className={`text-xs mt-2 ${status === 'success' ? 'text-cyan-300' : 'text-red-300'}`}>
                {status === 'success' ? '✓ ' : '✗ '}{message}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full version (smaller than before)
  return (
    <section className="relative py-12 px-6 md:px-12 overflow-hidden bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-50 rounded-full opacity-40 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-100 rounded-full opacity-30 blur-2xl" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Main Card - Smaller padding */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-cyan-100 overflow-hidden">
          {/* Cyan Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600" />
          
          <div className="px-6 md:px-10 py-8">
            {/* Header - Compact */}
            <div className="text-center mb-6">
              <h2 className="heading-editorial text-2xl md:text-3xl text-gray-900 mb-2">
                Stay <span className="heading-accent-cyan">Connected</span>
              </h2>
              <p className="text-gray-600 body-editorial text-sm max-w-md mx-auto">
                Get the latest stories, events, and updates from our community
              </p>
            </div>

            {/* Form Section - Compact */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-5 py-3 pl-11 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400 text-sm"
                    disabled={loading}
                  />
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      {buttonText} 
                      <FaPaperPlane className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>

              {message && (
                <div className={`mt-3 p-3 rounded-lg text-center text-sm font-medium ${
                  status === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {status === 'success' ? '✓ ' : '✗ '}{message}
                </div>
              )}
            </form>

            {/* Footer Links - Compact */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                We respect your privacy. 
                <a href="/unsubscribe" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline ml-1">
                  Unsubscribe
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
