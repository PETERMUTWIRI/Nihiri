'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  position: string;
  aboutYourself: string;
}

interface FormErrors {
  [key: string]: string;
}

const volunteerPositions = [
  'ESL Tutor',
  'Health Navigator',
  'Childcare Provider',
  'Administrative Support',
  'Event Coordinator',
  'Fundraising Assistant',
  'Interpreter/Translator',
  'Other',
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    position: '',
    aboutYourself: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [coverLetterName, setCoverLetterName] = useState('');
  
  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Available start date is required';
    }

    if (!formData.position) {
      newErrors.position = 'Please select a volunteer position';
    }

    if (!formData.aboutYourself.trim()) {
      newErrors.aboutYourself = 'Please tell us about yourself';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format WhatsApp message
    const message = `NEW VOLUNTEER APPLICATION

PERSONAL INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Available Start Date: ${formData.startDate}

VOLUNTEER POSITION
Position: ${formData.position}
Resume: ${resumeName || 'Not uploaded'}
Cover Letter: ${coverLetterName || 'Not uploaded'}

ABOUT YOURSELF
${formData.aboutYourself}`;

    const encodedMessage = encodeURIComponent(message);

    setShowToast(true);

    setTimeout(() => {
      window.open(`https://wa.me/+254713064026?text=${encodedMessage}`, '_blank');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'resume') {
        setResumeName(file.name);
      } else {
        setCoverLetterName(file.name);
      }
    }
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
            <p className="font-semibold">Application Submitted Successfully</p>
            <p className="text-sm text-white/90">Opening WhatsApp...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-yellow-50 via-white to-cyan-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Join Our Mission
              </span>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Be a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-brand-primary">
                  Beacon of Hope
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Volunteering with New International Hope is a great way to enrich the life 
                of a refugee or immigrant while also enriching your own. Your time and skills 
                can transform lives and build a stronger community.
              </p>
              
              <p className="text-gray-600 mb-8">
                If you enjoy communicating and are passionate about sharing the gift of 
                language access, you can be an ESL tutor. Or if you have other skills you 
                would like to offer, let us know.
              </p>

              <a
                href="#volunteer-form"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-8 py-4 rounded-lg font-semibold transition shadow-lg"
              >
                Apply Today
                <span className="text-lg">→</span>
              </a>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/programs/esl3.png"
                  alt="Volunteers making a difference"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-[180px]">
                <p className="text-3xl font-black text-gray-900">150+</p>
                <p className="text-sm text-gray-600">Active Volunteers</p>
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
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how you can make a meaningful impact in the lives of refugee 
              and immigrant families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'ESL Tutor', desc: 'Help adults learn English through one-on-one tutoring sessions. Perfect for patient, caring individuals who love teaching.' },
              { title: 'Health Navigator', desc: 'Assist families in understanding and accessing healthcare services. Ideal for those with medical or social work backgrounds.' },
              { title: 'Childcare Provider', desc: 'Provide childcare during ESL classes to enable mothers to learn. Great for those who love working with children.' },
              { title: 'Administrative Support', desc: 'Help with office tasks, data entry, and program coordination. Perfect for organized, detail-oriented individuals.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER FORM */}
      <section id="volunteer-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Volunteer Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please fill out this form and someone from our team will get back to you 
              with next steps. Thank you for your interest in volunteering with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl">
            
            {/* PERSONAL INFORMATION */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Available Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Volunteer position you are interested in? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.position ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white`}
                  >
                    <option value="">Select a position</option>
                    {volunteerPositions.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-500">{errors.position}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ABOUT YOURSELF */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                About Yourself
              </h3>
              
              <div>
                <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself, your skills, volunteer experience etc. Why are you interested in volunteering with us? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="aboutYourself"
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.aboutYourself ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white resize-none`}
                  placeholder="Share your story, experience, and what motivates you to volunteer..."
                />
                {errors.aboutYourself && (
                  <p className="mt-1 text-sm text-red-500">{errors.aboutYourself}</p>
                )}
              </div>
            </div>

            {/* FILE UPLOADS */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Documents (Optional)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload your resume
                  </label>
                  <div
                    onClick={() => resumeRef.current?.click()}
                    className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition text-center"
                  >
                    <input
                      ref={resumeRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      className="hidden"
                    />
                    {resumeName ? (
                      <p className="text-sm text-gray-700 font-medium">{resumeName}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 mb-1">Click to upload</p>
                        <p className="text-xs text-gray-400">PDF, DOC, or DOCX</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload your cover letter
                  </label>
                  <div
                    onClick={() => coverLetterRef.current?.click()}
                    className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition text-center"
                  >
                    <input
                      ref={coverLetterRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'coverLetter')}
                      className="hidden"
                    />
                    {coverLetterName ? (
                      <p className="text-sm text-gray-700 font-medium">{coverLetterName}</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 mb-1">Click to upload</p>
                        <p className="text-xs text-gray-400">PDF, DOC, or DOCX</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-brand-text/30 border-t-brand-text rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
              
              <p className="text-sm text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>

            {/* WhatsApp Note */}
            <div className="mt-8 p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Your application will be sent via WhatsApp to our volunteer coordinator. 
                Please ensure you have WhatsApp installed on your device.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Your Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how volunteers like you are transforming lives every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '500+', label: 'Students Taught', desc: 'Adults who have learned English through our program' },
              { number: '150+', label: 'Active Volunteers', desc: 'Dedicated individuals making a difference' },
              { number: '50+', label: 'Countries Represented', desc: 'Diverse communities we serve' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl font-black text-gray-900 mb-2">{stat.number}</p>
                <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Every journey begins with a single step. Take yours today and help 
            refugee and immigrant families build brighter futures.
          </p>
          <a
            href="#volunteer-form"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-brand-text px-8 py-4 rounded-lg font-semibold transition shadow-lg"
          >
            Apply Today
            <span>→</span>
          </a>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA
        title="Stay Connected"
        subtitle="Get updates on volunteer opportunities and success stories"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
