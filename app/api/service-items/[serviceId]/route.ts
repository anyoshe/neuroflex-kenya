import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;

    const items = await query(
      `
      SELECT *
      FROM service_items
      WHERE service_id = $1
        AND active = true
      ORDER BY display_order
      `,
      [serviceId]
    );

    return NextResponse.json(items);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to load service items" },
      { status: 500 }
    );
  }
}