/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevents the site from being framed by another origin
          // (clickjacking protection). Nothing on this site needs to be
          // embedded in an iframe.
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stops the browser from guessing a response's content type away
          // from what the server declared.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Sends the full URL only to same-origin requests; cross-origin
          // requests get just the origin, not the full path/query.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Tells browsers to always use HTTPS for this domain, including
          // subdomains, once they've seen it once (Vercel already redirects
          // HTTP to HTTPS; this makes that guarantee stick client-side too).
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // This site never needs camera/microphone/location access.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
