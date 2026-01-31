'use client';

import { useState, useRef } from 'react';
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

const WHATSAPP_NUMBER = '+254713064026';

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
  const [currentStep, setCurrentStep] = useState(1);
  
  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.position) newErrors.position = 'Please select a position';
    }

    if (step === 3) {
      if (!formData.aboutYourself.trim()) newErrors.aboutYourself = 'Please tell us about yourself';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    const message = `VOLUNTEER APPLICATION

PERSONAL INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

AVAILABILITY
Available Start Date: ${formData.startDate}

POSITION
Position: ${formData.position}
Resume: ${resumeName || 'Not uploaded'}
Cover Letter: ${coverLetterName || 'Not uploaded'}

ABOUT YOURSELF
${formData.aboutYourself}`;

    setShowToast(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setIsSubmitting(false);
    }, 1500);

    setTimeout(() => setShowToast(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'resume') setResumeName(file.name);
      else setCoverLetterName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast */}
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

      {/* HERO - with Gradient Text */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Join Our Team
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Be a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-brand-primary">
              Beacon of Hope
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Volunteering with New International Hope is a great way to enrich the life 
            of a refugee or immigrant while also enriching your own.
          </p>
        </div>
      </section>

      {/* VOLUNTEER BENEFITS */}
      <section className="py-12 bg-white -mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Make an Impact', desc: 'Change lives directly' },
              { label: 'Flexible Hours', desc: 'Volunteer on your schedule' },
              { label: 'Gain Experience', desc: 'Build your skills' },
              { label: 'Join a Community', desc: 'Connect with others' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition">
                <p className="font-bold text-gray-900 text-lg mb-1">{item.label}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER OPPORTUNITIES */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how you can contribute your skills and time to support refugee and immigrant families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ESL Tutor', desc: 'Help adults learn English through one-on-one tutoring. Perfect for patient individuals who love teaching.' },
              { title: 'Health Navigator', desc: 'Assist families in accessing healthcare services. Ideal for those with medical or social work backgrounds.' },
              { title: 'Childcare Provider', desc: 'Provide childcare during ESL classes. Great for those who love working with children.' },
              { title: 'Administrative Support', desc: 'Help with office tasks and program coordination. Perfect for organized, detail-oriented individuals.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition hover:-translate-y-1">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Apply Today</h2>
            <p className="text-gray-600">
              Please fill out this form and someone from our team will get back to you with next steps.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-4">
              {['Personal Info', 'Position', 'About You', 'Review'].map((label, idx) => (
                <div key={label} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-sm ${
                    idx + 1 <= currentStep ? 'bg-brand-primary text-brand-text' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {idx + 1 < currentStep ? '✓' : idx + 1}
                  </div>
                  <span className={`text-xs ${idx + 1 <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-brand-primary rounded-full transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-xl">
            {/* STEP 1 - PERSONAL INFO */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} placeholder="your@email.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} placeholder="+1 (555) 000-0000" />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 2 - POSITION */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Position Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Start Date <span className="text-red-500">*</span></label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.startDate ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                    {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position Interested In <span className="text-red-500">*</span></label>
                    <select name="position" value={formData.position} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.position ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`}>
                      <option value="">Select a position</option>
                      {volunteerPositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                    {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
                  </div>
                </div>

                <div className="bg-brand-primary/10 rounded-xl p-6 border border-brand-primary/20">
                  <h3 className="font-bold text-gray-900 mb-3">Not sure which position?</h3>
                  <p className="text-gray-700 text-sm">
                    Select Other and tell us about your skills in the next step. We will help you find the perfect fit.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 3 - ABOUT YOU */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">About Yourself</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself, your skills, volunteer experience, and why you are interested in volunteering with us <span className="text-red-500">*</span></label>
                  <textarea name="aboutYourself" value={formData.aboutYourself} onChange={handleChange} rows={6} className={`w-full px-4 py-3 rounded-lg border ${errors.aboutYourself ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white resize-none`} placeholder="Share your story, experience, and what motivates you to volunteer..." />
                  {errors.aboutYourself && <p className="mt-1 text-sm text-red-500">{errors.aboutYourself}</p>}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Documents (Optional)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                      <div onClick={() => resumeRef.current?.click()} className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition text-center">
                        <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} className="hidden" />
                        {resumeName ? <p className="text-sm text-gray-700 font-medium">{resumeName}</p> : <><p className="text-sm text-gray-500 mb-1">Click to upload</p><p className="text-xs text-gray-400">PDF, DOC, or DOCX</p></>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                      <div onClick={() => coverLetterRef.current?.click()} className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition text-center">
                        <input ref={coverLetterRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'coverLetter')} className="hidden" />
                        {coverLetterName ? <p className="text-sm text-gray-700 font-medium">{coverLetterName}</p> : <><p className="text-sm text-gray-500 mb-1">Click to upload</p><p className="text-xs text-gray-400">PDF, DOC, or DOCX</p></>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Review Application</button>
                </div>
              </div>
            )}

            {/* STEP 4 - REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Review Your Application</h2>
                
                <div className="space-y-6 bg-gray-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900">{formData.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{formData.phone}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Start Date</p>
                      <p className="font-medium text-gray-900">{formData.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Position</p>
                      <p className="font-medium text-gray-900">{formData.position}</p>
                    </div>
                  </div>
                  {(resumeName || coverLetterName) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Documents</p>
                      <p className="font-medium text-gray-900">
                        {resumeName && `Resume: ${resumeName}`}
                        {resumeName && coverLetterName && ', '}
                        {coverLetterName && `Cover Letter: ${coverLetterName}`}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 text-sm">
                    By submitting this application, you agree to be contacted by our volunteer coordinator via WhatsApp or email.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Our Impact Together</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Students Taught' },
              { number: '150+', label: 'Active Volunteers' },
              { number: '50+', label: 'Countries Served' },
              { number: '10+', label: 'Years of Service' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
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
