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
    <div>
      <p className="text-xs uppercase tracking-wide text-brand-green font-semibold">
        {label}
      </p>

      <p className="text-gray-900 font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

export default function ReportTemplate({ report }: Props) {
  return (

    <div className="px-5 pb-5">

      {/* =================== HEADER =================== */}

      <div className="bg-white -mx-5  px-5 py-6 mb-6">

        <div className="max-w-4xl mx-auto">

          <div className="report-header flex flex-row items-start justify-between gap-10">

            {/* Logo */}
            <div className="text-center flex-shrink-0">

              <Image
                src="/assets/logos/logo3cropped.jpeg"
                alt="Neuroflex Kenya"
                width={280}
                height={110}
                priority
                className="object-contain w-[280px] h-auto"
              />

            </div>

            {/* Contact Information */}
            <div className="report-contact text-right text-base text-gray-700 space-y-1">

              <p>P.O. Box 054-00506 Nairobi</p>

              <p>+254 729 213 135</p>

              <p className="font-medium text-brand-navy">
                www.neuroflexkenya.com
              </p>

            </div>

          </div>

        </div>

      </div>
      <p className="text-center text-brand-green font-medium mt-1">
        Physiotherapy • Neurorehabilitation • Wellness Centre
      </p>


      <div className="h-1 bg-gradient-to-r from-brand-green via-brand-teal to-brand-navy rounded-full my-4" />

      <h2 className="text-center font-bold text-xl text-brand-navy uppercase tracking-wide mb-8">
        PHYSIOTHERAPIST / NEUROREHABILITATION REPORT
      </h2>

      {/* ================= PATIENT DETAILS ================= */}


      <div className="border border-brand-teal/30 rounded-lg p-5 bg-brand-teal/5">

        <div className="grid grid-cols-2 gap-x-10 gap-y-4">

          <Info
            label="Report No"
            value={report.reportNo}
          />

          <Info
            label="Date"
            value={report.reportingDate}
          />

          <Info
            label="Patient Name"
            value={report.patientName}
          />

          <Info
            label="Age"
            value={report.age}
          />

          <Info
            label="Sex"
            value={report.sex}
          />

          <Info
            label="Telephone"
            value={report.tel}
          />

          <Info
            label="Residence"
            value={report.residence}
          />

          <Info
            label="Next of Kin"
            value={report.nextOfKin}
          />

        </div>

      </div>

      <hr className="my-6" />

      {/* ================= REPORT BODY ================= */}


      <h3 className="bg-brand-navy text-white px-4 py-2 rounded-t-md font-semibold">
        Presenting History
      </h3>

      <div className="border border-brand-navy/20 border-t-0 rounded-b-md p-5 whitespace-pre-wrap min-h-[90px]">{report.presentingHistory}</div>



      <h3 className="bg-brand-navy text-white px-4 py-2 rounded-t-md font-semibold">
        Assessment Findings
      </h3>

      <div className="border border-brand-navy/20 border-t-0 rounded-b-md p-5 whitespace-pre-wrap min-h-[90px]">{report.assessmentFindings}</div>

      <h3 className="bg-brand-navy text-white px-4 py-2 rounded-t-md font-semibold">
        Intervention
      </h3>

      <div className="border border-brand-navy/20 border-t-0 rounded-b-md p-5 whitespace-pre-wrap min-h-[90px]">{report.intervention}</div>


      <h3 className="bg-brand-navy text-white px-4 py-2 rounded-t-md font-semibold">
        Review & Recommendations
      </h3>

      <div className="border border-brand-navy/20 border-t-0 rounded-b-md p-5 whitespace-pre-wrap min-h-[90px]">{report.review}</div>

      {/* ================= SIGNATURE ================= */}

      <div className="mt-20">

        <div className="grid grid-cols-3 gap-8">

          <div>


            <p className="font-semibold text-brand-navy">
              NRPT
            </p>


            <div className="border-b-2 border-brand-green mt-10"></div>

            <p className="mt-2">

              {report.createdBy || "Dennis Masaki"}
            </p>

          </div>

          <div>


            <p className="font-semibold text-brand-navy">
              Signature
            </p>


            <div className="border-b-2 border-brand-green mt-10"></div>

          </div>

          <div>


            <p className="font-semibold text-brand-navy">
              Date
            </p>


            <div className="border-b-2 border-brand-green mt-10"></div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-12 pt-3 border-t-4 border-brand-green flex justify-between text-[11px] text-gray-500">
        <span>Neuroflex Kenya</span>
        <span>{report.reportNo}</span>
      </div>

    </div>

  );
}

function Section({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {

  return (

    <div className="mb-8">

      <h3 className="font-bold text-blue-700 mb-2">

        {title}

      </h3>

      <div className="border rounded-md p-4 whitespace-pre-wrap min-h-[90px]">

        {value || "-"}

      </div>

    </div>

  );

}
