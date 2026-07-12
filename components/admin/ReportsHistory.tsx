"use client";

import { useEffect, useState } from "react";
import {
  getReport,
  getReports,
  deleteReport,
} from "@/lib/actions/admin";
import ReportViewer from "./ReportViewer";
import InvoiceBuilder from "./InvoiceBuilder/InvoiceBuilder";

import {
  Search,
  Trash2,
  Eye,
  Pencil,
  RefreshCcw,
  Plus,
  Receipt,
} from "lucide-react";

type Report = {
  id: number;
  report_no: string;
  patient_name: string;
  age: number;
  sex: string;
  residence: string | null;
  tel: string | null;
  reporting_date: string;
  next_of_kin: string | null;
  presenting_history: string | null;
  assessment_findings: string | null;
  intervention: string | null;
  review: string | null;
  created_at: string;
  invoiced: boolean;
  invoice_id: number | null;
};

type Props = {
  reports: Report[];
  loading?: boolean;
  onRefresh: () => void;
  onEdit: (report: Report) => void;
};

export default function ReportsHistory({
  reports,
  onRefresh,
  onEdit,
}: Props) {
  const [filtered, setFiltered] = useState(reports);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceReport, setInvoiceReport] = useState<any>(null);

  // Search filter
  useEffect(() => {
    const keyword = search.toLowerCase().trim();
    setFiltered(
      reports.filter(
        (r) =>
          r.patient_name.toLowerCase().includes(keyword) ||
          r.report_no.toLowerCase().includes(keyword)
      )
    );
  }, [search, reports]);

  const handleEdit = async (id: number) => {
    const report = await getReport(id);
    if (report) onEdit(report);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this report permanently?")) return;
    const result = await deleteReport(id);
    if (result.success) onRefresh();
  };

  const handleView = async (id: number) => {
    const report = await getReport(id);
    if (report) {
      setSelectedReport(report);
      setViewerOpen(true);
    }
  };
  const handleInvoice = async (id: number) => {
    const report = await getReport(id);

    if (!report) return;

    setInvoiceReport(report);
    setInvoiceOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">
            Assessment Reports
          </h2>
          <p className="text-brand-green mt-1 text-sm md:text-base">
            Manage and view all patient physiotherapy reports
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-white border border-brand-teal hover:bg-brand-teal/5 text-brand-teal px-5 py-3 rounded-2xl font-medium transition-all active:scale-95"
        >
          <RefreshCcw size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-5 top-4 text-gray-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name or report number..."
          className="w-full bg-white border border-gray-200 focus:border-brand-teal focus:ring-brand-teal/20 pl-14 py-4 rounded-3xl text-lg placeholder:text-gray-400 transition-all"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 px-1">
        Showing {filtered.length} of {reports.length} reports
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden">
        <table className="w-full">

          <thead className="bg-brand-navy text-white">
            <tr>
              <th className="p-5 text-left font-semibold">Report No</th>
              <th className="p-5 text-left font-semibold">Patient Name</th>
              <th className="p-5 text-center font-semibold">Age</th>
              <th className="p-5 text-center font-semibold">Sex</th>
              <th className="p-5 text-left font-semibold">Date</th>
              <th className="p-5 text-center font-semibold">Invoice</th>
              <th className="p-5 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-brand-teal/5 transition-colors group"
              >
                <td className="p-5 font-mono font-semibold text-brand-navy">
                  {report.report_no}
                </td>
                <td className="p-5 font-medium">{report.patient_name}</td>
                <td className="p-5 text-center">{report.age}</td>
                <td className="p-5 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-sm">
                    {report.sex}
                  </span>
                </td>
                <td className="p-5 text-gray-600">
                  {new Date(report.reporting_date).toLocaleDateString()}
                </td>
                <td className="p-5 text-center">
                  {report.invoiced ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      Invoiced
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleView(report.id)}
                      className="p-3 hover:bg-blue-100 rounded-2xl transition-colors"
                      title="View Report"
                    >
                      <Eye size={20} className="text-brand-navy" />
                    </button>
                    <button
                      disabled={report.invoiced}
                      onClick={() => handleInvoice(report.id)}
                      className={`p-3 rounded-2xl transition-colors ${report.invoiced
                        ? "bg-gray-100 cursor-not-allowed"
                        : "hover:bg-emerald-100"
                        }`}
                      title={report.invoiced ? "Invoice already created" : "Create Invoice"}
                    >
                      <Receipt
                        size={20}
                        className={
                          report.invoiced ? "text-gray-400" : "text-emerald-600"
                        }
                      />
                    </button>
                    <button
                      disabled={report.invoiced}
                      onClick={() => handleEdit(report.id)}
                      className={`p-3 rounded-2xl transition-colors ${report.invoiced
                        ? "bg-gray-100 cursor-not-allowed"
                        : "hover:bg-amber-100"
                        }`}
                      title={
                        report.invoiced
                          ? "Cannot edit an invoiced report"
                          : "Edit"
                      }
                    >
                      <Pencil
                        size={20}
                        className={
                          report.invoiced
                            ? "text-gray-400"
                            : "text-amber-600"
                        }
                      />
                    </button>
                    <button
                      disabled={report.invoiced}
                      onClick={() => handleDelete(report.id)}
                      className={`p-3 rounded-2xl transition-colors ${report.invoiced
                        ? "bg-gray-100 cursor-not-allowed"
                        : "hover:bg-red-100"
                        }`}
                      title={
                        report.invoiced
                          ? "Cannot delete an invoiced report"
                          : "Delete"
                      }
                    >
                      <Trash2
                        size={20}
                        className={
                          report.invoiced
                            ? "text-gray-400"
                            : "text-red-600"
                        }
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No reports found matching your search.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-mono text-brand-navy font-bold text-lg">
                  {report.report_no}
                </p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {report.patient_name}
                </p>
              </div>
              <span className="px-4 py-1.5 bg-brand-teal/10 text-brand-teal rounded-full text-sm font-medium">
                {report.sex} • {report.age}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-5">
              Reported: {new Date(report.reporting_date).toLocaleDateString()}
            </div>
            <div className="mb-5">
              {report.invoiced ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Invoiced
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  Pending
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleView(report.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white py-3.5 rounded-2xl transition-all active:scale-[0.985]"
              >
                <Eye size={18} />
                View
              </button>

              <button
                disabled={report.invoiced}
                onClick={() => handleEdit(report.id)}
                className={`p-3 rounded-2xl transition-colors ${report.invoiced
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-amber-100"
                  }`}
                title={
                  report.invoiced
                    ? "Cannot edit an invoiced report"
                    : "Edit"
                }
              >
                <Pencil
                  size={20}
                  className={
                    report.invoiced
                      ? "text-gray-400"
                      : "text-amber-600"
                  }
                />
              </button>
              <button
                disabled={report.invoiced}
                onClick={() => handleInvoice(report.id)}
                className={`p-3 rounded-2xl transition-colors ${report.invoiced
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-emerald-100"
                  }`}
                title={report.invoiced ? "Invoice already created" : "Create Invoice"}
              >
                <Receipt
                  size={20}
                  className={
                    report.invoiced ? "text-gray-400" : "text-emerald-600"
                  }
                />
              </button>

              <button
                disabled={report.invoiced}
                onClick={() => handleDelete(report.id)}
                className={`p-3 rounded-2xl transition-colors ${report.invoiced
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-red-100"
                  }`}
                title={
                  report.invoiced
                    ? "Cannot delete an invoiced report"
                    : "Delete"
                }
              >
                <Trash2
                  size={20}
                  className={
                    report.invoiced
                      ? "text-gray-400"
                      : "text-red-600"
                  }
                />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <p className="text-gray-500">No reports found.</p>
          </div>
        )}
      </div>

      {/* Report Viewer Modal */}
      <ReportViewer
        open={viewerOpen}
        report={selectedReport}
        onClose={() => {
          setViewerOpen(false);
          setSelectedReport(null);
        }}
      />
      <InvoiceBuilder
        open={invoiceOpen}
        report={invoiceReport}
        onClose={() => {
          setInvoiceOpen(false);
          setInvoiceReport(null);
        }}
      />
    </div>
  );
}