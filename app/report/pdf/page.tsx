import PrintReportDocument from "@/components/admin/PrintReportDocument";

type Props = {
  searchParams: Promise<{
    documentTitle?: string;
    isNotebookTemplate?: string;
    reportNo?: string;
    patientName?: string;
    age?: string;
    sex?: string;
    residence?: string;
    tel?: string;
    reportingDate?: string;
    nextOfKin?: string;
    presentingHistory?: string;
    assessmentFindings?: string;
    intervention?: string;
    review?: string;
    createdBy?: string;
  }>;
};

export default async function PdfPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <div className="bg-white">
      <PrintReportDocument
  report={{
    documentTitle: params.documentTitle ?? "PHYSIOTHERAPIST / NEUROREHABILITATION REPORT",
    isNotebookTemplate: params.isNotebookTemplate === "true",
    reportNo: params.reportNo ?? "",
    patientName: params.patientName ?? "",
    age: params.age ?? "",
    sex: params.sex ?? "",
    residence: params.residence ?? "",
    tel: params.tel ?? "",
    reportingDate: params.reportingDate ?? "",
    nextOfKin: params.nextOfKin ?? "",
    presentingHistory: params.presentingHistory ?? "",
    assessmentFindings: params.assessmentFindings ?? "",
    intervention: params.intervention ?? "",
    review: params.review ?? "",
    createdBy: params.createdBy ?? "Dennis Masaki",
  }}
/>
    </div>
  );
}