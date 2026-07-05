"use client";

import { X, Printer, Download } from "lucide-react";
import ReportDocument from "./ReportDocument";
import { useReportPdf } from "./hooks/useReportPdf";

type Props = {
  open: boolean;
  report: any;
  onClose: () => void;
};

export default function ReportViewer({
  open,
  report,
  onClose,
}: Props) {
  const { generatePDF, printReport } = useReportPdf();

  if (!open || !report) return null;

  async function handleDownload() {
    const filename = (
      report.report_no ||
      report.reportNo ||
      "Assessment_Report"
    ).replace(/\s+/g, "_");

    try {
    await generatePDF({
  reportNo: report.report_no,
  patientName: report.patient_name,
  age: report.age,
  sex: report.sex,
  residence: report.residence,
  tel: report.tel,
  reportingDate: report.reporting_date,
  nextOfKin: report.next_of_kin,
  presentingHistory: report.presenting_history,
  assessmentFindings: report.assessment_findings,
  intervention: report.intervention,
  review: report.review,
  createdBy: report.created_by ?? "Dennis Masaki",
});
    } catch (error) {
      console.error(error);
    }
  }

  function handlePrint() {
    try {
      printReport("report-preview");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">


        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col">

          {/* Header */}

          <div className="border-b px-8 py-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Assessment Report
              </h2>

              <p className="text-slate-500 mt-1">
                {report.patient_name}
              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-3 hover:bg-slate-100"
            >
              <X size={22} />
            </button>

          </div>

          {/* Report */}

          <div className="flex-1 overflow-auto bg-slate-200 p-8 flex justify-center">

            <div id="report-preview">

              <ReportDocument
                report={{
                  reportNo: report.report_no,
                  patientName: report.patient_name,
                  age: report.age,
                  sex: report.sex,
                  residence: report.residence,
                  tel: report.tel,
                  reportingDate: report.reporting_date,
                  nextOfKin: report.next_of_kin,
                  presentingHistory: report.presenting_history,
                  assessmentFindings: report.assessment_findings,
                  intervention: report.intervention,
                  review: report.review,
                  createdBy: report.created_by || "Dennis Masaki",
                }}
              />

            </div>

          </div>
          {/* Footer */}

          <div className="border-t p-6 flex justify-end gap-4">

            <button
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl border hover:bg-slate-100 flex items-center gap-2"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
