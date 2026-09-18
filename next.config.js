/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Only export static when building APK
  ...(process.env.EXPORT === "true" ? { output: "export", images: { unoptimized: true } } : {}),
};

module.exports = nextConfig;