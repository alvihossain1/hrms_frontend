/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // output: 'export',
    // distDir: 'build',
    env: {
        SERVER_URL: process.env.SERVER_URL,
      },
};

export default nextConfig;