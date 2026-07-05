export const runtime = "nodejs";

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1280,
      height: 720,
    });

    const url = new URL(request.url);

    const params = new URLSearchParams(url.searchParams);
    params.set("pdf", "true");

    const reportUrl = `${url.origin}/report/pdf?${params.toString()}`;

    await page.goto(reportUrl, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "10mm",
    right: "5mm",
    bottom: "10mm",
    left: "5mm",
  },
});
    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${url.searchParams.get("reportNo") || "Assessment_Report"
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