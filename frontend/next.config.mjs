/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    CLIENT_ENV: process.env.CLIENT_ENV,
    REDIRECT_URL: process.env.REDIRECT_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  output: "export", // 정적 사이트 생성을 위한 설정
  exportPathMap: async function (
    defaultPathMap, // Next.js가 기본적으로 생성하는 경로 맵
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      ...defaultPathMap, // 기본 경로 맵을 포함
      "/oauth/code/kakao/test": { page: "/oauth/code/kakao/test" }, // 추가 경로 정의
    };
  },
};

export default nextConfig;
