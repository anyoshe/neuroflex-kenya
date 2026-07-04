"use server";

import { execute, query } from "@/lib/db";
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
// ================== NEW: Inquiry / Booking Type ==================
type InquiryInput = {
  name: string;
  age?: number | null;
  sex?: string | null;
  phone: string;
  residence?: string | null;
  email?: string | null;
  service?: string | null;
  conditionCause?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  status?: string;
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
export async function loginAdmin(
  username: string,
  password: string
): Promise<AdminLoginResult> {
  const normalizedUsername = username.trim().toLowerCase();

  if (!normalizedUsername || !password) {
    return {
      success: false,
      error: "Username and password are required",
    };
  }

  try {
    const result = await query(
      `
      SELECT *
      FROM admins
      WHERE username = $1
      LIMIT 1
      `,
      [normalizedUsername]
    );

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

        return {
          success: true,
          token,
        };
      }
    }
  } catch (error) {
    console.warn("Database error during login:", error);

    if (!allowFallbackAdmin()) {
      return {
        success: false,
        error: "Could not connect to database.",
      };
    }
  }

  if (
    allowFallbackAdmin() &&
    normalizedUsername === TEMP_ADMIN.username &&
    password === TEMP_ADMIN.password
  ) {
    const now = Math.floor(Date.now() / 1000);

    const token = signToken({
      sub: 999,
      username: "admin",
      fallback: true,
      iat: now,
      exp: now + TOKEN_TTL_SECONDS,
    });

    return {
      success: true,
      token,
      fallback: true,
    };
  }

  return {
    success: false,
    error: "Invalid username or password",
  };
}

export async function generateReportNumber() {
  try {
    const rows = await query<{
      report_no: string | null;
    }>(`
      SELECT report_no
      FROM reports
      ORDER BY id DESC
      LIMIT 1
    `);

    if (rows.length === 0 || !rows[0].report_no) {
      return "NRPT-0001";
    }

    const last = rows[0].report_no;

    const match = last.match(/(\d+)$/);

    if (!match) {
      return "NRPT-0001";
    }

    const next =
      Number(match[1]) + 1;

    return `NRPT-${String(next).padStart(4, "0")}`;

  } catch (error) {

    console.error(error);

    return "NRPT-0001";
  }
}
// ================== SAVE REPORT ==================
export async function saveReport(data: ReportInput) {
  try {
    const result = await query(
      `
      INSERT INTO reports (
        report_no,
        patient_name,
        age,
        sex,
        residence,
        tel,
        reporting_date,
        next_of_kin,
        presenting_history,
        assessment_findings,
        intervention,
        review,
        created_by
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      RETURNING *
      `,
      [
        data.reportNo,
        data.patientName,
        data.age ? parseInt(String(data.age), 10) : null,
        data.sex || null,
        data.residence || null,
        data.tel || null,
        data.reportingDate || null,
        data.nextOfKin || null,
        data.presentingHistory || null,
        data.assessmentFindings || null,
        data.intervention || null,
        data.review || null,
        "Dennis Masaki",
      ]
    );

    return {
      success: true,
      report: result[0],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Could not save report.",
    };
  }
}

// ================== GET REPORTS ==================

export async function getReports() {
  try {
    return await query(
      `
      SELECT
        id,
        report_no,
        patient_name,
        age,
        sex,
        reporting_date,
        created_at
      FROM reports
      ORDER BY created_at DESC
      `
    );
  } catch (error) {
    console.error(error);

    return [];
  }
}

// ================== DELETE REPORT ==================

export async function deleteReport(id: number) {
  try {
    await execute(
      `
      DELETE FROM reports
      WHERE id = $1
      `,
      [id]
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Unable to delete report.",
    };
  }
}

// ================== GET SINGLE REPORT ==================

export async function getReport(id: number) {
  try {
    const rows = await query<{
      id: number;
      report_no: string;
      patient_name: string;
      age: number;
      sex: string;
      residence: string | null;
      tel: string | null;
      reporting_date: string;
      next_of_kin: string | null;
      presenting_history: string | null;
      assessment_findings: string | null;
      intervention: string | null;
      review: string | null;
      created_at: string;
    }>(
      `
      SELECT *
      FROM reports
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// ================== UPDATE REPORT ==================

export async function updateReport(
  id: number,
  data: ReportInput
) {
  try {
    await execute(
      `
      UPDATE reports
      SET
        patient_name = $1,
        age = $2,
        sex = $3,
        residence = $4,
        tel = $5,
        reporting_date = $6,
        next_of_kin = $7,
        presenting_history = $8,
        assessment_findings = $9,
        intervention = $10,
        review = $11
      WHERE id = $12
      `,
      [
        data.patientName,
        data.age ? Number(data.age) : null,
        data.sex || null,
        data.residence || null,
        data.tel || null,
        data.reportingDate || null,
        data.nextOfKin || null,
        data.presentingHistory || null,
        data.assessmentFindings || null,
        data.intervention || null,
        data.review || null,
        id,
      ]
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Unable to update report.",
    };
  }
}


// ================== INQUIRIES / BOOKINGS ==================

export async function getInquiries() {
  try {
    return await query(`
      SELECT 
        id,
        name,
        age,
        sex,
        phone,
        residence,
        email,
        service,
        condition_cause as "conditionCause",
        preferred_date as "preferredDate",
        preferred_time as "preferredTime",
        message,
        status,
        created_at as "createdAt"
      FROM inquiries
      ORDER BY created_at DESC
    `);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

export async function updateInquiryStatus(id: number, status: string) {
  try {
    await execute(
      `UPDATE inquiries SET status = $1 WHERE id = $2`,
      [status, id]
    );
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update status" };
  }
}

// Optional: Get single inquiry
export async function getInquiry(id: number) {
  try {
    const rows = await query(`
      SELECT * FROM inquiries WHERE id = $1 LIMIT 1
    `, [id]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Optional: Delete inquiry
export async function deleteInquiry(id: number) {
  try {
    await execute(`DELETE FROM inquiries WHERE id = $1`, [id]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete inquiry" };
  }
}

export async function validateAdminToken(token: string) {
  return verifyToken(token);
}