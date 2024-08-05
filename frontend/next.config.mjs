// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
