'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const SLIDES = [
  'history-01-hero.jpeg',
  'history-02-jane-kitchen.jpg',
  'history-03-first-esl.jpg',
  'history-04-501c3.jpg',
  'history-05-health-nav.jpg',
  'history-06-world-refugee-day.jpg',
  'history-07-youth-circle.jpg',
  'history-08-board-2020.jpg',
  'history-09-award-ceremony.jpg',
  'history-10-future-mural.jpg',
];

export default function HistoryCarousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<'l' | 'r'>('r');

  const next = () => { setDir('r'); setIdx((i) => (i + 1) % SLIDES.length); };
  const prev = () => { setDir('l'); setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length); };

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
      {/* Images */}
      <div className="relative w-full h-full">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
                src={`/images/history/${src}`}
                alt={`History slide ${i + 1}`}
                fill
                className="object-cover object-center"   // ← NEW: keep heads, crop sides
                priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-content-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 grid place-content-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        aria-label="Next"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 'r' : 'l'); setIdx(i); }}
            className={`w-2.5 h-2.5 rounded-full transition ${i === idx ? 'bg-brand-primary scale-125' : 'bg-white/60 hover:bg-white'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}