import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { getUserQueryOptions } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await Promise.all([queryClient.prefetchQuery(getUserQueryOptions())]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardContentLayout>
        <p className="text-2xl font-medium">Hi! Welcome to Dashboard</p>
      </DashboardContentLayout>
    </HydrationBoundary>
  );
};

export default DashboardPage;
