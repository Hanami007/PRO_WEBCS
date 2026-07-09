import { ReactNode } from "react";
import { DashboardLayout } from "./_components/dashboard-layout";
import { Metadata } from "next";
import { env } from "@/config/env";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserQueryOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    template: `%s | CSMJU`,
    default: "Dashboard | CSMJU",
  },
  description: env.APP_DESCRIPTION,
};

const AppLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardLayout>{children}</DashboardLayout>
    </HydrationBoundary>
  );
};

export default AppLayout;

export const dynamic = "force-dynamic";
