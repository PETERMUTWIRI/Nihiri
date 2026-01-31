'use client';

import { useState } from 'react';
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

      {/* HERO SECTION - Theme Consistent */}
      <section className="relative bg-brand-background pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
              We Are Here to Help
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our programs? Want to volunteer or partner with us? 
              We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="py-12 bg-white -mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a 
              href="tel:+12036759395"
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition group"
            >
              
              <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Mon-Fri, 9am-5pm</p>
              <p className="text-brand-primary font-semibold">+(203) 675-9395</p>
            </a>

            {/* Email */}
            <a 
              href="mailto:info@nihri.com"
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition group"
            >
              
              <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">We reply within 24-48hrs</p>
              <p className="text-brand-primary font-semibold">info@nihri.com</p>
            </a>

            {/* WhatsApp */}
            <button 
              onClick={openWhatsApp}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition group text-left"
            >
              
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-2">Quick response</p>
              <p className="text-green-600 font-semibold">Chat Now</p>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* LEFT: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition bg-white`}
                        placeholder="John Doe"
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
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition bg-white`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition bg-white"
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
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition bg-white`}
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
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition bg-white resize-none`}
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
                      'Send Message'
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                </form>
              </div>
            </div>

            {/* RIGHT: Office Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-brand-primary/10 rounded-2xl p-6 border border-brand-primary/20">
                <h3 className="font-bold text-gray-900 mb-2">Expected Response Time</h3>
                <p className="text-gray-700 text-sm">
                  We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days. 
                  For urgent matters, please call or WhatsApp us directly.
                </p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Our Office</h3>
                <address className="not-italic text-gray-600 text-sm space-y-1">
                  <p className="font-medium text-gray-900">New International Hope</p>
                  <p>475 Elm St.</p>
                  <p>New Haven, CT 06511</p>
                  <p>United States</p>
                </address>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-2">
                  {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 bg-gray-100 hover:bg-brand-primary hover:text-brand-text rounded-lg text-sm font-medium text-gray-700 transition"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED MAP */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600">
              We are located in the heart of New Haven, Connecticut.
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8!2d-72.92!3d41.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b0c5c9c5c9%3A0x9c9c9c9c9c9c9c9c!2s475%20Elm%20St%2C%20New%20Haven%2C%20CT%2006511!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="New International Hope Office Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-4">
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
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
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
