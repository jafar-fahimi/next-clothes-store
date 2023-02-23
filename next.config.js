/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ["i.ibb.co", "files.stripe.com"],
  },
};

module.exports = nextConfig;
