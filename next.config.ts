import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  /* config options here */
   eslint: {
        ignoreDuringBuilds: true,
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3nvnebfanoina0ww.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 85, 90, 100],
  },
}

export default withNextIntl(nextConfig);
