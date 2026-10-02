import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/api/uploads/**" },
      { pathname: "/favicon.png" },
      { pathname: "/apple-touch-icon.png" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
