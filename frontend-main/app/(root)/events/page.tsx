import { getEventsQueryOptions } from "@/features/events/api/get-events";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Events } from "./_components/events";

export const metadata = {
  title: "Events",
  description: "View all department events.",
};

export default async function EventsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getEventsQueryOptions({ limit: 12, sortBy: "startsAt:ASC" })
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Events />
    </HydrationBoundary>
  );
}
