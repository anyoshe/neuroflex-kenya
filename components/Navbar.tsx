"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { navLinks } from "@/lib/site-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-light py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="#home" aria-label="Neuroflex Kenya home">
            <Logo size="small" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "text-gray-700 hover:bg-brand-green/10 hover:text-brand-green"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+254729213135"
              className={`text-sm font-medium transition ${
                scrolled ? "text-gray-600 hover:text-brand-green" : "text-white/80 hover:text-white"
              }`}
            >
              +254 729 213 135
            </a>
            <a href="#contact" className="btn-primary !py-2.5 !px-6 !text-sm">
              Book Appointment
            </a>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className={`rounded-xl p-2 lg:hidden ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo size="small" />
                <button
                  onClick={closeMenu}
                  className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-800 hover:bg-brand-green/10 hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-3 border-t pt-8">
                <a
                  href="tel:+254729213135"
                  className="block text-center text-brand-navy font-medium"
                >
                  +254 729 213 135
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="btn-primary w-full"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
