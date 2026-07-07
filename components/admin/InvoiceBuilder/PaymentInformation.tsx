"use client";
import {
  PAYMENT_METHODS,
  BILLING_TYPES,
  PAYMENT_TERMS,
} from "@/lib/config/paymentMethods";

type Props = {
  billingType: string;
  setBillingType: (value: string) => void;

  paymentMethod: string;
  setPaymentMethod: (value: string) => void;

  paymentTerms: string;
  setPaymentTerms: (value: string) => void;

  referenceNumber: string;
  setReferenceNumber: (value: string) => void;

  amountPaid: number;
  setAmountPaid: (value: number) => void;

  total: number;
};

export default function PaymentInformation({
  billingType,
  setBillingType,
  paymentMethod,
  setPaymentMethod,
  paymentTerms,
  setPaymentTerms,
  referenceNumber,
  setReferenceNumber,
  amountPaid,
  setAmountPaid,
  total,
}: Props) {

  const balance = total - amountPaid;

  return (

    <div className="rounded-2xl border bg-white">

      <div className="border-b px-6 py-4">

        <h3 className="text-xl font-bold text-brand-navy">
          Payment Information
        </h3>

      </div>

      <div className="p-6 grid md:grid-cols-2 gap-5">

        <div>

          <label className="font-medium">
            Billing Type
          </label>

          <select
            value={billingType}
            onChange={(e)=>setBillingType(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
            {BILLING_TYPES.map((type) => (
  <option
    key={type.value}
    value={type.value}
  >
    {type.label}
  </option>
))}
          </select>

        </div>

        <div>

          <label className="font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e)=>setPaymentMethod(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
           {PAYMENT_METHODS.map((method) => (
  <option
    key={method}
    value={method}
  >
    {method}
  </option>
))}
          </select>

        </div>

        <div>

          <label className="font-medium">
            Payment Terms
          </label>

          <select
            value={paymentTerms}
            onChange={(e)=>setPaymentTerms(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
            {PAYMENT_TERMS.map((term) => (
  <option
    key={term}
    value={term}
  >
    {term}
  </option>
))}
          </select>

        </div>

        <div>

          <label className="font-medium">
            Reference No
          </label>

          <input
            value={referenceNumber}
            onChange={(e)=>setReferenceNumber(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="font-medium">
            Amount Paid
          </label>

          <input
            type="number"
            value={amountPaid}
            onChange={(e)=>setAmountPaid(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="font-medium">
            Balance
          </label>

          <div className="mt-2 rounded-xl bg-gray-100 p-3 font-bold text-red-600">

            KSh {balance.toLocaleString()}

          </div>

        </div>

      </div>

    </div>

  );

}