import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("DATABASE_URL exists?", !!process.env.DATABASE_URL);

  try {
   const approved = await query(`
  SELECT *
  FROM "Testimonial"
  WHERE approved = true
  ORDER BY created_at DESC
`);

    console.log(`Fetched ${approved.length} approved testimonials`);

    return NextResponse.json(approved);
  } catch (error: any) {
    console.error("Full Database Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch testimonials",
        details: error.message,
      },
      { status: 500 }
    );
  }
}