/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/space-jump-game' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/space-jump-game' : '',
  trailingSlash: true,
  output: 'export'
}

module.exports = nextConfig
