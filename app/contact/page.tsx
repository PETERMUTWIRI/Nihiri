'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const WHATSAPP_NUMBER = '+254713064026';

const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Programs', label: 'Programs (ESL, Health, Advocacy)' },
  { value: 'Volunteer', label: 'Volunteer Opportunities' },
  { value: 'Partnership', label: 'Partnership/Collaboration' },
  { value: 'Donation', label: 'Donation Questions' },
  { value: 'Other', label: 'Other' },
];

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/newinternationalhope', color: 'bg-blue-600' },
  { name: 'Instagram', url: 'https://instagram.com/newinternationalhope', color: 'bg-pink-600' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/newinternationalhope', color: 'bg-blue-700' },
  { name: 'YouTube', url: 'https://youtube.com/newinternationalhope', color: 'bg-red-600' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const message = `CONTACT FORM MESSAGE

From: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

Message:
${formData.message}`;

    const encodedMessage = encodeURIComponent(message);

    setShowToast(true);

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
      setIsSubmitting(false);
    }, 1500);

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const openWhatsApp = () => {
    const greeting = encodeURIComponent('Hello New International Hope Team, I would like to get in touch with you.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${greeting}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl"
          >
            <p className="font-semibold">Message Sent Successfully</p>
            <p className="text-sm text-white/90">Opening WhatsApp...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 to-brand-primary/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              We&apos;d love to hear from you. Whether you have questions about our programs, 
              want to volunteer, or are interested in partnering with us, reach out and 
              we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* LEFT: Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary font-bold">P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+12036759395" className="text-gray-600 hover:text-brand-primary transition">
                      +(203) 675-9395
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary font-bold">E</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <div className="space-y-1">
                      <a href="mailto:info@nihri.com" className="block text-gray-600 hover:text-brand-primary transition">
                        info@nihri.com
                      </a>
                      <a href="mailto:newinternationalhope@gmail.com" className="block text-gray-600 hover:text-brand-primary transition">
                        newinternationalhope@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      475 Elm St.<br />
                      New Haven, CT 06511<br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary font-bold">H</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Office Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <p className="font-semibold text-blue-900 mb-2">Expected Response Time</p>
                <p className="text-blue-700">
                  We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days. 
                  For urgent matters, please call us directly or use the WhatsApp chat button below.
                </p>
              </div>

              {/* WhatsApp Direct Button */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <p className="font-semibold text-green-900 mb-3">Prefer WhatsApp?</p>
                <p className="text-green-700 mb-4">
                  Chat with us directly for quick responses.
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  <span>Chat on WhatsApp</span>
                  <span>→</span>
                </button>
              </div>

              {/* Social Media */}
              <div>
                <p className="font-semibold text-gray-900 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-8 py-4 rounded-lg font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-brand-text/30 border-t-brand-text rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span>→</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600">
              We&apos;re located in the heart of New Haven, Connecticut.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-[400px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
            <div className="relative text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-text font-bold text-2xl">N</span>
              </div>
              <p className="font-semibold text-gray-900 text-lg">New International Hope</p>
              <p className="text-gray-600">475 Elm St, New Haven, CT 06511</p>
              <a 
                href="https://maps.google.com/?q=475+Elm+St+New+Haven+CT+06511" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Open in Google Maps
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly will I receive a response?',
                a: 'We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call or WhatsApp us directly.'
              },
              {
                q: 'Do I need to make an appointment to visit?',
                a: 'While walk-ins are welcome during office hours, we recommend calling ahead to ensure someone is available to assist you.'
              },
              {
                q: 'How can I volunteer?',
                a: 'Visit our Volunteer page and fill out the application form, or contact us directly through this form selecting "Volunteer" as the subject.'
              },
              {
                q: 'Are your services really free?',
                a: 'Yes, all our programs including ESL classes, health navigation, and advocacy services are completely free for refugee and immigrant families.'
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA
        title="Stay Updated"
        subtitle="Subscribe to our newsletter for the latest news and events"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
