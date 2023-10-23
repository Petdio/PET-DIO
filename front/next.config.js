/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  runtimeCaching,
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
    ],
  },
});
