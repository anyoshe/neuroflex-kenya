import { execute } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing ID" },
      { status: 400 }
    );
  }

  try {
    await execute(
      `
      UPDATE "Testimonial"
      SET approved = true
      WHERE id = $1
      `,
      [id]
    );

    return new Response(
      `
      <h2>✅ Approved!</h2>
      <p>The testimonial is now live.</p>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}