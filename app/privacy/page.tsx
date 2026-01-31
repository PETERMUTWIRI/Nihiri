'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Privacy Policy
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
              New International Hope for Refugees and Immigrants (NIHRI) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Personal Information</h3>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Fill out contact forms or referral forms</li>
              <li>Apply to volunteer</li>
              <li>Subscribe to our newsletter</li>
              <li>Make a donation</li>
              <li>Contact us via email or phone</li>
            </ul>
            <p className="mb-4">
              This information may include your name, email address, phone number, mailing address, 
              and other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Non-Personal Information</h3>
            <p className="mb-4">
              We may automatically collect certain non-personal information when you visit our website, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide and improve our services to refugees and immigrants</li>
              <li>Process volunteer applications</li>
              <li>Respond to your inquiries and communicate with you</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Process donations and maintain donor records</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              As a 501(c)(3) nonprofit organization, we respect your privacy and do not sell, trade, 
              or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist us in operating our website and delivering services</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us at <a href="mailto:info@nihri.com" className="text-brand-primary hover:underline">info@nihri.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Cookies and Tracking</h2>
            <p className="mb-4">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
              You can set your browser to refuse cookies, but this may affect the functionality of our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new policy on this page with an updated date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4">
              <p className="mb-1"><strong>New International Hope for Refugees and Immigrants</strong></p>
              <p className="mb-1">475 Elm St.</p>
              <p className="mb-1">New Haven, CT 06511</p>
              <p className="mb-1">Email: <a href="mailto:info@nihri.com" className="text-brand-primary hover:underline">info@nihri.com</a></p>
              <p>Phone: +(203) 675-9395</p>
            </div>

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
