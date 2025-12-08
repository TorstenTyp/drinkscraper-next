/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
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
};

module.exports = nextConfig;