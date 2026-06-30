"use client";

import { Clock, Mail, MapPin, Phone, Calendar, ArrowUpRight, ShieldCheck } from "lucide-react";
import { contactInfo } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ContactInfoProps = {
  onBookAppointment: () => void;
};

export default function ContactInfo({ onBookAppointment }: ContactInfoProps) {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-white text-gray-900">
      {/* Subtle Brand Ambient Backplates */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-teal/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* The SectionHeader now reads cleanly on white/gray with native colors */}
        <SectionHeader
          badge="Contact Us"
          title="Get In Touch"
          subtitle="Visit our physical lab, sync via our digital channels, or book an appointment online."
        />

        {/* Smart Tech Bento Grid Layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Main Booking Hub - Glass Light Tech Card */}
          <MotionReveal 
            className="lg:col-span-7 flex flex-col justify-between rounded-3xl p-8 glass-light card-glow group" 
            delay={0.1}
          >
            <div>
              <div className="flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-navy w-fit mb-6">
                <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                Live Scheduling Sync
              </div>
              
              <h3 className="text-3xl font-bold tracking-tight text-brand-navy mb-3">
                Ready to Start Your Recovery?
              </h3>
              <p className="text-gray-600 max-w-xl mb-8">
                Initialize your consultation. Select a slot from our live calendar system and a dedicated specialist will contact you within 24 operational hours.
              </p>
            </div>

            <div>
              <button
                onClick={onBookAppointment}
                className="btn-primary group/btn w-full md:w-auto hover:scale-[1.02] transition-all"
              >
                Book Appointment Now
                <Calendar size={18} className="transition-transform group-hover/btn:scale-110" />
              </button>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-medium">
                <ShieldCheck size={14} className="text-brand-green" />
                Secure & Encrypted Scheduling
              </div>
            </div>
          </MotionReveal>

          {/* Interactive Map Box - Standard Light Tech Frame */}
          <MotionReveal 
            className="lg:col-span-5 h-[350px] lg:h-auto min-h-[300px] overflow-hidden rounded-3xl border border-gray-200/60 shadow-lg shadow-brand-navy/5 relative group" 
            delay={0.2}
          >
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7906161117143!2d36.8920197!3d-1.3004863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f12494ca2bafb%3A0xf2b0bf96b7e33828!2sFedha%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1719260000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-0 scale-[1.01] transition-transform duration-500 group-hover:scale-100"
            /> */}
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988!2d36.8961964!3d-1.3122836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zTVZRWCs zR0ogTmFpcm9iaQ!5e0!3m2!1sen!2ske!4v1720000000000!5m2!1sen!2ske"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="relative z-0 scale-[1.01] transition-transform duration-500 group-hover:scale-100"
/>
          </MotionReveal>

          {/* Bottom Row - Micro-Grid Contact Nodes matching brand style rules */}
          {[
            {
              icon: MapPin,
              label: "Physical Node",
              value: contactInfo.location,
              colorClass: "text-brand-navy bg-brand-navy/5",
            },
            {
              icon: Phone,
              label: "Direct Comms",
              value: contactInfo.phone,
              href: contactInfo.phoneHref,
              colorClass: "text-brand-green bg-brand-green/5",
            },
            {
              icon: Mail,
              label: "Secure Digital Mail",
              value: contactInfo.email,
              href: contactInfo.emailHref,
              colorClass: "text-brand-teal bg-brand-teal/5",
            },
            {
              icon: Clock,
              label: "Operational Window",
              value: contactInfo.hours,
              colorClass: "text-brand-navy bg-brand-navy/5",
            },
          ].map(({ icon: Icon, label, value, href, colorClass }, idx) => (
            <MotionReveal 
              key={label}
              className="lg:col-span-3 md:col-span-1"
              delay={0.1 * (idx + 1)}
            >
              {href ? (
                <a
                  href={href}
                  className="group flex flex-col justify-between h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm border-b-2 hover:border-b-brand-teal transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${colorClass}`}>
                      <Icon size={18} />
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-brand-teal transition-colors" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                    <div className="mt-1 text-sm font-semibold text-brand-navy group-hover:text-brand-teal transition-colors break-words">{value}</div>
                  </div>
                </a>
              ) : (
                <div className="flex flex-col justify-between h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-4 ${colorClass}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                    <div className="mt-1 text-sm font-semibold text-brand-navy break-words">{value}</div>
                  </div>
                </div>
              )}
            </MotionReveal>
          ))}

        </div>
      </div>
    </section>
  );
}