import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { addApprovedTestimonial } from '@/lib/testimonial-manager';  // ← Changed import

const PENDING_FILE = path.join(process.cwd(), 'data/pending-testimonials.json');

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return new Response("<h2>Missing ID</h2>", { headers: { 'Content-Type': 'text/html' } });
  }

  try {
    let pending = [];
    try {
      const data = await readFile(PENDING_FILE, 'utf8');
      pending = JSON.parse(data);
    } catch {}

    const testimonialIndex = pending.findIndex((t: any) => t.id === id);

    if (testimonialIndex === -1) {
      return new Response("<h2>Testimonial not found or already processed.</h2>", { headers: { 'Content-Type': 'text/html' } });
    }

    const approved = pending[testimonialIndex];

    // Remove from pending
    pending.splice(testimonialIndex, 1);
    await writeFile(PENDING_FILE, JSON.stringify(pending, null, 2));

    // Auto-add to live testimonials
    await addApprovedTestimonial(approved);

    return new Response(`
      <h2>✅ Success!</h2>
      <p>The testimonial from <strong>${approved.name}</strong> has been approved and is now live on your website.</p>
      <p><a href="/">Go back to homepage</a></p>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error(error);
    return new Response("<h2>Server Error</h2>", { headers: { 'Content-Type': 'text/html' } });
  }
}