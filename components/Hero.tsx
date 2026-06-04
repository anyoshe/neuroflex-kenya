"use client";

import { ArrowRight, Phone, Shield, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stats } from "@/lib/site-data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const trustBadges = [
  { icon: Shield, label: "Evidence-Based Care" },
  { icon: Users, label: "500+ Patients" },
  { icon: Sparkles, label: "Personalized Plans" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-bg relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-brand-green/20 blur-3xl animate-pulse-glow" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
              </span>
              <span className="text-sm font-medium text-white/90">
                Nairobi&apos;s Premier Rehab Centre
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Recover.{" "}
              <span className="text-gradient">Move.</span>{" "}
              <span className="text-brand-teal">Thrive.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl"
            >
              Advanced neurological rehabilitation and physiotherapy — combining
              clinical expertise with compassionate, personalized care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="#contact" className="btn-primary text-base !px-10 !py-4">
                Book Appointment
                <ArrowRight size={18} />
              </Link>
              <a href="tel:+254729213135" className="btn-outline text-base !px-8 !py-4">
                <Phone size={18} />
                Call Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/80"
                >
                  <Icon size={14} className="text-brand-teal" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass relative rounded-3xl p-8 animate-float">
              <div className="absolute -right-4 -top-4 rounded-2xl bg-brand-green px-4 py-2 text-xs font-semibold text-white shadow-lg">
                Led by NRPT Dennis Masaki
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`rounded-2xl p-5 ${
                      i === 0
                        ? "col-span-2 bg-gradient-to-br from-brand-green/20 to-brand-teal/10"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-gray-300">
                  &ldquo;Every recovery journey is unique. We combine cutting-edge
                  therapy techniques with human-centered care.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/40">
            Scroll
          </span>
          <div className="h-10 w-6 rounded-full border border-white/30 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="mx-auto h-2 w-1 rounded-full bg-white/60"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
