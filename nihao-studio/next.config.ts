import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "console.enterprise.trae.ai",
        pathname: "/api/ide/v1/text_to_image"
      }
    ]
  }
};

export default nextConfig;
