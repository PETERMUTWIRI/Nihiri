/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Redirects for old event routes
  async redirects() {
    return [
      {
        source: '/events/upcoming',
        destination: '/events',
        permanent: true, // 301 for SEO
      },
    ];
  },
};

module.exports = nextConfig;