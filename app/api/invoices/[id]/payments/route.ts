import { NextRequest, NextResponse } from "next/server";
import { execute, query } from "@/lib/db";

type Params = Promise<{
    id: string;
}>;


// ================= CREATE PAYMENT =================

export async function POST(
    req: NextRequest,
    { params }: { params: Params }
) {

    try {

        const { id } = await params;

        const body = await req.json();

        const {
            amount,
            paymentMethod,
            referenceNo,
            paymentDate,
            notes,
            receivedBy,
        } = body;


        // Get invoice

        const invoice = await query<{
            total: string;
        }>(
            `
            SELECT total
            FROM invoices
            WHERE id=$1
            `,
            [id]
        );
        if (invoice.length === 0) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invoice not found"
                },
                {
                    status: 404
                }
            );

        }


        const paymentAmount = Number(amount);


        // Validate payment

        if (paymentAmount <= 0) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid payment amount"
                },
                {
                    status: 400
                }
            );

        }


        // Calculate current payments

        const payments = await query<{
            paid: string;
        }>(
                        `
            SELECT
                COALESCE(SUM(amount),0) AS paid
            FROM invoice_payments
            WHERE invoice_id=$1
            `,
                        [id]
        );

        const currentPaid = Number(payments[0].paid);

        const currentBalance =
            Number(invoice[0].total) - currentPaid;


        // ================================
        // Prevent payments on fully paid invoices
        // ================================

        if (currentBalance <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This invoice is already fully paid."
                },
                {
                    status: 400
                }
            );
        }


        // ================================
        // Prevent overpayments
        // ================================

        if (paymentAmount > currentBalance) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Payment exceeds invoice balance"
                },
                {
                    status: 400
                }
            );

        }

        // ----------------------------
        // Save payment
        // ----------------------------

        const paymentResult = await execute(
            `
            INSERT INTO invoice_payments
            (
                invoice_id,
                payment_date,
                amount,
                payment_method,
                reference_no,
                notes,
                received_by
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
            `,
            [
                id,
                paymentDate,
                paymentAmount,
                paymentMethod,
                referenceNo,
                notes,
                receivedBy,
            ]
        );

        const paymentId = paymentResult.rows[0].id;
        // ----------------------------
        // Generate receipt number
        // ----------------------------

        const lastReceipt = await query<{ receipt_no: string }>(
            `
            SELECT receipt_no
            FROM receipts
            ORDER BY id DESC
            LIMIT 1
            `
        );

        let receiptNo = "NRCPT-000001";

        if (lastReceipt.length > 0) {
            const next =
                parseInt(
                    lastReceipt[0].receipt_no.replace("NRCPT-", "")
                ) + 1;

            receiptNo =
                "NRCPT-" + next.toString().padStart(6, "0");
        }
        const receiptResult = await execute(
            `
            INSERT INTO receipts
            (
                receipt_no,
                payment_id,
                invoice_id,
                receipt_date,
                amount,
                created_by
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING id
  `,
            [
                receiptNo,
                paymentId,
                id,
                paymentDate,
                paymentAmount,
                receivedBy,
            ]
        );

        const receiptId = receiptResult.rows[0].id;
        await execute(
                        `
            UPDATE invoice_payments
            SET receipt_id = $1
            WHERE id = $2
            `,
            [receiptId, paymentId]
        );


        // Calculate totals
        const newAmountPaid =
            currentPaid + paymentAmount;

        const newBalance =
            Number(invoice[0].total) - newAmountPaid;



        let status = "UNPAID";


        if (newBalance <= 0) {

            status = "PAID";

        }
        else if (newAmountPaid > 0) {

            status = "PARTIALLY PAID";

        }



        // Update invoice

        await execute(
            `
            UPDATE invoices

            SET
                amount_paid=$1,
                balance=$2,
                status=$3

            WHERE id=$4
            `,
                    [
                newAmountPaid,
                newBalance,
                status,
                id
            ]
        );



        return NextResponse.json({
            success: true,
            status,
            receiptId,
            receiptNo,
        });


    } catch (error) {

        console.error(error);


        return NextResponse.json(
            {
                success: false,
                message: "Failed to record payment"
            },
            {
                status: 500
            }
        );

    }

}