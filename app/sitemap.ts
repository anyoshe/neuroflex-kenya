import { MetadataRoute } from "next";
import { services } from "@/lib/site-data";
import { conditions } from "@/lib/conditions-data";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const conditionPages = conditions.map((condition) => ({
    url: `${baseUrl}/conditions/${condition.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },

    // Conditions Hub
    {
      url: `${baseUrl}/conditions`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },

    // Service Pages
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // Condition Pages
    ...conditions.map((condition) => ({
      url: `${baseUrl}/conditions/${condition.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}