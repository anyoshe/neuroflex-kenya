"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { stats } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const highlights = [
  "Stroke & neurological recovery specialists",
  "Personalized, evidence-based treatment plans",
  "State-of-the-art rehabilitation techniques",
  "Multidisciplinary care team",
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="About Us"
          title="Compassionate Care. Proven Results."
          subtitle="Neuroflex and Physio Wellness Centre is Nairobi's premier rehabilitation facility — restoring independence through expert, human-centered therapy."
          align="left"
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <MotionReveal delay={0.1}>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-brand-teal/30 hover:shadow-md"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-brand-green"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-4 text-center shadow-sm"
                >
                  <div className="text-2xl font-bold text-brand-green sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-green/20 via-brand-teal/10 to-brand-navy/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white p-6 shadow-xl">
                <Image
                  src="/assets/logos/logo3cropped.jpeg"
                  alt="Neuroflex and Physio Wellness Centre"
                  width={640}
                  height={210}
                  className="w-full rounded-2xl object-contain"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-brand-navy p-4 text-white">
                    <div className="text-2xl font-bold">Since</div>
                    <div className="text-3xl font-bold text-brand-teal">2024</div>
                  </div>
                  <div className="rounded-2xl bg-brand-green/10 p-4">
                    <div className="text-sm font-medium text-gray-600">Mission</div>
                    <div className="mt-1 text-sm font-semibold text-brand-navy">
                      Restore independence &amp; improve quality of life
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
