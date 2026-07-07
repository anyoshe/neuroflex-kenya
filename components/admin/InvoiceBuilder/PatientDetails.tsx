type Props = {
  report: any;
  invoiceNo: string;
};

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

export default function PatientDetails({
  report,
  invoiceNo,
}: Props) {
  return (
    <div>
      <h3 className="font-bold text-lg text-brand-navy mb-4">
        Patient Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Field
          label="Invoice Number"
          value={invoiceNo}
        />

        <Field
          label="Report Number"
          value={report.report_no}
        />

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
      </div>
    </div>
  );
}