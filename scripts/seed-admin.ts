// scripts/seed-admin.ts
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

console.log(
  "🔍 DATABASE_URL loaded:",
  process.env.DATABASE_URL ? "✅ Yes" : "❌ No"
);

import { execute, initializeDatabase } from "../lib/db";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing in .env.local");
    process.exit(1);
  }

  console.log("🌱 Seeding default admin account...");

  try {
    await initializeDatabase();

    const hashedPassword = await bcrypt.hash("neuroflex2026", 12);

    await execute(
      `
      INSERT INTO admins (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING;
      `,
      ["admin", hashedPassword]
    );

    console.log("✅ Admin seeded successfully!");
    console.log("Username: admin");
    console.log("Password: neuroflex2026");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();