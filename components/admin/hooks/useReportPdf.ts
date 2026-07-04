"use client";

export function useReportPdf() {
  
async function generatePDF(report: any) {
  const params = new URLSearchParams({
    reportNo: report.reportNo,
    patientName: report.patientName,
    age: String(report.age ?? ""),
    sex: report.sex ?? "",
    residence: report.residence ?? "",
    tel: report.tel ?? "",
    reportingDate: report.reportingDate ?? "",
    nextOfKin: report.nextOfKin ?? "",
    presentingHistory: report.presentingHistory ?? "",
    assessmentFindings: report.assessmentFindings ?? "",
    intervention: report.intervention ?? "",
    review: report.review ?? "",
    createdBy: report.createdBy ?? "Dennis Masaki",
  });

  const response = await fetch(
    `/api/report/pdf?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Unable to generate PDF.");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `${report.reportNo}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}
  function printReport(reportId: string) {
    const report = document.getElementById(reportId);

    if (!report) {
      throw new Error("Report preview not found.");
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      throw new Error("Unable to open print window.");
    }

    // Copy all loaded styles (Tailwind included)
    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map((style) => style.outerHTML)
      .join("");

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Assessment Report</title>

        ${styles}

        <style>
          @page {
            size: A4 portrait;
            margin: 4mm;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          body{
              margin:0;
              padding:0;
              background:#fff;
          }

          #report-preview{
              width:202mm;
              margin:0 auto;
          }

          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>

      <body>
        ${report.outerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 700);
  }

  return {
    generatePDF,
    printReport,
  };
}