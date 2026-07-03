"use client";

export function useReportPdf() {
  async function generatePDF(
    reportId: string,
    filename: string
  ) {
    const report = document.getElementById(reportId);

    if (!report) {
      throw new Error("Report not found.");
    }

    // Dynamically import html2pdf to avoid SSR errors
    const html2pdf =
      (await import("html2pdf.js")).default;

    await html2pdf()
  .set({
    margin: 10,
    filename,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["css", "legacy"],
    },
  } as any)
  .from(report)
  .save();
  }

  function printReport(reportId: string) {
    const report =
      document.getElementById(reportId);

    if (!report) {
      throw new Error("Report not found.");
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=1200"
    );

    if (!printWindow) {
      throw new Error(
        "Unable to open print window."
      );
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Assessment Report</title>

        <style>
          @page{
            size:A4;
            margin:15mm;
          }

          body{
            margin:0;
            padding:0;
            background:#ffffff;
            font-family:"Times New Roman",serif;
          }

          #wrapper{
            width:210mm;
            margin:auto;
            padding:15mm;
            box-sizing:border-box;
            background:white;
          }

          img{
            max-width:100%;
          }
        </style>

      </head>

      <body>

        <div id="wrapper">
          ${report.outerHTML}
        </div>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  return {
    generatePDF,
    printReport,
  };
}