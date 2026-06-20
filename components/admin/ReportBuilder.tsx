"use client";
import { useState } from "react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { saveReport } from "@/lib/actions/admin";
import { Download, Printer, Save } from "lucide-react";

export default function ReportBuilder() {
  const [formData, setFormData] = useState({
    patientName: "",
    reportNo: "",
    age: "",
    sex: "",
    residence: "",
    tel: "",
    reportingDate: new Date().toISOString().split("T")[0],
    nextOfKin: "",
    presentingHistory: "",
    assessmentFindings: "",
    intervention: "",
    review: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const saveToDatabase = async () => {
    if (!formData.patientName) {
      setMessage({ type: "error", text: "Patient name is required" });
      return;
    }

    setSaving(true);
    setMessage(null);

    const dataToSave = {
      reportNo: formData.reportNo,
      patientName: formData.patientName,
      age: formData.age,
      sex: formData.sex,
      residence: formData.residence,
      tel: formData.tel,
      reportingDate: formData.reportingDate,
      nextOfKin: formData.nextOfKin,
      presentingHistory: formData.presentingHistory,
      assessmentFindings: formData.assessmentFindings,
      intervention: formData.intervention,
      review: formData.review,
    };

    const result = await saveReport(dataToSave);

    if (result.success) {
      setMessage({
        type: "success",
        text: "✅ Report saved successfully!",   // Removed result.warning
      });
    } else {
      setMessage({ 
        type: "error", 
        text: result.error 
          ? `Could not save to database: ${result.error}` 
          : "Failed to save report. Please try again." 
      });
    }

    setSaving(false);
  };

  const generatePDF = () => {
    try {
      setMessage(null);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      const addLine = (text: string, fontSize = 10, isBold = false, color: [number, number, number] = [17, 24, 39]) => {
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        pdf.setFontSize(fontSize);
        pdf.setTextColor(...color);
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

      const addSection = (title: string, value: string) => {
        addLine(title, 11, true);
        addLine(value || "-", 10);
        y += 2;
      };

      addLine("Neuroflex and physio", 16, true, [29, 78, 216]);
      addLine("Wellness Centre (Neuroflex Kenya)", 13, true, [29, 78, 216]);
      addLine("P.O BOX 054-00506 Nairobi", 10);
      y += 2;
      pdf.line(margin, y, pageWidth - margin, y);
      y += 8;

      addLine("PHYSIOTHERAPIST/NEUROREHABILITATION THERAPIST REPORT", 12, true);
      y += 2;
      addLine(`NAME: ${formData.patientName || "-"}    NO: ${formData.reportNo || "-"}`, 10, true);
      addLine(`AGE: ${formData.age || "-"}    SEX: ${formData.sex || "-"}`);
      addLine(`RESIDENCE: ${formData.residence || "-"}    TEL: ${formData.tel || "-"}`);
      addLine(`REPORTING DATE: ${formData.reportingDate || "-"}    NEXT OF KIN: ${formData.nextOfKin || "-"}`);
      y += 4;

      addSection("Presenting History", formData.presentingHistory);
      addSection("Assessment Findings", formData.assessmentFindings);
      addSection("Intervention", formData.intervention);
      addSection("Review.", formData.review);

      y += 6;
      addLine("NRPT: Dennis Masaki    Sign: __________    Date: __________", 10, true);

      const patientName = formData.patientName.trim().replace(/\s+/g, "_") || "Patient";
      pdf.save(`Neuroflex_Report_${patientName}_${Date.now()}.pdf`);
      setMessage({ type: "success", text: "PDF downloaded successfully." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to generate PDF. Please try again." });
    }
  };

  const printReport = () => {
    const reportElement = document.getElementById("report-preview");
    if (!reportElement) {
      setMessage({ type: "error", text: "Report preview was not found." });
      return;
    }

    const styleId = "report-print-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @page { size: A4; margin: 14mm; }
        @media print {
          body * { visibility: hidden !important; }
          #report-preview, #report-preview * { visibility: visible !important; }
          #report-preview {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    window.print();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
      {/* Form */}
      <div className="bg-white p-6 lg:p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Create New Assessment Report</h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="patientName"
              placeholder="Patient Name *"
              value={formData.patientName}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              name="reportNo"
              placeholder="Report Number"
              value={formData.reportNo}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} className="border p-3 rounded-lg w-full" />
            <select name="sex" value={formData.sex} onChange={handleChange} className="border p-3 rounded-lg w-full">
              <option value="">Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <input name="residence" placeholder="Residence" value={formData.residence} onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <input name="tel" placeholder="Telephone" value={formData.tel} onChange={handleChange} className="border p-3 rounded-lg w-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="reportingDate" type="date" value={formData.reportingDate} onChange={handleChange} className="border p-3 rounded-lg w-full" />
            <input name="nextOfKin" placeholder="Next of Kin" value={formData.nextOfKin} onChange={handleChange} className="border p-3 rounded-lg w-full" />
          </div>

          <textarea name="presentingHistory" placeholder="Presenting History" value={formData.presentingHistory} onChange={handleChange} className="border p-3 rounded-lg w-full h-24" />
          <textarea name="assessmentFindings" placeholder="Assessment Findings" value={formData.assessmentFindings} onChange={handleChange} className="border p-3 rounded-lg w-full h-24" />
          <textarea name="intervention" placeholder="Intervention" value={formData.intervention} onChange={handleChange} className="border p-3 rounded-lg w-full h-24" />
          <textarea name="review" placeholder="Review & Recommendations" value={formData.review} onChange={handleChange} className="border p-3 rounded-lg w-full h-24" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={saveToDatabase}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Report to Database"}
          </button>
          <button
            type="button"
            onClick={generatePDF}
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-4 rounded-xl font-semibold text-lg"
          >
            <Download size={18} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={printReport}
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 rounded-xl font-semibold text-lg"
          >
            <Printer size={18} />
            Print
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-center font-medium p-3 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </p>
        )}
      </div>

      {/* Live Preview */}
           {/* Live Preview - same as before */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 px-1">Live Preview</h3>
        <div className="bg-gray-100 p-2 md:p-4 rounded-xl">
          <div
            id="report-preview"
            className="bg-white mx-auto p-4 md:p-8 text-black shadow-lg w-full max-w-full lg:max-w-[210mm]"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(10px, 2.5vw, 11pt)',
              lineHeight: 1.4
            }}
          >
            <div className="flex items-center gap-1 mb-1 md:gap-2 md:mb-3">
              <Image
                src="/assets/logos/logo2.png"
                alt="Neuroflex Logo"
                width={192}
                height={192}
                className="h-36 w-36 flex-shrink-0 object-contain md:h-48 md:w-48"
              />
              <div className="flex min-h-36 flex-1 flex-col justify-center md:min-h-48">
                <h1 className="text-lg font-bold leading-tight text-blue-700 md:text-2xl">Neuroflex and physio</h1>
                <h1 className="text-lg font-bold leading-tight text-blue-700 md:text-2xl">Wellness Centre</h1>
                <p className="text-sm md:text-lg">(Neuroflex Kenya)</p>
                <p className="text-xs md:text-base">P.O BOX 054-00506 Nairobi</p>
              </div>
            </div>
            <div className="border-b-2 md:border-b-4 border-blue-700 mb-0 md:mb-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2 mb-4 md:mb-6 text-xs md:text-sm">
              <div className="break-words"><strong>NAME:</strong> {formData.patientName}</div>
              <div className="break-words"><strong>NO:</strong> {formData.reportNo}</div>
              <div><strong>AGE:</strong> {formData.age}</div>
              <div><strong>SEX:</strong> {formData.sex}</div>
              <div className="break-words"><strong>RESIDENCE:</strong> {formData.residence}</div>
              <div className="break-words"><strong>TEL:</strong> {formData.tel}</div>
              <div><strong>REPORTING DATE:</strong> {formData.reportingDate}</div>
              <div className="break-words"><strong>NEXT OF KIN:</strong> {formData.nextOfKin}</div>
            </div>

            <div className="text-center mb-4 md:mb-6">
              <h2 className="font-bold underline text-xs md:text-sm">PHYSIOTHERAPIST/NEUROREHABILITATION THERAPIST REPORT</h2>
            </div>

            <div className="space-y-4 md:space-y-6 text-xs md:text-sm">
              {[
                { title: "Presenting History", data: formData.presentingHistory },
                { title: "Assessment Findings", data: formData.assessmentFindings },
                { title: "Intervention", data: formData.intervention },
                { title: "Review.", data: formData.review },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold underline mb-1 md:mb-2">{section.title}</h3>
                  <p className="whitespace-pre-wrap min-h-[40px] md:min-h-[60px] break-words">{section.data}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm mb-2">
                <div><strong className="text-blue-700">NRPT:</strong> Dennis Masaki</div>
                <div><strong>Sign:</strong> __________</div>
                <div><strong>Date:</strong> __________</div>
              </div>
              <div className="border-b-2 md:border-b-4 border-blue-700 mb-2"></div>
              <div className="flex flex-col sm:flex-row justify-between gap-1 text-[10px] md:text-xs text-blue-700">
                <span className="break-all">🌐 www.neuroflexkenya.com</span>
                <span>📞 +254 729 213 135</span>
                <span className="break-all">✉ neuroflexkenya@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
