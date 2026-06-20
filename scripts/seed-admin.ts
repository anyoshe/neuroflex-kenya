// scripts/seed-admin.ts
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables more reliably
config({ path: resolve(process.cwd(), '.env.local') });

console.log("🔍 DATABASE_URL loaded:", process.env.DATABASE_URL ? "✅ Yes" : "❌ No");

import { sql, initializeDatabase } from "../lib/db";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing in .env.local");
    console.error("Please check that .env.local exists and contains DATABASE_URL");
    process.exit(1);
  }

  console.log("🌱 Seeding default admin account...");

  try {
    await initializeDatabase();

    const hashedPassword = await bcrypt.hash("neuroflex2026", 12);

    await sql`
      INSERT INTO admins (username, password)
      VALUES ('admin', ${hashedPassword})
      ON CONFLICT (username) DO NOTHING;
    `;

    console.log("✅ Admin seeded successfully!");
    console.log("Username: admin");
    console.log("Password: neuroflex2026");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();