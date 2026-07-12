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

    // -----------------------------
    // Invoice Header + Patient
    // -----------------------------

    const invoice = await query(
      `
      SELECT
        i.*,

        r.patient_name,
        r.age,
        r.sex,
        r.tel,
        r.residence,
        r.reporting_date

      FROM invoices i

      LEFT JOIN reports r
      ON r.id = i.report_id

      WHERE i.id = $1
      `,
      [id]
    );

    if (invoice.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Invoice Items
    // -----------------------------

    const items = await query(
      `
      SELECT
        *
      FROM invoice_items
      WHERE invoice_id = $1
      ORDER BY id
      `,
      [id]
    );
    const payments = await query(
  `
  SELECT
    id,
    receipt_id,
    payment_date,
    amount,
    payment_method,
    reference_no,
    notes,
    received_by,
    created_at

  FROM invoice_payments

  WHERE invoice_id = $1

  ORDER BY payment_date DESC, id DESC
  `,
  [id]
);


   return NextResponse.json({
  success: true,
  invoice: invoice[0],
  items,
  payments,
});

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load invoice",
      },
      {
        status: 500,
      }
    );
  }
}