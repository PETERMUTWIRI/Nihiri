import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          Support Nihri's Hope
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Your donation helps us continue our mission to support the community.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <iframe
            src="https://givebutter.com/embed/c/10011"
            width="100%"
            height="600"
            style={{ border: 'none' }}
            title="Donate to Nihri's Hope"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
