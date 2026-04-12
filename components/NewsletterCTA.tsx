'use client';

import { useState } from 'react';
import { FaArrowRight, FaPaperPlane, FaEnvelope } from 'react-icons/fa6';
import { useNewsletter } from '@/lib/hooks/useNewsletter';

interface NewsletterCTAProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
}

export default function NewsletterCTA({ 
  title = "Stay up to date with the latest",
  subtitle = "Nihri's hope\nFor Refugees And Immigrants",
  placeholder = "Enter your email address",
  buttonText = "Subscribe"
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

  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left decorative circle */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-50 rounded-full opacity-60 blur-3xl" />
        {/* Bottom-right decorative circle */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-100 rounded-full opacity-40 blur-3xl" />
        {/* Small floating dots */}
        <div className="absolute top-20 right-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-300 rounded-full opacity-80 animate-pulse delay-75" />
        <div className="absolute top-1/2 right-20 w-4 h-4 bg-cyan-200 rounded-full opacity-50 animate-pulse delay-150" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden">
          {/* Cyan Accent Bar at Top */}
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600" />
          
          <div className="px-8 md:px-16 py-12 md:py-16">
            {/* Header Section */}
            <div className="text-center mb-10">
              {/* Kicker */}
              <span className="kicker-cyan mb-4 block">
                Newsletter
              </span>
              
              {/* Main Title */}
              <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
                {title.includes('Stay') ? (
                  <>
                    Stay <span className="heading-accent-cyan">Connected</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              
              {/* Divider */}
              <div className="hr-cyan mx-auto my-6" />
              
              {/* Subtitle */}
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-serif font-medium text-gray-900">
                  {line1}
                </p>
                {line2 && (
                  <p className="text-lg md:text-xl font-serif italic text-cyan-600">
                    {line2}
                  </p>
                )}
              </div>
            </div>

            {/* Email Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                <FaEnvelope className="text-3xl text-cyan-600" />
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Email Input */}
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-6 py-4 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-gray-900 placeholder-gray-400 font-medium"
                    disabled={loading}
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-cyan whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      {buttonText} 
                      <FaPaperPlane className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {message && (
                <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
                  status === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {status === 'success' ? '✓ ' : '✗ '}
                  {message}
                </div>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-2">
              <p className="text-sm text-gray-500 font-medium">
                We respect your privacy. Unsubscribe at any time.
              </p>
              <a 
                href="/unsubscribe" 
                className="text-sm text-cyan-600 hover:text-cyan-800 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
              >
                Unsubscribe
                <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>

          {/* Decorative Side Elements */}
          <div className="absolute top-1/2 -left-3 w-6 h-24 bg-cyan-200 rounded-full blur-sm -translate-y-1/2 hidden lg:block" />
          <div className="absolute top-1/2 -right-3 w-6 h-24 bg-cyan-300 rounded-full blur-sm -translate-y-1/2 hidden lg:block" />
        </div>

        {/* Bottom Decorative Text */}
        <p className="text-center mt-8 text-xs text-gray-400 font-medium tracking-widest uppercase">
          Join Our Community of Supporters
        </p>
      </div>
    </section>
  );
}
