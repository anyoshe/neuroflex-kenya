import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Force Next.js to inject your .env.local DATABASE_URL into the background build workers
    DATABASE_URL: process.env.DATABASE_URL || "",
  },
};

export default nextConfig;