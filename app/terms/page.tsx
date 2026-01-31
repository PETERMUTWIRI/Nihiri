'use client';

import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the New International Hope for Refugees and Immigrants (NIHRI) website. 
              By accessing or using our website, you agree to be bound by these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, 
              please do not use our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. About Our Organization</h2>
            <p className="mb-4">
              New International Hope for Refugees and Immigrants is a 501(c)(3) nonprofit organization dedicated to 
              empowering refugee and immigrant families with education, health navigation, and advocacy services. 
              All services provided through our website are offered free of charge to eligible individuals.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Use of Website</h2>
            <p className="mb-4">
              You agree to use our website only for lawful purposes and in a manner that:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Does not violate any applicable federal, state, or local laws</li>
              <li>Does not infringe upon the rights of others</li>
              <li>Does not interfere with the operation of the website</li>
              <li>Does not attempt to gain unauthorized access to any portion of the website</li>
              <li>Does not transmit any harmful code, viruses, or malware</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and software, 
              is the property of New International Hope for Refugees and Immigrants or its content suppliers and is 
              protected by United States and international copyright laws.
            </p>
            <p className="mb-4">
              You may:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>View and download content for personal, non-commercial use</li>
              <li>Share content with proper attribution to NIHRI</li>
            </ul>
            <p className="mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Reproduce, distribute, or modify content without written permission</li>
              <li>Use content for commercial purposes without authorization</li>
              <li>Remove any copyright or proprietary notices from materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Donations</h2>
            <p className="mb-4">
              All donations made through our website are voluntary and non-refundable. As a 501(c)(3) organization, 
              donations may be tax-deductible to the extent allowed by law. Donors will receive a receipt for tax purposes.
            </p>
            <p className="mb-4">
              We commit to using all donations responsibly and in accordance with our mission. However, we reserve 
              the right to allocate funds where they are most needed.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Volunteer Applications</h2>
            <p className="mb-4">
              By submitting a volunteer application, you:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Confirm that all information provided is accurate and truthful</li>
              <li>Consent to a background check if required for your volunteer position</li>
              <li>Understand that volunteer positions are unpaid</li>
              <li>Agree to follow our volunteer policies and code of conduct</li>
              <li>Understand that submission of an application does not guarantee acceptance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Service Referrals</h2>
            <p className="mb-4">
              Our ESL and health referral forms are provided to connect eligible individuals with our services. By submitting a referral:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You confirm that the information provided is accurate to the best of your knowledge</li>
              <li>You have obtained consent from the individual being referred (if applicable)</li>
              <li>You understand that submission does not guarantee service provision</li>
              <li>You agree to our eligibility requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4">
              This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. New International Hope makes no 
              representations or warranties of any kind, express or implied, regarding the operation of the website 
              or the information, content, materials, or services included on the website.
            </p>
            <p className="mb-4">
              To the full extent permissible by applicable law, we disclaim all warranties, express or implied, 
              including but not limited to implied warranties of merchantability and fitness for a particular purpose.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              New International Hope shall not be liable for any damages of any kind arising from the use of this website, 
              including but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>
            <p className="mb-4">
              This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless New International Hope, its officers, directors, 
              employees, agents, and volunteers from and against any claims, liabilities, damages, losses, and expenses 
              arising out of or in any way connected with your access to or use of the website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of 
              Connecticut, without regard to its conflict of law provisions. Any legal action arising out of or relating 
              to these terms shall be filed only in the state or federal courts located in New Haven County, Connecticut.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
              upon posting to the website. Your continued use of the website after any changes indicates your acceptance 
              of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">13. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions 
              shall remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4">
              <p className="mb-1"><strong>New International Hope for Refugees and Immigrants</strong></p>
              <p className="mb-1">475 Elm St.</p>
              <p className="mb-1">New Haven, CT 06511</p>
              <p className="mb-1">Email: <a href="mailto:info@nihri.com" className="text-brand-primary hover:underline">info@nihri.com</a></p>
              <p>Phone: +(203) 675-9395</p>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
