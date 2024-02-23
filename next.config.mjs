/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    // distDir: 'build',
    env: {
        SERVER_URL: process.env.SERVER_URL,
        DUMMY_URL: process.env.DUMMY_URL,
        HRM_ADMIN_EMAIL: process.env.HRM_ADMIN_EMAIL,
        HRM_ADMIN_PASSWORD: process.env.HRM_ADMIN_PASSWORD,
      },
};

export default nextConfig;