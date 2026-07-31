"use client";

import Image from "next/image";

export type ReportData = {
  reportNo: string;
  patientName: string;
  age?: string | number;
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
};

type Props = {
  report: ReportData;
};

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-green">
        {label}
      </p>

      <p className="text-[13px] text-gray-900 break-words">
        {value || "-"}
      </p>
    </div>
  );
}



export default function PrintReportDocument({
  report,
}: Props) {
  return (
    <div
      className="
        mx-auto
        w-[200mm]
        min-h-[287mm]
        bg-white
        px-5
        py-4
        flex
        flex-col
      "
    >
      {/* ================= HEADER ================= */}

      <header className="border-b-[3px] border-brand-green pb-3">

        <div className="flex items-start justify-between gap-6">

          <div className="flex-shrink-0">

            <Image
              src="/assets/logos/logo3cropped.jpeg"
              alt="Neuroflex Kenya"
              width={215}
              height={85}
              priority
              className="object-contain"
            />

          </div>

          <div className="text-right text-[12px] leading-5">

            <p>P.O. Box 054-00506 Nairobi</p>

            <p>+254 729 213 135</p>

            <p className="font-semibold text-brand-navy">
              www.neuroflexkenya.com
            </p>

          </div>

        </div>

        <p className="text-center text-[14px] font-medium text-brand-green">
          Physiotherapy • Neurorehabilitation • Wellness Centre
        </p>

      </header>

      {/* ================= TITLE ================= */}

      <div className="mt-3 mb-3">

        <h2 className="rounded-md bg-brand-navy py-2 text-center text-[17px] font-bold tracking-wide text-white">

          PHYSIOTHERAPIST / NEUROREHABILITATION REPORT

        </h2>

      </div>

      {/* ================= PATIENT DETAILS ================= */}

      <section className="rounded-lg border border-brand-teal/30 bg-brand-teal/5 p-3">

        <div className="grid grid-cols-4 gap-x-4 gap-y-3">

          <Info
            label="Report No"
            value={report.reportNo}
          />

          <Info
            label="Date"
            value={report.reportingDate}
          />

          <Info
            label="Age"
            value={report.age}
          />

          <Info
            label="Sex"
            value={report.sex}
          />

          <div className="col-span-2">
            <Info
              label="Patient Name"
              value={report.patientName}
            />
          </div>

          <div className="col-span-2">
            <Info
              label="Telephone"
              value={report.tel}
            />
          </div>

          <div className="col-span-2">
            <Info
              label="Residence"
              value={report.residence}
            />
          </div>

          <div className="col-span-2">
            <Info
              label="Next of Kin"
              value={report.nextOfKin}
            />
          </div>

        </div>

      </section>

      {/* ================= REPORT BODY START ================= */}

      <main className="mt-4 flex flex-col gap-3">
                <ReportSection
          title="Presenting History"
          value={report.presentingHistory}
        />

        <ReportSection
          title="Assessment Findings"
          value={report.assessmentFindings}
        />

        <ReportSection
          title="Intervention"
          value={report.intervention}
        />

        <ReportSection
          title="Review & Recommendations"
          value={report.review}
        />

      </main>

      {/* Push signature to bottom whenever there is space.
          If content grows beyond one page, the signature naturally
          moves to the next page instead of forcing a blank page. */}

      <div className="flex-1"></div>

      {/* ================= SIGNATURE ================= */}

      <footer
        className="pt-5"
        style={{
          pageBreakInside: "avoid",
        }}
      >

        <div className="grid grid-cols-3 gap-8">

          {/* Physiotherapist */}

          <div>

            <p className="text-sm font-semibold text-brand-navy">
              Physiotherapist
            </p>

            <div className="mt-8 border-b-2 border-brand-green"></div>

            <p className="mt-2 text-sm font-medium">
              {report.createdBy || "Dennis Masaki"}
            </p>

            <p className="text-xs text-gray-500">
              Neuroflex Kenya
            </p>

          </div>

          {/* Signature */}

          <div>

            <p className="text-sm font-semibold text-brand-navy">
              Signature
            </p>

            <div className="mt-8 border-b-2 border-brand-green"></div>

          </div>

          {/* Date */}

          <div>

            <p className="text-sm font-semibold text-brand-navy">
              Date
            </p>

            <div className="mt-8 border-b-2 border-brand-green"></div>

          </div>

        </div>
                {/* Footer */}

        <div className="mt-5 border-t-4 border-brand-green pt-2">

          <div className="flex items-center justify-between text-[10px] text-gray-500">

            <span>
              Neuroflex Kenya
            </span>

            <span>
              Physiotherapy • Neurorehabilitation • Wellness Centre
            </span>

            <span>
              {report.reportNo}
            </span>

          </div>

        </div>

      </footer>

    </div>

  );
}

/* ==========================================================
   PRINT SECTION COMPONENT
   ========================================================== */

function ReportSection({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (

    <section
      className="break-inside-avoid"
      style={{
        pageBreakInside: "avoid",
      }}
    >

      <div className="rounded-t-md bg-brand-navy px-3 py-1.5">

        <h3 className="text-[14px] font-semibold text-white">

          {title}

        </h3>

      </div>

      <div
        className="
          rounded-b-md
          border
          border-brand-navy/20
          border-t-0
          px-4
          py-2
          text-[13px]
          leading-5
          whitespace-pre-wrap
        "
      >
        {value || "-"}
      </div>

    </section>

  );
}
