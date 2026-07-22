// import Link from "next/link";
// import { ExternalLink, Globe, MapPin, Phone } from "lucide-react";
// import Logo from "./Logo";
// import { contactInfo, navLinks, socialLinks } from "@/lib/site-data";
// import { SITE_URL } from "@/lib/site-url";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="bg-brand-navy text-gray-300">
//       <div className="mx-auto max-w-7xl px-6 py-16">
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
//           <div className="lg:col-span-2">
//             <Link href="#home" aria-label="Neuroflex Kenya home">
//               <Logo size="small" />
//             </Link>
//             <p className="mt-5 max-w-md text-sm leading-relaxed">
//               Nairobi&apos;s trusted neurological rehabilitation and physiotherapy
//               centre — combining clinical excellence with compassionate care.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
//               Navigation
//             </h3>
//             <nav className="mt-5 flex flex-col gap-3 text-sm">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="w-fit transition hover:text-brand-teal"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           <div>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
//               Contact
//             </h3>
//             <ul className="mt-5 space-y-4 text-sm">
//               <li className="flex items-start gap-3">
//                 <MapPin className="mt-0.5 shrink-0 text-brand-teal" size={16} />
//                 <span>{contactInfo.location}</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="shrink-0 text-brand-teal" size={16} />
//                 <a
//                   href={contactInfo.phoneHref}
//                   className="transition hover:text-brand-teal"
//                 >
//                   {contactInfo.phone}
//                 </a>
//               </li>
//               {/* Added Website Link row */}
//               <li className="flex items-center gap-3">
//                 <Globe className="shrink-0 text-brand-teal" size={16} />
//                 <a
//                   href={SITE_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="transition hover:text-brand-teal"
//                 >
//                   neuroflexkenya.com
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
//               Connect
//             </h3>
//             <div className="mt-5 flex flex-wrap gap-2">
//               {socialLinks.map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Neuroflex Kenya on ${link.label}`}
//                   className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-xs font-medium text-gray-300 transition hover:border-brand-teal hover:text-brand-teal"
//                 >
//                   {link.label}
//                   <ExternalLink size={12} aria-hidden="true" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row">
//           <p>© {year} Neuroflex Kenya. All rights reserved.</p>
//           <p className="text-xs">Led by NRPT Dennis Masaki</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import {
  ExternalLink,
  Globe,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
  FaGoogle,
  FaTiktok,
} from "react-icons/fa6";
import Logo from "./Logo";
import { contactInfo, navLinks, socialLinks } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Robust social icon mapper (Facebook removed as it's causing issues)
const getSocialIcon = (label: string) => {
  const name = label.toLowerCase().trim();

  if (name.includes("facebook")) {
    return <FaFacebook size={20} />;
  }

  if (name.includes("instagram")) {
    return <FaInstagram size={20} />;
  }

  if (name.includes("linkedin")) {
    return <FaLinkedin size={20} />;
  }

  if (name.includes("youtube")) {
    return <FaYoutube size={20} />;
  }

  if (name.includes("twitter") || name === "x" || name.includes("x.com")) {
    return <FaXTwitter size={20} />;
  }

  if (name.includes("whatsapp")) {
    return <FaWhatsapp size={20} />;
  }

  if (name.includes("google")) {
    return <FaGoogle size={20} />;
  }

  if (name.includes("tiktok")) {
    return <FaTiktok size={20} />;
  }

  return <ExternalLink size={20} />;
};
  return (
    <footer className="relative bg-gradient-to-b from-brand-navy via-[#0a1428] to-black text-gray-300 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 py-12 relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="#home" aria-label="Neuroflex Kenya home" className="group inline-block">
              <Logo size="small" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
              Pioneering neurological rehabilitation through cutting-edge technology 
              and human-centered care in Nairobi.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[3px] text-brand-teal mb-5">
              EXPLORE
            </h3>
            <nav className="flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit hover:text-brand-teal transition-all hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[3px] text-brand-teal mb-5">
              REACH US
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-brand-teal" size={18} />
                <span>{contactInfo.location}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-brand-teal" size={18} />
                <a href={contactInfo.phoneHref} className="hover:text-brand-teal transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 shrink-0 text-brand-teal" size={18} />
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-teal transition-colors flex items-center gap-1.5"
                >
                  neuroflexkenya.com <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[3px] text-brand-teal mb-5">
              CONNECT
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Neuroflex Kenya on ${link.label}`}
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal hover:scale-110"
                >
                  {getSocialIcon(link.label)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} Neuroflex Kenya. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="text-xs">Led by NRPT Dennis Masaki</p>
            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-brand-teal hover:text-brand-teal transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}