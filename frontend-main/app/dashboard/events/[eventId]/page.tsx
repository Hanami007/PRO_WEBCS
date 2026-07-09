import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getEventQueryOptions } from "@/features/events/api/get-event";
import { DashboardEvent } from "./_components/dashboard-event";

type PageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function DashboardEditEventPage({ params }: PageProps) {
  const { eventId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getEventQueryOptions(eventId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardEvent eventId={eventId} />
    </HydrationBoundary>
  );
}
