import {
  Activity,
  Dumbbell,
  HeartPulse,
  MoveUpRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const productCategories = [
  {
    id: "physio-recovery",
    title: "Physiotherapy & home exercise",
    description:
      "Simple exercise and recovery aids that can support a therapist-guided home program.",
    icon: Activity,
  },
  {
    id: "neuro-rehab",
    title: "Neurological rehabilitation & mobility",
    description:
      "Mobility and hand-function aids that may support safe practice between therapy sessions.",
    icon: MoveUpRight,
  },
  {
    id: "sports-recovery",
    title: "Sports therapy & recovery",
    description:
      "Training and recovery accessories for active people, chosen to complement an individualized return-to-sport plan.",
    icon: Dumbbell,
  },
  {
    id: "respiratory-recovery",
    title: "Breathing & respiratory support",
    description:
      "Basic aids that can complement breathing exercises when recommended by a physiotherapist.",
    icon: HeartPulse,
  },
  {
    id: "daily-living",
    title: "Daily living & independence",
    description:
      "Everyday aids that may make home activities more comfortable and accessible.",
    icon: ShieldCheck,
  },
] as const satisfies readonly {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[];

export type ProductCategoryId = (typeof productCategories)[number]["id"];

export type CatalogProduct = {
  id: number;
  category: ProductCategoryId;
  name: string;
  description: string;
  suitableFor: string;
  image: string;
  imageAlt: string;
  price: string;
  active: boolean;
};

export type DefaultProduct = Omit<CatalogProduct, "id" | "active">;

export const defaultProducts: DefaultProduct[] = [
  {
    category: "physio-recovery",
    name: "Resistance bands",
    description:
      "Portable bands for progressive strengthening and mobility exercises.",
    suitableFor: "Physiotherapy, strengthening, and general conditioning",
    image: "/images/services/physioimage6.webp",
    imageAlt: "Patient exercising with resistance equipment",
    price: "KSh 500–1,500",
  },
  {
    category: "physio-recovery",
    name: "Exercise mat",
    description:
      "A stable, comfortable surface for floor-based stretching and exercises.",
    suitableFor: "Home exercise and flexibility routines",
    image: "/images/services/vestbular3.webp",
    imageAlt: "Balance exercise performed on rehabilitation mats",
    price: "KSh 1,500–3,500",
  },
  {
    category: "physio-recovery",
    name: "Foam roller",
    description:
      "A self-massage and mobility tool used as part of selected recovery routines.",
    suitableFor: "Muscle mobility and post-training recovery",
    image: "/images/services/physioimage5.webp",
    imageAlt: "Physiotherapist guiding a mobility and stretching exercise",
    price: "KSh 1,500–3,000",
  },
  {
    category: "neuro-rehab",
    name: "Walking aids",
    description:
      "Canes and walking frames selected to suit a person’s balance, strength, and environment.",
    suitableFor: "Gait training and everyday mobility",
    image: "/images/services/assistivedevice2.webp",
    imageAlt: "Patient practising with a walking aid during rehabilitation",
    price: "KSh 2,500–12,000",
  },
  {
    category: "neuro-rehab",
    name: "Hand exercise tools",
    description:
      "Grips and therapy putty for therapist-guided hand-strength and coordination practice.",
    suitableFor: "Hand function and fine-motor exercise",
    image: "/images/services/occupation2.webp",
    imageAlt: "Hand and upper-limb rehabilitation session",
    price: "KSh 500–1,500",
  },
  {
    category: "neuro-rehab",
    name: "Balance training pad",
    description:
      "A balance aid for exercises prescribed and supervised according to your needs.",
    suitableFor: "Balance and coordination programs",
    image: "/images/services/vestbular5.webp",
    imageAlt: "Patient practising balance on a training pad",
    price: "KSh 1,500–4,000",
  },
  {
    category: "sports-recovery",
    name: "Kinesiology tape",
    description:
      "Elastic tape applied using appropriate techniques to support selected rehabilitation goals.",
    suitableFor: "Sports injury support and movement",
    image: "/images/services/kinesologyimage1.webp",
    imageAlt: "Kinesiology taping used for therapy support",
    price: "KSh 600–1,500",
  },
  {
    category: "sports-recovery",
    name: "Sports support braces",
    description:
      "Knee, ankle, or wrist supports that should be matched to the injury and activity.",
    suitableFor: "Joint support during recovery or activity",
    image: "/images/services/musket1.webp",
    imageAlt: "Musculoskeletal injury rehabilitation",
    price: "KSh 1,500–6,000",
  },
  {
    category: "sports-recovery",
    name: "Muscle recovery roller",
    description:
      "A compact roller for mobility and recovery routines recommended by your therapist.",
    suitableFor: "Training recovery and muscle mobility",
    image: "/images/services/physioimage5.webp",
    imageAlt: "Physiotherapist guiding a mobility and stretching exercise",
    price: "KSh 1,500–3,500",
  },
  {
    category: "respiratory-recovery",
    name: "Breathing exercise trainer",
    description:
      "A guided breathing aid for selected respiratory exercise programs.",
    suitableFor: "Therapist-guided breathing practice",
    image: "/images/services/respiratory2.webp",
    imageAlt: "Respiratory physiotherapy exercise",
    price: "KSh 1,000–3,500",
  },
  {
    category: "respiratory-recovery",
    name: "Breathing exercise accessories",
    description:
      "Practical items to help build a comfortable, consistent home breathing routine.",
    suitableFor: "Respiratory physiotherapy home programs",
    image: "/images/services/respiratory3.webp",
    imageAlt: "Respiratory rehabilitation treatment",
    price: "KSh 300–1,500",
  },
  {
    category: "daily-living",
    name: "Non-slip bath safety aids",
    description:
      "Safety accessories to help reduce slipping risk in wet areas at home.",
    suitableFor: "Safer bathing and home mobility",
    image: "/images/services/occupation1.webp",
    imageAlt: "Occupational therapy focused on everyday activities",
    price: "KSh 500–5,000",
  },
  {
    category: "daily-living",
    name: "Reach and grip aids",
    description:
      "Simple tools that can help with reaching and handling everyday items.",
    suitableFor: "Daily activities and independent living",
    image: "/images/services/occupation4.webp",
    imageAlt: "Occupational therapy supporting independent living",
    price: "KSh 800–2,500",
  },
];

export function isProductCategoryId(value: unknown): value is ProductCategoryId {
  return (
    typeof value === "string" &&
    productCategories.some((category) => category.id === value)
  );
}
