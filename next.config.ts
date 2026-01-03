import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'grusskartenladen.de',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Allow data URIs for base64 images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable image optimization for external images with query strings
    unoptimized: false,
  },
};

export default nextConfig;
