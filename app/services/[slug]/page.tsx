import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { services } from "@/lib/site-data";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-emerald-700 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-all hover:shadow-md"
          >
            <ArrowLeft size={16} />
            Back to All Services
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
          <div className="absolute bottom-12 left-12 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl max-w-xl">{service.desc}</p>
          </div>
        </div>

        {/* Gallery - Now using per-service images */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Visual Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {service.galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={img}
                  alt={`${service.title} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-14">
            <div>
              <h2 className="text-3xl font-semibold mb-6">What is {service.title}?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6">Key Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-3 bg-white p-5 rounded-2xl">
                    <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6">What to Expect in a Session</h2>
              <p className="text-gray-600 mb-6">Sessions are gentle, relaxing, and tailored to your needs.</p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3"><span className="font-medium">•</span> Thorough initial assessment</li>
                <li className="flex gap-3"><span className="font-medium">•</span> Personalized treatment plan</li>
                <li className="flex gap-3"><span className="font-medium">•</span> One-on-one care with specialist</li>
                <li className="flex gap-3"><span className="font-medium">•</span> Home care recommendations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-6">At-Home Care Tips</h2>
              <p className="text-gray-600 leading-relaxed">
                You can support your recovery between sessions with simple exercises, proper posture, and consistent movement as recommended by your therapist.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 sticky top-24 border shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Service Details</h3>
              <div className="space-y-6">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-medium">{service.priceRange}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Best For</span>
                  <span className="font-medium">{service.bestFor}</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-brand-green text-white py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-700 transition">
                Book This Session
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Call: <span className="font-medium">+254 729 213 135</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}