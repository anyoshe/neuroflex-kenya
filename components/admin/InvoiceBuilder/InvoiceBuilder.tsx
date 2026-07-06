"use client";

type Props = {
  open: boolean;
  report: any;
  onClose: () => void;
};

export default function InvoiceBuilder({
  open,
  report,
  onClose,
}: Props) {
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-auto">

        {/* Header */}

        <div className="border-b px-8 py-6 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-brand-navy">
              New Invoice
            </h2>

            <p className="text-brand-green mt-1">
              Generate invoice from assessment report
            </p>

          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100"
          >
            Close
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-8">

          {/* Patient Information */}

          <div>

            <h3 className="font-bold text-lg text-brand-navy mb-4">
              Patient Details
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              <Field
                label="Patient Name"
                value={report.patient_name}
              />

              <Field
                label="Age"
                value={report.age}
              />

              <Field
                label="Sex"
                value={report.sex}
              />

              <Field
                label="Telephone"
                value={report.tel}
              />

              <Field
                label="Residence"
                value={report.residence}
              />

              <Field
                label="Report Number"
                value={report.report_no}
              />

            </div>

          </div>

          {/* Invoice Items */}

          <div>

            <h3 className="font-bold text-lg text-brand-navy mb-4">
              Invoice Items
            </h3>

            <p className="text-gray-500">
              Invoice table coming next...
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div>

      <p className="text-xs uppercase text-brand-green font-semibold">
        {label}
      </p>

      <div className="mt-1 rounded-xl border bg-gray-50 px-4 py-3">
        {value || "-"}
      </div>

    </div>
  );
}