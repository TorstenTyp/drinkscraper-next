/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets-prd.punchdrink.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.diffords.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.shortpixel.ai',
            },
            {
                protocol: 'https',
                hostname: 'www.liquor.com',
            },
            {
                protocol: 'https',
                hostname: 'iba-world.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.diffordsguide.com',
            },
        ],
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://drinkscraper.com' : undefined,
};

module.exports = nextConfig;