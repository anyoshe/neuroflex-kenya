import nodemailer from "nodemailer";
import { contactInfo } from "@/lib/site-data";

type BookingEmailPayload = {
  name: string;
  age: string;
  sex: string;
  phone: string;
  residence: string;
  email: string;
  service: string;
  conditionCause: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEmailConfig() {
  const user = process.env.EMAIL_USER?.trim();
  const password = process.env.EMAIL_PASSWORD?.replace(/\s/g, "");
  const to = process.env.EMAIL_TO?.trim() || user;
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Neuroflex and Physio Wellness Center";

  if (!user || !password) {
    throw new Error("Email is not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env.local");
  }

  return { user, password, to, fromName };
}

export function createMailTransporter() {
  const { user, password } = getEmailConfig();
  const port = Number(process.env.SMTP_PORT) || 587;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const { user, to, fromName } = getEmailConfig();
  const transporter = createMailTransporter();

  const safe = {
    name: escapeHtml(payload.name),
    age: escapeHtml(payload.age),
    sex: escapeHtml(payload.sex),
    phone: escapeHtml(payload.phone),
    residence: escapeHtml(payload.residence),
    email: escapeHtml(payload.email || "Not provided"),
    service: escapeHtml(payload.service),
    conditionCause: escapeHtml(payload.conditionCause).replace(/\n/g, "<br>"),
    preferredDate: escapeHtml(payload.preferredDate),
    preferredTime: escapeHtml(payload.preferredTime), // Escaped preferredTime field
    message: payload.message ? escapeHtml(payload.message).replace(/\n/g, "<br>") : "None",
  };

  const from = `"${fromName}" <${user}>`;

  // === ADMIN NOTIFICATION ===
  await transporter.sendMail({
    from,
    to,                                 
    replyTo: payload.email || user,
    subject: `New Appointment Request - ${safe.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 26px;">Neuroflex and Physio Wellness Center</h1>
        </div>

        <div style="padding: 40px; background: #ffffff;">
          <h2 style="color: #1e40af; margin-top: 0;">New Appointment Request</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; width: 140px;"><strong>Patient Name:</strong></td><td>${safe.name}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Age / Sex:</strong></td><td>${safe.age} years • ${safe.sex}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${safe.phone}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Residence:</strong></td><td>${safe.residence}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${safe.email}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>${safe.service}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Preferred Date:</strong></td><td>${safe.preferredDate}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Preferred Time:</strong></td><td>${safe.preferredTime}</td></tr>
            </table>
          </div>

          <h3 style="color: #1e40af;">Condition / Reason for Visit</h3>
          <div style="background: #f8fafc; padding: 18px; border-radius: 8px; line-height: 1.6;">
            ${safe.conditionCause}
          </div>

          ${safe.message !== "None" ? `
          <h3 style="color: #1e40af; margin-top: 25px;">Additional Information</h3>
          <div style="background: #f8fafc; padding: 18px; border-radius: 8px; line-height: 1.6;">
            ${safe.message}
          </div>` : ''}
        </div>

        <div style="background: #f1f5f9; padding: 20px 40px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Neuroflex and Physio Wellness Center • Fedha Road, Embakasi, Nairobi</p>
          <p>📞 ${contactInfo.phone} &nbsp; | &nbsp; 📧 ${user}</p>
        </div>
      </div>
    `,
  });

  // === AUTO-REPLY TO CLIENT (Only if email is provided) ===
  if (payload.email && payload.email.trim() !== "") {
    await transporter.sendMail({
      from,
      to: payload.email,
      subject: "✅ Appointment Request Received - Neuroflex and Physio Wellness Center",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #1e40af;">Thank You, ${safe.name}!</h2>
          <p>We have successfully received your appointment request.</p>
          
          <div style="background: #f0f9ff; border-left: 5px solid #3b82f6; padding: 20px; margin: 25px 0;">
            <p><strong>Service:</strong> ${safe.service}</p>
            <p><strong>Preferred Date & Time:</strong> ${safe.preferredDate} at ${safe.preferredTime}</p>
          </div>

          <p>Our team will review your request and contact you within <strong>24 hours</strong>.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong>Neuroflex and Physio Wellness Center Team</strong><br>
          Physiotherapy & Wellness Centre
          </p>
        </div>
      `,
    });
  }

  console.log("✅ Emails sent successfully!");
}

export function getEmailErrorMessage(error: unknown) {
  const err = error as { code?: string; message?: string };

  if (err.code === "EAUTH") {
    return "Gmail rejected the login. Use neuroflexkenya@gmail.com as EMAIL_USER and a Gmail App Password in .env.local.";
  }

  return "Failed to send email. Please try again or contact us on WhatsApp.";
}

export async function verifyMailConnection(): Promise<boolean> {
  const transporter = createMailTransporter();
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Transporter verification error:", error);
    throw error;
  }
}