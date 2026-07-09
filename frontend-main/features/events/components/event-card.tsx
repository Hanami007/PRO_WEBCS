"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, User, ArrowRight } from "lucide-react";
import { Event } from "../types/api";

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();

  const handleViewEvent = () => {
    router.push(`/events/${event.id}`);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
    }).format(new Date(dateStr));
  };

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary overflow-hidden">
      <CardContent className="p-6">
        <div className="md:flex justify-between items-start gap-6">
          <div className="flex-1 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {formatDate(event.startsAt)}
              </div>
              {event.organizer && (
                <Badge variant="secondary" className="font-normal">
                  {event.organizer}
                </Badge>
              )}
            </div>

            <h3 className="font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-2 border-t border-dashed">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary opacity-70" />
                <span className="font-medium text-foreground mr-1">Location:</span>
                {event.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2 text-primary opacity-70" />
                <span className="font-medium text-foreground mr-1">Organizer:</span>
                {event.organizer}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col justify-center shrink-0">
            <Button
              onClick={handleViewEvent}
              variant="outline"
              size="sm"
              className="group/btn"
            >
              View Details
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

