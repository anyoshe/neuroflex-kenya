"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReceiptPreview from "./ReceiptPreview";

type Props = {
    open: boolean;
    invoiceId: number | null;
    onClose: () => void;
onSaved: (receiptId: number) => void;
};

type Invoice = {
    id: number;
    invoice_no: string;
    total: string;
    amount_paid: string;
    balance: string;
};

export default function RecordPaymentModal({
    open,
    invoiceId,
    onClose,
    onSaved,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [referenceNo, setReferenceNo] = useState("");
    const [paymentDate, setPaymentDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [notes, setNotes] = useState("");
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
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function savePayment() {

        if (!amount || Number(amount) <= 0) {

            alert("Enter a valid payment amount.");

            return;

        }


        try {

            setSaving(true);


            const res = await fetch(
                `/api/invoices/${invoiceId}/payments`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({

                        amount: Number(amount),

                        paymentMethod,

                        referenceNo,

                        paymentDate,

                        notes,

                        receivedBy: "Admin"

                    }),

                }
            );


            const data = await res.json();



            if (!data.success) {

                alert(
                    data.message ||
                    "Failed to record payment"
                );

                return;

            }



            setReceiptId(data.receiptId);
            onSaved(data.receiptId);

onClose();



            // Open receipt preview instead of closing immediately
            setReceiptOpen(true);



        } catch (error) {

            console.error(error);

            alert("Something went wrong");


        } finally {

            setSaving(false);

        }

    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 md:px-8 py-5 shrink-0">

                    <h2 className="text-xl md:text-2xl font-bold">
                        Record Payment
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X />
                    </button>

                </div>

                {/* Body */}
                {loading || !invoice ? (

                    <div className="p-8">
                        Loading...
                    </div>

                ) : (

                    <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 space-y-6">

                        {/* Summary */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <p className="text-sm text-gray-500">Invoice</p>
                                <p className="font-semibold">{invoice.invoice_no}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Invoice Total</p>
                                <p className="font-semibold">
                                    KSh {Number(invoice.total).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Amount Paid
                                </p>

                                <p className="font-semibold text-green-600">
                                    KSh {Number(invoice.amount_paid).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Balance
                                </p>

                                <p className="font-semibold text-red-600">
                                    KSh {Number(invoice.balance).toLocaleString()}
                                </p>
                            </div>

                        </div>

                        <hr />

                        {/* Amount */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Amount Received
                            </label>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-brand-green"
                            />

                        </div>

                        {/* Payment Method */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Payment Method
                                </label>

                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full border rounded-xl p-3"
                                >
                                    <option>Cash</option>
                                    <option>M-Pesa</option>
                                    <option>Bank Transfer</option>
                                    <option>Cheque</option>
                                </select>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Reference No.
                                </label>

                                <input
                                    value={referenceNo}
                                    onChange={(e) => setReferenceNo(e.target.value)}
                                    className="w-full border rounded-xl p-3"
                                    placeholder="Optional"
                                />

                            </div>

                        </div>

                        {/* Payment Date */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Payment Date
                            </label>

                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="w-full border rounded-xl p-3"
                            />

                        </div>

                        {/* Notes */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Notes
                            </label>

                            <textarea
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full border rounded-xl p-3 resize-none"
                                placeholder="Optional notes..."
                            />

                        </div>

                    </div>

                )}

                {/* Footer */}

                {!loading && invoice && (

                    <div className="border-t px-5 md:px-8 py-5 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">

                        <button
                            onClick={onClose}
                            className="px-6 py-3 border rounded-xl hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={savePayment}
                            disabled={saving}
                            className="px-6 py-3 bg-brand-green text-white rounded-xl disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Payment"}
                        </button>
                    </div>

                )}

            </div>
            <ReceiptPreview
                open={receiptOpen}
                receiptId={receiptId}
                onClose={() => {
                    setReceiptOpen(false);

                    // Now close the payment modal too
                    onClose();
                }}
            />

        </div>
    );
}