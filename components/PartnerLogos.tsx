'use client';

import Image from 'next/image';

const partners = [
  { name: 'Read to Grow', src: '/images/partner/read-to-grow.png' },
  { name: 'Yale New Haven Health', src: '/images/partner/yale-new-haven-health.png' },
  { name: 'Refugee Congress', src: '/images/partner/refugee-congress.png' },
  { name: 'Neighbours for Refugees', src: '/images/partner/neighbours-for-refugees.png' },
  { name: 'Southern Connecticut State University', src: '/images/partner/southern-conecticut-state-university.png' },
  { name: 'Blossom Hill Foundation', src: '/images/partner/blossom-hill.png' },
  { name: 'Dwight Hall at Yale', src: '/images/partner/dwight-halt-yale.png' },
  { name: 'Cornerstone', src: '/images/partner/conerstone.png' },
  { name: 'Elena\'s Light', src: '/images/partner/elena-lights.png' },
  { name: 'UniteCT', src: '/images/partner/uniteCT.png' },
  { name: 'Havenly Treats', src: '/images/partner/havenly-treats.png' },
  { name: 'Hello Neighbor', src: '/images/partner/hello-neibour.png' },
  { name: 'Yale School of Public Health', src: '/images/partner/yale-school-of-public-health.png' },
];

export default function PartnerLogos() {
  // Double the partners for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex animate-scroll-left">
        {allPartners.map((partner, idx) => (
          <div 
            key={`${partner.name}-${idx}`}
            className="flex-shrink-0 mx-6 flex items-center justify-center"
            style={{ minWidth: '120px', maxWidth: '160px' }}
          >
            {/* White background wrapper for consistent appearance */}
            <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src={partner.src}
                alt={partner.name}
                width={140}
                height={60}
                className="max-h-10 w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
