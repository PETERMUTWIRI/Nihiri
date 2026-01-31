'use client';

import Link from 'next/link';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-brand-background pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Accessibility Statement
          </h1>
          <p className="text-gray-600">
            Our commitment to digital accessibility for all
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            
            <p className="text-xl text-gray-600 mb-8">
              New International Hope for Refugees and Immigrants is committed to ensuring digital accessibility 
              for people with disabilities. We are continually improving the user experience for everyone and 
              applying the relevant accessibility standards.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Commitment</h2>
            <p className="mb-4">
              We believe that everyone deserves equal access to information and services. As an organization 
              serving refugee and immigrant communities, we understand the importance of removing barriers 
              and creating inclusive digital experiences.
            </p>
            <p className="mb-4">
              We are committed to making our website accessible to the widest possible audience, regardless 
              of technology or ability. This includes people with visual, auditory, cognitive, and motor disabilities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Conformance Status</h2>
            <p className="mb-4">
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers 
              to improve accessibility for people with disabilities. It defines three levels of conformance:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Level A (minimum)</li>
              <li>Level AA (mid-range)</li>
              <li>Level AAA (highest)</li>
            </ul>
            <p className="mb-4">
              New International Hope strives to conform to <strong>WCAG 2.1 Level AA</strong> standards. 
              We are continuously working to improve the accessibility of our website and services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Accessibility Features</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Visual Design</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Sufficient color contrast between text and background</li>
              <li>Text that can be resized up to 200% without loss of content or functionality</li>
              <li>Clear, readable fonts and consistent layout</li>
              <li>Information not conveyed by color alone</li>
              <li>Responsive design that works on all device sizes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Navigation</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Logical heading structure for easy navigation</li>
              <li>Skip links to bypass repetitive content</li>
              <li>Consistent navigation throughout the site</li>
              <li>Keyboard-accessible interactive elements</li>
              <li>Visible focus indicators for keyboard users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Content</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Alternative text for images</li>
              <li>Descriptive link text</li>
              <li>Form labels and instructions</li>
              <li>Error identification and suggestions</li>
              <li>Plain language content where possible</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Multimedia</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Captions for video content</li>
              <li>Transcripts for audio content</li>
              <li>Controls to pause, stop, or hide moving content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Assistive Technology Compatibility</h2>
            <p className="mb-4">
              Our website is designed to be compatible with commonly used assistive technologies, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Alternative input devices</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Limitations and Alternatives</h2>
            <p className="mb-4">
              Despite our best efforts to ensure accessibility of our website, there may be some limitations. 
              Below is a description of known limitations and potential solutions:
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Third-Party Content</h3>
              <p className="text-sm text-gray-700">
                Some third-party content or embedded features may not fully meet our accessibility standards. 
                We are working with these providers to improve accessibility.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Alternative Formats</h3>
              <p className="text-sm text-gray-700">
                If you need information in an alternative format (large print, Braille, audio recording), 
                please contact us and we will accommodate your request.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Feedback and Contact</h2>
            <p className="mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter accessibility 
              barriers or have suggestions for improvement, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="mb-1"><strong>Email:</strong> <a href="mailto:info@nihri.com" className="text-brand-primary hover:underline">info@nihri.com</a></p>
              <p className="mb-1"><strong>Phone:</strong> +(203) 675-9395</p>
              <p><strong>Address:</strong> 475 Elm St., New Haven, CT 06511</p>
            </div>

            <p className="mb-4">
              We aim to respond to accessibility feedback within 2 business days and will work to address 
              any issues as quickly as possible.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Formal Complaints</h2>
            <p className="mb-4">
              If you are not satisfied with our response to your accessibility concern, you have the right 
              to file a formal complaint. Please submit your complaint in writing to:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="mb-1"><strong>Accessibility Coordinator</strong></p>
              <p className="mb-1">New International Hope for Refugees and Immigrants</p>
              <p className="mb-1">475 Elm St.</p>
              <p className="mb-1">New Haven, CT 06511</p>
              <p>Email: <a href="mailto:info@nihri.com" className="text-brand-primary hover:underline">info@nihri.com</a></p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Enforcement Procedure</h2>
            <p className="mb-4">
              New International Hope takes accessibility seriously. We have established an internal enforcement 
              procedure to ensure accessibility concerns are addressed promptly and effectively. This includes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Regular accessibility audits of our website</li>
              <li>Staff training on accessibility best practices</li>
              <li>Integration of accessibility into our design and development process</li>
              <li>Clear escalation path for unresolved accessibility issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">External Resources</h2>
            <p className="mb-4">
              For additional information and resources on web accessibility, we recommend:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">W3C Web Accessibility Initiative (WAI)</a></li>
              <li><a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">ADA.gov</a></li>
              <li><a href="https://webaim.org/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">WebAIM</a></li>
              <li><a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Section508.gov</a></li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Statement Updates</h2>
            <p className="mb-4">
              This Accessibility Statement was last updated on January 2025. We regularly review and update 
              this statement as we continue to improve the accessibility of our website.
            </p>

            <div className="bg-brand-primary/10 rounded-xl p-6 mt-12 border border-brand-primary/20">
              <p className="text-gray-800 font-medium">
                Our commitment to accessibility is ongoing. We believe that by working together, 
                we can create a more inclusive digital environment for everyone in our community.
              </p>
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
