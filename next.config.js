/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect old URLs to new ones if needed
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
      // Handle common typos or alternative URLs
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Clean URLs for specific sections if needed
      {
        source: '/about',
        destination: '/about-us',
      },
    ];
  }
};

module.exports = nextConfig;