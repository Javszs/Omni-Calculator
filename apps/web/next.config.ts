/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['core'],   // ← This is the key line
};

export default nextConfig;