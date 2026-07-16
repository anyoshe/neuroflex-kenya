import { NextRequest, NextResponse } from "next/server";
import { getEmailErrorMessage, sendBookingEmails, verifyMailConnection } from "@/lib/email";
import { services } from "@/lib/site-data";
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

const selectedService = services.find(
  (s) => s.slug === service
);

const serviceName = selectedService?.title ?? "General Inquiry";
    // Validation
    if (!name || !phone || !service || !conditionCause || !preferredDate || !preferredTime) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill all mandatory fields." 
      }, { status: 400 });
    }

    // === SEND EMAILS ===
    await verifyMailConnection();
 await sendBookingEmails({
  name,
  age,
  sex,
  phone,
  residence,
  email: email || "",
  service: serviceName,
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