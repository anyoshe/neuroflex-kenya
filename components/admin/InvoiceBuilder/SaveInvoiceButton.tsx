"use client";

type Props = {
  onSave: () => Promise<void>;
  saving: boolean;
};

export default function SaveInvoiceButton({
  onSave,
  saving,
}: Props) {
  return (
    <div className="flex justify-end pt-6">

      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-xl bg-brand-green px-8 py-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {saving
          ? "Saving Invoice..."
          : "Save Invoice"}
      </button>

    </div>
  );
}