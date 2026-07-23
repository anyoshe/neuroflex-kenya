import {
  Baby,
  Brain,
  Droplets,
  Heart,
  MessageCircle,
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
  { value: 10, suffix: "", label: "Specialty Programs" },
] as const;

export const services: {
  icon: LucideIcon;
  title: string;
  desc: string;

  overview: string;

  conditions: string[];

  treatment: string;

  featured?: boolean;

  image: string;

  slug: string;

  duration: string;

  priceRange: string;

  bestFor: string;

  benefits: string[];

  galleryImages: string[];

  faq: {
    question: string;
    answer: string;
  }[];
}[] = [
    {
      icon: Brain,
      title: "Neurological Rehabilitation",

      desc:
        "Stroke recovery, Parkinson's, MS, and traumatic brain injury programs.",

      overview:
        "Neurological Rehabilitation at Neuroflex Kenya is a specialized physiotherapy service designed to help individuals recover movement, strength, balance and independence following neurological conditions. Our experienced physiotherapists develop personalized rehabilitation programs using evidence-based treatment techniques that promote neuroplasticity, restore functional mobility and improve quality of life. Whether you are recovering from a stroke, living with Parkinson's disease, multiple sclerosis or a traumatic brain injury, our goal is to help you regain confidence and return to everyday activities safely.",

      conditions: [
        "Stroke Rehabilitation",
        "Parkinson's Disease",
        "Multiple Sclerosis (MS)",
        "Traumatic Brain Injury",
        "Spinal Cord Injury",
        "Bell's Palsy",
        "Peripheral Nerve Disorders",
        "Balance & Coordination Problems"
      ],

      treatment:
        "Every rehabilitation journey begins with a comprehensive physiotherapy assessment where we evaluate muscle strength, balance, coordination, posture, walking ability and functional independence. Based on the assessment, we design an individualized treatment plan that may include gait training, balance retraining, muscle strengthening, stretching, functional task practice, neurodevelopmental techniques, electrical stimulation where appropriate and personalized home exercise programs. We continuously monitor your progress and adjust treatment to achieve the best possible recovery.",

      featured: true,

      image: "/images/services/neuroimage1.webp",

      slug: "neurological-rehabilitation",

      duration: "60 - 90 minutes",

      priceRange: "KSh 3,500 - 6,000",

      bestFor: "Stroke, Parkinson's, Brain Injury",

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
        "/images/services/physioimage6.webp"
      ],

      faq: [
        {
          question:
            "Who can benefit from neurological rehabilitation?",
          answer:
            "Anyone recovering from stroke, traumatic brain injury, spinal cord injury, Parkinson's disease, multiple sclerosis or other neurological conditions affecting movement and independence can benefit from neurological rehabilitation."
        },
        {
          question:
            "How many therapy sessions will I need?",
          answer:
            "The number of sessions varies depending on the severity of the condition, recovery goals and your progress during treatment. Your physiotherapist will create a personalized treatment plan after assessment."
        },
        {
          question:
            "Can physiotherapy help after a stroke?",
          answer:
            "Yes. Early and consistent physiotherapy is one of the most effective ways to improve walking, balance, muscle strength and independence after stroke."
        },
        {
          question:
            "Do you provide home exercise programs?",
          answer:
            "Yes. Every patient receives individualized home exercises to complement in-clinic therapy and accelerate recovery."
        }
      ]
    },

    {
      icon: Heart,
      title: "Cardiac & Pulmonary Rehab",
      desc: "Post-surgical recovery and respiratory condition management.",
      overview:
        "Cardiac and Pulmonary Rehabilitation at Neuroflex Kenya is a specialized physiotherapy program designed to improve heart and lung function, restore physical endurance and help patients safely return to everyday life after illness or surgery. Our rehabilitation programs are individually tailored for patients recovering from heart attacks, cardiac surgery, chronic respiratory diseases and other cardiovascular conditions. Through carefully supervised exercise, breathing techniques and lifestyle education, we help patients improve their quality of life while reducing the risk of future complications.",

      conditions: [
        "Heart Attack Recovery",
        "Open Heart Surgery",
        "Coronary Artery Disease",
        "Chronic Obstructive Pulmonary Disease (COPD)",
        "Asthma",
        "Heart Failure",
        "Post COVID Respiratory Recovery",
        "Chronic Respiratory Conditions"
      ],

      treatment:
        "Every patient undergoes a detailed cardiovascular and respiratory assessment before beginning treatment. Our physiotherapists design a personalized rehabilitation program that may include monitored exercise training, breathing exercises, endurance conditioning, posture correction, airway clearance techniques, education on lifestyle modification and long-term cardiac wellness strategies. Treatment progresses gradually according to your recovery and medical condition.",

      faq: [
        {
          question:
            "Who should undergo cardiac rehabilitation?",
          answer:
            "Cardiac rehabilitation is recommended for individuals recovering from heart attacks, heart surgery, angioplasty, heart failure and other cardiovascular conditions."
        },
        {
          question:
            "Can physiotherapy improve breathing problems?",
          answer:
            "Yes. Physiotherapy helps improve lung capacity, breathing efficiency and endurance for patients with COPD, asthma and other respiratory conditions."
        },
        {
          question:
            "Is exercise safe after heart surgery?",
          answer:
            "Yes. Under professional supervision, carefully planned exercises are safe and play an important role in recovery after cardiac surgery."
        },
        {
          question:
            "How long does pulmonary rehabilitation take?",
          answer:
            "The duration varies depending on the severity of the condition and individual recovery goals, but consistent participation produces the best outcomes."
        }
      ],
      image: "/images/services/cardiacimage.webp",
      slug: "cardiac-pulmonary-rehab",
      duration: "45 - 70 minutes",
      priceRange: "Sh 3,500 - 6,000",
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
      overview:
        "Musculoskeletal Physiotherapy at Neuroflex Kenya focuses on diagnosing, treating and preventing conditions affecting muscles, joints, bones, ligaments and tendons. Whether your pain is caused by injury, poor posture, arthritis or surgery, our physiotherapists develop personalized treatment plans that relieve pain, restore movement and improve long-term physical function.",

      conditions: [
        "Lower Back Pain",
        "Neck Pain",
        "Shoulder Pain",
        "Sports Injuries",
        "Arthritis",
        "Joint Replacement Recovery",
        "Tendon Injuries",
        "Workplace & Postural Injuries"
      ],

      treatment:
        "Treatment begins with a comprehensive physical assessment to identify the source of pain and movement restrictions. Depending on your condition, therapy may include manual therapy, therapeutic exercises, posture correction, stretching, strengthening programs, joint mobilization, sports rehabilitation techniques and education to prevent future injuries.",

      faq: [
        {
          question:
            "What conditions does musculoskeletal physiotherapy treat?",
          answer:
            "We treat back pain, neck pain, joint injuries, sports injuries, arthritis, tendon disorders and post-surgical rehabilitation."
        },
        {
          question:
            "Do I need a doctor's referral?",
          answer:
            "No. You can book directly with our physiotherapists for assessment and treatment."
        },
        {
          question:
            "How quickly will I recover?",
          answer:
            "Recovery depends on the nature of your condition, but early physiotherapy often speeds healing and reduces long-term pain."
        },
        {
          question:
            "Can physiotherapy prevent surgery?",
          answer:
            "In many cases, physiotherapy significantly improves function and may reduce the need for surgical intervention."
        }
      ],
      image: "/images/services/muscularimage1.webp",
      slug: "musculoskeletal-physiotherapy",
      duration: "45 - 75 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
      icon: Droplets,
      title: "Cryotherapy",
      desc: "Targeted cold therapy to reduce pain, inflammation, muscle soreness, and accelerate recovery after injury or surgery.",
      overview:
        "Cryotherapy at Neuroflex Kenya is a modern therapeutic treatment that uses controlled cold temperatures to reduce pain, inflammation and muscle soreness. It is widely used by athletes, post-surgical patients and individuals with chronic pain to accelerate healing, minimize swelling and improve physical recovery. Our physiotherapists carefully assess every patient before recommending cryotherapy as part of a comprehensive rehabilitation program.",

      conditions: [
        "Sports Injuries",
        "Muscle Strains",
        "Ligament Injuries",
        "Joint Pain",
        "Post-Surgical Recovery",
        "Arthritis",
        "Chronic Inflammation",
        "Delayed Muscle Recovery"
      ],

      treatment:
        "Cryotherapy sessions are carefully supervised and combined with physiotherapy where appropriate. Controlled cold application helps reduce inflammation, relieve pain and accelerate tissue healing while improving overall recovery outcomes.",

      faq: [
        {
          question: "Is cryotherapy safe?",
          answer:
            "Yes. When performed by trained professionals, cryotherapy is a safe and effective treatment for pain and inflammation."
        },
        {
          question: "Does cryotherapy hurt?",
          answer:
            "Patients usually experience intense cold for a short period followed by significant pain relief."
        },
        {
          question: "Who benefits from cryotherapy?",
          answer:
            "Athletes, post-operative patients and individuals with chronic pain or inflammation often benefit from cryotherapy."
        }
      ],
      image: "/images/services/Whole-Body-Cryotherapy.webp",
      slug: "cryotherapy",
      duration: "20 - 45 minutes",
      priceRange: "KSh 3,500 - 6,000",
      bestFor: "Sports Injuries, Pain Relief, Post-Surgical Recovery",
      benefits: [
        "Reduces pain and inflammation",
        "Speeds muscle recovery",
        "Minimizes swelling and bruising",
        "Enhances post-operative rehabilitation",
        "Improves recovery after intense physical activity",
        "Supports faster return to daily activities"
      ],
      galleryImages: [
        "/images/services/cryotherapy1.webp",
        "/images/services/cryotherapy4.webp",
        "/images/services/cryotherapy3.webp"
      ]
    },
    {
      icon: UserCog,
      title: "Kinesiology Taping Therapy",
      desc: "Supportive taping techniques to reduce pain, improve stability, enhance performance, and accelerate recovery.",
      overview:
        "Kinesiology Taping Therapy uses specially designed elastic therapeutic tape to support muscles and joints without limiting movement. At Neuroflex Kenya we use kinesiology taping to reduce pain, improve muscle performance, enhance circulation and support recovery from sports injuries and musculoskeletal conditions.",

      conditions: [
        "Sports Injuries",
        "Muscle Strains",
        "Joint Instability",
        "Shoulder Pain",
        "Knee Pain",
        "Back Pain",
        "Tendon Injuries",
        "Postural Problems"
      ],

      treatment:
        "Following assessment, specialized kinesiology tape is applied using clinically proven techniques to support affected muscles and joints. Taping is often combined with exercise therapy and rehabilitation to improve treatment outcomes.",

      faq: [
        {
          question: "How long does kinesiology tape stay on?",
          answer: "Most kinesiology tape remains effective for three to five days depending on activity and skin condition."
        },
        {
          question: "Can I shower with kinesiology tape?",
          answer: "Yes. The tape is water-resistant and designed for normal daily activities."
        },
        {
          question: "Does kinesiology tape replace physiotherapy?",
          answer: "No. It works best when combined with physiotherapy exercises and rehabilitation."
        }
      ],
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
      overview:
        "Pediatric Physiotherapy helps infants and children achieve optimal movement, strength and physical development. At Neuroflex Kenya we provide compassionate, child-friendly physiotherapy programs that support children with developmental delays, neurological disorders, orthopedic conditions and physical disabilities while encouraging confidence and independence.",

      conditions: [
        "Developmental Delays",
        "Cerebral Palsy",
        "Torticollis",
        "Delayed Walking",
        "Poor Balance",
        "Muscle Weakness",
        "Genetic Disorders",
        "Pediatric Neurological Conditions"
      ],

      treatment:
        "Treatment includes play-based exercises, balance training, muscle strengthening, posture correction, developmental activities and caregiver education tailored to each child's needs and developmental stage.",

      faq: [
        {
          question: "At what age can a child begin physiotherapy?",
          answer: "Children can begin physiotherapy from infancy whenever developmental or physical concerns are identified."
        },
        {
          question: "Do parents participate during sessions?",
          answer: "Yes. Parents are encouraged to participate and continue recommended activities at home."
        },
        {
          question: "How often should my child attend therapy?",
          answer: "Frequency depends on the child's diagnosis and treatment goals established during assessment."
        }
      ],
      image: "/images/services/pedetric.webp",
      slug: "pediatric-physiotherapy",
      duration: "45 - 60 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
      icon: MessageCircle,
      title: "Speech Therapy",
      desc: "Communication, speech, language, swallowing, and developmental support for children and adults.",
      overview:
        "Speech Therapy at Neuroflex Kenya supports children and adults who experience difficulties with speech, language, voice, fluency, communication or swallowing. Our therapists provide compassionate, goal-focused assessment and treatment plans that help patients communicate more clearly, build confidence and improve daily participation at home, school, work and in the community.",

      conditions: [
        "Delayed Speech and Language",
        "Speech Sound Disorders",
        "Stuttering and Fluency Difficulties",
        "Voice Disorders",
        "Swallowing Difficulties",
        "Autism Communication Support",
        "Stroke-related Communication Problems",
        "Developmental Communication Delays"
      ],

      treatment:
        "Treatment begins with a detailed communication and functional assessment to understand each patient's needs, strengths and goals. Therapy may include articulation practice, language development activities, fluency strategies, voice exercises, swallowing support, social communication training, caregiver coaching and structured home programs to reinforce progress between sessions.",

      faq: [
        {
          question: "Who can benefit from speech therapy?",
          answer:
            "Children with delayed speech, adults recovering from stroke, people with voice or fluency concerns and patients with swallowing or communication difficulties can benefit from speech therapy."
        },
        {
          question: "At what age should a child start speech therapy?",
          answer:
            "A child can begin speech therapy as soon as communication delays or feeding and swallowing concerns are noticed. Early assessment often leads to better progress."
        },
        {
          question: "Can speech therapy help after a stroke?",
          answer:
            "Yes. Speech therapy can help improve communication, speech clarity, language skills and swallowing safety after stroke or other neurological conditions."
        },
        {
          question: "Do caregivers receive home activities?",
          answer:
            "Yes. Caregivers receive practical home activities and guidance to support communication progress outside therapy sessions."
        }
      ],
      image: "/images/services/speechtherapy1.webp",
      slug: "speech-therapy",
      duration: "45 - 60 minutes",
      priceRange: "KSh 3,500 - 6,000",
      bestFor: "Speech Delays, Stroke Recovery, Swallowing Support",
      benefits: [
        "Improves speech clarity",
        "Builds language and communication skills",
        "Supports swallowing safety",
        "Strengthens confidence in social interaction",
        "Guides caregivers with practical home strategies"
      ],
      galleryImages: [
        "/images/services/kids3.webp",
        "/images/services/babytherapy1.webp",
        "/images/services/speechtherapy2.webp"
      ]
    },
    {
      icon: Users,
      title: "Geriatric Care",
      desc: "Fall prevention and mobility training for seniors.",
      overview:
        "Our Geriatric Physiotherapy program is designed to help older adults maintain independence, improve mobility and reduce the risk of falls. We provide personalized treatment plans that address age-related conditions while promoting strength, balance and confidence in daily living.",

      conditions: [
        "Balance Problems",
        "Falls Prevention",
        "Arthritis",
        "Osteoporosis",
        "Mobility Limitations",
        "Hip Replacement Recovery",
        "Knee Replacement Recovery",
        "Age-related Muscle Weakness"
      ],

      treatment:
        "Treatment focuses on balance training, walking exercises, muscle strengthening, flexibility improvement, mobility practice and education that helps older adults remain independent and active.",

      faq: [
        {
          question: "Can physiotherapy prevent falls?",
          answer: "Yes. Balance training and strengthening exercises significantly reduce fall risk in older adults."
        },
        {
          question: "Is physiotherapy safe for seniors?",
          answer: "Yes. Programs are individually tailored according to each patient's medical condition and abilities."
        },
        {
          question: "Can physiotherapy help arthritis?",
          answer: "Yes. Physiotherapy reduces pain, improves joint mobility and maintains independence."
        }
      ],
      image: "/images/services/geriaticimage1.webp",
      slug: "geriatric-care",
      duration: "45 - 60 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
      overview:
        "Our Wellness and Fitness programs combine physiotherapy expertise with personalized exercise programs to improve overall health, physical performance and injury prevention. Whether your goal is weight management, improved mobility or enhanced fitness, we develop programs suited to your lifestyle.",

      conditions: [
        "General Fitness",
        "Weight Management",
        "Corporate Wellness",
        "Lifestyle Diseases",
        "Poor Posture",
        "Reduced Flexibility",
        "Physical Conditioning",
        "Injury Prevention"
      ],

      treatment:
        "Programs include fitness assessments, functional movement screening, personalized exercise plans, posture improvement, flexibility training and long-term wellness coaching.",

      faq: [
        {
          question: "Can beginners join the wellness program?",
          answer: "Absolutely. Programs are customized for every fitness level."
        },
        {
          question: "Do you offer corporate wellness?",
          answer: "Yes. We provide customized workplace wellness programs for organizations."
        },
        {
          question: "Will physiotherapists supervise my exercises?",
          answer: "Yes. All programs are designed and monitored by qualified professionals."
        }
      ],
      image: "/images/services/fitnessimage1.webp",
      slug: "wellness-fitness",
      duration: "45 - 75 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
      overview:
        "Manual Lymphatic Drainage is a gentle therapeutic technique that stimulates the body's lymphatic system to reduce swelling, improve circulation and promote healing. It is especially beneficial following surgery, injury or conditions affecting lymphatic drainage.",

      conditions: [
        "Lymphedema",
        "Post-Surgical Swelling",
        "Fluid Retention",
        "Sports Injuries",
        "Chronic Swelling",
        "Poor Circulation",
        "Post Cosmetic Surgery Recovery",
        "Immune Support"
      ],

      treatment:
        "Gentle rhythmic massage techniques stimulate lymph flow, reduce swelling and encourage natural drainage while supporting healing and relaxation.",

      faq: [
        {
          question: "Does lymphatic drainage hurt?",
          answer: "No. It is a gentle, relaxing treatment."
        },
        {
          question: "Who benefits from lymphatic drainage?",
          answer: "Patients experiencing swelling after surgery, injury or lymphatic disorders."
        },
        {
          question: "How many sessions are required?",
          answer: "The number of sessions depends on your condition and treatment goals."
        }
      ],
      image: "/images/services/lympaticimage1.webp",
      slug: "lymphatic-drainage",
      duration: "45 - 75 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
      overview:
        "Carminative Management at Neuroflex Kenya focuses on relieving abdominal bloating, excessive gas and digestive discomfort through specialized physiotherapy techniques, abdominal therapy and lifestyle education. Treatment is individualized to improve digestive function naturally.",

      conditions: [
        "Abdominal Bloating",
        "Flatulence",
        "Digestive Discomfort",
        "Post-Abdominal Surgery",
        "Poor Gut Motility",
        "Abdominal Tightness",
        "Constipation",
        "Functional Digestive Disorders"
      ],

      treatment:
        "Treatment may include abdominal physiotherapy techniques, breathing exercises, gentle manual therapy, posture correction, movement education and lifestyle recommendations that promote healthy digestion.",

      faq: [
        {
          question: "Can physiotherapy help digestive discomfort?",
          answer: "Yes. Certain physiotherapy techniques help improve abdominal mobility and digestive function."
        },
        {
          question: "Is treatment painful?",
          answer: "No. Treatment is gentle and designed for patient comfort."
        },
        {
          question: "Will I receive home care advice?",
          answer: "Yes. Patients receive exercises and lifestyle recommendations to support long-term digestive health."
        }
      ],
      image: "/images/services/carminativeimage.webp",
      slug: "carminative-management",
      duration: "40 - 60 minutes",
      priceRange: "KSh 3,500 - 6,000",
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
  email: "neuroflexkenya@gmail.com",
  emailHref: "mailto:neuroflexkenya@gmail.com",
} as const;

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/neuroflexkenya",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/neuroflexkenya",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@neuroflexkenya",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/neuroflexkenya",
  },
  {
    label: "X",
    href: "https://x.com/neuroflexkenya",
  },
  {
    label: "Google",
    href: "https://www.google.com/search?q=Neuroflex+Kenya+Fedha+Road+Embakasi+Nairobi",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254729213135",
  },
] as const;
