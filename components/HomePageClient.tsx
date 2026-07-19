"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import ContactInfo from "@/components/ContactInfo";
import ContactModal from "@/components/Contact";

export default function HomePageClient() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Navbar onBookAppointment={() => setIsContactModalOpen(true)} />
      <Hero onBookAppointment={() => setIsContactModalOpen(true)} />
      <About />
      <Services />
      <Process />
      <Team />
      <Testimonials />

      <ContactInfo onBookAppointment={() => setIsContactModalOpen(true)} />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
