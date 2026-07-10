import { NextRequest, NextResponse } from "next/server";
import { execute, query } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            reportId,
            serviceId,
            customerType,
            organization,
            contactPerson,
            insuranceCompany,
            policyNumber,
            authorizationNumber,
            billingType,
            paymentMethod,
            paymentTerms,
            subtotal,
            discount,
            vatRate,
            vatAmount,
            total,
            amountPaid,
            balance,
            diagnosis,
            notes,
            createdBy,
            items,
        } = body;

        // ------------------------------------------------
        // Generate next invoice number
        // ------------------------------------------------

        const last = await query<{ invoice_no: string }>(`
      SELECT invoice_no
      FROM invoices
      ORDER BY id DESC
      LIMIT 1
    `);

        let invoiceNo = "NINV-000001";

        if (last.length > 0) {
            const current =
                parseInt(last[0].invoice_no.replace("NINV-", "")) + 1;

            invoiceNo =
                "NINV-" + current.toString().padStart(6, "0");
        }

        // ------------------------------------------------
        // Save invoice
        // ------------------------------------------------

        const result = await execute(
            `
      INSERT INTO invoices
      (
        invoice_no,
        report_id,
        service_id,
        customer_type,
        organization,
        contact_person,
        insurance_company,
        policy_number,
        authorization_number,
        billing_type,
        payment_method,
        payment_terms,
        subtotal,
        discount,
        vat_rate,
        vat_amount,
        total,
        amount_paid,
        balance,
        diagnosis,
        notes,
        status,
        created_by
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,
        $10,$11,$12,$13,$14,$15,$16,
        $17,$18,$19,$20,$21,$22,$23
      )
      RETURNING id
      `,
            [
                invoiceNo,
                reportId,
                serviceId,
                customerType,
                organization,
                contactPerson,
                insuranceCompany,
                policyNumber,
                authorizationNumber,
                billingType,
                paymentMethod,
                paymentTerms,
                subtotal,
                discount,
                vatRate,
                vatAmount,
                total,
                amountPaid,
                balance,
                diagnosis,
                notes,
                "UNPAID",
                createdBy,
            ]
        );

        const invoiceId = result.rows[0].id;

        // ------------------------------------------------
        // Save invoice items
        // ------------------------------------------------

        for (const item of items) {
            await execute(
                `
        INSERT INTO invoice_items
        (
          invoice_id,
          service_item_id,
          item_code,
          description,
          quantity,
          unit_price,
          line_total
        )
        VALUES
        (
          $1,$2,$3,$4,$5,$6,$7
        )
        `,
                [
                    invoiceId,
                    item.id === 0 ? null : item.id,
                    item.item_code,
                    item.description,
                    item.quantity,
                    item.unitPrice,
                    item.quantity * item.unitPrice,
                ]
            );
        }

        return NextResponse.json({
            success: true,
            invoiceId,
            invoiceNo,
        });

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create invoice",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET() {
    try {

        const invoices = await query(
            `
      SELECT
        id,
        invoice_no,
        created_at,
        customer_type,
        organization,
        total,
        amount_paid,
        balance,
        status
      FROM invoices
      ORDER BY id DESC
      `
        );

        return NextResponse.json(invoices);

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load invoices",
            },
            {
                status: 500,
            }
        );

    }
}