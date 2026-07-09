import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spacingVariants = cva("block w-full", {
  variants: {
    size: {
      xs: "h-2", // 8px
      sm: "h-4", // 16px
      md: "h-8", // 32px
      lg: "h-16", // 64px
      xl: "h-24", // 96px
      "2xl": "h-32", // 128px
      "3xl": "h-40", // 160px
      "4xl": "h-48", // 192px
    },
    responsive: {
      true: "h-4 md:h-8 lg:h-16", // Responsive default
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    responsive: false,
  },
});

function SectionSpacing({
  className,
  size,
  responsive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spacingVariants>) {
  return (
    <div
      data-slot="section-spacing"
      className={cn(spacingVariants({ size, responsive, className }))}
      {...props}
    />
  );
}

// Alternative component for semantic spacing
const sectionSpacingVariants = cva("block w-full", {
  variants: {
    spacing: {
      section: "h-16 md:h-24 lg:h-32", // Between major sections
      subsection: "h-8 md:h-12 lg:h-16", // Between subsections
      element: "h-4 md:h-6 lg:h-8", // Between elements
      tight: "h-2 md:h-3 lg:h-4", // Tight spacing
      loose: "h-24 md:h-32 lg:h-40", // Loose spacing
    },
  },
  defaultVariants: {
    spacing: "section",
  },
});

function SemanticSpacing({
  className,
  spacing,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof sectionSpacingVariants>) {
  return (
    <div
      data-slot="semantic-spacing"
      className={cn(sectionSpacingVariants({ spacing, className }))}
      {...props}
    />
  );
}

export {
  SectionSpacing,
  spacingVariants,
  SemanticSpacing,
  sectionSpacingVariants,
};
