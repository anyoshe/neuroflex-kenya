"use client";

import Image from "next/image";

type Props = {
  title: string;
};

export default function ClinicHeader({
  title,
}: Props) {
  return (
    <>
      {/* Header */}

      <div className="bg-white px-5 py-6">

        <div className="flex justify-between items-start gap-8">

          {/* Logo */}

          <Image
            src="/assets/logos/logo3cropped.jpeg"
            alt="Neuroflex Kenya"
            width={280}
            height={110}
            priority
            className="object-contain w-[260px] h-auto"
          />

          {/* Contact */}

          <div className="text-right text-gray-700">

            <p>P.O Box 054-00506 Nairobi</p>

            <p>+254 729 213 135</p>

            <p className="font-semibold text-brand-navy">
              www.neuroflexkenya.com
            </p>

          </div>

        </div>

      </div>

      <h1 className="text-center text-3xl font-bold text-brand-navy">
        Neuroflex Kenya
      </h1>

      <p className="text-center text-brand-green font-medium mt-1">
        Physiotherapy • Neurorehabilitation • Wellness Centre
      </p>

      <div className="h-1 rounded-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-navy my-5" />

      <h2 className="text-center text-2xl font-bold uppercase tracking-wider text-brand-navy">
        {title}
      </h2>
    </>
  );
}