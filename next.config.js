/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CONTENT_API_KEY: process.env.CONTENT_API_KEY,
    },
};

module.exports = nextConfig;
