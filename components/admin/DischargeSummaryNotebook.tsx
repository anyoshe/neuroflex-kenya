"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, Download, Printer, Save, Trash2 } from "lucide-react";
import {
  deleteNotebookEntry,
  getNotebookEntries,
  saveNotebookEntry,
} from "@/lib/actions/admin";
import { useReportPdf } from "./hooks/useReportPdf";

type NotebookEntry = {
  id: number;
  patient_name: string;
  age: number | null;
  notes: string;
  created_by: string | null;
  created_at: string | Date;
};

export default function DischargeSummaryNotebook() {
  const { generatePDF, printReport } = useReportPdf();
  const [reportNo, setReportNo] = useState("NRPT-DISCHARGE");
  const [documentTitle, setDocumentTitle] = useState("DISCHARGE SUMMARY");
  const [reportingDate, setReportingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [telephone, setTelephone] = useState("");
  const [residence, setResidence] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [presentingHistory, setPresentingHistory] = useState("");
  const [assessmentFindings, setAssessmentFindings] = useState("");
  const [intervention, setIntervention] = useState("");
  const [review, setReview] = useState("");
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEntries = async () => {
    try {
      const data = await getNotebookEntries("discharge");
      setEntries(data as NotebookEntry[]);
    } catch (error) {
      console.error("Failed to load notebook entries:", error);
      setMessage("Discharge summaries could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEntries();
  }, []);

  const getReportData = () => ({
    reportNo,
    patientName,
    age,
    sex,
    residence,
    tel: telephone,
    reportingDate,
    nextOfKin,
    presentingHistory,
    assessmentFindings,
    intervention,
    review,
    createdBy: "Dennis Masaki",
    documentTitle,
    isNotebookTemplate: true,
  });

  const handleSave = async () => {
    if (!patientName.trim()) {
      setMessage("Patient name is required.");
      return;
    }

    setMessage("");
    setSaving(true);
    const payload = JSON.stringify({
      documentType: "discharge-summary",
      documentTitle,
      reportNo,
      reportingDate,
      sex,
      telephone,
      residence,
      nextOfKin,
      presentingHistory,
      assessmentFindings,
      intervention,
      review,
    });

    try {
      const result = await saveNotebookEntry({
        patientName,
        age: age || null,
        notes: payload,
      });
      if (!result.success) {
        setMessage(result.error ?? "The discharge summary could not be saved.");
        return;
      }
      setMessage("Discharge summary saved successfully.");
      await loadEntries();
    } catch (error) {
      console.error("Failed to save discharge summary:", error);
      setMessage("The discharge summary could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const loadEntry = (entry: NotebookEntry) => {
    setPatientName(entry.patient_name);
    setAge(entry.age?.toString() ?? "");
    try {
      const saved = JSON.parse(entry.notes);
      setDocumentTitle(saved.documentTitle || "DISCHARGE SUMMARY");
      setReportNo(saved.reportNo || "NRPT-DISCHARGE");
      setReportingDate(saved.reportingDate || new Date().toISOString().split("T")[0]);
      setSex(saved.sex || "");
      setTelephone(saved.telephone || "");
      setResidence(saved.residence || "");
      setNextOfKin(saved.nextOfKin || "");
      setPresentingHistory(saved.presentingHistory || "");
      setAssessmentFindings(saved.assessmentFindings || "");
      setIntervention(saved.intervention || "");
      setReview(saved.review || "");
    } catch {
      setDocumentTitle("DISCHARGE SUMMARY");
      setSex("");
      setTelephone("");
      setResidence("");
      setNextOfKin("");
      setPresentingHistory("");
      setAssessmentFindings("");
      setIntervention("");
      setReview("");
    }
    setMessage("");
  };

  const handleDelete = async (entry: NotebookEntry) => {
    if (!window.confirm(`Delete the discharge summary for ${entry.patient_name}?`)) return;
    const result = await deleteNotebookEntry(entry.id);
    if (!result.success) {
      setMessage(result.error ?? "The summary could not be deleted.");
      return;
    }
    if (patientName === entry.patient_name) {
      setPatientName("");
      setAge("");
      setDocumentTitle("DISCHARGE SUMMARY");
      setSex("");
      setTelephone("");
      setResidence("");
      setNextOfKin("");
      setPresentingHistory("");
      setAssessmentFindings("");
      setIntervention("");
      setReview("");
    }
    setMessage("Discharge summary deleted.");
    await loadEntries();
  };

  const handleDownload = async () => {
    try {
      await generatePDF(getReportData());
    } catch (error) {
      console.error(error);
      setMessage("The PDF could not be generated.");
    }
  };

  const handlePrint = () => {
    try {
      printReport(getReportData());
    } catch (error) {
      console.error(error);
      setMessage("The print view could not be opened.");
    }
  };

  const linedTextarea = (
    value: string,
    onChange: (value: string) => void,
    height = "min-h-[150px]"
  ) => (
    <div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${height} mt-2 w-full resize-y rounded-xl border border-brand-teal/20 bg-[repeating-linear-gradient(to_bottom,white_0px,white_31px,#d8e5e5_32px)] bg-[length:100%_32px] px-4 py-2 text-base font-normal leading-8 text-gray-800 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20`}
      />
    </div>
  );

  return (
    <section className="space-y-6 rounded-3xl border border-brand-teal/20 bg-white p-6 shadow-xl md:p-8">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-brand-teal/10 p-3 text-brand-teal">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Discharge Summary</h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete the editable patient details and clinical sections.
            </p>
          </div>
        </div>
        {message && (
          <p className="flex items-center gap-2 text-sm font-medium text-brand-green">
            <CheckCircle size={16} />
            {message}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-navy">
          Patient biodata
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Document Title", documentTitle, (value: string) => setDocumentTitle(value)],
            ["Report No", reportNo, (value: string) => setReportNo(value)],
            ["Date", reportingDate, (value: string) => setReportingDate(value), "date"],
            ["Patient Name", patientName, (value: string) => setPatientName(value)],
            ["Age", age, (value: string) => setAge(value), "number"],
            ["Sex", sex, (value: string) => setSex(value)],
            ["Telephone", telephone, (value: string) => setTelephone(value)],
            ["Residence", residence, (value: string) => setResidence(value)],
            ["Next of Kin", nextOfKin, (value: string) => setNextOfKin(value)],
          ].map(([label, value, onChange, type]) => (
            <label key={String(label)} className="space-y-2 text-xs font-bold uppercase tracking-wide text-brand-green">
              {String(label)}
              <input
                type={type ? String(type) : "text"}
                value={String(value)}
                onChange={(event) => (onChange as (value: string) => void)(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-gray-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {linedTextarea(presentingHistory, setPresentingHistory, "min-h-[180px]")}
        {linedTextarea(assessmentFindings, setAssessmentFindings, "min-h-[150px]")}
        {linedTextarea(intervention, setIntervention, "min-h-[150px]")}
        {linedTextarea(review, setReview, "min-h-[150px]")}
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={handlePrint} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50">
          <Printer size={18} /> Print
        </button>
        <button type="button" onClick={handleDownload} className="inline-flex items-center gap-2 rounded-xl border border-brand-teal px-5 py-3 font-semibold text-brand-navy hover:bg-brand-teal/5">
          <Download size={18} /> Download PDF
        </button>
        <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 font-semibold text-white transition hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-60">
          <Save size={18} /> {saving ? "Saving..." : "Save summary"}
        </button>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-navy">
          Recently saved summaries
        </h3>
        {loading ? (
          <p className="text-sm text-gray-500">Loading summaries...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">No saved summaries yet.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {entries.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-gray-200 p-4 transition hover:border-brand-teal hover:bg-brand-teal/5">
                <div className="flex items-start justify-between gap-3">
                  <button type="button" onClick={() => loadEntry(entry)} className="min-w-0 flex-1 text-left">
                    <span className="block font-semibold text-brand-navy">
                      {entry.patient_name}{entry.age !== null && `, ${entry.age}`}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={13} />
                      {new Date(entry.created_at).toLocaleString()}
                    </span>
                  </button>
                  <button type="button" onClick={() => handleDelete(entry)} aria-label={`Delete discharge summary for ${entry.patient_name}`} className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
