import type { NextConfig } from 'next';

const ALLOWED_ORIGIN = 'https://www.digitallynext.com';

const securityHeaders = [
  // Enforce HTTPS for 2 years, including subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking — only allow framing from same origin
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Limit referrer info sent cross-origin
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser feature access
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Content Security Policy — blocks inline scripts from external origins
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://core.sanity-cdn.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      `img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://images.pexels.com https://*.cdninstagram.com https://*.fbcdn.net https://flagcdn.com https://s.wordpress.com https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms ${ALLOWED_ORIGIN}`,
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io https://*.cdninstagram.com https://*.fbcdn.net https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
      "frame-src 'self' https://www.instagram.com https://instagram.com https://www.linkedin.com https://linkedin.com https://gajnaoverseas.com https://www.gajnaoverseas.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Allow local network devices (phones, tablets on same WiFi) to access the dev server
  allowedDevOrigins: ['192.168.29.103'],

  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
