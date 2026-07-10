"use client";
import { useEffect, useState, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { X, Printer } from "lucide-react";
import InvoiceTemplate from "./InvoiceTemplate";


type Props = {
    invoiceId: number | null;
    open: boolean;
    onClose: () => void;
};

export default function InvoicePreview({
    invoiceId,
    open,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState<any>(null);
    const total = Number(invoice?.invoice?.total ?? 0);

    const paid = Number(invoice?.invoice?.amount_paid ?? 0);

    const printRef = useRef<HTMLDivElement>(null);


    const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle:
        paid >= total
            ? `CASH SALE ${invoice?.invoice?.invoice_no}`
            : `INVOICE ${invoice?.invoice?.invoice_no}`,
});
    
  

    useEffect(() => {
        if (!open || !invoiceId) return;

        loadInvoice();
    }, [invoiceId, open]);

    async function loadInvoice() {
        try {
            setLoading(true);

            const res = await fetch(`/api/invoices/${invoiceId}`);

            const data = await res.json();

            setInvoice(data);

        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center p-6">

            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-auto shadow-2xl">

                <div className="sticky top-0 bg-white border-b px-8 py-5 flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Invoice Preview
                    </h2>

                    <div className="flex gap-3">

                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 rounded-xl border flex items-center gap-2"
                        >
                            <Printer size={18} />
                            Print
                        </button>


                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-gray-100"
                        >
                            <X />
                        </button>

                    </div>

                </div>

                {loading && (
                    <div className="p-10">
                        Loading invoice...
                    </div>
                )}

                {!loading && invoice && (

                    <div
                        ref={printRef}
                        className="bg-gray-200 p-8 flex justify-center"
                    >
                        <InvoiceTemplate
                            invoice={{
                                ...invoice.invoice,
                                items: invoice.items,
                            }}
                        />
                    </div>
                )}

            </div>

        </div>
    );
}