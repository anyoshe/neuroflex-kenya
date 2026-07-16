"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, X, Mail, MessageCircle, Calendar, Clock, User, FileText, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { services } from "@/lib/site-data"; // adjust the path

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  sex: z.enum(["Male", "Female", "Other"]),
  phone: z.string().min(10, "Valid phone number is required"),
  residence: z.string().min(2, "Residence / Location is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  conditionCause: z.string().min(10, "Please describe the condition or reason for visit"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;


const initialForm: FormData = {
  name: "",
  age: "",
  sex: "Male",
  phone: "",
  residence: "",
  email: "",
  service: "",
  conditionCause: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<"email" | "whatsapp">("email");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Validates current step fields before letting the client move forward
  const validateStep = (): boolean => {
    const fieldErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (form.name.length < 2) fieldErrors.name = "Full name is required";
      if (!form.age) fieldErrors.age = "Age is required";
      if (!form.phone || form.phone.length < 10) fieldErrors.phone = "Valid phone number is required";
      if (form.residence.length < 2) fieldErrors.residence = "Residence / Location is required";
      if (form.email && !z.string().email().safeParse(form.email).success) {
        fieldErrors.email = "Please enter a valid email";
      }
    } else if (step === 2) {
      if (!form.service) fieldErrors.service = "Please select a service";
      if (form.conditionCause.length < 10) fieldErrors.conditionCause = "Please describe the condition (min 10 characters)";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Please correctly fill all mandatory fields in this section.");
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3);
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
      toast.error("Please fill all required fields");
      return;
    }
   const selectedService = services.find(
  (service) => service.slug === form.service
);

const serviceName =
  selectedService?.title ?? "General Inquiry";
    setSubmitting(true);

    try {
      // Save inquiry to the database first
      const inquiryResponse = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const inquiryData = await inquiryResponse.json();

      if (!inquiryResponse.ok) {
        throw new Error(
          inquiryData.error || "Failed to save inquiry."
        );
      }
      if (submissionMethod === "email") {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to send email");

        toast.success("Appointment request sent successfully!");

      } else {
        const whatsappNumber = "254729213135";
        const whatsappMessage =
          `*🟢 NEUROFLEX AND PHYSIO WELLNESS CENTER 🟢*%0A%0A` +
          `👤 *Patient Name:* ${encodeURIComponent(form.name)}%0A` +
          `🎂 *Age:* ${form.age}    |    *Sex:* ${form.sex}%0A` +
          `📞 *Phone:* ${encodeURIComponent(form.phone)}%0A` +
          `📍 *Residence:* ${encodeURIComponent(form.residence)}%0A` +
          `✉️ *Email:* ${encodeURIComponent(form.email || "Not provided")}%0A` +
         `🛠️ *Service:* ${encodeURIComponent(serviceName)}%0A` +
          `📅 *Preferred Date:* ${form.preferredDate}%0A` +
          `⏰ *Preferred Time:* ${form.preferredTime}%0A%0A` +
          `📝 *Condition / Reason:*%0A${encodeURIComponent(form.conditionCause)}%0A%0A` +
          `${form.message ? `💬 *Additional Info:*%0A${encodeURIComponent(form.message)}%0A%0A` : ''}` +
          `────────────────%0A` +
          `Sent from Neuroflex Kenya Website`;

        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank"
        );

        toast.success(
          "Inquiry saved. Opening WhatsApp..."
        );
      }
      setForm(initialForm);
      setStep(1);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";
  const stepIndicatorBubble = (currentStep: number, label: string, stepIcon: React.ReactNode) => (
    <div className="flex flex-col items-center flex-1">
      <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 border ${step >= currentStep ? "bg-brand-teal border-brand-teal text-white" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
        {stepIcon}
      </div>
      <span className={`mt-1 hidden text-xs font-medium sm:block ${step >= currentStep ? "text-brand-navy font-semibold" : "text-gray-400"}`}>{label}</span>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-hidden">
      <MotionReveal>
        <div className="relative w-full max-w-lg md:max-w-2xl max-h-[94vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b px-4 py-1.5 sm:px-6 sm:py-2">
            <div className="flex-1 pr-2 sm:pr-4">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-1 sm:p-2">
                <Image
                  src="/assets/logos/logo1-transparent.png"
                  alt="Neuroflex and Physio Wellness Centre"
                  width={640}
                  height={210}
                  className="h-14 w-full object-contain sm:h-20"
                  priority
                />
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 sm:p-2 self-center">
              <X size={24} />
            </button>
          </div>

          {/* Progress Tracker Tracker */}
          <div className="bg-gray-50 border-b border-gray-100 py-3 px-6 flex items-center justify-between relative">
            <div className="absolute top-7 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0">
              <div className="h-full bg-brand-teal transition-all duration-300" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}></div>
            </div>
            <div className="relative z-10 flex w-full justify-between">
              {stepIndicatorBubble(1, "Personal Info", <User size={16} />)}
              {stepIndicatorBubble(2, "Clinical Details", <FileText size={16} />)}
              {stepIndicatorBubble(3, "Schedule", <CheckCircle size={16} />)}
            </div>
          </div>

          {/* Dynamic Card Container */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

              {/* CARD 1: PERSONAL INFORMATION */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-brand-navy border-b pb-2">Step 1: Patient Information</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                      <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Full Name" />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Age <span className="text-red-500">*</span></label>
                        <input name="age" type="number" value={form.age} onChange={handleChange} className={inputClass} placeholder="Age" />
                        {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Sex <span className="text-red-500">*</span></label>
                        <select name="sex" value={form.sex} onChange={handleChange} className={inputClass}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                      <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+254 7XX XXX XXX" />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Residence / Location <span className="text-red-500">*</span></label>
                      <input name="residence" value={form.residence} onChange={handleChange} className={inputClass} placeholder="E.g., Kilimani, Westlands..." />
                      {errors.residence && <p className="mt-1 text-xs text-red-500">{errors.residence}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address <span className="text-xs text-gray-400">(Optional)</span></label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@email.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: CLINICAL DETAILS */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold text-brand-navy border-b pb-2">Step 2: Consultation Details</h3>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Service Required <span className="text-red-500">*</span></label>
                   <select
  name="service"
  value={form.service}
  onChange={handleChange}
  className={inputClass}
>
  <option value="">Select Service</option>
{services.map((service) => (
  <option key={service.slug} value={service.slug}>
    {service.title}
  </option>
))}

<option value="general-inquiry">
  General Inquiry
</option>
</select>
                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Cause of Condition / Reason for Visit <span className="text-red-500">*</span></label>
                    <textarea name="conditionCause" rows={4} value={form.conditionCause} onChange={handleChange} className={inputClass} placeholder="E.g., Stroke 3 months ago, road accident, chronic back pain..." />
                    {errors.conditionCause && <p className="mt-1 text-xs text-red-500">{errors.conditionCause}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Additional Information <span className="text-xs text-gray-400">(Optional)</span></label>
                    <textarea name="message" rows={2} value={form.message} onChange={handleChange} className={inputClass} placeholder="Any other health context or relevant details..." />
                  </div>
                </div>
              )}

              {/* CARD 3: SCHEDULING & PREFERENCE */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-bold text-brand-navy border-b pb-2">Step 3: Scheduling & Preferences</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Appointment Date <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={`${inputClass} pl-11`} />
                      </div>
                      {errors.preferredDate && <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Appointment Time <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input type="time" name="preferredTime" value={form.preferredTime} onChange={handleChange} className={`${inputClass} pl-11`} />
                      </div>
                      {errors.preferredTime && <p className="mt-1 text-xs text-red-500">{errors.preferredTime}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">How would you prefer us to contact you?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setSubmissionMethod("email")} className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all ${submissionMethod === "email" ? "border-brand-teal bg-brand-teal/5" : "border-gray-200 hover:border-gray-300"}`}>
                        <Mail size={28} className={submissionMethod === "email" ? "text-brand-teal" : "text-gray-400"} />
                        <div className="text-center">
                          <div className="font-semibold text-sm">Via Email</div>
                          <div className="text-[11px] text-gray-500">Detailed logs</div>
                        </div>
                      </button>

                      <button type="button" onClick={() => setSubmissionMethod("whatsapp")} className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition-all ${submissionMethod === "whatsapp" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <MessageCircle size={28} className={submissionMethod === "whatsapp" ? "text-green-600" : "text-gray-400"} />
                        <div className="text-center">
                          <div className="font-semibold text-sm">Via WhatsApp</div>
                          <div className="text-[11px] text-gray-500">Fastest response</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* Action Footer Navigation Bar */}
          <div className="border-t p-4 md:p-6 bg-gray-50 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-50 transition"
              >
                <ChevronLeft size={18} /> Back
              </button>
            ) : (
              <div /> // Keeps alignment spacing intact
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-medium transition ml-auto"
              >
                Next Step <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="btn-primary px-6 py-3 text-base disabled:opacity-60 flex items-center justify-center gap-2 ml-auto"
              >
                {submitting ? "Processing..." : submissionMethod === "email" ? (
                  <>Complete Request <Send size={18} /></>
                ) : (
                  <>Send on WhatsApp <MessageCircle size={18} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}