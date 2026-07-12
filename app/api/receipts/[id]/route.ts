import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Params = Promise<{
  id: string;
}>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const receipt = await query(
      `
      SELECT
        r.id,
        r.receipt_no,
        r.receipt_date,
        r.amount,
        r.created_by,
        r.created_at,

        p.payment_method,
        p.reference_no,
        p.notes,

        i.invoice_no,
        i.total,
        i.amount_paid,
        i.balance,

        rep.patient_name,
        rep.tel,
        rep.residence

      FROM receipts r

      INNER JOIN invoice_payments p
        ON p.id = r.payment_id

      INNER JOIN invoices i
        ON i.id = r.invoice_id

      LEFT JOIN reports rep
        ON rep.id = i.report_id

      WHERE r.id = $1
      `,
      [id]
    );

    if (receipt.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Receipt not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      receipt: receipt[0],
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load receipt",
      },
      {
        status: 500,
      }
    );
  }
}