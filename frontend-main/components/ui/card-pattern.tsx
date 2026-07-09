import * as React from "react";
import { cn } from "@/lib/utils";

export function CardDecorator({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex size-20 items-center justify-center rounded-xl border border-border bg-background shadow-sm mx-auto",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(black,transparent_70%)] [background-image:linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* The Icon (Children) */}
      <div className="relative z-10 flex items-center justify-center text-foreground">
        {children}
      </div>
    </div>
  );
}
