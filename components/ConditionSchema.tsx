import { Condition } from "@/lib/conditions-data";
import { absoluteUrl } from "@/lib/site-url";


interface Props {
  condition: Condition;
}


export default function ConditionSchema({
  condition,
}: Props) {


  const schema = {

    "@context": "https://schema.org",

    "@type": "MedicalCondition",

    name: condition.title,


    description: condition.description,


    image: condition.image,


    possibleTreatment: {
      "@type": "MedicalTherapy",

      name: "Physiotherapy and Neurological Rehabilitation",

      description: condition.treatment,
    },


    associatedAnatomy: {
      "@type": "AnatomicalStructure",

      name: "Nervous System",
    },


    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": absoluteUrl(`/conditions/${condition.slug}`),
    },



    subjectOf: {

      "@type": "FAQPage",


      mainEntity: condition.faq.map((faq)=>({

        "@type": "Question",

        name: faq.question,


        acceptedAnswer: {

          "@type": "Answer",

          text: faq.answer,

        },

      })),


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