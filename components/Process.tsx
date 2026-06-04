"use client";

import { processSteps } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Process() {
  return (
    <section className="section-padding relative overflow-hidden bg-brand-navy">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="How It Works"
          title="Your Smart Recovery Journey"
          subtitle="A structured, technology-informed approach that puts you at the center of every decision."
          dark
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <MotionReveal key={step.step} delay={index * 0.1}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-teal/30 hover:bg-white/10">
                <div className="mb-4 text-4xl font-bold text-brand-teal/40 transition group-hover:text-brand-teal">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>

                {index < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-brand-teal/30 lg:block" />
                )}
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
