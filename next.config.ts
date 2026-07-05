import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
  ],

  outputFileTracingIncludes: {
    "/api/report/pdf": [
      "./node_modules/@sparticuz/chromium/bin/**/*",
    ],
  },

  env: {
    DATABASE_URL: process.env.DATABASE_URL || "",
  },
};

export default nextConfig;