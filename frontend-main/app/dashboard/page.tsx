import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { getUserQueryOptions } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DashboardHome } from "./_components/dashboard-home";
import { getArticlesQueryOptions } from "@/features/articles/api/get-articles";
import { getEventsQueryOptions } from "@/features/events/api/get-events";
import { getComplainsQueryOptions } from "@/features/complains/api/get-complains";
import { getPersonnelsQueryOptions } from "@/features/personnels/api/get-personnels";
import { getAlumnisQueryOptions } from "@/features/alumnis/api/get-alumnis";
import { getCoursesQueryOptions } from "@/features/courses/api/get-courses";
import { getBuildingsQueryOptions } from "@/features/buildings/api/get-buildings";
import { getRoomsQueryOptions } from "@/features/rooms/api/get-rooms";
import { getProjectsQueryOptions } from "@/features/projects/api/get-projects";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Overview",
};

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getUserQueryOptions()),
    queryClient.prefetchQuery(getArticlesQueryOptions({ page: 1, limit: 5 })),
    queryClient.prefetchQuery(getEventsQueryOptions({ page: 1, limit: 5 })),
    queryClient.prefetchQuery(getComplainsQueryOptions({ page: 1, limit: 5 })),
    queryClient.prefetchQuery(getPersonnelsQueryOptions({ page: 1, limit: 1 })),
    queryClient.prefetchQuery(getAlumnisQueryOptions({ page: 1, limit: 1 })),
    queryClient.prefetchQuery(getCoursesQueryOptions({ page: 1, limit: 1 })),
    queryClient.prefetchQuery(getBuildingsQueryOptions({ page: 1, limit: 1 })),
    queryClient.prefetchQuery(getRoomsQueryOptions({ page: 1, limit: 1 })),
    queryClient.prefetchQuery(getProjectsQueryOptions({ page: 1, limit: 1 })),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardContentLayout>
        <DashboardHome />
      </DashboardContentLayout>
    </HydrationBoundary>
  );
};

export default DashboardPage;

