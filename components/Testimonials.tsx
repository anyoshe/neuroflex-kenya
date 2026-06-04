"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Testimonials"
          title="Stories of Recovery"
          subtitle="Real outcomes from patients who trusted us with their rehabilitation journey."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -left-4 -top-4 text-brand-teal/20">
            <Quote size={80} fill="currentColor" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl leading-relaxed text-gray-700 sm:text-2xl">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-teal text-sm font-bold text-white">
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonials[active].name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[active].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-8 bg-brand-green" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-brand-green hover:text-brand-green"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-brand-green hover:text-brand-green"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
