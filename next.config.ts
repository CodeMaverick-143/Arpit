import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js / R3F are ESM-heavy; let Next tree-shake their barrel exports
  experimental: {
    optimizePackageImports: ["@react-three/drei", "framer-motion"],
  },
};

export default withBundleAnalyzer(nextConfig);
