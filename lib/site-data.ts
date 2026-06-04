import {
  Baby,
  Brain,
  Heart,
  UserCog,
  Users,
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
    name: "Dr. Sarah Wanjiku",
    role: "Senior Physiotherapist",
    bio: "Expert in stroke recovery and musculoskeletal therapy with patient-centered care.",
    initials: "SW",
  },
  {
    name: "James Ochieng",
    role: "Pediatric Specialist",
    bio: "Dedicated to developmental therapy for children with neurological conditions.",
    initials: "JO",
  },
  {
    name: "Grace Muthoni",
    role: "Wellness Coordinator",
    bio: "Designs holistic wellness programs and guides patients through their recovery journey.",
    initials: "GM",
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
  hours: "Mon – Sat: 8:00 AM – 6:00 PM",
  email: "info@neuroflexkenya.com",
  emailHref: "mailto:info@neuroflexkenya.com",
} as const;
