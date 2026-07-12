"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Printer,
  Pencil,
  CreditCard,
  Search,
  MoreHorizontal,
} from "lucide-react";
import InvoicePreview from "./invoices/InvoicePreview";
import InvoiceView from "./invoices/InvoiceView";
import RecordPaymentModal from "./invoices/RecordPaymentModal";

type Invoice = {
  id: number;
  invoice_no: string;
  created_at: string;

  patient_name: string;

  customer_type: string;
  organization: string;

  total: string;
  amount_paid: string;
  balance: string;
  status: string;
};

export default function InvoicesPanel() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const [selectedInvoiceId, setSelectedInvoiceId] =
    useState<number | null>(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [viewInvoiceId, setViewInvoiceId] =
    useState<number | null>(null);

  const [paymentOpen, setPaymentOpen] = useState(false);

  const [paymentInvoiceId, setPaymentInvoiceId] =
    useState<number | null>(null);
  async function loadInvoices() {
    try {
      setLoading(true);

      const res = await fetch("/api/invoices");

      const data = await res.json();

      setInvoices(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);
  const filteredInvoices = invoices.filter((invoice) => {
    const term = search.toLowerCase();

    return (
      invoice.invoice_no.toLowerCase().includes(term) ||
      invoice.patient_name.toLowerCase().includes(term) ||
      (invoice.organization || "")
        .toLowerCase()
        .includes(term)
    );
  });
  const totalInvoices = invoices.length;

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount_paid),
    0
  );

  const outstandingBalance = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.balance),
    0
  );

  const unpaidInvoices = invoices.filter(
    (invoice) => Number(invoice.balance) > 0
  ).length;

  return (
    <div className="bg-white rounded-3xl shadow-xl">

      <div className="border-b px-5 md:px-8 py-6">

        <h2 className="text-3xl font-bold text-brand-navy">
          Invoices
        </h2>

        <p className="text-gray-500 mt-2">
          Manage all generated invoices.
        </p>

        <div className="mt-6 relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border pl-11 pr-4 py-3 focus:ring-2 focus:ring-brand-green"
          />
        </div>

      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 px-5 md:px-8 pb-8">

        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
          <p className="text-sm text-blue-600 font-medium">
            Total Invoices
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {totalInvoices}
          </h3>
        </div>

        <div className="rounded-2xl bg-green-50 border border-green-100 p-6">
          <p className="text-sm text-green-700 font-medium">
            Revenue Collected
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            KSh {totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-6">
          <p className="text-sm text-orange-700 font-medium">
            Outstanding Balance
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            KSh {outstandingBalance.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-red-50 border border-red-100 p-6">
          <p className="text-sm text-red-700 font-medium">
            Unpaid Invoices
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {unpaidInvoices}
          </h3>
        </div>

      </div>

      {loading ? (

        <div className="p-8">
          Loading invoices...
        </div>

      ) : (
        <div className="hidden lg:block overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">Invoice No</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Patient</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-right p-4">Total</th>
                <th className="text-right p-4">Paid</th>
                <th className="text-right p-4">Balance</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Actions</th>


              </tr>

            </thead>

            <tbody>

              {filteredInvoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {invoice.invoice_no}
                  </td>

                  <td className="p-4">
                    {new Date(invoice.created_at)
                      .toLocaleDateString()}
                  </td>

                  <td className="p-4 font-medium">
                    {invoice.patient_name}
                  </td>

                  <td className="p-4">
                    {invoice.customer_type === "PRIVATE"
                      ? "Private"
                      : invoice.organization}
                  </td>


                  <td className="p-4 text-right">
                    KSh {Number(invoice.total).toLocaleString()}
                  </td>

                  <td className="p-4 text-right">
                    KSh {Number(invoice.amount_paid).toLocaleString()}
                  </td>

                  <td className="p-4 text-right">
                    KSh {Number(invoice.balance).toLocaleString()}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                       ${invoice.status === "PAID"
                          ? "bg-green-100 text-green-700"

                          : invoice.status === "PARTIALLY PAID"
                            ? "bg-yellow-100 text-yellow-700"

                            : invoice.status === "DRAFT"
                              ? "bg-gray-200 text-gray-700"

                              : "bg-red-100 text-red-700"
                        }
                 `}
                    >
                      {invoice.status}
                    </span>

                  </td>
                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setViewInvoiceId(invoice.id);
                          setViewOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-100"
                        title="View Invoice"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedInvoiceId(invoice.id);
                          setPreviewOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-green-100"
                        title="Print Invoice"
                      >
                        <Printer size={18} />
                      </button>

                      <button
                        disabled={Number(invoice.balance) <= 0}
                        onClick={() => {
                          setPaymentInvoiceId(invoice.id);
                          setPaymentOpen(true);
                        }}
                        className={`p-2 rounded-lg
        ${Number(invoice.balance) <= 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "hover:bg-purple-100"
                          }`}
                        title={
                          Number(invoice.balance) <= 0
                            ? "Invoice fully paid"
                            : "Record Payment"
                        }
                      >
                        <CreditCard size={18} />
                      </button>
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>



      )}
      <div className="lg:hidden p-4 space-y-4">

        {filteredInvoices.map((invoice) => (

          <div
            key={invoice.id}
            className="rounded-2xl border bg-white shadow-sm p-5"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-brand-navy">
                  {invoice.invoice_no}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${invoice.status === "PAID"
                    ? "bg-green-100 text-green-700"

                    : invoice.status === "PARTIALLY PAID"
                      ? "bg-yellow-100 text-yellow-700"

                      : invoice.status === "DRAFT"
                        ? "bg-gray-200 text-gray-700"

                        : "bg-red-100 text-red-700"
                  }
`}
              >
                {invoice.status}
              </span>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

              <div>

                <p className="text-gray-500">Customer</p>

                <p className="font-semibold">
                  {invoice.organization || "Private Patient"}
                </p>

              </div>

              <div>

                <p className="text-gray-500">Total</p>

                <p className="font-semibold">
                  KSh {Number(invoice.total).toLocaleString()}
                </p>

              </div>

              <div>

                <p className="text-gray-500">Paid</p>

                <p className="font-semibold text-green-600">
                  KSh {Number(invoice.amount_paid).toLocaleString()}
                </p>

              </div>

              <div>

                <p className="text-gray-500">Balance</p>

                <p className="font-semibold text-red-600">
                  KSh {Number(invoice.balance).toLocaleString()}
                </p>

              </div>

            </div>

            <div className="mt-6 flex justify-between">

              <button
                onClick={() => {
                  setViewInvoiceId(invoice.id);
                  setViewOpen(true);
                }}
                className="p-2 rounded-lg hover:bg-blue-100"
                title="View Invoice"
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() => {
                  setSelectedInvoiceId(invoice.id);
                  setPreviewOpen(true);
                }}
                className="p-2 rounded-lg hover:bg-green-100"
                title="Print Invoice"
              >
                <Printer size={20} />
              </button>

              <button
                disabled={Number(invoice.balance) <= 0}
                onClick={() => {
                  setPaymentInvoiceId(invoice.id);
                  setPaymentOpen(true);
                }}
                className={`p-2 rounded-lg
        ${Number(invoice.balance) <= 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-purple-100"
                  }`}
                title={
                  Number(invoice.balance) <= 0
                    ? "Invoice fully paid"
                    : "Record Payment"
                }
              >
                <CreditCard size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>
      <InvoiceView
        open={viewOpen}
        invoiceId={viewInvoiceId}
        onClose={() => {
          setViewOpen(false);
          setViewInvoiceId(null);
        }}
      />

      <InvoicePreview
        open={previewOpen}
        invoiceId={selectedInvoiceId}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedInvoiceId(null);
        }}
      />

      <RecordPaymentModal
        open={paymentOpen}
        invoiceId={paymentInvoiceId}
        onClose={() => {
          setPaymentOpen(false);
          setPaymentInvoiceId(null);
        }}
        onSaved={() => {
          loadInvoices();
        }}
      />
    </div>
  );
}