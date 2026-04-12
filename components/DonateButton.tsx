'use client';

import Link from 'next/link';

export default function DonateButton() {
  return (
    <Link 
      href="/donate"
      className="bg-brand-primary hover:bg-brand-dark text-brand-text px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 text-sm inline-block"
    >
      Donate
    </Link>
  );
}
