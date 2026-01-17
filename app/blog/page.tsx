import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-brand-text mb-8">
        Coming Soon
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        This page is under construction.
      </p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}
