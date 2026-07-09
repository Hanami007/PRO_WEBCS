"use client";

import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  description,
  align = "center",
}: {
  title?: string;
  description?: string;
  align?: "left" | "center";
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 py-8",
        isCenter && "items-center text-center",
      )}
    >
      <div className="space-y-4">
        {title && (
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground/90 leading-tight">
            {title}
          </h1>
        )}
        {description && (
          <p
            className={cn(
              "text-lg text-muted-foreground/80 font-medium leading-relaxed max-w-3xl",
              isCenter && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
