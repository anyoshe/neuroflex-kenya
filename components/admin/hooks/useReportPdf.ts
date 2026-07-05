"use client";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import PrintReportDocument from "../PrintReportDocument";

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

  function printReport(report: any) {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      throw new Error("Unable to open print window.");
    }

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
            margin: 8mm;
          }

          html,
          body{
            margin:0;
            padding:0;
            background:white;
          }

          #print-root{
            width:100%;
          }

          @media print{

            html,
            body{
              -webkit-print-color-adjust:exact;
              print-color-adjust:exact;
            }

            *{
              box-sizing:border-box;
            }
          }
        </style>
      </head>

      <body>

        <div id="print-root"></div>

      </body>

    </html>
  `);

    printWindow.document.close();

    const rootElement =
      printWindow.document.getElementById("print-root");

    if (!rootElement) {
      throw new Error("Unable to create print root.");
    }

    const root = createRoot(rootElement);

    root.render(
      createElement(PrintReportDocument, {
        report,
      })
    );

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      setTimeout(() => {
        root.unmount();
        printWindow.close();
      }, 300);

    }, 700);
  }

  return {
    generatePDF,
    printReport,
  };
}