/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["cheerio", "p-limit"],
  },
  reactStrictMode: true,
};

export default nextConfig;
