"use client";

import { useEvents } from "../api/get-events";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { QueryPagination } from "@/components/query-pagination";
import { QuerySearch } from "@/components/query-search";
import { EventCard } from "./event-card";

export const EventsList = ({ limit }: { limit?: number | 0 }) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const searchTerm = searchParams.get("search") || "";

  const eventsQuery = useEvents({
    page: page,
    limit: limit,
    search: searchTerm,
  });

  if (eventsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const events = eventsQuery?.data?.data?.filter((item) => item.isActive);
  const meta = eventsQuery?.data?.meta;

  if (!events || !meta) return <div>No events found</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-0">
        <QuerySearch placeholder="Search events by title, organizer, or location..." />
      </div>

      {events?.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-lg border-2 border-dashed mx-4 md:mx-0">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6 px-4 md:px-0">
          {events?.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="pt-8 flex justify-center">
          <QueryPagination meta={meta} />
        </div>
      )}
    </div>
  );
};


