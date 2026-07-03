"use client";

import { useEffect, useState } from "react";
import {
  getReport,
  getReports,
  deleteReport,
} from "@/lib/actions/admin";
import ReportViewer from "./ReportViewer";

import {
  Search,
  Trash2,
  Eye,
  Pencil,
  RefreshCcw,
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
};

type Props = {
  reports: Report[];
  loading: boolean;
  onRefresh: () => void;
  onEdit: (report: Report) => void;
};

export default function ReportsHistory({
  reports,
  onRefresh,
  onEdit,
}: Props) {

  const [filtered, setFiltered] =
    useState(reports);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);



  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      reports.filter(
        (r) =>
          r.patient_name.toLowerCase().includes(keyword) ||
          r.report_no.toLowerCase().includes(keyword)
      )
    );
  }, [search, reports]);
  
  async function handleEdit(id: number) {
  const report = await getReport(id);

  if (!report) return;

  onEdit(report);
}

  async function handleDelete(id: number) {
    const confirmed = confirm(
      "Delete this report permanently?"
    );

    if (!confirmed) return;

    const result = await deleteReport(id);

    if (result.success) {
      await onRefresh();
    }
  }

  async function handleView(id: number) {
    const report = await getReport(id);

    if (!report) return;

    setSelectedReport(report);
    setViewerOpen(true);
  }
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Assessment Reports
        </h2>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 border rounded-xl px-4 py-2 hover:bg-slate-100"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>

      </div>

      <div className="relative mb-6">

        <Search
          className="absolute left-4 top-3 text-gray-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patient or report number..."
          className="w-full rounded-xl border pl-11 pr-4 py-3"
        />

      </div>

      <div className="overflow-x-auto">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b bg-slate-100">

                <th className="p-4 text-left">
                  Report No
                </th>

                <th className="p-4 text-left">
                  Patient
                </th>

                <th className="p-4">
                  Age
                </th>

                <th className="p-4">
                  Sex
                </th>

                <th className="p-4">
                  Date
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((report) => (

                <tr
                  key={report.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    {report.report_no}
                  </td>

                  <td className="p-4">
                    {report.patient_name}
                  </td>

                  <td className="p-4 text-center">
                    {report.age}
                  </td>

                  <td className="p-4 text-center">
                    {report.sex}
                  </td>

                  <td className="p-4">
                    {report.reporting_date}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleView(report.id)}
                        className="p-2 rounded-lg hover:bg-slate-200"
                      >
                        <Eye size={18} />
                      </button>
<button
  onClick={() => handleEdit(report.id)}
  className="p-2 rounded-lg hover:bg-blue-100"
  title="Edit report"
>
    <Pencil size={18} />
</button>

                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <ReportViewer
        open={viewerOpen}
        report={selectedReport}
        onClose={() => {
          setViewerOpen(false);
          setSelectedReport(null);
        }}
      />

    </div>
  );
}