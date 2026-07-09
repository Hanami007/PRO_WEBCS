import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getEventsQueryOptions } from "@/features/events/api/get-events";
import { DashboardEvents } from "./_components/dashboard-events";

export const metadata = {
  title: "Events Management",
  description: "List and manage all academic activities.",
};

const DashboardEventsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getEventsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardEvents />
    </HydrationBoundary>
  );
};

export default DashboardEventsPage;
