'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterCTA from '@/components/NewsletterCTA';

interface FormData {
  organization: string;
  refereeFirstName: string;
  refereeLastName: string;
  refereeEmail: string;
  refereePhone: string;
  studentFirstName: string;
  studentLastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  studentEmail: string;
  studentPhone: string;
  hasWhatsapp: string;
  immigrationTime: string;
  yearArrived: string;
  currentAge: string;
  visaStatus: string;
  nativeLanguage: string;
  englishLevel: string;
  learningGoals: string;
}

interface FormErrors {
  [key: string]: string;
}

const WHATSAPP_NUMBER = '+254713064026';

const states = ['CT', 'NY', 'NJ', 'MA', 'RI', 'Other'];

const immigrationCategories = [
  { value: '', label: 'Select category' },
  { value: 'Newcomers (up to 5 years)', label: 'Newcomers (up to 5 years)' },
  { value: 'Recent immigrants (5-10 years)', label: 'Recent immigrants (5-10 years)' },
  { value: 'Longer term residents/Established immigrants (10+ years)', label: 'Longer term residents/Established immigrants (10+ years)' },
];

const visaTypes = [
  { value: '', label: 'Select status' },
  { value: 'Refugee', label: 'Refugee' },
  { value: 'Asylee', label: 'Asylee' },
  { value: 'Green Card Holder', label: 'Green Card Holder' },
  { value: 'Temporary Protected Status (TPS)', label: 'Temporary Protected Status (TPS)' },
  { value: 'Humanitarian Parole', label: 'Humanitarian Parole' },
  { value: 'Student Visa', label: 'Student Visa' },
  { value: 'Work Visa', label: 'Work Visa' },
  { value: 'Undocumented', label: 'Undocumented' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const languages = [
  'Arabic', 'Pashto', 'Dari', 'Farsi', 'Spanish', 'Haitian Creole',
  'Swahili', 'French', 'English', 'Other'
];

const englishLevels = [
  { value: '', label: 'Select level' },
  { value: 'Beginner - No English', label: 'Beginner - No English' },
  { value: 'Beginner - Basic words', label: 'Beginner - Basic words' },
  { value: 'Intermediate - Can hold simple conversations', label: 'Intermediate - Can hold simple conversations' },
  { value: 'Advanced - Comfortable with most conversations', label: 'Advanced - Comfortable with most conversations' },
];

export default function ESLOnboardingPage() {
  const [formData, setFormData] = useState<FormData>({
    organization: '',
    refereeFirstName: '',
    refereeLastName: '',
    refereeEmail: '',
    refereePhone: '',
    studentFirstName: '',
    studentLastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'CT',
    zip: '',
    studentEmail: '',
    studentPhone: '',
    hasWhatsapp: '',
    immigrationTime: '',
    yearArrived: '',
    currentAge: '',
    visaStatus: '',
    nativeLanguage: '',
    englishLevel: '',
    learningGoals: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
      if (!formData.refereeFirstName.trim()) newErrors.refereeFirstName = 'First name is required';
      if (!formData.refereeLastName.trim()) newErrors.refereeLastName = 'Last name is required';
      if (!formData.refereePhone.trim()) newErrors.refereePhone = 'Phone is required';
      if (!formData.studentFirstName.trim()) newErrors.studentFirstName = 'First name is required';
      if (!formData.studentLastName.trim()) newErrors.studentLastName = 'Last name is required';
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zip.trim()) newErrors.zip = 'ZIP is required';
      if (!formData.studentPhone.trim()) newErrors.studentPhone = 'Phone is required';
    }

    if (step === 2) {
      if (!formData.hasWhatsapp) newErrors.hasWhatsapp = 'This field is required';
      if (!formData.immigrationTime) newErrors.immigrationTime = 'Please select a category';
      if (!formData.currentAge.trim()) newErrors.currentAge = 'Current age is required';
      if (!formData.nativeLanguage) newErrors.nativeLanguage = 'Native language is required';
      if (!formData.englishLevel) newErrors.englishLevel = 'English level is required';
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

    const message = `ESL REFERRAL FORM SUBMISSION

ORGANIZATION OF ORIGIN
Organization: ${formData.organization}

REFEREE INFORMATION
Name: ${formData.refereeFirstName} ${formData.refereeLastName}
Email: ${formData.refereeEmail || 'Not provided'}
Phone: ${formData.refereePhone}

STUDENT CONTACT INFORMATION
Name: ${formData.studentFirstName} ${formData.studentLastName}
Address: ${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}
City: ${formData.city}, ${formData.state} ${formData.zip}
Email: ${formData.studentEmail || 'Not provided'}
Phone: ${formData.studentPhone}

IMMIGRATION INFORMATION
Time in US: ${formData.immigrationTime}
Year Arrived: ${formData.yearArrived || 'Not provided'}
Current Age: ${formData.currentAge}
Status/Visa Type: ${formData.visaStatus || 'Not provided'}

LEARNING INFORMATION
Has WhatsApp: ${formData.hasWhatsapp}
Native Language: ${formData.nativeLanguage}
English Level: ${formData.englishLevel}

LEARNING GOALS
${formData.learningGoals || 'Not provided'}`;

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
            <p className="font-semibold">Referral Submitted Successfully</p>
            <p className="text-sm text-white/90">Opening WhatsApp...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO - Clean, Professional */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Student Enrollment
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            ESL Referral Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please use this form to refer students within your organization to our ESL Program. 
            All services are provided free of charge.
          </p>
        </div>
      </section>

      {/* PROGRAM BENEFITS */}
      <section className="py-12 bg-white -mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: '100% Free', desc: 'No cost to students' },
              { label: 'Free Childcare', desc: 'Bring your children' },
              { label: 'One-on-One', desc: 'Personalized tutoring' },
              { label: 'Flexible Schedule', desc: 'Learn at your pace' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition">
                <p className="font-bold text-gray-900 text-lg mb-1">{item.label}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-4">
              {['Organization', 'Student Info', 'Learning Details', 'Review'].map((label, idx) => (
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

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Organization of Origin</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name <span className="text-red-500">*</span></label>
                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.organization ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                    {errors.organization && <p className="mt-1 text-sm text-red-500">{errors.organization}</p>}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Referee Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input type="text" name="refereeFirstName" value={formData.refereeFirstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.refereeFirstName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                      {errors.refereeFirstName && <p className="mt-1 text-sm text-red-500">{errors.refereeFirstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" name="refereeLastName" value={formData.refereeLastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.refereeLastName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                      {errors.refereeLastName && <p className="mt-1 text-sm text-red-500">{errors.refereeLastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" name="refereeEmail" value={formData.refereeEmail} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                      <input type="tel" name="refereePhone" value={formData.refereePhone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.refereePhone ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                      {errors.refereePhone && <p className="mt-1 text-sm text-red-500">{errors.refereePhone}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Student Contact Information</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="studentFirstName" value={formData.studentFirstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.studentFirstName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.studentFirstName && <p className="mt-1 text-sm text-red-500">{errors.studentFirstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="studentLastName" value={formData.studentLastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.studentLastName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.studentLastName && <p className="mt-1 text-sm text-red-500">{errors.studentLastName}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
                      <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white mb-3`} placeholder="Street address" />
                      <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" placeholder="Apartment, suite, etc. (optional)" />
                      {errors.addressLine1 && <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <select name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP <span className="text-red-500">*</span></label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.zip ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" name="studentPhone" value={formData.studentPhone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.studentPhone ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.studentPhone && <p className="mt-1 text-sm text-red-500">{errors.studentPhone}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">WhatsApp Access</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Does the Student Have a WhatsApp Account? Are they able to sign up for one if the answer is no? <span className="text-red-500">*</span></label>
                    <div className="space-y-3">
                      {['Yes, has WhatsApp', 'No, but can sign up', 'No, cannot sign up'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:border-brand-primary transition">
                          <input type="radio" name="hasWhatsapp" value={option} checked={formData.hasWhatsapp === option} onChange={handleChange} className="w-4 h-4 text-brand-primary" />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.hasWhatsapp && <p className="mt-2 text-sm text-red-500">{errors.hasWhatsapp}</p>}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Immigration Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Types of immigrants by the time of arrival to the US <span className="text-red-500">*</span></label>
                      <select name="immigrationTime" value={formData.immigrationTime} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.immigrationTime ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`}>
                        {immigrationCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                      </select>
                      {errors.immigrationTime && <p className="mt-1 text-sm text-red-500">{errors.immigrationTime}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year You Came</label>
                        <input type="number" name="yearArrived" value={formData.yearArrived} onChange={handleChange} min="1900" max={new Date().getFullYear()} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" placeholder="e.g., 2019" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Age <span className="text-red-500">*</span></label>
                        <input type="number" name="currentAge" value={formData.currentAge} onChange={handleChange} min="1" max="120" className={`w-full px-4 py-3 rounded-lg border ${errors.currentAge ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.currentAge && <p className="mt-1 text-sm text-red-500">{errors.currentAge}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status/Visa Type</label>
                      <select name="visaStatus" value={formData.visaStatus} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                        {visaTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Learning Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Native Language <span className="text-red-500">*</span></label>
                      <select name="nativeLanguage" value={formData.nativeLanguage} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.nativeLanguage ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`}>
                        <option value="">Select language</option>
                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                      {errors.nativeLanguage && <p className="mt-1 text-sm text-red-500">{errors.nativeLanguage}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current English Level <span className="text-red-500">*</span></label>
                      <select name="englishLevel" value={formData.englishLevel} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.englishLevel ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`}>
                        {englishLevels.map(level => <option key={level.value} value={level.value}>{level.label}</option>)}
                      </select>
                      {errors.englishLevel && <p className="mt-1 text-sm text-red-500">{errors.englishLevel}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Learning Goals</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about the student&apos;s goals, background, and any special needs</label>
                    <textarea name="learningGoals" value={formData.learningGoals} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white resize-none" placeholder="What does the student want to achieve? (e.g., speak with children's teachers, get a job, pass citizenship test...)" />
                  </div>
                </div>

                <div className="bg-brand-primary/10 rounded-xl p-6 border border-brand-primary/20">
                  <h3 className="font-bold text-gray-900 mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• We will send a WhatsApp message within 24 hours</li>
                    <li>• We will match the student with a suitable tutor</li>
                    <li>• First class will be scheduled at a convenient time</li>
                    <li>• Free childcare is available during all sessions</li>
                  </ul>
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
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Organization</p>
                    <p className="font-medium text-gray-900">{formData.organization}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Referee</p>
                      <p className="font-medium text-gray-900">{formData.refereeFirstName} {formData.refereeLastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Student</p>
                      <p className="font-medium text-gray-900">{formData.studentFirstName} {formData.studentLastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium text-gray-900">{formData.addressLine1}, {formData.city}, {formData.state} {formData.zip}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">English Level</p>
                      <p className="font-medium text-gray-900">{formData.englishLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Language</p>
                      <p className="font-medium text-gray-900">{formData.nativeLanguage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Age</p>
                      <p className="font-medium text-gray-900">{formData.currentAge}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 text-sm">
                    By submitting this form, the referral will be sent via WhatsApp to our ESL coordinator. 
                    Please ensure all information is accurate before submitting.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Submit Referral'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Who is eligible for ESL classes?', a: 'Our ESL program is open to refugee and immigrant women of all English levels. We prioritize those who have been in the US for less than 10 years.' },
              { q: 'How much do classes cost?', a: 'All our ESL classes are 100% free. There is no cost to students, ever.' },
              { q: 'Can I bring my children?', a: 'Yes, we provide free childcare during all ESL sessions so mothers can focus on learning.' },
              { q: 'How long are the classes?', a: 'Classes are typically 1-2 hours, once or twice per week, scheduled at times that work for you.' },
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
        subtitle="Get updates on our ESL programs and success stories"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
