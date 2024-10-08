/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // output: 'export',
    // distDir: 'build',
    env: {
        SERVER_URL: process.env.SERVER_URL,
        ORG_NAME: process.env.ORG_NAME,
        ORG_ADDRESS: process.env.ORG_ADDRESS,
        ORG_IMAGE: process.env.ORG_IMAGE,
        SALT: process.env.SALT,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      },
};

export default nextConfig;