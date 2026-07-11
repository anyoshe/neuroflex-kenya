"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { services } from "@/lib/site-data";
import { notFound } from "next/navigation";
import ContactModal from "@/components/Contact";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function ServiceClient({ params }: { params: Promise<{ slug: string }> }) {
    // Safe unwrapping of async params inside Client Components
    const { slug } = use(params);
    const service = services.find((s) => s.slug === slug);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!service) notFound();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
                <Breadcrumbs
                    title={service.title}
                />

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
                <div className="relative h-[350px] rounded-3xl overflow-hidden mb-12">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                    <div className="absolute bottom-12 left-12 text-white pr-6">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">{service.title}</h1>
                        <p className="text-sm sm:text-base md:text-xl max-w-xl">{service.desc}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-14">

                        <div className="grid lg:grid-cols-2 gap-10 items-center">

                            <div>

                                <h2 className="text-3xl font-semibold mb-6">
                                    What is {service.title}?
                                </h2>

                                <p className="text-lg leading-8 text-gray-600">
                                    {service.overview}
                                </p>

                            </div>

                            <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-xl">

                                <Image
                                    src={service.galleryImages[0]}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold mb-6">
                                Conditions We Treat
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-4">

                                {service.conditions.map((condition) => (

                                    <div
                                        key={condition}
                                        className="flex gap-3 bg-white rounded-2xl p-5"
                                    >

                                        <CheckCircle
                                            className="text-brand-green mt-1"
                                            size={22}
                                        />

                                        <span>{condition}</span>

                                    </div>

                                ))}

                            </div>
                        </div>
                        <div className="relative h-[450px] rounded-3xl overflow-hidden">

                            <Image
                                src={service.galleryImages[1]}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />

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
                        <div className="grid lg:grid-cols-2 gap-10 items-center">

                            <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-lg">

                                <Image
                                    src={service.galleryImages[2]}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            <div>

                                <h2 className="text-3xl font-semibold mb-6">
                                    Our Treatment Approach
                                </h2>

                                <p className="text-lg leading-8 text-gray-600">
                                    {service.treatment}
                                </p>

                            </div>

                        </div>

                        <div>

                            <h2 className="text-3xl font-semibold mb-8">
                                Your Treatment Journey
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="bg-white rounded-3xl p-6 shadow-sm">

                                    <div className="text-4xl font-bold text-brand-green mb-4">
                                        01
                                    </div>

                                    <h3 className="font-semibold text-xl mb-2">
                                        Comprehensive Assessment
                                    </h3>

                                    <p className="text-gray-600">
                                        Your physiotherapist evaluates your movement,
                                        strength, pain levels and treatment goals.
                                    </p>

                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm">

                                    <div className="text-4xl font-bold text-brand-green mb-4">
                                        02
                                    </div>

                                    <h3 className="font-semibold text-xl mb-2">
                                        Personalized Treatment
                                    </h3>

                                    <p className="text-gray-600">
                                        A treatment plan is created specifically for your
                                        condition and recovery goals.
                                    </p>

                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm">

                                    <div className="text-4xl font-bold text-brand-green mb-4">
                                        03
                                    </div>

                                    <h3 className="font-semibold text-xl mb-2">
                                        Hands-on Therapy
                                    </h3>

                                    <p className="text-gray-600">
                                        Treatment combines manual therapy,
                                        guided exercises and modern rehabilitation techniques.
                                    </p>

                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm">

                                    <div className="text-4xl font-bold text-brand-green mb-4">
                                        04
                                    </div>

                                    <h3 className="font-semibold text-xl mb-2">
                                        Recovery & Home Program
                                    </h3>

                                    <p className="text-gray-600">
                                        Receive exercises and guidance to continue improving safely at home.
                                    </p>

                                </div>

                            </div>

                        </div>
                        <div className="relative h-[450px] rounded-3xl overflow-hidden">

                            <Image
                                src={service.galleryImages[3] || service.galleryImages[0]}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold mb-6">At-Home Care Tips</h2>
                            <p className="text-gray-600 leading-relaxed">
                                You can support your recovery between sessions with simple exercises, proper posture, and consistent movement as recommended by your therapist.
                            </p>
                        </div>
                        <div>

                            <h2 className="text-3xl font-semibold mb-8">

                                Frequently Asked Questions

                            </h2>

                            <div className="space-y-6">

                                {service.faq.map((item) => (

                                    <div
                                        key={item.question}
                                        className="bg-white rounded-2xl p-6 shadow-sm"
                                    >

                                        <h3 className="font-semibold text-lg">

                                            {item.question}

                                        </h3>

                                        <p className="mt-3 text-gray-600">

                                            {item.answer}

                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>
                    </div>


                    {/* Sidebar Info - Clean Original Aesthetic Layout */}
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

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full mt-8 bg-brand-green text-white py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-700 transition"
                            >
                                Book This Session
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                Call: <span className="font-medium">+254 729 213 135</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Appointment Contact Modal Component */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}