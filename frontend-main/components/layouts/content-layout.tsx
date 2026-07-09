import { ReactNode } from "react";
import SectionTitle from "../ui/section-title";

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export const ContentLayout = ({
  children,
  title,
  description,
  align = "center",
}: ContentLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Decorative Gradients Layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 bottom-0 left-0 right-0 isolate hidden opacity-65 contain-strict lg:block"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      >
        {/* Dark theme gradients */}
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)] hidden dark:block" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%] hidden dark:block" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] hidden dark:block" />

        {/* Light theme gradients */}
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,0%,.08)_0,hsla(0,0%,0%,.02)_50%,hsla(0,0%,0%,0)_80%)] dark:hidden" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,0%,.06)_0,hsla(0,0%,0%,.02)_80%,transparent_100%)] [translate:5%_-50%] dark:hidden" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,0%,.04)_0,hsla(0,0%,0%,.02)_80%,transparent_100%)] dark:hidden" />
      </div>

      {title || description ? (
        <div className="relative mx-auto max-w-384 py-12 px-8">
          <SectionTitle title={title} description={description} align={align} />
        </div>
      ) : (
        <div className="h-12 lg:h-24 w-full shrink-0" aria-hidden="true" />
      )}

      <div className="relative mx-auto max-w-384 px-6 py-4 lg:px-8 lg:py-6">
        {children}
      </div>
    </div>
  );
};
