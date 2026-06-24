"use client";

import { useState } from "react";
import { Send, X, Mail, MessageCircle, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import { MotionReveal } from "@/components/ui/MotionReveal";

const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  sex: z.enum(["Male", "Female", "Other"]),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  conditionCause: z.string().min(10, "Please describe the condition or reason for visit"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  message: z.string().optional(),
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
  age: "",
  sex: "Male",
  phone: "",
  email: "",
  service: "",
  conditionCause: "",
  preferredDate: "",
  message: "",
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<"email" | "whatsapp">("email");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
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
          `*🔔 NEW APPOINTMENT REQUEST - NEUROFLEX KENYA*%0A%0A` +
          `👤 *Patient Name:* ${encodeURIComponent(form.name)}%0A` +
          `🎂 *Age:* ${form.age}    |    *Sex:* ${form.sex}%0A` +
          `📞 *Phone:* ${encodeURIComponent(form.phone)}%0A` +
          `✉️ *Email:* ${encodeURIComponent(form.email || "Not provided")}%0A` +
          `🛠️ *Service:* ${encodeURIComponent(form.service)}%0A` +
          `📅 *Preferred Date:* ${form.preferredDate}%0A%0A` +
          `📝 *Condition / Reason:*%0A${encodeURIComponent(form.conditionCause)}%0A%0A` +
          `${form.message ? `💬 *Additional Info:*%0A${encodeURIComponent(form.message)}%0A%0A` : ''}` +
          `────────────────%0A` +
          `Sent from Neuroflex Kenya Website`;

        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
        toast.success("Opening WhatsApp...");
      }

      setForm(initialForm);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-hidden">
      <MotionReveal>
        <div className="relative w-full max-w-lg md:max-w-2xl max-h-[94vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
              <p className="text-sm text-gray-500">Please provide details for better assessment</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Full Name" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

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

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+254 7XX XXX XXX" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Email Field Added Back */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className={inputClass} 
                    placeholder="you@email.com (optional)" 
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Service Required <span className="text-red-500">*</span></label>
                  <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select Service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Cause of Condition / Reason for Visit <span className="text-red-500">*</span></label>
                <textarea name="conditionCause" rows={4} value={form.conditionCause} onChange={handleChange} className={inputClass} placeholder="E.g., Stroke 3 months ago, road accident, chronic back pain..." />
                {errors.conditionCause && <p className="mt-1 text-xs text-red-500">{errors.conditionCause}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Appointment Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={`${inputClass} pl-11`} />
                </div>
                {errors.preferredDate && <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Additional Information (Optional)</label>
                <textarea name="message" rows={3} value={form.message} onChange={handleChange} className={inputClass} placeholder="Any other relevant details..." />
              </div>

              {/* Response Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How would you prefer us to contact you?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setSubmissionMethod("email")} className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${submissionMethod === "email" ? "border-brand-teal bg-brand-teal/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <Mail size={32} className={submissionMethod === "email" ? "text-brand-teal" : "text-gray-400"} />
                    <div className="text-center">
                      <div className="font-semibold">Via Email</div>
                      <div className="text-xs text-gray-500">Detailed response</div>
                    </div>
                  </button>

                  <button type="button" onClick={() => setSubmissionMethod("whatsapp")} className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all ${submissionMethod === "whatsapp" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <MessageCircle size={32} className={submissionMethod === "whatsapp" ? "text-green-600" : "text-gray-400"} />
                    <div className="text-center">
                      <div className="font-semibold">Via WhatsApp</div>
                      <div className="text-xs text-gray-500">Fastest response</div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="border-t p-6 md:p-8">
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="btn-primary w-full py-4 text-lg disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {submitting ? "Processing..." : submissionMethod === "email" ? (
                <>Send Appointment Request <Send size={20} /></>
              ) : (
                <>Continue on WhatsApp <MessageCircle size={20} /></>
              )}
            </button>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}