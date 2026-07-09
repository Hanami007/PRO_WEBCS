import React, { ReactNode } from "react";

const DashboardContentHeader = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
};

export default DashboardContentHeader;
