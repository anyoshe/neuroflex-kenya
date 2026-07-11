export default function FaqSchema({
  faq,
}: {
  faq: {
    question: string;
    answer: string;
  }[];
}) {
  const schema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: faq.map((item) => ({
      "@type": "Question",

      name: item.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: item.answer,
      },
    })),
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