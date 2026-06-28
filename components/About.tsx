"use client";
import Image from "next/image";
import { CheckCircle2, Activity, Zap, ShieldCheck, HeartPulse } from "lucide-react";
import { stats } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const highlights = [
  { text: "Stroke & neurological recovery specialists", icon: HeartPulse },
  { text: "Personalized, evidence-based treatment plans", icon: ShieldCheck },
  { text: "State-of-the-art rehabilitation techniques", icon: Zap },
  { text: "Multidisciplinary care team", icon: Activity },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50/50 relative overflow-hidden">
      {/* Premium techy glow pattern */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-teal/5 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="About Us"
          title="Compassionate Care. Proven Results."
          subtitle="Neuroflex and Physio Wellness Centre is Nairobi's premier rehabilitation facility — restoring independence through expert, human-centered therapy."
          align="left"
        />
        
        {/* Changed items-center to items-stretch for equal-height columns */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch mt-12">
          
          {/* LEFT SIDE: Highlights & Stats */}
          <MotionReveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col justify-between gap-8">
              {/* Techy asymmetric layout for highlights */}
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-teal/30 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                        <Icon size={20} />
                      </div>
                      <p className="mt-4 font-medium text-gray-700 group-hover:text-brand-navy transition-colors duration-200 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Stats block anchored elegantly at the bottom */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  {stats.map((stat, idx) => (
                    <div key={stat.label} className={`text-center ${idx > 1 ? 'pt-2 sm:pt-0' : ''} ${idx % 2 !== 0 ? 'sm:pl-2' : ''}`}>
                      <div className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* RIGHT SIDE: Perfectly balanced Hero Image + Overlay Card */}
          <MotionReveal delay={0.2} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl flex items-end p-6 sm:p-8 min-h-[450px] lg:min-h-0">
              
              {/* 1. Background Hero Image */}
              <Image
                src="/images/services/physioimage5.webp" 
                alt="Neuroflex Rehabilitation Facility"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-102"
                priority
              />

              {/* 2. Seamless dark overlay blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />

              {/* 3. Floating Frosted Dashboard HUD */}
              <div className="relative w-full rounded-2xl border border-white/10 bg-white/90 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-gray-200/50 pb-4">
                  <div className="relative h-10 w-36">
                    <Image
                      src="/assets/logos/logo3cropped.jpeg"
                      alt="Neuroflex Logo"
                      fill
                      className="object-contain mix-blend-multiply" 
                    />
                  </div>
                  <span className="inline-flex items-center rounded-md bg-brand-green/10 px-2.5 py-0.5 text-xs font-medium text-brand-green ring-1 ring-inset ring-brand-green/20">
                    Est. 2024
                  </span>
                </div>
                
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-teal shadow-inner">
                    <Activity size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Our Core Mission</h4>
                    <p className="text-sm font-semibold text-brand-navy mt-0.5">
                      Restore independence &amp; improve quality of life
                    </p>
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