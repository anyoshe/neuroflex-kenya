"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import RecordPaymentModal from "./RecordPaymentModal";
import ReceiptPreview from "./ReceiptPreview";

type Props = {
    open: boolean;
    invoiceId: number | null;
    onClose: () => void;
};

export default function InvoiceView({
    open,
    invoiceId,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState<any>(null);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [receiptOpen, setReceiptOpen] = useState(false);

const [receiptId, setReceiptId] = useState<number | null>(null);

    useEffect(() => {
        if (!open || !invoiceId) return;

        loadInvoice();
    }, [open, invoiceId]);

    async function loadInvoice() {
        try {
            setLoading(true);

            const res = await fetch(`/api/invoices/${invoiceId}`);

            const data = await res.json();

            setInvoice(data.invoice);

            // merge the items so the rest of your component doesn't change
            setInvoice({
                ...data.invoice,
                items: data.items,
                payments: data.payments,
            });

        } finally {
            setLoading(false);
        }
    }
    if (!open) return null;

    if (loading) {
        return (
            <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center">
                <div className="bg-white rounded-xl p-8">
                    Loading invoice...
                </div>
            </div>
        );
    }

    if (!invoice) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center p-4">

            <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">

                {/* Header */}

                <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center rounded-t-3xl">

                    <div>

                        <h2 className="text-2xl font-bold text-brand-navy">
                            {invoice.invoice_no}
                        </h2>

                        <p className="text-gray-500">

                            {invoice.patient_name}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100"
                    >
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-auto p-6 space-y-6">

                    <div className="bg-white rounded-2xl border p-6">

                        <div className="flex flex-col md:flex-row md:justify-between gap-4">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Invoice Type
                                </p>

                                <h3 className="text-xl font-bold">

                                    {Number(invoice.balance) <= 0
                                        ? "Cash Sale"
                                        : "Invoice"}

                                </h3>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <span
                                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${Number(invoice.balance) <= 0
                                        ? "bg-green-100 text-green-700"

                                        : Number(invoice.amount_paid) > 0
                                            ? "bg-yellow-100 text-yellow-700"

                                            : "bg-red-100 text-red-700"
                                        }`}
                                >

                                    {Number(invoice.balance) <= 0
                                        ? "PAID"

                                        : Number(invoice.amount_paid) > 0
                                            ? "PART PAID"

                                            : "UNPAID"}

                                </span>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total
                                </p>

                                <h3 className="text-3xl font-bold text-brand-green">

                                    KSh {Number(invoice.total).toLocaleString()}

                                </h3>

                            </div>

                        </div>

                    </div>
                    <div className="bg-white rounded-2xl border p-6">

                        <h3 className="text-lg font-bold text-brand-navy mb-5">
                            Patient Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <Info
                                label="Patient Name"
                                value={invoice.patient_name}
                            />

                            <Info
                                label="Telephone"
                                value={invoice.tel}
                            />

                            <Info
                                label="Residence"
                                value={invoice.residence}
                            />

                            <Info
                                label="Date"
                                value={new Date(invoice.created_at).toLocaleDateString()}
                            />

                            <Info
                                label="Payment Method"
                                value={invoice.payment_method}
                            />

                            <Info
                                label="Invoice Number"
                                value={invoice.invoice_no}
                            />

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border">

                        <div className="px-6 py-5 border-b">

                            <h3 className="text-lg font-bold text-brand-navy">
                                Invoice Items
                            </h3>

                        </div>

                        <div className="divide-y">

                            {invoice.items.map((item: any) => (

                                <div
                                    key={item.id}
                                    className="flex justify-between items-start p-5"
                                >

                                    <div>

                                        <h4 className="font-semibold">

                                            {item.description}

                                        </h4>

                                        <p className="text-sm text-gray-500">

                                            {item.item_code}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p>

                                            Qty: {item.quantity}

                                        </p>

                                        <p>

                                            KSh {Number(item.unit_price).toLocaleString()}

                                        </p>

                                        <p className="font-bold text-brand-green">

                                            KSh {Number(item.line_total).toLocaleString()}

                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border p-6">

                        <h3 className="text-lg font-bold text-brand-navy mb-5">

                            Payment Summary

                        </h3>

                        <div className="space-y-3">

                            <Row
                                label="Subtotal"
                                value={invoice.subtotal}
                            />

                            <Row
                                label="Discount"
                                value={invoice.discount}
                            />

                            {Number(invoice.vat_rate) > 0 && (

                                <Row
                                    label={`VAT (${invoice.vat_rate}%)`}
                                    value={invoice.vat_amount}
                                />

                            )}

                            <div className="border-t pt-4">

                                <Row
                                    label="Total"
                                    value={invoice.total}
                                    bold
                                />

                                <Row
                                    label="Amount Paid"
                                    value={invoice.amount_paid}
                                />

                                <Row
                                    label="Balance"
                                    value={invoice.balance}
                                    bold
                                />

                            </div>

                        </div>

                    </div>

                    {/* ================= CLINICAL DIAGNOSIS ================= */}

                    <div className="bg-white rounded-2xl border overflow-hidden">

                        <div className="bg-brand-navy text-white px-6 py-3">

                            <h3 className="font-semibold">
                                Clinical Diagnosis
                            </h3>

                        </div>

                        <div className="p-6 whitespace-pre-wrap leading-7 text-gray-700">

                            {invoice.diagnosis
                                ? invoice.diagnosis
                                : (
                                    <span className="italic text-gray-400">
                                        No clinical diagnosis recorded.
                                    </span>
                                )}

                        </div>

                    </div>

                    {/* ================= NOTES ================= */}

                    <div className="bg-white rounded-2xl border overflow-hidden">

                        <div className="bg-brand-navy text-white px-6 py-3">

                            <h3 className="font-semibold">
                                Notes
                            </h3>

                        </div>

                        <div className="p-6 whitespace-pre-wrap leading-7 text-gray-700">

                            {invoice.notes
                                ? invoice.notes
                                : (
                                    <span className="italic text-gray-400">
                                        No additional notes.
                                    </span>
                                )}

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border p-6">

                        <h3 className="text-lg font-bold text-brand-navy mb-5">

                            Payment Information

                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <Info
                                label="Billing Type"
                                value={invoice.billing_type}
                            />

                            <Info
                                label="Payment Method"
                                value={invoice.payment_method}
                            />

                            <Info
                                label="Payment Terms"
                                value={invoice.payment_terms}
                            />

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border p-6">

                        <h3 className="text-lg font-bold text-brand-navy mb-5">
                            Payment History
                        </h3>


                        {invoice.payments?.length === 0 ? (

                            <p className="text-gray-500 italic">
                                No payments recorded.
                            </p>

                        ) : (

                            <div className="space-y-4">

                                {invoice.payments.map((payment: any) => (

                                    <div
                                        key={payment.id}
                                        className="border rounded-xl p-4 flex flex-col md:flex-row md:justify-between gap-3"
                                    >

                                        <div>

                                            <p className="font-semibold">
                                                {payment.payment_method}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {new Date(payment.payment_date)
                                                    .toLocaleDateString()}
                                            </p>

                                            {payment.reference_no && (
                                                <p className="text-sm">
                                                    Ref: {payment.reference_no}
                                                </p>
                                            )}

                                        </div>


                                      
                                        <div className="text-right space-y-2">

    <p className="font-bold text-green-600">
        KSh {Number(payment.amount).toLocaleString()}
    </p>

    <p className="text-sm text-gray-500">
        Received by: {payment.received_by}
    </p>

    <button
        onClick={() => setReceiptId(payment.receipt_id)}
        className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-100"
    >
        View Receipt
    </button>

</div>



                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                </div>
                {/* Sticky Footer */}

                {/* <div className="border-t bg-white px-6 py-4"> */}
                <div className="border-t bg-white px-6 py-4 rounded-b-3xl shrink-0">

                    <div className="flex flex-wrap gap-3 justify-end">

                        <button className="px-5 py-3 rounded-xl border hover:bg-gray-100">

                            Print

                        </button>

                        <button className="px-5 py-3 rounded-xl border hover:bg-gray-100">

                            Download PDF

                        </button>

                        <button
                            onClick={() => setPaymentOpen(true)}
                            disabled={Number(invoice.balance) <= 0}
                            className={`px-5 py-3 rounded-xl text-white transition
        ${Number(invoice.balance) <= 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-brand-green hover:opacity-90"
                                }`}
                        >
                            {Number(invoice.balance) <= 0
                                ? "Invoice Fully Paid"
                                : "Record Payment"}
                        </button>

                    </div>

                </div>

            </div>

            <RecordPaymentModal
                open={paymentOpen}
                invoiceId={invoice.id}
                onClose={() => setPaymentOpen(false)}
                onSaved={(receiptId) => {

    setPaymentOpen(false);

    loadInvoice();

    setReceiptId(receiptId);

    setReceiptOpen(true);

}}
            />

            <ReceiptPreview
    open={receiptOpen}
    receiptId={receiptId}
    onClose={() => setReceiptOpen(false)}
/>

        </div>


    );


}
function Info({
    label,
    value,
}: {
    label: string;
    value: any;
}) {
    return (
        <div>
            <p className="text-xs uppercase text-gray-500 font-semibold">
                {label}
            </p>

            <p className="mt-1 font-medium text-gray-900">
                {value || "-"}
            </p>
        </div>
    );
}
function Row({
    label,
    value,
    bold = false,
}: {
    label: string;
    value: any;
    bold?: boolean;
}) {
    return (
        <div className="flex justify-between">

            <span className={bold ? "font-bold" : ""}>
                {label}
            </span>

            <span className={bold ? "font-bold" : ""}>
                KSh {Number(value).toLocaleString()}
            </span>

        </div>
    );
}