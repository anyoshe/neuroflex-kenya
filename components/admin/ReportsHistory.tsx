// "use client";

// import { useEffect, useState } from "react";
// import {
//   getReport,
//   getReports,
//   deleteReport,
// } from "@/lib/actions/admin";
// import ReportViewer from "./ReportViewer";

// import {
//   Search,
//   Trash2,
//   Eye,
//   Pencil,
//   RefreshCcw,
// } from "lucide-react";

// type Report = {
//   id: number;
//   report_no: string;
//   patient_name: string;
//   age: number;
//   sex: string;

//   residence: string | null;
//   tel: string | null;
//   reporting_date: string;
//   next_of_kin: string | null;
//   presenting_history: string | null;
//   assessment_findings: string | null;
//   intervention: string | null;
//   review: string | null;

//   created_at: string;
// };

// type Props = {
//   reports: Report[];
//   loading: boolean;
//   onRefresh: () => void;
//   onEdit: (report: Report) => void;
// };

// export default function ReportsHistory({
//   reports,
//   onRefresh,
//   onEdit,
// }: Props) {

//   const [filtered, setFiltered] =
//     useState(reports);
//   const [search, setSearch] = useState("");
//   const [selectedReport, setSelectedReport] = useState<any>(null);
//   const [viewerOpen, setViewerOpen] = useState(false);



//   useEffect(() => {
//     const keyword = search.toLowerCase();

//     setFiltered(
//       reports.filter(
//         (r) =>
//           r.patient_name.toLowerCase().includes(keyword) ||
//           r.report_no.toLowerCase().includes(keyword)
//       )
//     );
//   }, [search, reports]);

//   async function handleEdit(id: number) {
//     const report = await getReport(id);

//     if (!report) return;

//     onEdit(report);
//   }

//   async function handleDelete(id: number) {
//     const confirmed = confirm(
//       "Delete this report permanently?"
//     );

//     if (!confirmed) return;

//     const result = await deleteReport(id);

//     if (result.success) {
//       await onRefresh();
//     }
//   }

//   async function handleView(id: number) {
//     const report = await getReport(id);

//     if (!report) return;

//     setSelectedReport(report);
//     setViewerOpen(true);
//   }
//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8">

//       <div className="flex justify-between items-center mb-6">

//         <h2 className="text-3xl font-bold">
//           Assessment Reports
//         </h2>

//         <button
//           onClick={onRefresh}
//           className="flex items-center gap-2 border rounded-xl px-4 py-2 hover:bg-slate-100"
//         >
//           <RefreshCcw size={18} />
//           Refresh
//         </button>

//       </div>

//       <div className="relative mb-6">

//         <Search
//           className="absolute left-4 top-3 text-gray-400"
//           size={18}
//         />

//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search patient or report number..."
//           className="w-full rounded-xl border pl-11 pr-4 py-3"
//         />

//       </div>

//       <div className="overflow-x-auto">

//         <div className="overflow-x-auto">

//           <table className="min-w-full">

//             <thead>

//               <tr className="border-b bg-slate-100">

//                 <th className="p-4 text-left">
//                   Report No
//                 </th>

//                 <th className="p-4 text-left">
//                   Patient
//                 </th>

//                 <th className="p-4">
//                   Age
//                 </th>

//                 <th className="p-4">
//                   Sex
//                 </th>

//                 <th className="p-4">
//                   Date
//                 </th>

//                 <th className="p-4">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {filtered.map((report) => (

//                 <tr
//                   key={report.id}
//                   className="border-b hover:bg-slate-50"
//                 >

//                   <td className="p-4 font-semibold">
//                     {report.report_no}
//                   </td>

//                   <td className="p-4">
//                     {report.patient_name}
//                   </td>

//                   <td className="p-4 text-center">
//                     {report.age}
//                   </td>

//                   <td className="p-4 text-center">
//                     {report.sex}
//                   </td>

//                   <td className="p-4">
//                     {report.reporting_date}
//                   </td>

//                   <td className="p-4">

//                     <div className="flex justify-center gap-2">

//                       <button
//                         onClick={() => handleView(report.id)}
//                         className="p-2 rounded-lg hover:bg-slate-200"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(report.id)}
//                         className="p-2 rounded-lg hover:bg-blue-100"
//                         title="Edit report"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(report.id)}
//                         className="p-2 rounded-lg hover:bg-red-100 text-red-600"
//                       >
//                         <Trash2 size={18} />
//                       </button>

//                     </div>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       <ReportViewer
//         open={viewerOpen}
//         report={selectedReport}
//         onClose={() => {
//           setViewerOpen(false);
//           setSelectedReport(null);
//         }}
//       />

//     </div>
//   );
// }

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
  Plus,
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
                      onClick={() => handleEdit(report.id)}
                      className="p-3 hover:bg-amber-100 rounded-2xl transition-colors"
                      title="Edit"
                    >
                      <Pencil size={20} className="text-amber-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-3 hover:bg-red-100 rounded-2xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} className="text-red-600" />
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

            <div className="flex gap-3">
              <button
                onClick={() => handleView(report.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white py-3.5 rounded-2xl transition-all active:scale-[0.985]"
              >
                <Eye size={18} />
                View
              </button>

              <button
                onClick={() => handleEdit(report.id)}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 py-3.5 rounded-2xl transition-all"
              >
                <Pencil size={18} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(report.id)}
                className="p-3.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-2xl transition-all"
              >
                <Trash2 size={20} />
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
    </div>
  );
}