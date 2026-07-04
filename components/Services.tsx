"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { services } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ContactModal from "@/components/Contact";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFirst = index === 0;
            const isLast = index === services.length - 1;
            const isSecondLast = index === services.length - 2;
            const isHighlighted =
              isFirst || isSecondLast || isLast;

            return (
              <MotionReveal
                key={service.title}
                delay={index * 0.08}
                className={`card-glow relative overflow-hidden rounded-3xl
                            border border-gray-100 bg-white p-8 transition-all duration-300
                            [&_img]:transition-transform [&_img]:duration-500
                            hover:[&_img]:scale-105 hover:border-brand-green/20 hover:shadow-lg

                            ${isFirst ? "lg:col-span-2" : ""}

                            ${isSecondLast ? "lg:col-span-1" : ""}

                            ${isLast ? "lg:col-span-2" : ""}
                            `}
              >
                {/* Service Image */}
                <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority={isHighlighted}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-40" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green transition-all duration-300 [.card-glow:hover_&]:bg-brand-green [.card-glow:hover_&]:text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors flex flex-wrap items-center gap-2">
                    <span className={`rounded-lg px-1 transition-all duration-300 ${isHighlighted ? "[.card-glow:hover_&]:bg-brand-green/10 [.card-glow:hover_&]:text-brand-green" : ""
                      }`}>
                      {service.title}
                    </span>

                    {isHighlighted && (
                      <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                        {isFirst ? "Flagship" : "Popular Choice"}
                      </span>
                    )}
                  </h3>

                  <p className={`leading-relaxed transition-all duration-300 text-gray-600 rounded-xl p-1 ${isHighlighted ? "[.card-glow:hover_&]:bg-brand-green/5 [.card-glow:hover_&]:text-gray-900" : ""
                    }`}>
                    {service.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      onClick={openModal}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition hover:gap-2"
                    >
                      Book consultation
                      <ArrowUpRight size={16} />
                    </button>

                    <a
                      href={`/services/${service.slug}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2 ${isHighlighted
                          ? "text-brand-green underline decoration-brand-green/30"
                          : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      Learn more
                      <BookOpen size={16} />
                    </a>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}