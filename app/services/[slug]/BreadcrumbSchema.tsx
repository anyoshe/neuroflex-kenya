export default function BreadcrumbSchema({
  service,
}: {
  service: any;
}) {
  const schema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: "https://www.neuroflexkenya.com",
      },

      {
        "@type": "ListItem",

        position: 2,

        name: "Services",

        item: "https://www.neuroflexkenya.com/#services",
      },

      {
        "@type": "ListItem",

        position: 3,

        name: service.title,

        item: `https://www.neuroflexkenya.com/services/${service.slug}`,
      },
    ],
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