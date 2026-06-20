"use client";
import { useState, useEffect } from "react";
import { getReports } from "@/lib/actions/admin";
import { Download, RefreshCw } from "lucide-react";
import { jsPDF } from "jspdf";

type Report = {
  id: number;
  reportNo: string | null;
  patientName: string;
  age: number | null;
  sex: string | null;
  residence: string | null;
  tel: string | null;
  reportingDate: string | null;
  nextOfKin: string | null;
  presentingHistory: string | null;
  assessmentFindings: string | null;
  intervention: string | null;
  review: string | null;
  createdBy: string | null;
  createdAt: string | Date | null;   // Accept string from DB
};

export default function ReportsHistory() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      
      // Convert raw database data to typed Report[]
      const formattedData: Report[] = data.map((item: any) => ({
        id: item.id,
        reportNo: item.report_no || null,
        patientName: item.patient_name || "",
        age: item.age,
        sex: item.sex || null,
        residence: item.residence || null,
        tel: item.tel || null,
        reportingDate: item.reporting_date || null,
        nextOfKin: item.next_of_kin || null,
        presentingHistory: item.presenting_history || null,
        assessmentFindings: item.assessment_findings || null,
        intervention: item.intervention || null,
        review: item.review || null,
        createdBy: item.created_by || null,
        createdAt: item.created_at || item.createdAt,
      }));

      setReports(formattedData);
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadReports();
    }, 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleDownload = (report: Report) => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addLine = (text: string, fontSize = 10, isBold = false) => {
      pdf.setFont("helvetica", isBold ? "bold" : "normal");
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text || "-", contentWidth);

      lines.forEach((line: string) => {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += fontSize * 0.45;
      });
      y += 2;
    };

    const addSection = (title: string, value: string | null) => {
      addLine(title, 11, true);
      addLine(value || "-", 10);
      y += 2;
    };

    pdf.setTextColor(29, 78, 216);
    addLine("Neuroflex and physio", 16, true);
    addLine("Wellness Centre (Neuroflex Kenya)", 13, true);
    pdf.setTextColor(17, 24, 39);
    addLine("P.O BOX 054-00506 Nairobi", 10);
    y += 2;
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    addLine("PHYSIOTHERAPIST/NEUROREHABILITATION THERAPIST REPORT", 12, true);
    y += 2;
    addLine(`NAME: ${report.patientName}`, 10, true);
    addLine(`NO: ${report.reportNo || "-"}    AGE: ${report.age ?? "-"}    SEX: ${report.sex || "-"}`);
    addLine(`RESIDENCE: ${report.residence || "-"}    TEL: ${report.tel || "-"}`);
    addLine(`REPORTING DATE: ${report.reportingDate || "-"}    NEXT OF KIN: ${report.nextOfKin || "-"}`);
    y += 4;

    addSection("Presenting History", report.presentingHistory);
    addSection("Assessment Findings", report.assessmentFindings);
    addSection("Intervention", report.intervention);
    addSection("Review.", report.review);

    y += 6;
    addLine(`NRPT: ${report.createdBy || "Dennis Masaki"}    Sign: __________    Date: __________`, 10, true);

    const patientName = report.patientName.trim().replace(/\s+/g, "_") || "Patient";
    pdf.save(`Neuroflex_Report_${patientName}_${report.id}.pdf`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Assessment Reports History</h2>
        <button 
          onClick={loadReports} 
          disabled={loading}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-500">
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <p className="text-gray-500">No reports yet. Create your first one above.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age / Sex</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{report.patientName}</td>
                    <td className="px-6 py-4 text-sm">
                      {report.age ?? "-"} / {report.sex ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.createdBy ?? "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        type="button"
                        onClick={() => handleDownload(report)}
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{report.patientName}</h3>
                    <p className="text-sm text-gray-500">
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-"}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleDownload(report)}
                    className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm px-3 py-2 bg-emerald-50 rounded-lg"
                  >
                    <Download size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Age/Sex:</span>
                    <p className="font-medium">{report.age ?? "-"} / {report.sex ?? "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Created By:</span>
                    <p className="font-medium truncate">{report.createdBy ?? "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}