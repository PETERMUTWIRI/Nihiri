import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is under construction.
        </p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
