import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "shrug-person-78902957.figma.site",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/demo-clinic/", destination: "/demo-clinic/index.html" },
      { source: "/demo-gym/", destination: "/demo-gym/index.html" },
      { source: "/demo-salon/", destination: "/demo-salon/index.html" },
    ];
  },
};

export default nextConfig;