"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, X, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getLiveTestimonials } from "@/lib/testimonial-manager";
import { testimonials } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [displayTestimonials, setDisplayTestimonials] = useState<any[]>([...testimonials]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    comment: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Load live testimonials on mount
  useEffect(() => {
    async function loadLiveTestimonials() {
      const live = await getLiveTestimonials([...testimonials]);
      setDisplayTestimonials(live);
    }
    loadLiveTestimonials();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const prev = () => setActive((i) => (i - 1 + displayTestimonials.length) % displayTestimonials.length);
  const next = () => setActive((i) => (i + 1) % displayTestimonials.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch('/api/submit-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Thank you! Your testimonial has been submitted for review.");
        setFormData({ name: "", role: "", comment: "", rating: 5 });
        setTimeout(() => setShowModal(false), 2500);
      } else {
        setMessage("Failed to submit. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/heroimage.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="[&_p]:!text-white">
          <SectionHeader
            badge="Testimonials"
            title="Stories of Recovery"
            subtitle="Real outcomes from patients who trusted us with their rehabilitation journey."
          />
        </div>

        {/* Original Carousel */}
        <div className="relative mx-auto max-w-4xl mt-12">
          <div className="absolute -left-4 -top-4 text-brand-teal/30">
            <Quote size={80} fill="currentColor" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/95 backdrop-blur-md p-8 shadow-2xl sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl leading-relaxed text-gray-800 sm:text-2xl">
                  “{displayTestimonials[active].quote}”
                </p>

                {/* Add Star Rating Here */}
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`text-xl ${star <= (displayTestimonials[active].rating || 5) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-teal text-sm font-bold text-white">
                    {displayTestimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {displayTestimonials[active].name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {displayTestimonials[active].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {displayTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-brand-green" : "w-2 bg-gray-300"
                      }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-brand-green hover:text-brand-green"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-brand-green hover:text-brand-green"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Share Experience Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-green hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-semibold text-lg transition"
          >
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg p-8 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>

              <h3 className="text-2xl font-semibold mb-6">Share Your Recovery Story</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-brand-green"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Role / Condition</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-brand-green"
                    placeholder="Stroke Recovery Patient"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        <Star className={`text-3xl ${star <= formData.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Testimonial</label>
                  <textarea
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-brand-green"
                    placeholder="Write your experience here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-green text-white py-4 rounded-2xl font-semibold disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit for Review"}
                </button>
              </form>

              {message && <p className="text-center mt-4 text-green-600 font-medium">{message}</p>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}