import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
  trailingSlash: true,
};

export default nextConfig;
