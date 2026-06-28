import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const PENDING_FILE = path.join(process.cwd(), 'data/pending-testimonials.json');

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    let pending = [];
    try {
      const data = await readFile(PENDING_FILE, 'utf8');
      pending = JSON.parse(data);
    } catch {}

    pending = pending.filter((t: any) => t.id !== id);
    await writeFile(PENDING_FILE, JSON.stringify(pending, null, 2));

    return new Response(`
      <h2>❌ Testimonial Rejected</h2>
      <p>The testimonial has been rejected and removed.</p>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}