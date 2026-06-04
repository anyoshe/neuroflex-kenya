"use client";

import { MotionReveal } from "./MotionReveal";

type SectionHeaderProps = {
  badge: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <MotionReveal className={`max-w-3xl mb-16 ${alignClass}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
          dark
            ? "bg-white/10 text-brand-teal"
            : "bg-brand-green/10 text-brand-green"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
        {badge}
      </span>
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-lg leading-relaxed ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    </MotionReveal>
  );
}
