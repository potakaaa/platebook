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
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.apartmenttherapy.info",
      },
      {
        protocol: "https",
        hostname: "www.rappler.com",
      },
      {
        protocol: "https",
        hostname: "www.seriouseats.com",
      },
      {
        protocol: "https",
        hostname: "static01.nyt.com",
      },
      {
        protocol: "https",
        hostname: "travellingfoodie.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fcgm1-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "makeyourasia.com",
      },
      {
        protocol: "https",
        hostname: "www.allchickenrecipes.com",
      },
      {
        protocol: "https",
        hostname: "www.thespruceeats.com",
      },
      {
        protocol: "https",
        hostname: "www.chefspencil.com",
      },
      {
        protocol: "https",
        hostname: "filrecipes101.blogspot.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
