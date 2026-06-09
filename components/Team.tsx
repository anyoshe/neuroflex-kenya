"use client";

import { team } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Team() {
  return (
    <section id="team" className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Our Team"
          title="Expert Clinicians, Human Touch"
          subtitle="A multidisciplinary team dedicated to guiding you through every step of your recovery."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <MotionReveal key={member.name} delay={index * 0.08}>
              <div className="group card-glow h-full overflow-hidden rounded-3xl border border-gray-100 bg-white">
                <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-brand-navy to-brand-teal">
                  <span className="text-4xl font-bold text-white/90">
                    {member.initials}
                  </span>
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-green">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
