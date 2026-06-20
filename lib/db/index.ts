// lib/db.ts
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not set in .env.local");
}

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { 
    cache: "no-store", 
    keepalive: true,
    // Add retry for flaky connections
  },
});

console.log("✅ Neon Database client initialized");

export { sql };

export async function initializeDatabase() {
  if (!process.env.DATABASE_URL) return false;

  try {
    console.log("🔧 Initializing database tables...");

    await sql`CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS reports (...)`;   // (keep your full tables)

    await sql`CREATE TABLE IF NOT EXISTS inquiries (...)`; // (keep your full tables)

    await sql`
      INSERT INTO admins (username, password)
      VALUES ('admin', '$2a$12$8K5fK8v7vN9pL2mX9qR7tOe5vW8xY7zU9iO0pL2mX9qR7tOe5vW8xY')
      ON CONFLICT (username) DO NOTHING;
    `;

    console.log("✅ Database tables initialized successfully");
    return true;
  } catch (error) {
    console.error("⚠️ Database initialization failed:", error);
    return false;
  }
}