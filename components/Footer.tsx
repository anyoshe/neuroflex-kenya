import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react"; // Imported Globe icon
import Logo from "./Logo";
import { contactInfo, navLinks } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="#home" aria-label="Neuroflex Kenya home">
              <Logo size="small" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed">
              Nairobi&apos;s trusted neurological rehabilitation and physiotherapy
              centre — combining clinical excellence with compassionate care.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <nav className="mt-5 flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition hover:text-brand-teal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-brand-teal" size={16} />
                <span>{contactInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-brand-teal" size={16} />
                <a
                  href={contactInfo.phoneHref}
                  className="transition hover:text-brand-teal"
                >
                  {contactInfo.phone}
                </a>
              </li>
              {/* Added Website Link row */}
              <li className="flex items-center gap-3">
                <Globe className="shrink-0 text-brand-teal" size={16} />
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-brand-teal"
                >
                  neuroflexkenya.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row">
          <p>© {year} Neuroflex Kenya. All rights reserved.</p>
          <p className="text-xs">Led by NRPT Dennis Masaki</p>
        </div>
      </div>
    </footer>
  );
}