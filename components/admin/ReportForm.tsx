"use client";

import {
  Save,
  Download,
  Printer,
  Loader2,
} from "lucide-react";

type Message = {
  type: "success" | "error";
  text: string;
};

type Props = {
  reportNo: string;
  isEditing: boolean;

  formData: {
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

  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;

  saveCurrentReport: () => void;

  downloadPDF: () => void;

  printReport: () => void;

  saving: boolean;

  message: Message | null;
};

export default function ReportForm({
  reportNo,
  formData,
  handleChange,
  saveCurrentReport,
  downloadPDF,
  printReport,
  saving,
  message,
  isEditing,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          {isEditing
            ? "Edit Assessment Report"
            : "Create Assessment Report"}
        </h2>
        <p className="text-slate-500 mt-2">
          {isEditing
            ? "Update the assessment and save your changes."
            : "Complete the patient assessment before saving."}
        </p>
      </div>

      <div className="space-y-5">

        {/* Report Number */}

        <div>
          <label className="block mb-2 font-medium">
            Report Number
          </label>

          <input
            readOnly
            value={reportNo}
            className="w-full rounded-xl border bg-slate-100 px-4 py-3 font-semibold text-emerald-700"
          />
        </div>

        {/* Patient */}

        <div>
          <label className="block mb-2 font-medium">
            Patient Name *
          </label>

          <input
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* Age Sex */}

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <label className="block mb-2">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Sex
            </label>

            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="">
                Select
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>

        </div>

        {/* Residence */}

        <input
          name="residence"
          placeholder="Residence"
          value={formData.residence}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

        {/* Telephone */}

        <input
          name="tel"
          placeholder="Telephone"
          value={formData.tel}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

        {/* Date + NOK */}

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            name="reportingDate"
            value={formData.reportingDate}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

          <input
            name="nextOfKin"
            placeholder="Next of Kin"
            value={formData.nextOfKin}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3"
          />

        </div>

        {/* Presenting History */}

        <div>

          <label className="block mb-2 font-medium">
            Presenting History
          </label>

          <textarea
            rows={5}
            name="presentingHistory"
            value={formData.presentingHistory}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Assessment */}

        <div>

          <label className="block mb-2 font-medium">
            Assessment Findings
          </label>

          <textarea
            rows={5}
            name="assessmentFindings"
            value={formData.assessmentFindings}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Intervention */}

        <div>

          <label className="block mb-2 font-medium">
            Intervention
          </label>

          <textarea
            rows={5}
            name="intervention"
            value={formData.intervention}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Review */}

        <div>

          <label className="block mb-2 font-medium">
            Review & Recommendations
          </label>

          <textarea
            rows={5}
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="grid md:grid-cols-3 gap-3 mt-8">

        <button
          type="button"
          disabled={saving}
          onClick={saveCurrentReport}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold"
        >
          {saving ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={18} />
          )}

          {saving
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update Report"
              : "Save Report"}
        </button>

        <button

          disabled={saving}
          onClick={downloadPDF}
          className="border rounded-xl py-4 flex justify-center items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
        >
          <Download size={18} />
          PDF
        </button>

        <button
          disabled={saving}
          onClick={printReport}

          className="border rounded-xl py-4 flex justify-center items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
        >
          <Printer size={18} />
          Print
        </button>

      </div>

      {message && (

        <div
          className={`mt-6 rounded-xl p-4 font-medium ${message.type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {message.text}
        </div>

      )}

    </div>
  );
}