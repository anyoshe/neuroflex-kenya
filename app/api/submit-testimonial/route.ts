import { execute, query } from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const { name, role, comment, rating } = await request.json();

    const rows = await query<{ id: number }>(
      `
      INSERT INTO "Testimonial"
      (name, role, comment, rating, approved)
      VALUES ($1, $2, $3, $4, false)
      RETURNING id
      `,
      [name, role, comment, Number(rating)]
    );

    const testimonial = rows[0];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const approveLink =
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/approve-testimonial?id=${testimonial.id}`;

    const rejectLink =
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/reject-testimonial?id=${testimonial.id}`;

    await transporter.sendMail({
      from: `"Neuroflex Kenya" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Testimonial from ${name}`,
      html: `
        <h2>New Testimonial</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Rating:</strong> ${rating} ⭐</p>
        <p><strong>Comment:</strong></p>
        <blockquote>${comment}</blockquote>
        <p>
          <a href="${approveLink}">✅ Approve</a> |
          <a href="${rejectLink}">❌ Reject</a>
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial submission failed:", error);

    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}