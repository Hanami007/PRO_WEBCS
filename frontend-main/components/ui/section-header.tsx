"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  className?: string;
}

export const SectionHeader = ({
  subtitle,
  title,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 items-center lg:items-start",
        className,
      )}
    >
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/60">
        {subtitle}
      </h2>
      <h3 className="text-3xl font-light tracking-tight text-foreground/90 leading-tight">
        {title}
      </h3>
    </div>
  );
};
