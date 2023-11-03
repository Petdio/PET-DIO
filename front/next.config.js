/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: false,
  buildExcludes: [/app-build-manifest.json$/],
  exclude: [
    // add buildExcludes here
    ({ asset, compilation }) => {
      if (
        asset.name.startsWith("server/") ||
        asset.name.match(
          /^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/
        )
      ) {
        return true;
      }
      if (isDev && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    },
  ],
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
    ],
  },
});
