import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
  /* config options here */
   transpilePackages: ["@aws-sdk/client-s3"],
   eslint: {
        ignoreDuringBuilds: true,
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_R2_PUBLIC_URL ? new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL).hostname : process.env.NEXT_PUBLIC_R2_PUBLIC_URL ? new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL).hostname : 'pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev',
        port: '',
        pathname: '/**',
      },
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
