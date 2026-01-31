'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  gender: string;
  healthIssue: string;
  urgencyLevel: string;
  preferredLanguage: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

const urgencyLevels = [
  { value: '', label: 'Select urgency level' },
  { value: 'Emergency', label: 'Emergency - Immediate attention needed' },
  { value: 'Moderate', label: 'Moderate - Within 24-48 hours' },
  { value: 'Routine', label: 'Routine - Scheduled appointment' },
];

const languages = [
  'Arabic',
  'Pashto',
  'Dari',
  'Farsi',
  'English',
  'Other',
];

const states = [
  'CT', 'NY', 'NJ', 'MA', 'RI', 'Other'
];

export default function HealthReferralPage() {
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
    gender: '',
    healthIssue: '',
    urgencyLevel: '',
    preferredLanguage: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.refereeFirstName.trim()) {
      newErrors.refereeFirstName = 'First name is required';
    }

    if (!formData.refereeLastName.trim()) {
      newErrors.refereeLastName = 'Last name is required';
    }

    if (!formData.refereePhone.trim()) {
      newErrors.refereePhone = 'Phone number is required';
    }

    if (!formData.studentFirstName.trim()) {
      newErrors.studentFirstName = 'First name is required';
    }

    if (!formData.studentLastName.trim()) {
      newErrors.studentLastName = 'Last name is required';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    }

    if (!formData.studentPhone.trim()) {
      newErrors.studentPhone = 'Phone number is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.healthIssue.trim()) {
      newErrors.healthIssue = 'Health issue description is required';
    }

    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = 'Urgency level is required';
    }

    if (!formData.preferredLanguage) {
      newErrors.preferredLanguage = 'Preferred language is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const message = `HEALTH REFERRAL SUBMISSION

URGENCY: ${formData.urgencyLevel.toUpperCase()}

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
Gender: ${formData.gender}
Preferred Language: ${formData.preferredLanguage}

HEALTH CONCERN
${formData.healthIssue}

ADDITIONAL NOTES
${formData.additionalNotes || 'None provided'}`;

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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency':
        return 'bg-red-50 border-red-400';
      case 'Moderate':
        return 'bg-orange-50 border-orange-400';
      case 'Routine':
        return 'bg-green-50 border-green-400';
      default:
        return 'bg-gray-50 border-gray-200';
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
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <div>
              <p className="font-semibold">Referral Submitted Successfully</p>
              <p className="text-sm text-white/90">Opening WhatsApp...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/programs/health5.png"
            alt="Healthcare support"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 pt-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Health Referral Form
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Please use this form to refer clients within your organization to our health classes and child wellness programs.
            </p>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY REQUIREMENTS */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Eligibility Requirements
            </h2>
            <p className="text-gray-700 mb-4">
              Before continuing, please ensure that your client meets our requirements for the services we are offering:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>The client must be a <strong>female</strong> of <strong>refugee/immigrant status</strong> of the United States</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Reside ideally within <strong>New Haven County</strong> or within the state of <strong>Connecticut</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Must predominantly speak <strong>Arabic, Pashto, Dari, or Farsi</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* REFERRAL FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* ORGANIZATION OF ORIGIN */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Organization of Origin
              </h2>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.organization ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                  placeholder="Enter organization name"
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-500">{errors.organization}</p>
                )}
              </div>
            </div>

            {/* REFEREE INFORMATION */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Referee&apos;s Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="refereeFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="refereeFirstName"
                    name="refereeFirstName"
                    value={formData.refereeFirstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.refereeFirstName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                  />
                  {errors.refereeFirstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.refereeFirstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="refereeLastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="refereeLastName"
                    name="refereeLastName"
                    value={formData.refereeLastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.refereeLastName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                  />
                  {errors.refereeLastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.refereeLastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="refereeEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="refereeEmail"
                    name="refereeEmail"
                    value={formData.refereeEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="refereePhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="refereePhone"
                    name="refereePhone"
                    value={formData.refereePhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.refereePhone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                  />
                  {errors.refereePhone && (
                    <p className="mt-1 text-sm text-red-500">{errors.refereePhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* URGENCY LEVEL */}
            <div className={`p-8 rounded-lg border-2 transition-colors ${getUrgencyColor(formData.urgencyLevel)}`}>
              <h2 className="text-xl font-semibold mb-6">
                Urgency Level <span className="text-red-500">*</span>
              </h2>
              <select
                id="urgencyLevel"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.urgencyLevel ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
              >
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {errors.urgencyLevel && (
                <p className="mt-2 text-sm text-red-600">{errors.urgencyLevel}</p>
              )}

              {formData.urgencyLevel === 'Emergency' && (
                <div className="mt-4 p-4 bg-red-100 rounded-lg border border-red-300">
                  <p className="font-semibold text-red-800">Emergency Referral Selected</p>
                  <p className="text-sm text-red-700 mt-1">
                    Our team will prioritize this referral and contact you within 1-2 hours. 
                    For life-threatening emergencies, please call 911 immediately.
                  </p>
                </div>
              )}
            </div>

            {/* STUDENT CONTACT INFORMATION */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Student&apos;s Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="studentFirstName"
                      name="studentFirstName"
                      value={formData.studentFirstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.studentFirstName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    />
                    {errors.studentFirstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.studentFirstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="studentLastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="studentLastName"
                      name="studentLastName"
                      value={formData.studentLastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.studentLastName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    />
                    {errors.studentLastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.studentLastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    placeholder="Street address"
                  />
                  {errors.addressLine1 && (
                    <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
                    >
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.zip ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="studentPhone"
                      name="studentPhone"
                      value={formData.studentPhone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.studentPhone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                    />
                    {errors.studentPhone && (
                      <p className="mt-1 text-sm text-red-500">{errors.studentPhone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.gender === option}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white`}
                  >
                    <option value="">Select language</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  {errors.preferredLanguage && (
                    <p className="mt-1 text-sm text-red-500">{errors.preferredLanguage}</p>
                  )}
                </div>
              </div>
            </div>

            {/* HEALTH INFORMATION */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Health Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="healthIssue" className="block text-sm font-medium text-gray-700 mb-2">
                    Health Issue / Concern <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="healthIssue"
                    name="healthIssue"
                    value={formData.healthIssue}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.healthIssue ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white resize-none`}
                    placeholder="Describe the health concern, symptoms, and any relevant medical history..."
                  />
                  {errors.healthIssue && (
                    <p className="mt-1 text-sm text-red-500">{errors.healthIssue}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white resize-none"
                    placeholder="Any additional information that might be helpful (insurance status, transportation needs, etc.)"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT SECTION */}
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Ready to Submit?</h3>
                  <p className="text-sm text-gray-600">
                    Your referral will be sent directly to our health team for immediate review.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit Referral'
                  )}
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              <span className="text-red-500">*</span> indicates required fields. 
              All information is kept confidential and used solely for care coordination.
            </p>
          </form>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Referral Process
            </h2>
            <p className="text-lg text-gray-600">
              What happens after you submit a referral
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit', desc: 'Complete and submit the referral form' },
              { step: '2', title: 'Review', desc: 'Our team reviews and assigns priority' },
              { step: '3', title: 'Contact', desc: 'We reach out within hours based on urgency' },
              { step: '4', title: 'Care', desc: 'Services are coordinated and delivered' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-xl text-white/90 mb-6">
            For questions about referrals or our health services, please contact us.
          </p>
          <a 
            href="tel:+12036759395" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Call (203) 675-9395
          </a>
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
