import { conditions } from "@/lib/conditions-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ConditionSchema from "@/components/ConditionSchema";
import RelatedConditions from "@/components/RelatedConditions";
import { absoluteUrl } from "@/lib/site-url";


interface Props {
  params: Promise<{
    slug: string;
  }>;
}


// Generate SEO metadata
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;

  const condition = conditions.find(
    (item) => item.slug === slug
  );

  if (!condition) {
    return {};
  }

  return {
    title: `${condition.title} | Neuroflex Kenya`,

    description: condition.description,

    alternates: {
      canonical: absoluteUrl(`/conditions/${condition.slug}`),
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: condition.title,
      description: condition.description,
      url: absoluteUrl(`/conditions/${condition.slug}`),
      images: [
        condition.image
      ],
    },
  };
}


// Generate all condition pages
export function generateStaticParams() {

  return conditions.map((condition) => ({
    slug: condition.slug,
  }));

}



export default async function ConditionPage(
  { params }: Props
) {

  const { slug } = await params;


  const condition = conditions.find(
    (item) => item.slug === slug
  );


  if (!condition) {
    notFound();
  }


  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

<ConditionSchema condition={condition} />

  
      <h1 className="text-4xl font-bold mb-6">
        {condition.title}
      </h1>


      <p className="text-lg text-gray-600 mb-10">
        {condition.description}
      </p>


      <section className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Overview
        </h2>

        <p>
          {condition.overview}
        </p>

      </section>



      <section className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Symptoms
        </h2>


        <ul className="list-disc pl-6 space-y-2">

          {condition.symptoms.map(
            (item)=>(
              <li key={item}>
                {item}
              </li>
            )
          )}

        </ul>

      </section>



      <section className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Causes
        </h2>


        <ul className="list-disc pl-6 space-y-2">

          {condition.causes.map(
            (item)=>(
              <li key={item}>
                {item}
              </li>
            )
          )}

        </ul>

      </section>




      <section className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Treatment at Neuroflex Kenya
        </h2>


        <p>
          {condition.treatment}
        </p>


      </section>




      <section className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Prevention
        </h2>


        <p>
          {condition.prevention}
        </p>


      </section>



      <section>

        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>


        {condition.faq.map((item)=>(
          
          <div 
            key={item.question}
            className="mb-6"
          >

            <h3 className="font-semibold">
              {item.question}
            </h3>

            <p>
              {item.answer}
            </p>

          </div>

        ))}


      </section>
      
      <RelatedConditions
  currentSlug={condition.slug}
  relatedSlugs={condition.relatedConditions ?? []}
/>


    </main>
  );
}
