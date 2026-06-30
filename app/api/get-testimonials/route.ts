import prisma from '@/lib/prisma'; // 1. Use the safe global instance
import { NextResponse } from 'next/server';

// 2. Force dynamic execution so Next.js doesn't crash during build time
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
  try {
    const approved = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(approved);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}