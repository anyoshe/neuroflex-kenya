import { SITE_URL, absoluteUrl } from "@/lib/site-url";

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

        item: SITE_URL,
      },

      {
        "@type": "ListItem",

        position: 2,

        name: "Services",

        item: `${SITE_URL}/#services`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: service.title,

        item: absoluteUrl(`/services/${service.slug}`),
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