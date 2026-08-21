/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/distribution', destination: '/about', permanent: true },
    ];
  },
};

module.exports = nextConfig;
