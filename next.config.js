const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  ...(process.env.EXPORT === "true" ? { output: "export", images: { unoptimized: true } } : {}),
}
module.exports = nextConfig
