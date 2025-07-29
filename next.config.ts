import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Performance optimizations
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [280, 300, 450, 640, 750, 828, 1080, 1200], // Added smaller sizes first
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 280, 300, 384, 450], // Added specific hero sizes
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compression
  compress: true,

  // Bundle analyzer for production builds
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          motion: {
            name: "motion",
            test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
            chunks: "all",
            priority: 30,
          },
          lucide: {
            name: "lucide",
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            chunks: "all",
            priority: 25,
          },
        },
      };
    }

    return config;
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Compiler options for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
