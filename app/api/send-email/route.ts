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
      residence, 
      email, 
      service, 
      conditionCause, 
      preferredDate, 
      preferredTime, // Destructured preferredTime field
      message 
    } = body;

    // Validation - Added preferredTime to the mandatory check
    if (!name || !age || !sex || !phone || !residence || !service || !conditionCause || !preferredDate || !preferredTime) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill all mandatory fields." 
      }, { status: 400 });
    }

    // Pass the residence and preferredTime variables forward into your email handler
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
      preferredTime, // Passed forward to email handler
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