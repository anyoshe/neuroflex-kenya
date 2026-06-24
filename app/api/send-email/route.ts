import { NextRequest, NextResponse } from "next/server";
import { getEmailErrorMessage, sendBookingEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      name, 
      age, 
      sex, 
      phone, 
      email, 
      service, 
      conditionCause, 
      preferredDate, 
      message 
    } = body;

    // Validation
    if (!name || !age || !sex || !phone || !service || !conditionCause || !preferredDate) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill all mandatory fields." 
      }, { status: 400 });
    }

    await sendBookingEmails({
      name,
      age,
      sex,
      phone,
      email: email || "",
      service,
      conditionCause,
      preferredDate,
      message: message || "",
    });

    return NextResponse.json({ 
      message: "Appointment request sent successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: getEmailErrorMessage(error) },
      { status: 500 }
    );
  }
}