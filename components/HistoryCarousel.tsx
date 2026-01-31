'use client';

import Image from 'next/image';

const IMAGES = [
  { src: 'history-01-hero.jpeg', alt: 'Jane Kinity with community members' },
  { src: 'history-02-jane-kitchen.jpg', alt: 'Early ESL classes in Jane\'s kitchen' },
  { src: 'history-03-first-esl.jpg', alt: 'First ESL class' },
  { src: 'history-04-501c3.jpg', alt: 'Organization founding' },
  { src: 'history-05-health-nav.jpg', alt: 'Health navigation program' },
  { src: 'history-06-world-refugee-day.jpg', alt: 'World Refugee Day celebration' },
  { src: 'history-07-youth-circle.jpg', alt: 'Youth program' },
  { src: 'history-08-board-2020.jpg', alt: 'Board members' },
  { src: 'history-09-award-ceremony.jpg', alt: 'Award ceremony' },
  { src: 'history-10-future-mural.jpg', alt: 'Community mural' },
];

export default function HistoryCarousel() {
  // Double the images for seamless loop
  const allImages = [...IMAGES, ...IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex animate-scroll-left">
        {allImages.map((img, idx) => (
          <div 
            key={`${img.src}-${idx}`}
            className="flex-shrink-0 w-48 h-32 mx-2 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={`/images/history/${img.src}`}
              alt={img.alt}
              width={192}
              height={128}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
