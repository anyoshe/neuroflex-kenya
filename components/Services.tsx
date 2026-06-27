"use client";

import Image from "next/image";
import { useState } from "react";  // ← Import useState
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ContactModal from "@/components/Contact";   // ← Import the modal

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);   // ← Add this state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="services" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Our Services"
          title="Comprehensive Rehabilitation Solutions"
          subtitle="From neurological recovery to wellness programs — every service is tailored to your unique recovery goals."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = service.featured;

            return (
              <MotionReveal
                key={service.title}
                delay={index * 0.08}
                className={`group card-glow relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 ${
                  isFeatured ? "md:col-span-2 lg:row-span-1" : ""
                }`}
              >
                {/* Service Image */}
                <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={isFeatured}
                  />
                  
                  {isFeatured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent" />
                  )}
                </div>

                <div className="relative z-10">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      isFeatured
                        ? "bg-brand-green/10 text-brand-green group-hover:bg-white/20 group-hover:text-white"
                        : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                    }`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3
                    className={`mb-3 text-xl font-bold transition-colors ${
                      isFeatured
                        ? "text-gray-900 group-hover:text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {service.title}
                    {isFeatured && (
                      <span className="ml-2 inline-block rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-semibold text-brand-green group-hover:bg-white/20 group-hover:text-white">
                        Flagship
                      </span>
                    )}
                  </h3>

                  <p
                    className={`leading-relaxed transition-colors ${
                      isFeatured
                        ? "text-gray-600 group-hover:text-gray-200"
                        : "text-gray-600"
                    }`}
                  >
                    {service.desc}
                  </p>

                  {/* Updated Button - Opens Modal */}
                  <button
                    onClick={openModal}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold transition ${
                      isFeatured
                        ? "text-brand-green group-hover:text-brand-teal"
                        : "text-brand-green hover:gap-2"
                    }`}
                  >
                    Book consultation
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}