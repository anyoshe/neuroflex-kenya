// "use client";
// import Image from "next/image";
// import { CheckCircle2 } from "lucide-react";
// import { stats } from "@/lib/site-data";
// import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
// import { MotionReveal } from "@/components/ui/MotionReveal";
// import { SectionHeader } from "@/components/ui/SectionHeader";

// const highlights = [
//   "Stroke & neurological recovery specialists",
//   "Personalized, evidence-based treatment plans",
//   "State-of-the-art rehabilitation techniques",
//   "Multidisciplinary care team",
// ];

// export default function About() {
//   return (
//     <section id="about" className="section-padding bg-gray-50">
//       <div className="mx-auto max-w-7xl px-6">
//         <SectionHeader
//           badge="About Us"
//           title="Compassionate Care. Proven Results."
//           subtitle="Neuroflex and Physio Wellness Centre is Nairobi's premier rehabilitation facility — restoring independence through expert, human-centered therapy."
//           align="left"
//         />
        
//         {/* Keeping lg:grid-cols-2 (Left content, Right image section) */}
//         <div className="grid items-center gap-16 lg:grid-cols-2">
          
//           {/* LEFT SIDE: Highlights & Stats */}
//           <MotionReveal delay={0.1}>
//             <div className="space-y-4">
//               {highlights.map((item) => (
//                 <div
//                   key={item}
//                   className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-brand-teal/30 hover:shadow-md"
//                 >
//                   <CheckCircle2
//                     size={20}
//                     className="mt-0.5 shrink-0 text-brand-green"
//                   />
//                   <span className="text-gray-700">{item}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="rounded-2xl bg-white p-4 text-center shadow-sm"
//                 >
//                   <div className="text-2xl font-bold text-brand-green sm:text-3xl">
//                     <AnimatedCounter value={stat.value} suffix={stat.suffix} />
//                   </div>
//                   <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </MotionReveal>

//           {/* RIGHT SIDE: Hero Image Container with Content Layered On Top */}
//           <MotionReveal delay={0.2}>
//             <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-xl min-h-[500px] flex items-end p-6 sm:p-8">
              
//               {/* 1. THE HERO IMAGE (Covers the whole right column section) */}
//               <Image
//                 src="/images/services/physioimage5.jpg" 
//                 alt="Neuroflex Rehabilitation Facility"
//                 fill
//                 className="object-cover transition-transform duration-700 hover:scale-105"
//                 priority
//               />

//               {/* 2. DARK/BLUR OVERLAY (Ensures contrast so the overlay card pops) */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

//               {/* 3. THE LOGO & MISSION CARD (Floats beautifully on top of the image) */}
//               <div className="relative w-full rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-md">
//                 <Image
//                   src="/assets/logos/logo3cropped.jpeg"
//                   alt="Neuroflex and Physio Wellness Centre"
//                   width={640}
//                   height={210}
//                   className="w-full rounded-xl object-contain mix-blend-multiply" 
//                 />
                
//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                   <div className="rounded-xl bg-brand-navy p-4 text-white">
//                     <div className="text-xl font-bold">Since</div>
//                     <div className="text-2xl font-bold text-brand-teal">2024</div>
//                   </div>
//                   <div className="rounded-xl bg-brand-green/20 p-4">
//                     <div className="text-xs font-medium text-gray-800">Mission</div>
//                     <div className="mt-1 text-xs font-semibold text-brand-navy">
//                       Restore independence &amp; improve quality of life
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </MotionReveal>
          
//         </div>
//       </div>
//     </section>
//   );
// }

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
                src="/images/services/physioimage5.jpg" 
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