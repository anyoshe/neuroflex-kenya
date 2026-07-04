"use client";

import { useEffect, useState } from "react";

import {
  saveReport,
  updateReport,
  generateReportNumber,
} from "@/lib/actions/admin";

import ReportForm from "./ReportForm";
import ReportPreview from "./ReportPreview";

import { useReportPdf } from "./hooks/useReportPdf";

type Message = {
  type: "success" | "error";
  text: string;
};

type FormData = {
  patientName: string;
  age: string;
  sex: string;
  residence: string;
  tel: string;
  reportingDate: string;
  nextOfKin: string;
  presentingHistory: string;
  assessmentFindings: string;
  intervention: string;
  review: string;
};

type Props = {
  editingReport?: any;
  onUpdated?: () => void;
};

export default function ReportBuilder({
  editingReport,
  onUpdated,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [reportNo, setReportNo] = useState("");
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [message, setMessage] =
    useState<Message | null>(null);

  const emptyForm = {
    patientName: "",
    age: "",
    sex: "",
    residence: "",
    tel: "",
    reportingDate: new Date()
      .toISOString()
      .split("T")[0],
    nextOfKin: "",
    presentingHistory: "",
    assessmentFindings: "",
    intervention: "",
    review: "",
  };
  const [formData, setFormData] =
    useState(emptyForm);

  const {
    generatePDF,
    printReport,
  } = useReportPdf();
 
 useEffect(() => {
  // Don't generate a new number while editing
  if (editingReport) return;

  async function loadNumber() {
    try {
      const number = await generateReportNumber();
      setReportNo(number);
    } catch (err) {
      console.error(err);

      setMessage({
        type: "error",
        text: "Failed to generate report number.",
      });
    }
  }

  loadNumber();
}, [editingReport]);

  useEffect(() => {

    if (!message) return;

    const timer =
      setTimeout(() => {

        setMessage(null);

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [message]);

 useEffect(() => {
  if (!editingReport) {
    setEditingId(null);
    return;
  }

  setEditingId(editingReport.id);

  setReportNo(editingReport.report_no);

  setFormData({
    patientName: editingReport.patient_name ?? "",
    age: String(editingReport.age ?? ""),
    sex: editingReport.sex ?? "",
    residence: editingReport.residence ?? "",
    tel: editingReport.tel ?? "",
    reportingDate: editingReport.reporting_date ?? "",
    nextOfKin: editingReport.next_of_kin ?? "",
    presentingHistory: editingReport.presenting_history ?? "",
    assessmentFindings: editingReport.assessment_findings ?? "",
    intervention: editingReport.intervention ?? "",
    review: editingReport.review ?? "",
  });
}, [editingReport]);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function resetForm() {
  setEditingId(null);

  setFormData({
    ...emptyForm,
    reportingDate: new Date().toISOString().split("T")[0],
  });

  const nextNumber = await generateReportNumber();
  setReportNo(nextNumber);
}

 async function handleSave() {
  if (saving) return;

  setMessage(null);

  if (!formData.patientName.trim()) {
    setMessage({
      type: "error",
      text: "Patient name is required.",
    });
    return;
  }

  try {
    setSaving(true);

    let result;

    // ===========================
    // UPDATE EXISTING REPORT
    // ===========================
    if (editingId !== null) {
      result = await updateReport(editingId, formData);

      if (!result.success) {
        setMessage({
          type: "error",
          text: result.error ?? "Unable to update report.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Report updated successfully.",
      });

      setEditingId(null);

      resetForm();

      const nextNumber = await generateReportNumber();
      setReportNo(nextNumber);

      onUpdated?.();

      return;
    }

    // ===========================
    // CREATE NEW REPORT
    // ===========================
    result = await saveReport({
      reportNo,
      ...formData,
    });

    if (!result.success) {
      setMessage({
        type: "error",
        text: result.error ?? "Unable to save report.",
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Assessment report saved successfully.",
    });

    resetForm();

    const nextNumber = await generateReportNumber();

    setReportNo(nextNumber);

    onUpdated?.();

  } catch (err) {
    console.error(err);

    setMessage({
      type: "error",
      text: "Unexpected error while saving report.",
    });

  } finally {
    setSaving(false);
  }
}

  async function handleDownload() {
    try {
      setMessage(null);

      const filename = `${reportNo}_${formData.patientName || "Patient"
        }`
        .trim()
        .replace(/\s+/g, "_");

    await generatePDF({
  reportNo,

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
  createdBy: "Dennis Masaki",
});

      setMessage({
        type: "success",
        text: "text: 'Print dialog opened. Select 'Save as PDF' and click Save.",
      });
    } catch (err) {
      console.error(err);

      setMessage({
        type: "error",
        text:
          "Failed to generate PDF.",
      });
    }
  }

  function handlePrint() {
    try {
     printReport("report-preview");
    } catch (err) {
      console.error(err);

      setMessage({
        type: "error",
        text:
          "Unable to print report.",
      });
    }
  }
  return (
  <>
    <div className="grid xl:grid-cols-[40%_60%] gap-8">

      {/* FORM */}
      <div>
        <ReportForm
          reportNo={reportNo}
          formData={formData}
          handleChange={handleChange}
          saveCurrentReport={handleSave}
          downloadPDF={handleDownload}
          printReport={handlePrint}
          saving={saving}
          message={message}
          isEditing={editingId !== null}
        />

        {/* Mobile Preview Button */}
        <button
          className="xl:hidden mt-5 w-full rounded-xl bg-brand-navy text-white py-3"
          onClick={() => setShowPreview(true)}
        >
          Preview Report
        </button>
      </div>

      {/* Desktop Preview */}
      <div className="hidden xl:block">
        <ReportPreview
          reportNo={reportNo}
          formData={formData}
        />
      </div>

    </div>

    {/* Mobile Preview Modal */}
    {showPreview && (
      <div className="fixed inset-0 z-50 bg-black/70">

        <div className="absolute inset-0 overflow-auto p-4">

          <button
            onClick={() => setShowPreview(false)}
            className="mb-4 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Close Preview
          </button>

          <ReportPreview
            reportNo={reportNo}
            formData={formData}
          />

        </div>

      </div>
    )}
  </>
);
}