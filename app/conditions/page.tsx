import Link from "next/link";
import { conditions } from "@/lib/conditions-data";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";


export const metadata: Metadata = {

  title:
    "Physiotherapy Conditions We Treat in Kenya | Neuroflex Kenya",

  description:
    "Explore neurological and musculoskeletal conditions treated at Neuroflex Kenya including stroke rehabilitation, Parkinson's disease, spinal injuries, back pain, sciatica and neck pain.",

  alternates: {
    canonical: absoluteUrl("/conditions"),
  },

  robots: {
    index: true,
    follow: true,
  },

};



export default function ConditionsPage() {


  const neurologicalConditions = conditions.filter(
    (condition) =>
      condition.relatedServices.includes(
        "neurological-rehabilitation"
      )
  );


  const otherConditions = conditions.filter(
    (condition) =>
      !condition.relatedServices.includes(
        "neurological-rehabilitation"
      )
  );



  return (

    <main className="max-w-6xl mx-auto px-6 py-16">


      <section className="mb-16">

        <h1 className="text-4xl font-bold mb-6">

          Physiotherapy Conditions We Treat

        </h1>


        <p className="text-lg text-gray-600 max-w-3xl">

          At Neuroflex Kenya, we provide specialised
          neurological and physiotherapy rehabilitation
          programs designed to help patients improve
          movement, reduce limitations and regain
          independence.

        </p>

      </section>




      <section className="mb-16">


        <h2 className="text-3xl font-semibold mb-8">

          Neurological Rehabilitation Conditions

        </h2>



        <div className="grid md:grid-cols-3 gap-6">


          {neurologicalConditions.map((condition)=>(


            <Link

              key={condition.slug}

              href={`/conditions/${condition.slug}`}

              className="border rounded-xl p-6 hover:shadow-lg transition"

            >

              <h3 className="text-xl font-semibold mb-3">

                {condition.title}

              </h3>


              <p className="text-gray-600">

                {condition.description}

              </p>


            </Link>


          ))}


        </div>


      </section>





      <section>


        <h2 className="text-3xl font-semibold mb-8">

          Musculoskeletal Conditions

        </h2>



        <div className="grid md:grid-cols-3 gap-6">


          {otherConditions.map((condition)=>(


            <Link

              key={condition.slug}

              href={`/conditions/${condition.slug}`}

              className="border rounded-xl p-6 hover:shadow-lg transition"

            >

              <h3 className="text-xl font-semibold mb-3">

                {condition.title}

              </h3>


              <p className="text-gray-600">

                {condition.description}

              </p>


            </Link>


          ))}


        </div>


      </section>


    </main>

  );

}
