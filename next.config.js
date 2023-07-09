/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `https://convoai-production.up.railway.app/:path*`,
        },
      ],
    }
  },
}

module.exports = nextConfig
