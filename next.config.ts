import type { NextConfig } from "next";

const canonicalHost = "neuroflexkenya.com";

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

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${canonicalHost}` }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;