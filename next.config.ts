import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three, R3F e drei sono ESM puri: lasciarli al bundler evita doppie istanze di three.
  transpilePackages: ["three"],
};

export default nextConfig;
