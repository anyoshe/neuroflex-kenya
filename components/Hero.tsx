"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stats } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type HeroProps = {
  onBookAppointment?: () => void;
};

const trustBadges = [
  { icon: ShieldCheck, label: "Evidence-Based Care" },
  { icon: Users, label: "500+ Patients Recovered" },
  { icon: Sparkles, label: "Personalized Recovery Plans" },
];

const careSignals = [
  { label: "Neuro Rehab", value: "Stroke, TBI, Parkinson's" },
  { label: "Mobility Lab", value: "Balance, gait, strength" },
  { label: "Pain Recovery", value: "Back pain, injury rehab" },
];

const recoveryPlan = [
  "Clinical movement assessment",
  "Personalized therapy roadmap",
  "Guided progress tracking",
];
export default function Hero({ onBookAppointment }: HeroProps) {

  // Logic to handle the click
  const handleBookClick = () => {
    if (onBookAppointment) {
      onBookAppointment();
    } else {
      // Fallback: Scroll to contact section if modal is not available
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return (
    <section
      id="home"
      className="hero-bg relative flex min-h-[90svh] items-center overflow-hidden pt-16 lg:min-h-[100svh]"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#00122f] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
              </span>
              <span className="text-sm font-medium text-white/90">
                Nairobi’s trusted neuro-rehabilitation and physiotherapy facility
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
            >
              Regain movement, independence & confidence with{" "}
              <span className="text-gradient">expert neurorehab.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200"
            >
              If you or a loved one is recovering from stroke, injury, or chronic pain,
              we provide structured therapy that focuses on real, measurable recovery — not guesswork.
            </motion.p>

            {/* CTAs - Improved */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >

              <button
                onClick={handleBookClick}
                className="btn-primary group flex items-center justify-center gap-2 !px-8 !py-3.5 text-base font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Assessment
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/254729213135"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-brand-teal/10 hover:border-brand-teal/50 hover:text-white"
              >
                <MessageCircle size={19} className="text-emerald-400" />
                WhatsApp Us
              </a>

              <a
                href="tel:+254729213135"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-brand-teal/10 hover:border-brand-teal/50 hover:text-white"
                aria-label="Call +254 729 213135"
              >
                <Phone size={19} className="text-emerald-400" />
                Call Now
              </a>
            </motion.div>

            {/* Care Signals */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {careSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md transition hover:bg-white/[0.12]"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
                    {signal.label}
                  </div>
                  <div className="mt-2 text-sm text-white/90">{signal.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/90 transition hover:text-white"
                >
                  <Icon size={15} className="text-brand-teal" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass relative overflow-hidden rounded-[1.75rem] p-5 shadow-2xl shadow-black/30">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green via-brand-teal to-white/70" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-brand-teal">
                    Recovery Command Centre
                  </div>
                  <div className="mt-1 text-2xl font-bold leading-tight text-white">
                    Structured progress tracking
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white whitespace-nowrap">
                  <CalendarCheck2 size={17} />
                  Booking Open
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white p-4">
                <Image
                  src="/assets/logos/logo3cropped.jpeg"
                  alt="Neuroflex and Physio Wellness Centre"
                  width={640}
                  height={210}
                  className="h-28 w-full object-contain"
                  priority
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border border-white/10 p-4 transition-all ${i === 0
                        ? "bg-white text-brand-navy"
                        : "bg-white/[0.08] text-white hover:bg-white/[0.12]"
                      }`}
                  >
                    <div className="text-3xl font-bold tabular-nums">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className={`mt-1 text-xs ${i === 0 ? "text-gray-600" : "text-gray-300"}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-2xl bg-brand-teal/15 p-4">
                  <HeartPulse className="text-brand-teal" size={26} />
                  <div className="mt-4 text-sm text-white/80">Led by NRPT</div>
                  <div className="text-xl font-semibold text-white">Dennis Masaki</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Activity size={18} className="text-brand-green" />
                    Care Pathway
                  </div>
                  <div className="space-y-2">
                    {recoveryPlan.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-gray-200">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-5 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin size={17} className="text-brand-teal" />
                  Nairobi, Kenya
                </div>
                <div className="rounded-full bg-white/10 px-5 py-2 font-medium text-white">
                  Same-week appointments
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}