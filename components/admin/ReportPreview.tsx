"use client";
import ReportDocument from "./ReportDocument";

type Props = {

  reportNo: string;

  formData: any;

};

export default function ReportPreview({

  reportNo,

  formData,

}: Props) {

  return (

    <div className="overflow-x-auto">

      <h2 className="text-xl font-bold mb-4">

        Live Report Preview

      </h2>
      <div className="bg-slate-200 rounded-xl p-6 flex justify-center">

        <div
              id="report-preview"
              className="
              report-preview
              max-xl:scale-90
              max-md:scale-75
              origin-top
            "
            >
              <ReportDocument
                report={{
                  reportNo,
                  patientName: formData.patientName,
                  age: formData.age,
                  sex: formData.sex,
                  residence: formData.residence,
                  tel: formData.tel,
                  reportingDate: formData.reportingDate,
                  nextOfKin: formData.nextOfKin,
                  presentingHistory: formData.presentingHistory,
                  assessmentFindings: formData.assessmentFindings,
                  intervention: formData.intervention,
                  review: formData.review,
                  createdBy: "Dennis Masaki",
                }}
          />
        </div>

      </div>
    </div>

  );

}
