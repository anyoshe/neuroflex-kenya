type Props = {
  diagnosis: string;
  setDiagnosis: (value: string) => void;
};

export default function Diagnosis({
  diagnosis,
  setDiagnosis,
}: Props) {
  return (
    <div>
      <h3 className="font-bold text-lg text-brand-navy mb-4">
        Diagnosis
      </h3>

      <textarea
        rows={5}
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Clinical diagnosis..."
        className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-brand-green"
      />
    </div>
  );
}