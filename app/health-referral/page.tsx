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
  patientFirstName: string;
  patientLastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: string;
  patientGender: string;
  preferredLanguage: string;
  urgencyLevel: string;
  healthIssue: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

const WHATSAPP_NUMBER = '+254713064026';

const urgencyLevels = [
  { value: '', label: 'Select urgency level' },
  { value: 'Emergency', label: 'Emergency - Immediate attention needed' },
  { value: 'Moderate', label: 'Moderate - Within 24-48 hours' },
  { value: 'Routine', label: 'Routine - Scheduled appointment' },
];

const languages = [
  'Arabic', 'Pashto', 'Dari', 'Farsi', 'Spanish', 'Haitian Creole',
  'Swahili', 'French', 'English', 'Other'
];

const states = ['CT', 'NY', 'NJ', 'MA', 'RI', 'Other'];

export default function HealthReferralPage() {
  const [formData, setFormData] = useState<FormData>({
    organization: '',
    refereeFirstName: '',
    refereeLastName: '',
    refereeEmail: '',
    refereePhone: '',
    patientFirstName: '',
    patientLastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'CT',
    zip: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    patientGender: '',
    preferredLanguage: '',
    urgencyLevel: '',
    healthIssue: '',
    additionalNotes: '',
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
    }

    if (step === 2) {
      if (!formData.patientFirstName.trim()) newErrors.patientFirstName = 'First name is required';
      if (!formData.patientLastName.trim()) newErrors.patientLastName = 'Last name is required';
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zip.trim()) newErrors.zip = 'ZIP is required';
      if (!formData.patientPhone.trim()) newErrors.patientPhone = 'Phone is required';
      if (!formData.patientGender) newErrors.patientGender = 'Gender is required';
    }

    if (step === 3) {
      if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';
      if (!formData.healthIssue.trim()) newErrors.healthIssue = 'Health issue is required';
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

    const message = `HEALTH REFERRAL SUBMISSION

URGENCY: ${formData.urgencyLevel.toUpperCase()}

ORGANIZATION OF ORIGIN
Organization: ${formData.organization}

REFEREE INFORMATION
Name: ${formData.refereeFirstName} ${formData.refereeLastName}
Email: ${formData.refereeEmail || 'Not provided'}
Phone: ${formData.refereePhone}

PATIENT INFORMATION
Name: ${formData.patientFirstName} ${formData.patientLastName}
Age: ${formData.patientAge || 'Not provided'}
Gender: ${formData.patientGender}
Language: ${formData.preferredLanguage || 'Not specified'}

Address: ${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}
City: ${formData.city}, ${formData.state} ${formData.zip}
Email: ${formData.patientEmail || 'Not provided'}
Phone: ${formData.patientPhone}

HEALTH CONCERN
${formData.healthIssue}

ADDITIONAL NOTES
${formData.additionalNotes || 'None provided'}`;

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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency': return 'bg-red-50 border-red-300';
      case 'Moderate': return 'bg-orange-50 border-orange-300';
      case 'Routine': return 'bg-green-50 border-green-300';
      default: return 'bg-gray-50 border-gray-200';
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
            <p className="font-semibold">Referral Submitted Successfully</p>
            <p className="text-sm text-white/90">Opening WhatsApp...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO - Clean, Professional */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block bg-brand-primary/20 text-brand-text px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Health Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Health Referral Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please use this form to refer clients within your organization to our health classes 
            and child wellness programs. Our team responds based on urgency level.
          </p>
        </div>
      </section>

      {/* ELIGIBILITY & EMERGENCY NOTICE */}
      <section className="py-12 bg-white -mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligibility */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="font-bold text-gray-900 mb-4">Eligibility Requirements</h2>
              <p className="text-gray-600 text-sm mb-4">
                Before submitting, please ensure your client meets our requirements:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Female of refugee/immigrant status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Reside in New Haven County or Connecticut</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Predominantly speak Arabic, Pashto, Dari, or Farsi</span>
                </li>
              </ul>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h2 className="font-bold text-red-900 mb-4">Medical Emergency?</h2>
              <p className="text-red-700 text-sm mb-4">
                This referral form is for non-emergency health navigation only.
              </p>
              <p className="text-red-800 font-semibold">
                If this is a life-threatening emergency, call 911 immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-16 bg-brand-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-4">
              {['Referee', 'Patient', 'Health Info', 'Review'].map((label, idx) => (
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
            {/* STEP 1 - REFEREE INFO */}
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

                <div className="flex justify-end">
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 2 - PATIENT INFO */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Patient Contact Information</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.patientFirstName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.patientFirstName && <p className="mt-1 text-sm text-red-500">{errors.patientFirstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.patientLastName ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.patientLastName && <p className="mt-1 text-sm text-red-500">{errors.patientLastName}</p>}
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
                        <input type="email" name="patientEmail" value={formData.patientEmail} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" name="patientPhone" value={formData.patientPhone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.patientPhone ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`} />
                        {errors.patientPhone && <p className="mt-1 text-sm text-red-500">{errors.patientPhone}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                        <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                          <option value="">Select language</option>
                          {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Gender <span className="text-red-500">*</span></label>
                      <div className="flex gap-6">
                        {['Male', 'Female', 'Other'].map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="patientGender" value={option} checked={formData.patientGender === option} onChange={handleChange} className="w-4 h-4 text-brand-primary" />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.patientGender && <p className="mt-2 text-sm text-red-500">{errors.patientGender}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={handleBack} className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Back</button>
                  <button type="button" onClick={handleNext} className="px-8 py-4 bg-brand-primary hover:bg-brand-dark text-brand-text font-semibold rounded-lg transition shadow-lg">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 3 - HEALTH INFO */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className={`p-6 rounded-xl border-2 ${getUrgencyColor(formData.urgencyLevel)}`}>
                  <h2 className="font-bold text-gray-900 mb-4">Urgency Level <span className="text-red-500">*</span></h2>
                  <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.urgencyLevel ? 'border-red-500' : 'border-gray-300'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white`}>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                  {errors.urgencyLevel && <p className="mt-2 text-sm text-red-600">{errors.urgencyLevel}</p>}
                  
                  {formData.urgencyLevel === 'Emergency' && (
                    <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-200">
                      <p className="font-semibold text-red-800">Emergency Referral Selected</p>
                      <p className="text-sm text-red-700 mt-1">Our team will prioritize this referral and contact you within 1-2 hours.</p>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Health Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Health Issue / Concern <span className="text-red-500">*</span></label>
                      <textarea name="healthIssue" value={formData.healthIssue} onChange={handleChange} rows={5} className={`w-full px-4 py-3 rounded-lg border ${errors.healthIssue ? 'border-red-500' : 'border-gray-200'} focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white resize-none`} placeholder="Describe the health concern, symptoms, and any relevant medical history..." />
                      {errors.healthIssue && <p className="mt-1 text-sm text-red-500">{errors.healthIssue}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                      <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white resize-none" placeholder="Insurance status, transportation needs, etc." />
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary/10 rounded-xl p-6 border border-brand-primary/20">
                  <h3 className="font-bold text-gray-900 mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• We will review the referral within hours based on urgency</li>
                    <li>• Our health team will assign a navigator</li>
                    <li>• We will contact the patient to coordinate care</li>
                    <li>• Services will be arranged including interpretation if needed</li>
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
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Review Your Referral</h2>
                
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
                      <p className="text-sm text-gray-500 mb-1">Patient</p>
                      <p className="font-medium text-gray-900">{formData.patientFirstName} {formData.patientLastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium text-gray-900">{formData.addressLine1}, {formData.city}, {formData.state} {formData.zip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Urgency Level</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      formData.urgencyLevel === 'Emergency' ? 'bg-red-100 text-red-800' :
                      formData.urgencyLevel === 'Moderate' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>{formData.urgencyLevel}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 text-sm">
                    By submitting this form, the referral will be sent via WhatsApp to our health team. 
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
              { q: 'Who is eligible for health services?', a: 'We serve female refugees and immigrants residing in Connecticut who predominantly speak Arabic, Pashto, Dari, or Farsi.' },
              { q: 'How quickly will you respond?', a: 'Emergency referrals: 1-2 hours. Moderate: 24 hours. Routine: 48 hours.' },
              { q: 'Are services free?', a: 'Yes, all our health navigation and education services are completely free.' },
              { q: 'Do you provide interpretation?', a: 'Yes, professional interpretation is provided for all health education sessions.' },
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
        title="Stay Informed"
        subtitle="Get updates on our health programs"
        placeholder="Enter your email"
        buttonText="Subscribe"
      />
    </div>
  );
}
