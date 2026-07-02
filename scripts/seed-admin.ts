import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is missing");
    }
    const { execute, initializeDatabase } = await import("../lib/db");
    console.log("🌱 Initializing database...");
    await initializeDatabase();

    const username = "admin";
    const email = "info@neuroflexkenya.com";
    const password = "neuroflex2026";

    const hashedPassword = await bcrypt.hash(password, 12);

    await execute(
      `
      INSERT INTO admins (username, email, password)
      VALUES ($1, $2, $3)
      ON CONFLICT (username)
      DO UPDATE SET
        email = EXCLUDED.email,
        password = EXCLUDED.password;
      `,
      [username, email, hashedPassword]
    );

    console.log("====================================");
    console.log("✅ Admin account ready");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
    console.log("====================================");
  } catch (err) {
    console.error("❌ Failed:", err);
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();