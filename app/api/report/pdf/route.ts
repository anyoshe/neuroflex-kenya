// export const runtime = "nodejs";
// import { chromium } from "playwright-core";
// import chromiumExecutable from "@sparticuz/chromium";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {

//   const browser = await chromium.launch({
//   args: chromiumExecutable.args,
//   executablePath: await chromiumExecutable.executablePath(),
//   headless: true,
// });

//   const page = await browser.newPage();

//   const url = new URL(request.url);


//   const params = new URLSearchParams(url.searchParams);

//   params.set("pdf", "true");

//   const reportUrl = `${url.origin}/report/pdf?${params.toString()}`;
//   await page.goto(reportUrl, {
//     waitUntil: "networkidle",
//   });

//   const pdf = await page.pdf({
//   format: "A4",
//   printBackground: true,

//   margin: {
//     top: "10mm",      // almost flush with top
//     right: "5mm",
//     bottom: "10mm",
//     left: "5mm",
//   },

//   preferCSSPageSize: true,
// });

//   await browser.close();

//   return new NextResponse(Buffer.from(pdf), {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition":
//         `attachment; filename="${url.searchParams.get("reportNo") || "Assessment_Report"}.pdf"`,
//     },
//   });
// }

export const runtime = "nodejs";

import { chromium } from "playwright-core";
import chromiumExecutable from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const browser = await chromium.launch({
      args: chromiumExecutable.args,
      executablePath: await chromiumExecutable.executablePath(),
      headless: true,
    });

    const page = await browser.newPage({
      ignoreHTTPSErrors: true,
    });

    const url = new URL(request.url);

    const params = new URLSearchParams(url.searchParams);
    params.set("pdf", "true");

    const reportUrl = `${url.origin}/report/pdf?${params.toString()}`;

    await page.goto(reportUrl, {
      waitUntil: "networkidle",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "5mm",
        bottom: "10mm",
        left: "5mm",
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          url.searchParams.get("reportNo") || "Assessment_Report"
        }.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  }
}