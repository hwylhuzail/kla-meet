/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === 'true'

const nextConfig = {
 ...(isExport? { output: 'export', distDir: 'out', trailingSlash: true } : {}),
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

module.exports = nextConfig