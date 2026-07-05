"use client";

import { useEffect, useRef, useState } from "react";
import ReportDocument from "./ReportDocument";

type Props = {
  reportNo: string;
  formData: any;
};

export default function ReportPreview({
  reportNo,
  formData,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    function updateScale() {
      if (!wrapperRef.current || !reportRef.current) return;

      const wrapperWidth = wrapperRef.current.clientWidth;
      const reportWidth = reportRef.current.offsetWidth;
      const reportHeight = reportRef.current.offsetHeight;

      if (!reportWidth || !reportHeight) return;

      // Fill almost the whole width on mobile, but never enlarge
      const newScale = Math.min(1, wrapperWidth / reportWidth);

      setScale(newScale);
      setHeight(reportHeight * newScale);
    }

    updateScale();

    const observer = new ResizeObserver(updateScale);

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Live Report Preview
      </h2>

      <div
        ref={wrapperRef}
        className="w-full overflow-hidden rounded-xl bg-slate-200 p-2 md:p-6"
      >
        <div
          className="flex justify-center"
          style={{
            height: height ? `${height}px` : undefined,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            <div
              ref={reportRef}
              id="report-preview"
              className="report-preview"
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
      </div>
    </div>
  );
}