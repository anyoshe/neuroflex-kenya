import { Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Condition {
  icon: LucideIcon;

  title: string;

  slug: string;

  description: string;

  overview: string;

  symptoms: string[];

  causes: string[];

  treatment: string;

  prevention: string;

  image: string;

  relatedServices: string[];
  
  relatedConditions?: string[];

  faq: {
    question: string;
    answer: string;
  }[];
}

export const conditions: Condition[] = [
  {
    icon: Brain,

    title: "Stroke Rehabilitation",

    slug: "stroke-rehabilitation",

    description:
      "Professional stroke rehabilitation in Nairobi helping patients regain movement, balance and independence through evidence-based neurological physiotherapy.",

    overview:
      "A stroke occurs when blood supply to part of the brain is interrupted, causing damage to brain tissue. Stroke rehabilitation focuses on helping patients recover movement, strength, coordination, speech, balance and independence through personalized physiotherapy programs. Early rehabilitation significantly improves recovery by encouraging the brain to develop new neural pathways.",

    symptoms: [
      "Weakness on one side of the body",
      "Difficulty walking",
      "Poor balance",
      "Difficulty speaking",
      "Muscle stiffness",
      "Loss of coordination",
      "Difficulty using the arm or hand",
      "Reduced independence"
    ],

    causes: [
      "Blocked blood vessel (Ischemic Stroke)",
      "Brain bleeding (Hemorrhagic Stroke)",
      "High blood pressure",
      "Heart disease",
      "Diabetes",
      "Smoking",
      "High cholesterol",
      "Obesity"
    ],

    treatment:
      "At Neuroflex Kenya, stroke rehabilitation begins with a comprehensive neurological assessment. Treatment may include gait training, balance exercises, muscle strengthening, functional task practice, coordination exercises, neurodevelopmental techniques, electrical stimulation where appropriate, and individualized home exercise programs.",

    prevention:
      "Maintaining healthy blood pressure, controlling diabetes, exercising regularly, eating a balanced diet, avoiding smoking and attending regular medical check-ups significantly reduce the risk of stroke.",

    image:
      "/images/services/neuroimage1.webp",

    relatedServices: [
      "neurological-rehabilitation"
    ],

    faq: [
      {
        question: "Can physiotherapy help after stroke?",

        answer:
          "Yes. Physiotherapy is one of the most effective treatments for improving walking, balance, strength, coordination and independence after stroke."
      },

      {
        question: "When should stroke rehabilitation begin?",

        answer:
          "Stroke rehabilitation should begin as soon as the patient is medically stable because early intervention produces better recovery outcomes."
      },

      {
        question: "How long does stroke rehabilitation take?",

        answer:
          "Recovery varies depending on the severity of the stroke and the individual's progress. Some patients improve within weeks while others require several months of rehabilitation."
      },

      {
        question: "Will I receive exercises to do at home?",

        answer:
          "Yes. Every patient receives a personalized home exercise program to complement treatment sessions and accelerate recovery."
      }
    ]
  },
  {
  icon: Brain,

  title: "Back Pain Physiotherapy",

  slug: "back-pain",

  description:
    "Effective back pain physiotherapy in Nairobi helping patients reduce pain, improve mobility and restore normal function through personalised treatment.",


  overview:
    "Back pain is one of the most common musculoskeletal conditions affecting mobility, work and daily activities. It can result from muscle strain, poor posture, spinal problems, injuries or degenerative changes. At Neuroflex Kenya, physiotherapy focuses on identifying the underlying cause of pain and creating a personalised rehabilitation plan to restore movement and prevent recurrence.",


  symptoms: [
    "Lower back pain",
    "Pain spreading to the legs",
    "Muscle stiffness",
    "Difficulty bending or lifting",
    "Reduced mobility",
    "Pain when sitting for long periods",
    "Weakness around the back and core muscles"
  ],


  causes: [
    "Poor posture",
    "Muscle strain or injury",
    "Disc problems",
    "Spinal degeneration",
    "Lack of physical activity",
    "Heavy lifting",
    "Sports injuries"
  ],


  treatment:
    "Treatment at Neuroflex Kenya includes a detailed assessment followed by targeted physiotherapy. Programs may include manual therapy, strengthening exercises, posture correction, flexibility training, core stabilisation exercises, movement retraining and personalised home exercise programs.",


  prevention:
    "Back pain can often be reduced through maintaining good posture, regular exercise, strengthening core muscles, using proper lifting techniques, maintaining a healthy weight and avoiding prolonged inactivity.",


  image:
    "/images/services/neuroimage2.webp",


  relatedServices: [
    "physiotherapy"
  ],


  faq: [

    {
      question:
        "Can physiotherapy treat back pain?",

      answer:
        "Yes. Physiotherapy can reduce pain, improve movement, strengthen supporting muscles and help prevent future episodes of back pain."
    },


    {
      question:
        "How many physiotherapy sessions are needed for back pain?",

      answer:
        "The number of sessions depends on the cause and severity of the condition. After assessment, a personalised treatment plan is created."
    },


    {
      question:
        "Should I exercise when I have back pain?",

      answer:
        "Appropriate exercises guided by a physiotherapist can help recovery, improve strength and restore normal movement."
    }

  ]

},
{
  icon: Brain,

  title: "Sciatica Physiotherapy",

  slug: "sciatica",

  description:
    "Specialised sciatica physiotherapy in Nairobi helping reduce nerve pain, improve mobility and restore function through personalised rehabilitation programs.",


  overview:
    "Sciatica occurs when the sciatic nerve becomes irritated or compressed, causing pain that may travel from the lower back through the buttocks and down the leg. Symptoms can affect walking, sitting, sleeping and daily activities. At Neuroflex Kenya, physiotherapy focuses on reducing nerve irritation, improving movement patterns and strengthening the muscles that support the spine.",


  symptoms: [
    "Sharp pain travelling from the lower back to the leg",
    "Numbness or tingling sensation",
    "Leg weakness",
    "Pain when sitting for long periods",
    "Difficulty walking comfortably",
    "Lower back stiffness",
    "Reduced flexibility"
  ],


  causes: [
    "Herniated or slipped disc",
    "Spinal narrowing (spinal stenosis)",
    "Nerve compression",
    "Poor posture",
    "Spinal injuries",
    "Muscle imbalance",
    "Degenerative changes in the spine"
  ],


  treatment:
    "Sciatica treatment at Neuroflex Kenya involves assessment of posture, movement and nerve function. Rehabilitation may include manual therapy, mobility exercises, nerve mobilisation techniques, strengthening exercises, posture correction and customised home exercises to support recovery.",


  prevention:
    "Sciatica risk can be reduced through regular physical activity, maintaining good posture, strengthening core muscles, using correct lifting techniques and avoiding prolonged sitting without movement.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "physiotherapy",
    "neurological-rehabilitation"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help sciatica pain?",

      answer:
        "Yes. Physiotherapy can help reduce sciatic nerve pain, improve mobility, strengthen supporting muscles and restore normal movement."
    },


    {
      question:
        "How long does sciatica take to improve?",

      answer:
        "Recovery time depends on the cause and severity of nerve irritation. Many patients improve with consistent rehabilitation and guided exercises."
    },


    {
      question:
        "Is surgery always required for sciatica?",

      answer:
        "No. Many cases of sciatica improve with conservative treatment such as physiotherapy, exercise and lifestyle modifications."
    }

  ]

},
{
  icon: Brain,

  title: "Neck Pain Physiotherapy",

  slug: "neck-pain",

  description:
    "Professional neck pain physiotherapy in Nairobi helping patients reduce pain, improve movement and restore neck function through personalised rehabilitation.",


  overview:
    "Neck pain can affect movement, posture, concentration and daily activities. It may result from poor posture, prolonged computer use, injuries, muscle tension or problems affecting the cervical spine. At Neuroflex Kenya, physiotherapy focuses on identifying the cause of neck pain and providing targeted rehabilitation to restore mobility and reduce discomfort.",


  symptoms: [
    "Neck stiffness",
    "Pain when turning the head",
    "Shoulder and upper back discomfort",
    "Headaches associated with neck tension",
    "Muscle tightness",
    "Reduced neck mobility",
    "Pain after prolonged sitting"
  ],


  causes: [
    "Poor posture",
    "Long periods using computers or phones",
    "Whiplash injuries",
    "Muscle strain",
    "Cervical disc problems",
    "Stress-related muscle tension",
    "Spinal changes"
  ],


  treatment:
    "Neck pain rehabilitation at Neuroflex Kenya includes assessment of posture, movement and muscle function. Treatment may involve manual therapy, posture correction, stretching exercises, strengthening exercises, mobility training and personalised home exercise programs.",


  prevention:
    "Neck pain can be prevented by maintaining good posture, taking breaks during prolonged sitting, exercising regularly, setting up an ergonomic workstation and strengthening neck and upper back muscles.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "physiotherapy"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help chronic neck pain?",

      answer:
        "Yes. Physiotherapy can reduce pain, improve neck mobility, strengthen supporting muscles and improve posture-related problems."
    },


    {
      question:
        "What causes neck pain from computer work?",

      answer:
        "Long periods of sitting, poor workstation setup and forward head posture can place stress on neck muscles and joints, causing pain and stiffness."
    },


    {
      question:
        "How can I improve neck pain at home?",

      answer:
        "Gentle exercises, posture correction and following a personalised rehabilitation plan from a physiotherapist can help improve recovery."
    }

  ]

},
{
  icon: Brain,

  title: "Parkinson's Disease Rehabilitation",

  slug: "parkinsons-disease",

  description:
    "Specialised Parkinson's disease rehabilitation in Nairobi helping patients improve movement, balance, strength and independence through neurological physiotherapy.",


  overview:
    "Parkinson's disease is a progressive neurological condition that affects movement, coordination and balance. It occurs when certain brain cells responsible for producing dopamine become damaged. Although there is currently no cure, specialised rehabilitation can help manage symptoms, maintain mobility and improve quality of life. At Neuroflex Kenya, treatment focuses on movement training, balance improvement and maintaining independence.",


  symptoms: [
    "Tremors or shaking",
    "Slow movements (bradykinesia)",
    "Muscle stiffness",
    "Balance difficulties",
    "Changes in walking pattern",
    "Reduced coordination",
    "Difficulty performing daily activities",
    "Postural changes"
  ],


  causes: [
    "Progressive loss of dopamine-producing brain cells",
    "Age-related neurological changes",
    "Genetic factors in some cases",
    "Environmental factors may contribute"
  ],


  treatment:
    "Parkinson's rehabilitation at Neuroflex Kenya includes neurological assessment, movement training, balance exercises, gait training, strengthening exercises, flexibility exercises, posture correction and personalised home exercise programs. Therapy focuses on maintaining independence and improving daily function.",


  prevention:
    "There is no guaranteed way to prevent Parkinson's disease, but regular physical activity, maintaining a healthy lifestyle and early management of symptoms can support better long-term function.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "neurological-rehabilitation"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help people with Parkinson's disease?",

      answer:
        "Yes. Physiotherapy plays an important role in helping people with Parkinson's maintain mobility, improve balance and remain independent for longer."
    },


    {
      question:
        "What exercises are recommended for Parkinson's disease?",

      answer:
        "Exercises focusing on balance, walking, strength, flexibility and coordination are commonly used depending on each person's abilities and needs."
    },


    {
      question:
        "Is Parkinson's disease rehabilitation only for advanced cases?",

      answer:
        "No. Starting rehabilitation early can help maintain movement, manage symptoms and support better long-term outcomes."
    }

  ]

},
{
  icon: Brain,

  title: "Spinal Cord Injury Rehabilitation",

  slug: "spinal-cord-injury",

  description:
    "Specialised spinal cord injury rehabilitation in Nairobi helping patients improve mobility, strength, independence and quality of life through neurological physiotherapy.",


  overview:
    "A spinal cord injury occurs when damage to the spinal cord affects communication between the brain and the body. Depending on the level and severity of injury, patients may experience changes in movement, sensation, balance and daily function. At Neuroflex Kenya, spinal cord injury rehabilitation focuses on maximising independence, improving mobility and helping patients adapt to their individual needs through specialised neurological physiotherapy.",


  symptoms: [
    "Weakness or paralysis",
    "Difficulty walking or transferring",
    "Loss of sensation",
    "Poor balance and coordination",
    "Muscle stiffness or spasms",
    "Reduced independence in daily activities",
    "Difficulty maintaining posture"
  ],


  causes: [
    "Road traffic accidents",
    "Falls and traumatic injuries",
    "Sports injuries",
    "Spinal fractures",
    "Tumours affecting the spinal cord",
    "Infections or inflammation affecting the spinal cord"
  ],


  treatment:
    "Rehabilitation at Neuroflex Kenya includes neurological assessment, mobility training, strengthening exercises, balance training, transfer practice, gait rehabilitation, posture management, functional activities and personalised home programs designed around each patient's goals.",


  prevention:
    "Some spinal cord injuries can be reduced through road safety practices, workplace safety, preventing falls, using protective equipment during sports and managing health conditions that affect spinal health.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "neurological-rehabilitation"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help after a spinal cord injury?",

      answer:
        "Yes. Physiotherapy is an important part of spinal cord injury rehabilitation and helps improve strength, mobility, independence and daily function."
    },


    {
      question:
        "Can someone walk again after a spinal cord injury?",

      answer:
        "Recovery depends on the level and severity of the injury. Rehabilitation focuses on maximising each person's potential and improving functional independence."
    },


    {
      question:
        "How soon should spinal cord injury rehabilitation start?",

      answer:
        "Rehabilitation should begin as soon as the patient is medically stable because early and consistent therapy supports better functional outcomes."
    }

  ]

},
{
  icon: Brain,

  title: "Cerebral Palsy Rehabilitation",

  slug: "cerebral-palsy",

  description:
    "Specialised cerebral palsy rehabilitation in Nairobi helping children and adults improve movement, coordination, strength and independence through personalised physiotherapy.",


  overview:
    "Cerebral palsy is a neurological condition caused by damage or abnormal development of the brain, affecting movement, posture and muscle coordination. The effects vary from person to person and may include difficulties with walking, balance, muscle control and daily activities. At Neuroflex Kenya, rehabilitation focuses on improving functional abilities, preventing complications and helping individuals achieve greater independence.",


  symptoms: [
    "Delayed movement development",
    "Muscle stiffness or tightness",
    "Difficulty walking",
    "Poor balance and coordination",
    "Involuntary movements",
    "Weak muscle control",
    "Difficulty with daily activities",
    "Postural problems"
  ],


  causes: [
    "Brain injury before birth",
    "Complications during delivery",
    "Brain infections during early childhood",
    "Head injuries",
    "Reduced oxygen supply to the developing brain"
  ],


  treatment:
    "Cerebral palsy rehabilitation at Neuroflex Kenya involves a detailed assessment followed by personalised therapy. Treatment may include developmental exercises, stretching, strengthening, balance training, gait training, posture management, mobility exercises and caregiver education to support long-term progress.",


  prevention:
    "Not all cases of cerebral palsy can be prevented. Good maternal healthcare, safe delivery practices, childhood safety measures and early treatment of infections can help reduce certain risks.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "neurological-rehabilitation"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help children with cerebral palsy?",

      answer:
        "Yes. Physiotherapy can help children with cerebral palsy improve movement, strength, balance, coordination and independence according to their individual abilities."
    },


    {
      question:
        "When should cerebral palsy therapy begin?",

      answer:
        "Early intervention is recommended because young children often respond well to rehabilitation that supports development and functional skills."
    },


    {
      question:
        "Does cerebral palsy rehabilitation continue into adulthood?",

      answer:
        "Yes. Rehabilitation can support adults with cerebral palsy by maintaining mobility, managing symptoms and improving quality of life."
    }

  ]

},
{
  icon: Brain,

  title: "Multiple Sclerosis Rehabilitation",

  slug: "multiple-sclerosis",

  description:
    "Specialised multiple sclerosis rehabilitation in Nairobi helping patients manage symptoms, improve mobility, maintain strength and enhance independence through neurological physiotherapy.",


  overview:
    "Multiple sclerosis (MS) is a chronic neurological condition where the immune system affects the protective covering of nerves in the brain and spinal cord. This can interfere with communication between the brain and the body, causing movement, balance, coordination and fatigue-related challenges. At Neuroflex Kenya, rehabilitation focuses on managing symptoms, maintaining function and helping individuals achieve their personal mobility goals.",


  symptoms: [
    "Fatigue",
    "Muscle weakness",
    "Balance difficulties",
    "Walking problems",
    "Numbness or tingling sensations",
    "Muscle stiffness",
    "Reduced coordination",
    "Difficulty performing daily activities"
  ],


  causes: [
    "Immune system-related damage to nerve coverings",
    "Genetic factors may contribute",
    "Environmental factors may influence risk",
    "Abnormal immune response affecting the nervous system"
  ],


  treatment:
    "Multiple sclerosis rehabilitation at Neuroflex Kenya includes neurological assessment, mobility training, balance exercises, strengthening programs, fatigue management strategies, flexibility exercises, gait training and personalised home exercise programs. Treatment is designed to maintain independence and improve quality of life.",


  prevention:
    "There is currently no guaranteed way to prevent multiple sclerosis. However, maintaining an active lifestyle, managing health conditions and receiving early rehabilitation support can help individuals manage symptoms effectively.",


  image:
    "/images/services/neuroimage1.webp",


  relatedServices: [
    "neurological-rehabilitation"
  ],


  faq: [

    {
      question:
        "Can physiotherapy help people with multiple sclerosis?",

      answer:
        "Yes. Physiotherapy can help manage MS symptoms by improving strength, balance, mobility and independence."
    },


    {
      question:
        "Does multiple sclerosis rehabilitation cure MS?",

      answer:
        "Rehabilitation does not cure MS, but it helps people manage symptoms, maintain function and improve quality of life."
    },


    {
      question:
        "How often should someone with MS attend physiotherapy?",

      answer:
        "The frequency depends on symptoms, goals and individual needs. A physiotherapist can develop a personalised rehabilitation plan."
    }

  ]

},
];