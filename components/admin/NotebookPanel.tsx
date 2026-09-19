"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, Save, Trash2 } from "lucide-react";
import {
  deleteNotebookEntry,
  getNotebookEntries,
  saveNotebookEntry,
} from "@/lib/actions/admin";

type NotebookEntry = {
  id: number;
  patient_name: string;
  age: number | null;
  notes: string;
  created_by: string | null;
  created_at: string | Date;
};

export default function NotebookPanel() {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEntries = async () => {
    try {
      const data = await getNotebookEntries();
      setEntries(data as NotebookEntry[]);
    } catch (error) {
      console.error("Failed to load notebook entries:", error);
      setMessage("Notebook entries could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEntries();
  }, []);

  const handleSave = async () => {
    setMessage("");
    setSaving(true);

    try {
      const result = await saveNotebookEntry({
        patientName,
        age: age || null,
        notes,
      });

      if (!result.success) {
        setMessage(result.error ?? "The rough note could not be saved.");
        return;
      }

      setMessage("Rough note saved successfully.");
      setNotes("");
      await loadEntries();
    } catch (error) {
      console.error("Failed to save notebook entry:", error);
      setMessage("The rough note could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const loadEntry = (entry: NotebookEntry) => {
    setPatientName(entry.patient_name);
    setAge(entry.age?.toString() ?? "");
    setNotes(entry.notes);
    setMessage("");
  };

  const handleDelete = async (entry: NotebookEntry) => {
    if (!window.confirm(`Delete the note for ${entry.patient_name}?`)) {
      return;
    }

    const result = await deleteNotebookEntry(entry.id);
    if (!result.success) {
      setMessage(result.error ?? "The note could not be deleted.");
      return;
    }

    if (patientName === entry.patient_name && notes === entry.notes) {
      setPatientName("");
      setAge("");
      setNotes("");
    }
    setMessage("Rough note deleted.");
    await loadEntries();
  };

  return (
    <section className="space-y-6 rounded-3xl border border-brand-teal/20 bg-white p-6 shadow-xl md:p-8">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-brand-teal/10 p-3 text-brand-teal">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Clinical Notebook</h2>
            <p className="mt-1 text-sm text-gray-500">
              Capture rough notes while listening to the patient, then save them securely.
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

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
        <label className="space-y-2 text-sm font-semibold text-gray-700">
          Patient name
          <input
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            placeholder="Enter patient name"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-gray-700">
          Age
          <input
            type="number"
            min="0"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Age"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-semibold text-gray-700">
        Rough notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Write observations, symptoms, questions, or follow-up points here..."
          className="min-h-[420px] w-full resize-y rounded-xl border border-brand-teal/20 bg-[linear-gradient(to_bottom,transparent_31px,#d8e5e5_32px)] bg-[length:100%_32px] px-4 py-2 text-base font-normal leading-8 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 font-semibold text-white transition hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save rough note"}
        </button>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-navy">
          Recently saved notes
        </h3>
        {loading ? (
          <p className="text-sm text-gray-500">Loading notes...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">No saved notes yet.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-gray-200 p-4 transition hover:border-brand-teal hover:bg-brand-teal/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => loadEntry(entry)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="block font-semibold text-brand-navy">
                      {entry.patient_name}
                      {entry.age !== null && `, ${entry.age}`}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={13} />
                      {new Date(entry.created_at).toLocaleString()}
                    </span>
                    <span className="mt-2 line-clamp-2 block whitespace-pre-wrap text-sm text-gray-600">
                      {entry.notes}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry)}
                    aria-label={`Delete note for ${entry.patient_name}`}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                  >
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
