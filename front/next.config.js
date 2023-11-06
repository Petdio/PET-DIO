/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: ["app-build-manifest.json"],
});
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: false,
  runtimeCaching,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: "/:path*/user",
        destination: `${process.env.NEXT_PUBLIC_API_URL}user`,
      },
      {
        source: "/concept/list",
        destination: `${process.env.NEXT_PUBLIC_API_URL}concept/list`,
      },
      {
        source: "/album/list",
        destination: `${process.env.NEXT_PUBLIC_API_URL}album/list`,
      },
      {
        source: "/ai/create",
        destination: `${process.env.NEXT_PUBLIC_API_URL}ai/create`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.displate.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prompthero.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.leonardo.ai",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "k9a206.p.ssafy.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "petdio-s3.s3-ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
