'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function OurStory() {
  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-brand-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-10">
          <span className="text-cyan-600 font-semibold uppercase tracking-wide text-sm">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
            Who We Are
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                <strong className="text-gray-900">New International Hope for Refugees and Immigrants</strong> is a 501(c)3 non-profit organization created to give hope to those who are in need. Whether you are moving to find a new home or forced to leave your home, we are here to help.
              </p>
              <p>
                We offer services to help <strong className="text-gray-900">Translate, Job training, Mentor youth, Case management & Rights advocacy, English Literacy, and Health Management</strong>. We provide Resources to all!
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/history"
                className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold group transition-colors"
              >
                Our Full History
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
