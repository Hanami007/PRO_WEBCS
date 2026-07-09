import { getEventQueryOptions } from "@/features/events/api/get-event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { EventView } from "@/features/events/components/event-view";

type PageProps = {
  params: Promise<{ eventId: string }>;
};

const EventPage = async ({ params }: PageProps) => {
  const { eventId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getEventQueryOptions(eventId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <EventView eventId={eventId} />
    </HydrationBoundary>
  );
};

export default EventPage;
