"use client";

import Image from "next/image";

type Props = {
    invoice: any;
};

export default function InvoiceTemplate({
    invoice,
}: Props) {

    const isCashSale =
        Number(invoice.balance) <= 0;

    return (

        // <div className="relative bg-white text-black max-w-[210mm] mx-auto px-8 py-8">
        <div
            className="
        relative
        bg-white
        text-black
        w-[210mm]
        min-h-[297mm]
        mx-auto
        px-[15mm]
        py-[15mm]
    "
        >
            {Number(invoice.balance) <= 0 ? (

                <div className="absolute top-48 right-10 rotate-[-25deg]">

                    <div className="border-[6px] border-green-600 text-green-600 px-10 py-4 rounded-xl text-6xl font-extrabold opacity-15">

                        PAID

                    </div>

                </div>

            ) : Number(invoice.amount_paid) > 0 ? (

                <div className="absolute top-48 right-8 rotate-[-25deg]">

                    <div className="border-[6px] border-yellow-600 text-yellow-600 px-10 py-4 rounded-xl text-5xl font-extrabold opacity-15">

                        PART PAID

                    </div>

                </div>

            ) : (

                <div className="absolute top-48 right-8 rotate-[-25deg]">

                    <div className="border-[6px] border-red-600 text-red-600 px-10 py-4 rounded-xl text-5xl font-extrabold opacity-15">

                        UNPAID

                    </div>

                </div>

            )}

            <div className="border-b pb-2">

                <div className="flex justify-between items-start">

                    <Image
                        src="/assets/logos/logo3cropped.jpeg"
                        alt="Neuroflex Kenya"
                        width={250}
                        height={100}
                        className="object-contain"
                    />

                    <div className="text-right text-sm">

                        <p>P.O. Box 054-00506 Nairobi</p>

                        <p>+254 729 213 135</p>

                        <p>info@neuroflexkenya.com</p>

                        <p>www.neuroflexkenya.com</p>

                    </div>

                </div>

                <p className="text-center text-brand-green">

                    Physiotherapy • Neurorehabilitation • Wellness Centre

                </p>

                <div className="h-1 bg-gradient-to-r from-brand-green via-brand-teal to-brand-navy rounded-full my-3" />

                <h2 className="text-center text-2xl font-bold tracking-widest">

                    {isCashSale ? "CASH SALE" : "INVOICE"}

                </h2>

            </div>
            <div className="grid grid-cols-2 gap-10 mt-4">

                <div className="space-y-2">

                    <p>
                        <strong>Invoice No:</strong> {invoice.invoice_no}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(invoice.created_at).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Patient:</strong> {invoice.patient_name}
                    </p>

                    

                </div>

                <div className="space-y-2">

                    

                    <p>
                        <strong>Payment:</strong> {invoice.payment_method}
                    </p>

                    <p>
                        <strong>Status:</strong> {invoice.status}
                    </p>
                    <p>
                        <strong>Telephone:</strong> {invoice.tel}
                    </p>

                </div>

            </div>


            {/* ================= ITEMS ================= */}

            <div className="mt-4">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-brand-navy text-white">

                            <th className="text-left px-3 py-3 w-24">
                                Code
                            </th>

                            <th className="text-left px-3 py-3">
                                Description
                            </th>

                            <th className="text-center px-3 py-3 w-20">
                                Qty
                            </th>

                            <th className="text-right px-3 py-3 w-36">
                                Unit Price
                            </th>

                            <th className="text-right px-3 py-3 w-36">
                                Total
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {invoice.items.map((item: any) => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="px-3 py-3">
                                    {item.item_code}
                                </td>

                                <td className="px-3 py-3">
                                    {item.description}
                                </td>

                                <td className="text-center px-3 py-3">
                                    {item.quantity}
                                </td>

                                <td className="text-right px-3 py-3">
                                    {
                                        Number(item.unit_price).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}

                                </td>

                                <td className="text-right px-3 py-3 font-medium">

                                    {
                                        Number(item.line_total).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ================= TOTALS ================= */}

            <div className="mt-10 flex justify-end">

                <div className="w-[320px]">

                    <div className="flex justify-between py-2">
                        <span>Subtotal</span>
                        <span>
                            KSh {
                                Number(invoice.subtotal).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                        </span>
                    </div>

                    <div className="flex justify-between py-2">
                        <span>Discount</span>
                        <span>
                            KSh {
                                Number(invoice.discount).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                        </span>
                    </div>

                    {Number(invoice.vat_rate) > 0 && (
                        <>
                            <div className="flex justify-between py-2">
                                <span>
                                    VAT ({invoice.vat_rate}%)
                                </span>

                                <span>
                                    KSh {
                                        Number(invoice.vat_amount).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                </span>
                            </div>
                        </>
                    )}

                    <div className="border-t-2 border-brand-green mt-2 pt-3 flex justify-between text-xl font-bold">

                        <span>Total</span>

                        <span>
                            KSh {Number(invoice.total).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}

                        </span>

                    </div>

                    <div className="flex justify-between py-2">
                        <span>Amount Paid</span>

                        <span>
                            KSh {
                                Number(invoice.amount_paid).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                        </span>
                    </div>

                    <div className="flex justify-between text-lg font-semibold">

                        <span>Balance</span>

                        <span>
                            KSh {
                                Number(invoice.balance).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                        </span>

                    </div>

                </div>

            </div>
              <div className="border-b-2 border-brand-green mt-5" />

            <div className="mt-15">

                <div className="grid grid-cols-3 gap-8">

                    <div>


                        <span>
                            Prepared By: <strong>{invoice.created_by}</strong>
                        </span>

                        <div className="border-b-2 border-brand-green mt-10" />


                    </div>

                    <div>

                        <p className="font-semibold">
                            Authorized By
                        </p>

                        <div className="border-b-2 border-brand-green mt-10" />

                    </div>

                    <div>

                        <p className="font-semibold">
                            Received By
                        </p>

                        <div className="border-b-2 border-brand-green mt-10" />

                    </div>

                </div>

            </div>

            <div className="mt-12 pt-4 border-t-4 border-brand-green flex justify-between text-xs text-gray-600">

                <span>

                    Thank you for choosing Neuroflex Kenya.

                </span>

                <span>

                    {invoice.invoice_no}

                </span>

            </div>

        </div>

    );

}
