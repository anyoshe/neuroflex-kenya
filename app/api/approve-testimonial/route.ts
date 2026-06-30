import prisma from '@/lib/prisma'; // 1. Use the safe global instance
import { NextResponse } from 'next/server';

// 2. Force dynamic execution
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    await prisma.testimonial.update({
      where: { id },
      data: { approved: true }
    });

    return new Response(`
      <h2>✅ Approved!</h2>
      <p>The testimonial is now live.</p>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}