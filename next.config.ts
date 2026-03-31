import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Allow local network devices (phones, tablets on same WiFi) to access the dev server
  // This unblocks HMR (hot reload) for cross-origin requests from your LAN IP
  allowedDevOrigins: ['192.168.29.103'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
