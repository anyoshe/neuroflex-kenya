export default function ServiceSchema({
  service,
}: {
  service: any;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",

    name: service.title,

    description: service.overview,

    image: `https://www.neuroflexkenya.com${service.image}`,

    url: `https://www.neuroflexkenya.com/services/${service.slug}`,

    provider: {
      "@type": "MedicalBusiness",
      name: "Neuroflex Kenya",
      image: "https://www.neuroflexkenya.com/images/logo.png",
      telephone: "+254729213135",
      email: "info@neuroflexkenya.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },

    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },

    audience: {
      "@type": "Patient",
    },

    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "KES",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "KES",
        description: service.priceRange,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}