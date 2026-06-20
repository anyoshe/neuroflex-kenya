"use server";

import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "crypto";

type AdminLoginResult =
  | { success: true; token: string; fallback?: boolean }
  | { success: false; error: string };

type ReportInput = {
  reportNo?: string | null;
  patientName: string;
  age?: string | number | null;
  sex?: string | null;
  residence?: string | null;
  tel?: string | null;
  reportingDate?: string | null;
  nextOfKin?: string | null;
  presentingHistory?: string | null;
  assessmentFindings?: string | null;
  intervention?: string | null;
  review?: string | null;
};

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

// ================== FALLBACK ADMIN ==================
const TEMP_ADMIN = {
  username: "admin",
  password: "neuroflex2026"
};

function getJwtSecret() {
  return process.env.JWT_SECRET || "neuroflex-admin-dev-secret-2026";
}

function allowFallbackAdmin() {
  return process.env.ALLOW_FALLBACK_ADMIN === "true";
}

// ================== HELPER FUNCTIONS ==================
function encodeBase64Url(value: object | string | Buffer) {
  const input = typeof value === "object" && !Buffer.isBuffer(value)
    ? JSON.stringify(value)
    : value;
  return Buffer.from(input).toString("base64url");
}

function signToken(payload: Record<string, unknown>) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(payload);
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = createHmac("sha256", getJwtSecret()).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token: string) {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) return false;

  const expectedSignature = createHmac("sha256", getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const supplied = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    return typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

// ================== LOGIN ==================
export async function loginAdmin(username: string, password: string): Promise<AdminLoginResult> {
  const normalizedUsername = username.trim().toLowerCase();

  if (!normalizedUsername || !password) {
    return { success: false, error: "Username and password are required" };
  }

  try {
    const result = await sql`
      SELECT * FROM admins 
      WHERE username = ${normalizedUsername} 
      LIMIT 1
    `;

    const admin = result[0];

    if (admin) {
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (passwordMatches) {
        const now = Math.floor(Date.now() / 1000);
        const token = signToken({
          sub: admin.id,
          username: admin.username,
          iat: now,
          exp: now + TOKEN_TTL_SECONDS,
        });
        return { success: true, token };
      }
    }
  } catch (error) {
    console.warn("Database error during login:", error);
    if (!allowFallbackAdmin()) {
      return {
        success: false,
        error: "Could not connect to database. Using fallback login is enabled."
      };
    }
  }

  // Fallback Admin
  if (allowFallbackAdmin() && 
      normalizedUsername === TEMP_ADMIN.username && 
      password === TEMP_ADMIN.password) {
    const now = Math.floor(Date.now() / 1000);
    const token = signToken({
      sub: 999,
      username: "admin",
      fallback: true,
      iat: now,
      exp: now + TOKEN_TTL_SECONDS,
    });
    return { success: true, token, fallback: true };
  }

  return { success: false, error: "Invalid username or password" };
}

// ================== REPORTS ==================
export async function saveReport(data: ReportInput) {
  try {
    const result = await sql`
      INSERT INTO reports (
        report_no, patient_name, age, sex, residence, tel,
        reporting_date, next_of_kin, presenting_history,
        assessment_findings, intervention, review, created_by
      ) VALUES (
        ${data.reportNo || null},
        ${data.patientName},
        ${data.age ? parseInt(String(data.age)) : null},
        ${data.sex || null},
        ${data.residence || null},
        ${data.tel || null},
        ${data.reportingDate || null},
        ${data.nextOfKin || null},
        ${data.presentingHistory || null},
        ${data.assessmentFindings || null},
        ${data.intervention || null},
        ${data.review || null},
        'Dennis Masaki'
      )
      RETURNING *;
    `;

    return { success: true, report: result[0] };
  } catch (error: any) {
    console.error("Save report error:", error);
    return {
      success: false,
      error: "Could not save report to database. Check your internet connection."
    };
  }
}

export async function getReports() {
  try {
    const reports = await sql`SELECT * FROM reports ORDER BY created_at DESC`;
    return reports;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ================== INQUIRIES ==================
export async function getInquiries() {
  try {
    const inquiries = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
    return inquiries;
  } catch {
    return [];
  }
}

export async function updateInquiryStatus(id: number, status: string) {
  try {
    await sql`UPDATE inquiries SET status = ${status} WHERE id = ${id}`;
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function validateAdminToken(token: string) {
  return verifyToken(token);
}