import { config } from "dotenv";
config({ path: ".env.local" }); // ← This fixes Prisma CLI commands

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});