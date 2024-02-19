/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    // distDir: 'build',
    env: {
        SERVER_URL: process.env.SERVER_URL,
        DUMMY_URL: process.env.DUMMY_URL,
      },
};

export default nextConfig;