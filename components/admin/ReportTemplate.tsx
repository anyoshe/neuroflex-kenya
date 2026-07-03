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

export default function ReportTemplate({ report }: Props) {
  return (
    <div
      id="report-preview"
      className="bg-white mx-auto shadow-lg"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontFamily: "Times New Roman, serif",
      }}
    >
      {/* =================== LOGO =================== */}

      <div className="text-center">

        <Image
          src="/assets/logos/logo1.png"
          alt="Neuroflex Kenya"
          width={120}
          height={120}
          priority
          className="mx-auto"
        />

        <h1 className="text-3xl font-bold text-blue-800 mt-3">
          Neuroflex & Physio
        </h1>

        <h2 className="text-xl font-semibold">
          Wellness Centre
        </h2>

        <p>Neuroflex Kenya</p>

        <p>P.O Box 054-00506 Nairobi</p>

        <p>+254 729 213 135</p>

        <p>www.neuroflexkenya.com</p>

      </div>

      <hr className="my-6 border-2 border-blue-700"/>

      <h2 className="text-center font-bold text-xl underline mb-8">
        PHYSIOTHERAPIST / NEUROREHABILITATION REPORT
      </h2>

      {/* ================= PATIENT DETAILS ================= */}

      <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[15px]">

        <p><strong>Report No:</strong> {report.reportNo}</p>

        <p><strong>Date:</strong> {report.reportingDate}</p>

        <p><strong>Patient Name:</strong> {report.patientName}</p>

        <p><strong>Age:</strong> {report.age}</p>

        <p><strong>Sex:</strong> {report.sex}</p>

        <p><strong>Telephone:</strong> {report.tel}</p>

        <p><strong>Residence:</strong> {report.residence}</p>

        <p><strong>Next of Kin:</strong> {report.nextOfKin}</p>

      </div>

      <hr className="my-6"/>

      {/* ================= REPORT BODY ================= */}

      <Section
        title="Presenting History"
        value={report.presentingHistory}
      />

      <Section
        title="Assessment Findings"
        value={report.assessmentFindings}
      />

      <Section
        title="Intervention"
        value={report.intervention}
      />

      <Section
        title="Review & Recommendations"
        value={report.review}
      />

      {/* ================= SIGNATURE ================= */}

      <div className="mt-20">

        <div className="grid grid-cols-3 gap-8">

          <div>

            <p className="font-semibold">
              NRPT
            </p>

            <div className="border-b mt-10"></div>

            <p className="mt-2">
              {report.createdBy || "Dennis Masaki"}
            </p>

          </div>

          <div>

            <p className="font-semibold">
              Signature
            </p>

            <div className="border-b mt-10"></div>

          </div>

          <div>

            <p className="font-semibold">
              Date
            </p>

            <div className="border-b mt-10"></div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-16 pt-6 border-t text-center text-xs text-gray-500">

        Neuroflex Kenya • Physiotherapy • Neurorehabilitation • Wellness Services

      </div>

    </div>
  );
}

function Section({
  title,
  value,
}:{
  title:string;
  value?:string;
}){

  return(

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