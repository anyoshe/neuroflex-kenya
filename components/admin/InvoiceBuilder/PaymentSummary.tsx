// "use client";

// type InvoiceItem = {
//   id: number;
//   item_code: string;
//   description: string;
//   quantity: number;
//   unitPrice: number;
//   editable: boolean;
// };

// type Props = {
//   items: InvoiceItem[];

//   discount: number;
//   setDiscount: (value: number) => void;

//   amountPaid: number;
//   setAmountPaid: (value: number) => void;
// };

// export default function PaymentSummary({
//   items,
//   discount,
//   setDiscount,
//   amountPaid,
//   setAmountPaid,
// }: Props) {
//   const subtotal = items.reduce(
//     (sum, item) =>
//       sum + item.quantity * item.unitPrice,
//     0
//   );

//   const total = subtotal - discount;

//   const balance = total - amountPaid;

//   return (
//     <div className="rounded-2xl border bg-white">

//       <div className="border-b px-6 py-4">

//         <h3 className="text-xl font-bold text-brand-navy">
//           Payment Summary
//         </h3>

//       </div>

//       <div className="p-6 space-y-5">

//         <Row
//           label="Subtotal"
//           value={subtotal}
//         />

//         <div className="flex justify-between items-center">

//           <label className="font-medium">
//             Discount
//           </label>

//           <input
//             type="number"
//             value={discount}
//             onChange={(e) =>
//               setDiscount(Number(e.target.value))
//             }
//             className="w-40 rounded-lg border px-3 py-2 text-right"
//           />

//         </div>

//         <Row
//           label="Total"
//           value={total}
//           bold
//         />

//         <div className="flex justify-between items-center">

//           <label className="font-medium">
//             Amount Paid
//           </label>

//           <input
//             type="number"
//             value={amountPaid}
//             onChange={(e) =>
//               setAmountPaid(Number(e.target.value))
//             }
//             className="w-40 rounded-lg border px-3 py-2 text-right"
//           />

//         </div>

//         <Row
//           label="Balance"
//           value={balance}
//           bold
//           green={balance <= 0}
//         />

//       </div>

//     </div>
//   );
// }

// function Row({
//   label,
//   value,
//   bold,
//   green,
// }: {
//   label: string;
//   value: number;
//   bold?: boolean;
//   green?: boolean;
// }) {
//   return (
//     <div className="flex justify-between">

//       <span className={bold ? "font-bold" : ""}>
//         {label}
//       </span>

//       <span
//         className={
//           green
//             ? "font-bold text-green-600"
//             : bold
//             ? "font-bold"
//             : ""
//         }
//       >
//         KSh {value.toLocaleString()}
//       </span>

//     </div>
//   );
// }

"use client";

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
};

type Props = {
  items: InvoiceItem[];

  discount: number;
  setDiscount: (value: number) => void;

  vatRate: number;
  setVatRate: (value: number) => void;
};

export default function PaymentSummary({
  items,
  discount,
  setDiscount,
  vatRate,
  setVatRate,
}: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const taxable = subtotal - discount;

  const vatAmount = taxable * (vatRate / 100);

  const grandTotal = taxable + vatAmount;

  return (
    <div className="rounded-2xl border bg-white">

      <div className="border-b px-6 py-4">
        <h3 className="text-xl font-bold text-brand-navy">
          Payment Summary
        </h3>
      </div>

      <div className="p-6 space-y-4">

        <SummaryRow
          label="Subtotal"
          value={subtotal}
        />

        <div className="flex justify-between items-center">

          <span>Discount</span>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            className="w-36 rounded-lg border px-3 py-2 text-right"
          />

        </div>

        <SummaryRow
          label="Taxable Amount"
          value={taxable}
        />

        <div className="flex justify-between items-center">

          <span>VAT %</span>

          <input
            type="number"
            value={vatRate}
            onChange={(e) =>
              setVatRate(Number(e.target.value))
            }
            className="w-24 rounded-lg border px-3 py-2 text-right"
          />

        </div>

        <SummaryRow
          label="VAT Amount"
          value={vatAmount}
        />

        <hr />

        <div className="flex justify-between font-bold text-xl">

          <span>Total</span>

          <span>
            KSh {grandTotal.toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between">

      <span>{label}</span>

      <span>
        KSh {value.toLocaleString()}
      </span>

    </div>
  );
}