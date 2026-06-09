import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail or your email service
    // You'll need to set these environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to Neuroflex
    const clinicEmailContent = `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Email to client
    const clientEmailContent = `
      <h2>Booking Request Received</h2>
      <p>Hello ${name},</p>
      <p>Thank you for submitting your appointment request to Neuroflex Kenya. We have received your information and will contact you within 24 hours to confirm your appointment.</p>
      <p><strong>Your Details:</strong></p>
      <p>Service Requested: ${service}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message.replace(/\n/g, "<br>")}</p>
      <p>Best regards,<br>Neuroflex Kenya Team</p>
    `;

    // Send email to clinic
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "neuroflexkenya@gmail.com",
      subject: `New Appointment Request from ${name}`,
      html: clinicEmailContent,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Appointment Request Received - Neuroflex Kenya",
      html: clientEmailContent,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
