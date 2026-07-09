"use client";

import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import UpdateAlumni from "@/features/alumnis/components/dashboard/update-alumni";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export const DashboardAlumni = ({ alumniId }: { alumniId: string }) => {
  return (
    <DashboardContentLayout>
      <ErrorBoundary
        fallback={
          <div>Failed to load alumni. Please try refreshing this page.</div>
        }
      >
        <UpdateAlumni alumniId={alumniId} />
      </ErrorBoundary>
    </DashboardContentLayout>
  );
};
