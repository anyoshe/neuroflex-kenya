import { SITE_URL, absoluteUrl } from "@/lib/site-url";

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Neuroflex Kenya",
    "alternateName": "Neuroflex Physio & Wellness Centre",
    "image": absoluteUrl("/assets/logos/logo2.jpeg"),
    "@id": `${SITE_URL}/#clinic`,
    "url": SITE_URL,
    "telephone": "+254729213135",
    "email": "info@neuroflexkenya.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fedha Road, 300m off Outering Road, Embakasi",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "areaServed": [
      "Embakasi",
      "Nairobi",
      "Kenya"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "21:00"
      }
    ],
    "medicalSpecialty": ["NeurologicalRehabilitation", "Physiotherapy"],
    "employee": {
      "@type": "MedicalOrganization",
      "name": "NRPT Dennis Masaki",
      "jobTitle": "Lead Physiotherapist"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Neuroflex Therapy Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Stroke & Neurological Rehabilitation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Pediatric Physical Therapy"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Pain Management & Sports Injury Rehab"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
