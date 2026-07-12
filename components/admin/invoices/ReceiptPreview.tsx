"use client";

import { useEffect, useRef, useState } from "react";
import { X, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import ReceiptTemplate from "./ReceiptTemplate";
type Props = {
  open: boolean;
  receiptId: number | null;
  onClose: () => void;
};

export default function ReceiptPreview({
  open,
  receiptId,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any>(null);

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !receiptId) return;

    loadReceipt();
  }, [open, receiptId]);

  async function loadReceipt() {
    try {
      setLoading(true);

      const res = await fetch(`/api/receipts/${receiptId}`);
      const data = await res.json();

      setReceipt(data.receipt);
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-${receipt?.receipt_no}`,
});

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col">

        {/* Header */}

        <div className="border-b px-6 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Payment Receipt
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        {loading ? (

          <div className="p-8">
            Loading...
          </div>

        ) : (

          <div
    ref={printRef}
    className="flex-1 overflow-auto bg-gray-200 p-8 flex justify-center"
>
    <ReceiptTemplate
        receipt={receipt}
    />
</div>

        )}

        {/* Footer */}

        <div className="border-t px-6 py-5 flex justify-end gap-3">

          <button
          onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-brand-green text-white flex items-center gap-2"
          >
            <Printer size={18} />
            Print Receipt
          </button>

        </div>

      </div>

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
      <p className="text-xs uppercase text-gray-500">
        {label}
      </p>

      <p className="font-semibold">
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
    <div className="flex justify-between py-2">

      <span className={bold ? "font-bold" : ""}>
        {label}
      </span>

      <span className={bold ? "font-bold" : ""}>
        {value}
      </span>

    </div>
  );
}