'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaUsers, FaGraduationCap, FaHandHoldingHeart, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryOfOrigin: string;
  languages: string;
  availability: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function VolunteerPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryOfOrigin: '',
    languages: '',
    availability: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.availability) {
      newErrors.availability = 'Please select your availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format WhatsApp message
    const message = `*New Volunteer Application*%0A%0A` +
      `*Name:* ${formData.fullName}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Country of Origin:* ${formData.countryOfOrigin || 'Not specified'}%0A` +
      `*Languages:* ${formData.languages || 'Not specified'}%0A` +
      `*Availability:* ${formData.availability}%0A` +
      `*Message/Skills:*%0A${formData.message || 'No additional message'}`;

    // Show success toast
    setShowToast(true);

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(`https://wa.me/+254712345678?text=${message}`, '_blank');
      setIsSubmitting(false);
    }, 1500);

    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const volunteerOpportunities = [
    {
      icon: FaGraduationCap,
      title: 'ESL Tutor',
      description: 'Help refugee women learn English through one-on-one tutoring sessions.',
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Health Navigator',
      description: 'Assist families in understanding and accessing healthcare services.',
    },
    {
      icon: FaUsers,
      title: 'Youth Mentor',
      description: 'Guide and support refugee youth in their educational journey.',
    },
    {
      icon: FaHeart,
      title: 'Childcare Provider',
      description: 'Provide childcare during ESL classes to enable mothers to learn.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <FaCheckCircle className="text-xl" />
            <div>
              <p className="font-semibold">Application Submitted!</p>
              <p className="text-sm text-white/90">Redirecting you to WhatsApp...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - Warm, compassionate design */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-orange-50 via-white to-brand-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaHeart className="text-brand-primary" />
                Join Our Mission
              </span>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Be a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-brand-primary">
                  Beacon of Hope
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                At New International Hope, we believe it takes a village to support refugee and immigrant families. 
                Your time and skills can transform lives and build a community that celebrates diversity.
              </p>
              
              <p className="text-gray-600 mb-8">
                Inspired by the compassionate work of Elena&apos;s Light, we invite you to join our volunteer family 
                and make a meaningful difference in the lives of those rebuilding their futures.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#volunteer-form"
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
                >
                  Apply to Volunteer
                  <FaHeart />
                </a>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/programs/esl3.png"
                  alt="Volunteers making a difference"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-primary/20 rounded-full flex items-center justify-center">
                    <FaUsers className="text-2xl text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gray-900">150+</p>
                    <p className="text-sm text-gray-600">Active Volunteers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER OPPORTUNITIES */}
      <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Ways to Make an Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you have an hour or a day, your contribution matters. 
              Choose how you&apos;d like to help refugee families thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerOpportunities.map((opportunity, idx) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <opportunity.icon className="text-3xl text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600">
                  {opportunity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER FORM SECTION */}
      <section id="volunteer-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Get Started
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Apply to Volunteer
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we&apos;ll get back to you within 48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-brand-background rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-0 transition bg-white`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-0 transition bg-white`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-0 transition bg-white`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Country of Origin */}
              <div>
                <label htmlFor="countryOfOrigin" className="block text-sm font-semibold text-gray-700 mb-2">
                  Country of Origin
                </label>
                <input
                  type="text"
                  id="countryOfOrigin"
                  name="countryOfOrigin"
                  value={formData.countryOfOrigin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:ring-0 transition bg-white"
                  placeholder="e.g., Afghanistan, Syria, etc."
                />
              </div>

              {/* Languages */}
              <div className="md:col-span-2">
                <label htmlFor="languages" className="block text-sm font-semibold text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:ring-0 transition bg-white"
                  placeholder="e.g., English, Dari, Pashto, Arabic, etc."
                />
              </div>

              {/* Availability */}
              <div className="md:col-span-2">
                <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.availability ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-0 transition bg-white`}
                >
                  <option value="">Select your availability</option>
                  <option value="Weekday mornings">Weekday mornings</option>
                  <option value="Weekday afternoons">Weekday afternoons</option>
                  <option value="Weekday evenings">Weekday evenings</option>
                  <option value="Weekend mornings">Weekend mornings</option>
                  <option value="Weekend afternoons">Weekend afternoons</option>
                  <option value="Weekend evenings">Weekend evenings</option>
                  <option value="Flexible">Flexible schedule</option>
                </select>
                {errors.availability && (
                  <p className="mt-1 text-sm text-red-500">{errors.availability}</p>
                )}
              </div>

              {/* Message/Skills */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message / Skills
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-primary focus:ring-0 transition bg-white resize-none"
                  placeholder="Tell us about your skills, experience, or why you'd like to volunteer..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-8 py-4 rounded-lg font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-text/30 border-t-brand-text rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-lg" />
                    Submit Application
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>

            {/* WhatsApp Note */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-start gap-3">
              <FaWhatsapp className="text-green-600 text-xl mt-0.5" />
              <p className="text-sm text-gray-600">
                Your application will be sent via WhatsApp to our volunteer coordinator. 
                Make sure you have WhatsApp installed on your device.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* INSPIRATIONAL QUOTE */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <FaHeart className="text-4xl text-brand-primary mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
            &ldquo;We know that it really does take a village. Together, we can provide 
            refugee and immigrant families with all the tools they need to cultivate 
            and exercise their individual independence.&rdquo;
          </blockquote>
          <cite className="text-white/80 not-italic">
            — Inspired by Elena&apos;s Light
          </cite>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA
        title="Stay Connected"
        subtitle="Join our community of changemakers"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
