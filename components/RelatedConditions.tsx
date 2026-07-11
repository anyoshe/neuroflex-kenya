import Link from "next/link";
import { conditions } from "@/lib/conditions-data";


interface Props {
  currentSlug: string;
  relatedSlugs: string[];
}


export default function RelatedConditions({
  currentSlug,
  relatedSlugs,
}: Props) {

const related = conditions.filter(
  (condition) =>
    (relatedSlugs ?? []).includes(condition.slug) &&
    condition.slug !== currentSlug
);

  if (!related.length) return null;


  return (

    <section className="mt-16">


      <h2 className="text-2xl font-semibold mb-6">

        Related Conditions

      </h2>


      <div className="grid md:grid-cols-3 gap-6">


        {related.map((condition)=>(


          <Link

            key={condition.slug}

            href={`/conditions/${condition.slug}`}

            className="border rounded-xl p-5 hover:shadow-md transition"

          >

            <h3 className="font-semibold mb-2">

              {condition.title}

            </h3>


            <p className="text-sm text-gray-600">

              {condition.description}

            </p>


          </Link>


        ))}


      </div>


    </section>

  );
}