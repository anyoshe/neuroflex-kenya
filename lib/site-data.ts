import {
  Baby,
  Brain,
  Droplets,
  Heart,
  UserCog,
  Users,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const stats = [
  { value: 500, suffix: "+", label: "Patients Treated" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "", label: "Specialty Programs" },
] as const;

export const services: {
  icon: LucideIcon;
  title: string;
  desc: string;
  featured?: boolean;
}[] = [
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    desc: "Stroke recovery, Parkinson's, MS, and traumatic brain injury programs.",
    featured: true,
  },
  {
    icon: Heart,
    title: "Cardiac & Pulmonary Rehab",
    desc: "Post-surgical recovery and respiratory condition management.",
  },
  {
    icon: UserCog,
    title: "Musculoskeletal Physiotherapy",
    desc: "Back pain, sports injuries, and joint replacement recovery.",
  },
  {
    icon: Baby,
    title: "Pediatric Physiotherapy",
    desc: "Developmental delays, cerebral palsy, and torticollis care.",
  },
  {
    icon: Users,
    title: "Geriatric Care",
    desc: "Fall prevention and mobility training for seniors.",
  },
  {
    icon: Zap,
    title: "Wellness & Fitness",
    desc: "Corporate wellness, fitness training, and pain management.",
  },
  {
    icon: Droplets,
    title: "Lymphatic Drainage",
    desc: "Highly effective for reducing swelling (lymphedema) and aiding immune function.",
  },
  {
    icon: Wind,
    title: "Carminative Management",
    desc: "Comprehensive assessment and management of flatulence and gastric discomfort.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Clinical Assessment",
    desc: "Comprehensive evaluation of mobility, strength, and neurological function.",
  },
  {
    step: "02",
    title: "Personalized Plan",
    desc: "Evidence-based therapy roadmap tailored to your goals and lifestyle.",
  },
  {
    step: "03",
    title: "Active Therapy",
    desc: "Hands-on treatment, guided exercises, and progressive rehabilitation.",
  },
  {
    step: "04",
    title: "Sustained Recovery",
    desc: "Home programs, follow-ups, and long-term wellness support.",
  },
] as const;

export const team = [
  {
    name: "NRPT Dennis Masaki",
    role: "Lead Physiotherapist & Founder",
    bio: "Specialist in neurological rehabilitation with 15+ years restoring mobility and independence.",
    initials: "DM",
  },
  {
    name: "John Ruben Kyui",
    role: "Senior Lecturer Specialist, Orthopedics",
    bio: "Expert clinician specializing in orthopedic rehabilitation and musculoskeletal injury recovery.",
    initials: "JK",
  },
  {
    name: "Sharon Jepng'etich",
    role: "Neuro Rehabilitation Therapist, Geriatrics Specialist",
    bio: "Dedicated to comprehensive neuro-rehabilitation care and geriatric patient management.",
    initials: "SJ",
  },
] as const;

export const testimonials = [
  {
    quote:
      "After my stroke, I couldn't walk without support. The team at Neuroflex gave me my independence back within months.",
    name: "Peter K.",
    role: "Stroke Recovery Patient",
  },
  {
    quote:
      "Professional, compassionate, and results-driven. My back pain is gone and I'm back to running again.",
    name: "Amina H.",
    role: "Sports Injury Patient",
  },
  {
    quote:
      "They treated my son with such patience and expertise. His progress has been incredible to witness.",
    name: "Mary W.",
    role: "Parent — Pediatric Care",
  },
] as const;

export const contactInfo = {
  phone: "+254 729 213 135",
  phoneHref: "tel:+254729213135",
  location: "Nairobi, Kenya",
  hours: "Mon – Sun: 8:00 AM – 9:00 PM",
  email: "info@neuroflexkenya.com",
  emailHref: "mailto:info@neuroflexkenya.com",
} as const;
