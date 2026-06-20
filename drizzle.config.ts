// import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// import { resolve } from "path";

// dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// if (!process.env.DATABASE_URL) {
//   throw new Error("❌ DATABASE_URL is not defined in .env.local");
// }

// const config: Config = {
//   schema: "./lib/db/schema.ts",
//   out: "./migrations",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,     // Important for Neon
//     },
//   },
//   // Add these for better push experience
//   verbose: true,
//   strict: true,
// };

// export default config;