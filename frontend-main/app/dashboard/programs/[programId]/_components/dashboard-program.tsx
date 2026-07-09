"use client";

import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import UpdateProgram from "@/features/programs/components/dashboard/update-program";
import { ErrorBoundary } from "react-error-boundary";

const DashboardProgram = ({ programId }: { programId: string }) => {
  return (
    <DashboardContentLayout>
      <ErrorBoundary
        fallback={<div>Failed to load article. Try to refresh the page.</div>}
      >
        <UpdateProgram programId={programId} />
      </ErrorBoundary>
    </DashboardContentLayout>
  );
};

export default DashboardProgram;
