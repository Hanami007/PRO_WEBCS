import { ReactNode } from "react";

type DashboardContentLayoutProps = {
  children: ReactNode;
};

export const DashboardContentLayout = ({
  children,
}: DashboardContentLayoutProps) => {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-7xl space-y-8 h-full">{children}</div>
    </div>
  );
};
