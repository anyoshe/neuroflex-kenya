import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      age,
      sex,
      phone,
      residence,
      email,
      service,
      conditionCause,
      preferredDate,
      preferredTime,
      message,
    } = body;

    if (
      !name ||
      !phone ||
      !service ||
      !conditionCause ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    const rows = await query<{ id: number }>(
      `
      INSERT INTO inquiries
      (
        name,
        age,
        sex,
        phone,
        residence,
        email,
        service,
        condition_cause,
        preferred_date,
        preferred_time,
        message,
        status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending'
      )
      RETURNING id
      `,
      [
        name,
        age ? parseInt(String(age), 10) : null,
        sex || null,
        phone,
        residence || null,
        email || null,
        service,
        conditionCause,
        preferredDate,
        preferredTime,
        message || null,
      ]
    );

    return NextResponse.json({
      success: true,
      inquiryId: rows[0].id,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}