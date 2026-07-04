import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getEmailErrorMessage, sendBookingEmails, verifyMailConnection } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      name, 
      age, 
      sex, 
      phone, 
      residence, 
      email, 
      service, 
      conditionCause, 
      preferredDate, 
      preferredTime,
      message 
    } = body;

    // Validation
    if (!name || !phone || !service || !conditionCause || !preferredDate || !preferredTime) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill all mandatory fields." 
      }, { status: 400 });
    }
    // === INSERT INTO DATABASE ===
    const rows = await query<{ id: number }>(
      `
      INSERT INTO inquiries 
      (
        name, age, sex, phone, residence, email, 
        service, condition_cause, preferred_date, preferred_time, 
        message, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending')
      RETURNING id
      `,
      [
        name,
        age ? parseInt(String(age), 10) : null,
        sex || null,
        phone,
        residence || null,
        email || null,
        service,
        conditionCause,
        preferredDate,
        preferredTime,
        message || null,        // ← 11th parameter
      ]
    );
    // === SEND EMAILS ===
    await verifyMailConnection();
    await sendBookingEmails({
      name,
      age,
      sex,
      phone,
      residence,
      email: email || "",
      service,
      conditionCause,
      preferredDate,
      preferredTime,
      message: message || "",
    });
 
    return NextResponse.json({ 
      success: true,
      message: "Appointment request received successfully"
    }, { status: 200 });

  } catch (error: any) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit appointment request" },
      { status: 500 }
    );
  }
}