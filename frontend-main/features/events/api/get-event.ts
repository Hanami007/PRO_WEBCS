import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Event } from "../types/api";

export const getEvent = ({
  eventId,
}: {
  eventId: string;
}): Promise<Event> => {
  return api.get(`/events/${eventId}`);
};

export const getEventQueryOptions = (eventId: string) => {
  return queryOptions({
    queryKey: ["events", eventId],
    queryFn: () => getEvent({ eventId }),
  });
};

export const useEvent = (eventId: string) => {
  return useQuery(getEventQueryOptions(eventId));
};
