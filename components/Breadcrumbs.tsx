import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  title,
}: {
  title: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-gray-500 mb-8"
    >
      <Link
        href="/"
        className="hover:text-brand-green transition"
      >
        Home
      </Link>

      <ChevronRight size={15} />

      <Link
        href="/#services"
        className="hover:text-brand-green transition"
      >
        Services
      </Link>

      <ChevronRight size={15} />

      <span className="text-gray-800 font-medium">
        {title}
      </span>
    </nav>
  );
}