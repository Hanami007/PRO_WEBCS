import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const CTA = ({ title, children }: Props) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-384 rounded-md px-6 py-12 md:py-20 lg:py-32 bg-muted">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex gap-4 mt-12 justify-center">{children}</div>
      </div>
    </section>
  );
};

export default CTA;
