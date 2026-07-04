import { chromium } from "playwright";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const url = new URL(request.url);

  const reportUrl =
    `${url.origin}/report/pdf?${url.searchParams.toString()}`;

  await page.goto(reportUrl, {
    waitUntil: "networkidle",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "4mm",
      right: "4mm",
      bottom: "4mm",
      left: "4mm",
    },
  });

  await browser.close();

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `attachment; filename="${url.searchParams.get("reportNo") || "Assessment_Report"}.pdf"`,
    },
  });
}