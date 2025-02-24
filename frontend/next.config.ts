import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol:  "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.apartmenttherapy.info",},
      {
        protocol: "https",
        hostname: "www.rappler.com",
      },
      {
        protocol: "https",
        hostname: "www.seriouseats.com"
      },
      {
        protocol: "https",
        hostname: "static01.nyt.com"
      },
      {
        protocol: "https",
        hostname: "travellingfoodie.net"
      },
    ],
    domains: ["api.microlink.io"],
  },
};

export default nextConfig;
