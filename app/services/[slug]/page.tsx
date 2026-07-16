import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSchema from "./ServiceSchema";
import ServiceClient from "./ServiceClient";
import { services } from "@/lib/site-data";
import FaqSchema from "./FaqSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { slug } = await params;

  const service = services.find(
    (s) => s.slug === slug
  );

  if (!service) return {};

  const url = absoluteUrl(`/services/${service.slug}`);

  return {

    title: `${service.title} | Physiotherapy in Nairobi | Neuroflex Kenya`,

    description: service.overview,

    keywords: [
      service.title,
      "Physiotherapy Nairobi",
      "Neurological Rehabilitation Kenya",
      "Neuroflex Kenya",
      service.bestFor,
    ],

    robots: {
      index: true,
      follow: true,
    },
    authors: [
      {
        name: "Neuroflex Kenya",
      },
    ],

    category: "Healthcare",

    alternates: {
      canonical: url,
    },

    openGraph: {

      title: `${service.title} | Neuroflex Kenya`,

      description: service.overview,

      url,

      type: "article",

      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],

    },

    twitter: {

      card: "summary_large_image",

      title: service.title,

      description: service.overview,

      images: [service.image],

    },

  };

}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function Page({
  params,
}: Props) {

  const { slug } = await params;

  const service = services.find(
    (s) => s.slug === slug
  );

  if (!service) notFound();

  const schema = {

    "@context": "https://schema.org",

    "@type": "MedicalTherapy",

    name: service.title,

    description: service.overview,

    image: absoluteUrl(service.image),

    provider: {

      "@type": "MedicalBusiness",

      name: "Neuroflex Kenya",

      telephone: "+254729213135",

      address: {

        "@type": "PostalAddress",

        addressLocality: "Nairobi",

        addressCountry: "KE",

      },

    },

    areaServed: "Kenya",

    url: absoluteUrl(`/services/${service.slug}`),

  };

  return (

    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <>
        <ServiceSchema service={service} />
        <FaqSchema faq={service.faq} />
        <BreadcrumbSchema service={service} />
        <ServiceClient
          params={Promise.resolve({ slug })}
        />
      </>
    </>

  );

}
