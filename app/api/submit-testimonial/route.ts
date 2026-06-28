import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const PENDING_FILE = path.join(process.cwd(), 'data/pending-testimonials.json');

export async function POST(request: NextRequest) {
  try {
    const { name, role, comment, rating } = await request.json();

    if (!name || !role || !comment) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const testimonial = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim(),
      comment: comment.trim(),
      rating: Number(rating),
      date: new Date().toISOString(),
    };

    // Save to pending
    let pending = [];
    try {
      const data = await readFile(PENDING_FILE, 'utf8');
      pending = JSON.parse(data);
    } catch {}

    pending.push(testimonial);
    await writeFile(PENDING_FILE, JSON.stringify(pending, null, 2));

    // Send email with links
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const approveLink = `${process.env.NEXT_PUBLIC_SITE_URL}/api/approve-testimonial?id=${testimonial.id}`;
    const rejectLink = `${process.env.NEXT_PUBLIC_SITE_URL}/api/reject-testimonial?id=${testimonial.id}`;

    await transporter.sendMail({
      from: `"Neuroflex Kenya" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Testimonial from ${name}`,
      html: `
        <h2>New Testimonial</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Rating:</strong> ${rating} ⭐</p>
        <blockquote>${comment}</blockquote>
        <p>
          <a href="${approveLink}" style="background:#10b981;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">✅ Approve & Publish</a>
          &nbsp;&nbsp;
          <a href="${rejectLink}" style="background:#ef4444;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">❌ Reject</a>
        </p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}