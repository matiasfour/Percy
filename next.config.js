/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  dirs: ["components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  env: {
    API_URL: process.env.API_URL,
  }
};

module.exports = nextConfig;
