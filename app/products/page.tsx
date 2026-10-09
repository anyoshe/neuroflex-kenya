import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { contactInfo } from "@/lib/site-data";
import { productCategories } from "@/lib/product-data";
import { getProducts } from "@/lib/product-storage";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rehabilitation & Physiotherapy Products in Nairobi",
  description:
    "Explore recovery aids and rehabilitation products recommended by Neuroflex Kenya for physiotherapy, neurological rehabilitation, sports recovery, and everyday mobility.",
  keywords: [
    "physiotherapy products Nairobi",
    "rehabilitation products Kenya",
    "sports recovery equipment",
    "mobility aids Nairobi",
    "Neuroflex Kenya products",
  ],
  alternates: {
    canonical: absoluteUrl("/products"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rehabilitation & Physiotherapy Products | Neuroflex Kenya",
    description:
      "Find recovery aids and rehabilitation equipment to support your therapy plan and everyday mobility.",
    url: absoluteUrl("/products"),
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rehabilitation & Physiotherapy Products | Neuroflex Kenya",
    description:
      "Explore therapist-recommended recovery aids and rehabilitation products.",
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="hero-bg relative overflow-hidden px-6 pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-teal">
              <ShoppingBag size={14} />
              Recovery essentials
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Products to support your recovery
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Explore practical rehabilitation and mobility aids related to our
              physiotherapy, neurological rehabilitation, and sports therapy
              services. Our team can help you choose options that suit your
              goals.
            </p>
            <Link
              href="#recommended-products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green/90"
            >
              Buy products to support healing
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <main className="bg-gray-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div
            id="recommended-products"
            className="mb-16 scroll-mt-28 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">
              Browse by need
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recommended Recovery Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
              Product suitability depends on your condition and treatment plan.
              Please check with a physiotherapist before starting a new
              exercise or using a support aid.
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              Prices shown are indicative ranges; contact our team to confirm
              current availability and pricing.
            </p>
          </div>

          <div className="space-y-16">
            {productCategories.map((category) => {
              const Icon = category.icon;
              const categoryProducts = products.filter(
                (product) => product.category === category.id
              );

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-28"
                  aria-labelledby={`${category.id}-title`}
                >
                  <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2
                        id={`${category.id}-title`}
                        className="text-2xl font-bold text-gray-900 sm:text-3xl"
                      >
                        {category.title}
                      </h2>
                      <p className="mt-2 max-w-3xl leading-relaxed text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {categoryProducts.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {categoryProducts.map((product) => (
                        <article
                          key={product.id}
                          className="card-glow flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white"
                        >
                          <div className="relative h-52 w-full bg-gray-100">
                            <Image
                              src={product.image}
                              alt={product.imageAlt || product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                              unoptimized={
                                product.image.startsWith("data:") ||
                                product.image.endsWith(".svg")
                              }
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-7">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <p className="mt-3 leading-relaxed text-gray-600">
                              {product.description}
                            </p>
                            {product.suitableFor && (
                              <p className="mt-4 text-sm text-gray-500">
                                <span className="font-semibold text-gray-700">
                                  May support:
                                </span>{" "}
                                {product.suitableFor}
                              </p>
                            )}
                            <p className="mt-4 text-lg font-bold text-brand-green">
                              {product.price}
                            </p>
                            <a
                              href={`https://wa.me/254729213135?text=${encodeURIComponent(
                                `Hello Neuroflex Kenya, I would like to buy ${product.name} listed at ${product.price}. Please confirm availability.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-brand-green transition hover:gap-3"
                            >
                              Buy via WhatsApp
                              <ArrowRight size={17} />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-500">
                      Products in this category will be added soon.
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          <section className="mt-20 rounded-3xl bg-brand-navy px-7 py-10 text-white sm:px-12 sm:py-14">
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Not sure what you need?
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-white/80">
                  Speak with our team for guidance on suitable products and
                  availability before you buy.
                </p>
              </div>
              <a href={contactInfo.phoneHref} className="btn-primary w-fit">
                Call {contactInfo.phone}
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
