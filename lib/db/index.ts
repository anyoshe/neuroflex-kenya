// import { Client } from "pg";
// import type { QueryResultRow } from "pg";


// if (!process.env.DATABASE_URL) {
//   throw new Error("❌ DATABASE_URL is not set in .env.local");
// }

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// let connected = false;

// async function getClient() {
//   if (!connected) {
//     await client.connect();
//     connected = true;
//     console.log("✅ PostgreSQL connected");
//   }

//   return client;
// }

// export async function query<T extends QueryResultRow = QueryResultRow>(
//   text: string,
//   params: unknown[] = []
// ): Promise<T[]> {
//   const db = await getClient();
//   const result = await db.query<T>(text, params);
//   return result.rows;
// }

// export async function execute(
//   text: string,
//   params: any[] = []
// ) {
//   const db = await getClient();
//   return db.query(text, params);
// }

// export async function initializeDatabase() {
//   const db = await getClient();

//   try {
//     console.log("🔧 Initializing database tables...");

//     // Admins
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS admins (
//         id SERIAL PRIMARY KEY,
//         username TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         email TEXT UNIQUE,
//         created_at TIMESTAMP DEFAULT NOW()
//       )
//     `);

//    // Inquiries - FULL SCHEMA
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS inquiries (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         age INTEGER,
//         sex TEXT,
//         phone TEXT NOT NULL,
//         residence TEXT,
//         email TEXT,
//         service TEXT,
//         condition_cause TEXT,
//         preferred_date TEXT,
//         preferred_time TEXT,
//         message TEXT,
//         status TEXT DEFAULT 'pending',
//         created_at TIMESTAMP DEFAULT NOW()
//       )
//     `);
//      // Reports
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS reports (
//         id SERIAL PRIMARY KEY,
//         report_no TEXT,
//         patient_name TEXT NOT NULL,
//         age INTEGER,
//         sex TEXT,
//         residence TEXT,
//         tel TEXT,
//         reporting_date TEXT,
//         next_of_kin TEXT,
//         presenting_history TEXT,
//         assessment_findings TEXT,
//         intervention TEXT,
//         review TEXT,
//         created_by TEXT,
//         created_at TIMESTAMP DEFAULT NOW()
//       )
//     `);
//     // Testimonials
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS "Testimonial" (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         role TEXT NOT NULL,
//         comment TEXT NOT NULL,
//         rating INTEGER NOT NULL,
//         approved BOOLEAN DEFAULT false NOT NULL,
//         created_at TIMESTAMP DEFAULT NOW()
//       )
//     `);

//     console.log("✅ Database initialized");

//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// }

import { Pool } from "pg";
import type { QueryResultRow } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export async function execute(
  text: string,
  params: unknown[] = []
) {
  return pool.query(text, params);
}

export async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log("Initializing database...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Inquiries - FULL SCHEMA
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        sex TEXT,
        phone TEXT NOT NULL,
        residence TEXT,
        email TEXT,
        service TEXT,
        condition_cause TEXT,
        preferred_date TEXT,
        preferred_time TEXT,
        message TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Reports
    await client.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        report_no TEXT,
        patient_name TEXT NOT NULL,
        age INTEGER,
        sex TEXT,
        residence TEXT,
        tel TEXT,
        reporting_date TEXT,
        next_of_kin TEXT,
        presenting_history TEXT,
        assessment_findings TEXT,
        intervention TEXT,
        review TEXT,
        created_by TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Testimonials
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Testimonial" (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        comment TEXT NOT NULL,
        rating INTEGER NOT NULL,
        approved BOOLEAN DEFAULT false NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("✅ Database initialized");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.release();
  }
}