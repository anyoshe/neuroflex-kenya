"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import { contactInfo } from "@/lib/site-data";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  "Neurological Rehabilitation",
  "Cardiac & Pulmonary Rehab",
  "Musculoskeletal Physiotherapy",
  "Pediatric Physiotherapy",
  "Geriatric Care",
  "Wellness & Fitness",
  "General Inquiry",
];

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setForm(initialForm);
      toast.success("Appointment request sent! We'll contact you shortly.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          badge="Contact"
          title="Start Your Recovery Today"
          subtitle="Book a consultation or reach out — our team responds within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <MotionReveal className="lg:col-span-2" delay={0.1}>
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: contactInfo.location,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: contactInfo.phone,
                  href: contactInfo.phoneHref,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: contactInfo.email,
                  href: contactInfo.emailHref,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: contactInfo.hours,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-medium text-brand-navy transition hover:text-brand-green"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="mt-1 font-medium text-brand-navy">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-brand-navy p-6 text-white">
              <h3 className="font-bold">Emergency?</h3>
              <p className="mt-2 text-sm text-gray-300">
                For urgent medical emergencies, please call emergency services or
                visit the nearest hospital.
              </p>
              <a
                href={contactInfo.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:underline"
              >
                <Phone size={16} />
                Call {contactInfo.phone}
              </a>
            </div>
          </MotionReveal>

          <MotionReveal className="lg:col-span-3" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900">
                Request an Appointment
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Fill in your details and we&apos;ll get back to you promptly.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+254 7XX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-red-500">{errors.service}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Tell us about your condition or preferred appointment time..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Sending..." : "Send Request"}
                <Send size={16} />
              </button>
            </form>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
