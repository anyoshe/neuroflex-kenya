"use client";

import ClinicHeader from "./ClinicHeader";

type Props = {
  receipt: any;
};

export default function ReceiptTemplate({
  receipt,
}: Props) {
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] mx-auto p-8 text-gray-800">
  

      <ClinicHeader title="Official Payment Receipt" />

      {/* Receipt Details */}

   
      <div className="grid grid-cols-2 gap-4 mt-4">

        <Info
          label="Receipt Number"
          value={receipt.receipt_no}
        />

        <Info
          label="Receipt Date"
          value={new Date(receipt.receipt_date).toLocaleDateString()}
        />

        <Info
          label="Invoice Number"
          value={receipt.invoice_no}
        />

        <Info
          label="Patient"
          value={receipt.patient_name}
        />

        <Info
          label="Telephone"
          value={receipt.tel}
        />

        <Info
          label="Residence"
          value={receipt.residence}
        />

      </div>

      {/* Payment */}

    
      <div className="border rounded-2xl mt-5 break-inside-avoid">

        <div className="bg-gray-100 px-6 py-3 font-semibold">
          Payment Details
        </div>

       <div className="p-4 space-y-2">

          <Row
            label="Payment Method"
            value={receipt.payment_method}
          />

          <Row
            label="Reference"
            value={receipt.reference_no || "-"}
          />

          <Row
            label="Amount Received"
            value={`KSh ${Number(receipt.amount).toLocaleString()}`}
            bold
          />

        </div>

      </div>

      {/* Invoice Summary */}

    
      
        <div className="border rounded-2xl mt-5 break-inside-avoid">

        <div className="bg-gray-100 px-6 py-3 font-semibold">
          Invoice Summary
        </div>

       <div className="p-4 space-y-2">

          <Row
            label="Invoice Total"
            value={`KSh ${Number(receipt.total).toLocaleString()}`}
          />

          <Row
            label="Total Paid"
            value={`KSh ${Number(receipt.amount_paid).toLocaleString()}`}
          />

          <Row
            label="Outstanding Balance"
            value={`KSh ${Number(receipt.balance).toLocaleString()}`}
            bold
          />

        </div>

      </div>

      {/* Footer */}

     <div className="mt-6 text-center text-xs text-gray-600">

        <p className="font-semibold">
          Thank you for choosing Neuroflex Kenya.
        </p>

        <p>
          This receipt confirms payment received.
        </p>

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

      <p className="font-semibold mt-1">
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
        {value}
      </span>

    </div>
  );
}