"use client";

import { useEvent } from "../api/get-event";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { CalendarDays, MapPin, User, Link as LinkIcon } from "lucide-react";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";

type EventViewProps = {
  eventId: string;
};

export const EventView = ({ eventId }: EventViewProps) => {
  const eventQuery = useEvent(eventId);

  if (eventQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const event = eventQuery.data;

  if (!event) {
    return <div>Event not found</div>;
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(dateStr));
  };

  return (
    <ContentLayout title={event.title} description={event.organizer}>
      <div className="mx-auto max-w-4xl space-y-8 pb-12">
        {event.poster?.url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
            <Image
              src={event.poster.url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">About this event</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </section>

            {event.externalLink && (
              <Button asChild variant="default" size="lg">
                <a
                  href={event.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register or Visit Website
                  <LinkIcon className="ml-2 size-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border p-6 space-y-4 bg-muted/30">
              <h3 className="font-semibold text-lg border-b pb-2">
                Event Info
              </h3>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-1 size-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Starts</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.startsAt)}
                  </p>
                </div>
              </div>

              {event.endsAt && (
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 size-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Ends</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.endsAt)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="mt-1 size-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Organizer</p>
                  <p className="text-xs text-muted-foreground">
                    {event.organizer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
