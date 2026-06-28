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
  image: string;
  slug: string;
  duration: string;
  priceRange: string;
  bestFor: string;
  benefits: string[];
  galleryImages: string[];
}[] = [
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      desc: "Stroke recovery, Parkinson's, MS, and traumatic brain injury programs.",
      image: "/images/services/neuroimage1.webp",
      slug: "neurological-rehabilitation",
      featured: true,
      duration: "60 - 90 minutes",
      priceRange: "KSh 6,000 - 9,000",
      bestFor: "Stroke, Parkinson’s, Brain Injury",
      benefits: [
        "Improves mobility and coordination",
        "Enhances cognitive function",
        "Promotes neuroplasticity",
        "Reduces muscle spasticity",
        "Restores independence in daily activities",
        "Supports long-term recovery"
      ],
      galleryImages: [
        "/images/services/physioimage1.webp",
        "/images/services/neuroimage2.webp",
        "/images/services/physioimage6.webp",

      ]
    },
    {
      icon: Heart,
      title: "Cardiac & Pulmonary Rehab",
      desc: "Post-surgical recovery and respiratory condition management.",
      image: "/images/services/cardiacimage.webp",
      slug: "cardiac-pulmonary-rehab",
      duration: "45 - 70 minutes",
      priceRange: "KSh 5,000 - 8,000",
      bestFor: "Post Heart Surgery, COPD, Asthma",
      benefits: [
        "Improves heart and lung function",
        "Increases exercise tolerance",
        "Reduces shortness of breath",
        "Lowers risk of future cardiac events",
        "Boosts overall stamina and confidence"
      ],
      galleryImages: [
        "/images/services/cardiac3.webp",
        "/images/services/cardiacimage.webp",
        "/images/services/cardiac2.webp"
      ]
    },
    {
      icon: UserCog,
      title: "Musculoskeletal Physiotherapy",
      desc: "Back pain, sports injuries, and joint replacement recovery.",
      image: "/images/services/muscularimage1.webp",
      slug: "musculoskeletal-physiotherapy",
      duration: "45 - 75 minutes",
      priceRange: "KSh 5,000 - 7,500",
      bestFor: "Back Pain, Sports Injuries, Joint Issues",
      benefits: [
        "Pain relief and management",
        "Improved joint mobility",
        "Strengthening of muscles",
        "Faster recovery after surgery",
        "Prevention of future injuries"
      ],
      galleryImages: [
        "/images/services/musket1.webp",
        "/images/services/musket2.webp",
        "/images/services/physioimage5.webp"
      ]
    },
    {
      icon: UserCog,
      title: "Kinesiology Taping Therapy",
      desc: "Supportive taping techniques to reduce pain, improve stability, enhance performance, and accelerate recovery.",
      image: "/images/services/kinesologyimage1.webp",
      slug: "kinesiology-taping-therapy",
      duration: "30 - 60 minutes",
      priceRange: "KSh 3,500 - 6,000",
      bestFor: "Sports Injuries, Muscle Pain, Joint Support",
      benefits: [
        "Reduces pain and inflammation",
        "Improves muscle function",
        "Enhances athletic performance",
        "Provides joint stability",
        "Accelerates injury recovery"
      ],
      galleryImages: [
        "/images/services/kines2.webp",
        "/images/services/kinesologyimage1.webp",
        "/images/services/kineshand.webp"
      ]
    },
    {
      icon: Baby,
      title: "Pediatric Physiotherapy",
      desc: "Developmental delays, cerebral palsy, and torticollis care.",
      image: "/images/services/pedetric.webp",
      slug: "pediatric-physiotherapy",
      duration: "45 - 60 minutes",
      priceRange: "KSh 4,000 - 7,000",
      bestFor: "Children with Developmental Delays",
      benefits: [
        "Supports developmental milestones",
        "Improves motor skills",
        "Enhances coordination and balance",
        "Helps with cerebral palsy management",
        "Gentle and child-friendly approach"
      ],
      galleryImages: [
        "/images/services/kids2.webp",
        "/images/services/babytherapy1.webp",
        "/images/services/kids3.webp"
      ]
    },
    {
      icon: Users,
      title: "Geriatric Care",
      desc: "Fall prevention and mobility training for seniors.",
      image: "/images/services/geriaticimage1.webp",
      slug: "geriatric-care",
      duration: "45 - 60 minutes",
      priceRange: "KSh 4,500 - 6,500",
      bestFor: "Seniors & Elderly Mobility",
      benefits: [
        "Fall prevention training",
        "Improved balance and gait",
        "Maintains independence",
        "Reduces joint stiffness",
        "Enhances quality of life"
      ],
      galleryImages: [
        "/images/services/gatric1.webp",
        "/images/services/gatric2.webp",
        "/images/services/gatric3.webp"
      ]
    },
    {
      icon: Zap,
      title: "Wellness & Fitness",
      desc: "Corporate wellness, fitness training, and pain management.",
      image: "/images/services/fitnessimage1.webp",
      slug: "wellness-fitness",
      duration: "45 - 75 minutes",
      priceRange: "KSh 4,000 - 7,000",
      bestFor: "General Fitness & Wellness",
      benefits: [
        "Personalized fitness programs",
        "Pain management strategies",
        "Corporate wellness support",
        "Improved strength and flexibility",
        "Overall health optimization"
      ],
      galleryImages: [
        "/images/services/fitnessimage2.webp",
        "/images/services/wellnes.webp",
        "/images/services/neuroimage.webp"
      ]
    },
    {
      icon: Droplets,
      title: "Lymphatic Drainage",
      desc: "Highly effective for reducing swelling (lymphedema) and aiding immune function.",
      image: "/images/services/lympaticimage1.webp",
      slug: "lymphatic-drainage",
      duration: "45 - 75 minutes",
      priceRange: "KSh 4,500 - 7,500",
      bestFor: "Swelling, Detox, Post-Surgery",
      benefits: [
        "Reduces swelling and fluid retention",
        "Boosts immune system function",
        "Accelerates post-surgical recovery",
        "Improves skin tone and reduces cellulite",
        "Relieves sinus congestion",
        "Promotes deep relaxation"
      ],
      galleryImages: [
        "/images/services/lympatic-stomach.webp",
        "/images/services/lympatic-thighs.webp",
        "/images/services/physioimage3.webp",
        "/images/services/lympatic-back.webp",
        "/images/services/physioimage4.webp",
        "/images/services/physioimage2.webp"
      ]
    },
    {
      icon: Wind,
      title: "Carminative Management",
      desc: "Comprehensive assessment and management of flatulence and gastric discomfort.",
      image: "/images/services/carminativeimage.webp",
      slug: "carminative-management",
      duration: "40 - 60 minutes",
      priceRange: "KSh 4,000 - 6,000",
      bestFor: "Digestive Discomfort & Bloating",
      benefits: [
        "Relieves bloating and gas",
        "Improves digestive comfort",
        "Reduces abdominal pain",
        "Supports better gut health",
        "Non-invasive and gentle approach"
      ],
      galleryImages: [
        "/images/services/carminative3.webp",
        "/images/services/carminative2.webp",
        "/images/services/carminative1.webp"
      ]
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
    image: "/images/team/dennis-masaki.jpg",
  },
  {
    name: "John Ruben Kyui",
    role: "Senior Lecturer Specialist, Orthopedics",
    bio: "Expert clinician specializing in orthopedic rehabilitation and musculoskeletal injury recovery.",
    initials: "JK",
    image: "/images/team/john-ruben.jpg",
  },
  {
    name: "Sharon Jepng'etich",
    role: "Neuro Rehabilitation Therapist, Geriatrics Specialist",
    bio: "Dedicated to comprehensive neuro-rehabilitation care and geriatric patient management.",
    initials: "SJ",
    image: "/images/team/sharon-jepngetich.jpg",
  },
] as const;

export const testimonials = [
  {
    quote:
      "After my stroke, I couldn't walk without support. The team at Neuroflex gave me my independence back within months.",
    name: "Peter K.",
    role: "Stroke Recovery Patient",
    image: "/images/testimonials/peter-k.jpg",
  },
  {
    quote:
      "Professional, compassionate, and results-driven. My back pain is gone and I'm back to running again.",
    name: "Amina H.",
    role: "Sports Injury Patient",
    image: "/images/testimonials/amina-h.jpg",
  },
  {
    quote:
      "They treated my son with such patience and expertise. His progress has been incredible to witness.",
    name: "Mary W.",
    role: "Parent — Pediatric Care",
    image: "/images/testimonials/mary-w.jpg",
  },
] as const;



export const contactInfo = {
  phone: "+254 729 213 135",
  phoneHref: "tel:+254729213135",
  location: "Fedha Road, 300m off Outering Road, Embakasi, Nairobi, Kenya.",
  hours: "Mon – Sun: 8:00 AM – 9:00 PM",
  email: "info@neuroflexkenya.com",
  emailHref: "mailto:info@neuroflexkenya.com",
} as const;