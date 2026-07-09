"use client";

import React, { useMemo, useLayoutEffect } from "react";
import { useEvents } from "../api/get-events";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User, Calendar, MapPin } from "lucide-react";

const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const getStartOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDaysNative = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const TITLE_COLUMN_WIDTH = 300;
const STEP_WIDTH_DAY = 42;
const STEP_WIDTH_WEEK = 100;

const COLORS = [
  "bg-blue-500/20 border-blue-500/50 text-blue-700",
  "bg-purple-500/20 border-purple-500/50 text-purple-700",
  "bg-emerald-500/20 border-emerald-500/50 text-emerald-700",
  "bg-amber-500/20 border-amber-500/50 text-amber-700",
  "bg-pink-500/20 border-pink-500/50 text-pink-700",
  "bg-indigo-500/20 border-indigo-500/50 text-indigo-700",
];

export const EventGanttChart = () => {
  const [viewMode, setViewMode] = React.useState<"day" | "week">("week");
  const eventsQuery = useEvents({ limit: 100, sortBy: "startsAt:ASC" });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const events = useMemo(() => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfThisMonth.setHours(0, 0, 0, 0);

    return (
      eventsQuery.data?.data?.filter((e) => {
        if (!e.isActive) return false;

        const eventEnd = e.endsAt ? new Date(e.endsAt) : new Date(e.startsAt);
        return eventEnd >= startOfThisMonth;
      }) || []
    );
  }, [eventsQuery.data]);

  const { dateRange, timeSteps, months } = useMemo(() => {
    if (events.length === 0)
      return { dateRange: null, timeSteps: [], months: [] };

    const today = getStartOfDay(new Date());
    const windowStart = addDaysNative(today, -30);
    const windowEnd = addDaysNative(today, 150);

    const starts = events.map((e) => new Date(e.startsAt));
    const ends = events.map((e) =>
      e.endsAt ? new Date(e.endsAt) : new Date(e.startsAt),
    );

    const minDataDate = new Date(Math.min(...starts.map((d) => d.getTime())));
    const maxDataDate = new Date(Math.max(...ends.map((d) => d.getTime())));

    const startDate = getStartOfDay(
      minDataDate < windowStart ? minDataDate : windowStart,
    );
    const endDate = getStartOfDay(
      maxDataDate > windowEnd ? maxDataDate : windowEnd,
    );

    const totalDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    const daysArray = Array.from({ length: totalDays }, (_, i) =>
      addDaysNative(startDate, i),
    );

    let steps = [];
    if (viewMode === "day") {
      steps = daysArray;
    } else {
      steps = daysArray.filter((_, i) => i % 7 === 0);
    }

    const monthsArray: { month: string; stepCount: number }[] = [];
    steps.forEach((step) => {
      const monthName = formatDate(step, { month: "long", year: "numeric" });
      const lastMonth = monthsArray[monthsArray.length - 1];
      if (lastMonth && lastMonth.month === monthName) {
        lastMonth.stepCount++;
      } else {
        monthsArray.push({ month: monthName, stepCount: 1 });
      }
    });

    return {
      dateRange: { start: startDate, end: endDate },
      timeSteps: steps,
      months: monthsArray,
    };
  }, [events, viewMode]);

  const stepWidth = viewMode === "day" ? STEP_WIDTH_DAY : STEP_WIDTH_WEEK;

  useLayoutEffect(() => {
    if (scrollContainerRef.current && dateRange && events.length > 0) {
      const today = new Date();
      const daysFromStart =
        (today.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24);

      const scrollPos =
        (daysFromStart / (viewMode === "day" ? 1 : 7)) * stepWidth;
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          left: Math.max(0, scrollPos - 100),
          behavior: "auto",
        });
      }, 100);
    }
  }, [dateRange, events.length, viewMode, stepWidth]);

  const scrollToToday = () => {
    if (scrollContainerRef.current && dateRange) {
      const today = new Date();
      const daysFromStart =
        (today.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24);

      const scrollPos =
        (daysFromStart / (viewMode === "day" ? 1 : 7)) * stepWidth;
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollPos - 100),
        behavior: "smooth",
      });
    }
  };

  if (eventsQuery.isLoading)
    return (
      <div className="flex h-64 items-center justify-center bg-muted/10 rounded-xl border">
        <Spinner />
      </div>
    );

  if (events.length === 0)
    return (
      <div className="p-12 text-center border-2 border-dashed rounded-xl text-muted-foreground">
        No active events found.
      </div>
    );

  const today = new Date();
  const todayOffsetDays = dateRange
    ? (today.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
    : -1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("day")}
            className="h-8 text-xs px-4"
          >
            Day View
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("week")}
            className="h-8 text-xs px-4"
          >
            Week View
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={scrollToToday}
          className="h-8 gap-2 shadow-sm border-primary/20 hover:border-primary/50 transition-colors"
        >
          <Calendar className="size-3.5 text-primary" />
          Jump to Today
        </Button>
      </div>

      <div className="w-full overflow-hidden border rounded-xl bg-background shadow-lg">
        <div
          className="overflow-x-auto overflow-y-auto custom-scrollbar relative h-[500px]"
          ref={scrollContainerRef}
        >
          <div
            className="inline-grid pb-12 relative min-w-full"
            style={{
              gridTemplateColumns: `${TITLE_COLUMN_WIDTH}px repeat(${timeSteps.length}, ${stepWidth}px)`,
            }}
          >
            {todayOffsetDays >= 0 && (
              <div
                className="absolute top-0 bottom-0 z-10 w-px bg-red-500 pointer-events-none"
                style={{
                  left: `${
                    TITLE_COLUMN_WIDTH +
                    (todayOffsetDays / (viewMode === "day" ? 1 : 7)) * stepWidth
                  }px`,
                }}
              >
                <div className="sticky top-24 -left-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] border-2 border-white dark:border-zinc-900" />
              </div>
            )}

            <div className="sticky left-0 z-40 bg-muted/80 backdrop-blur-md border-b border-r h-10 flex items-center px-4 font-bold text-xs uppercase text-muted-foreground">
              Timeline
            </div>
            {months.map((m, i) => (
              <div
                key={i}
                className="bg-muted/40 border-b border-r h-10 flex items-center justify-center font-bold text-[11px] text-foreground/70"
                style={{ gridColumn: `span ${m.stepCount}` }}
              >
                {m.month}
              </div>
            ))}
            <div className="sticky left-0 z-40 bg-background/95 backdrop-blur-md border-b border-r h-14 flex items-center px-4 font-semibold text-sm shadow-[4px_0_10px_-2px_rgba(0,0,0,0.1)]">
              Event Title
            </div>
            {timeSteps.map((step, i) => {
              const startOfToday = getStartOfDay(today);
              const isToday =
                viewMode === "day"
                  ? isSameDay(step, startOfToday)
                  : startOfToday >= step &&
                    startOfToday < addDaysNative(step, 7);

              return (
                <div
                  key={i}
                  className={cn(
                    "border-b border-r h-14 flex flex-col items-center justify-center text-[10px] transition-colors",
                    isToday ? "bg-primary/5" : "bg-background",
                  )}
                >
                  <span className="text-muted-foreground font-medium uppercase">
                    {viewMode === "day"
                      ? formatDate(step, { weekday: "short" })
                      : "Week"}
                  </span>
                  <span
                    className={cn(
                      "font-bold text-sm mt-0.5 min-w-28px h-7 flex items-center justify-center rounded-full px-1",
                      isToday &&
                        "bg-primary text-primary-foreground shadow-md scale-110",
                    )}
                  >
                    {viewMode === "day"
                      ? step.getDate()
                      : `${step.getDate()}-${addDaysNative(step, 6).getDate()}`}
                  </span>
                </div>
              );
            })}

            <div className="contents relative">
              {todayOffsetDays >= 0 && (
                <div
                  className="absolute top-0 bottom-0 z-10 w-px bg-red-500/60 pointer-events-none"
                  style={{
                    left: `${TITLE_COLUMN_WIDTH + (todayOffsetDays / (viewMode === "day" ? 1 : 7)) * stepWidth}px`,
                  }}
                >
                  <div className="sticky top-24 -left-1 w-2 h-2 bg-red-500 rounded-full shadow-md" />
                </div>
              )}

              {events.map((event, index) => {
                const start = new Date(event.startsAt);
                const end = event.endsAt
                  ? new Date(event.endsAt)
                  : new Date(event.startsAt);

                const startDiff =
                  (getStartOfDay(start).getTime() -
                    dateRange!.start.getTime()) /
                  (1000 * 60 * 60 * 24);
                const totalDuration = Math.max(
                  1,
                  (getStartOfDay(end).getTime() -
                    getStartOfDay(start).getTime()) /
                    (1000 * 60 * 60 * 24) +
                    1,
                );

                const colorClass = COLORS[index % COLORS.length];

                const left =
                  (startDiff / (viewMode === "day" ? 1 : 7)) * stepWidth;
                const width =
                  (totalDuration / (viewMode === "day" ? 1 : 7)) * stepWidth;

                return (
                  <React.Fragment key={event.id}>
                    <div
                      className="sticky left-0 z-30 bg-background border-b border-r py-4 px-4 text-sm font-semibold truncate group hover:bg-primary/5 hover:z-40 transition-colors shadow-[4px_0_10px_-2px_rgba(0,0,0,0.1)] h-20 flex items-center"
                      style={{ gridColumn: 1 }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={`/events/${event.id}`}
                              className="cursor-pointer hover:text-primary transition-colors text-left line-clamp-2"
                            >
                              {event.title}
                            </a>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="p-0 border-none shadow-xl"
                          >
                            <div className="bg-card p-4 rounded-lg border w-64 space-y-3">
                              <div className="font-bold border-b pb-2 text-foreground">
                                {event.title}
                              </div>
                              <div className="space-y-1.5 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="size-3 text-primary" />{" "}
                                  {event.organizer}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="size-3 text-primary" />{" "}
                                  {formatDate(start, { dateStyle: "long" })}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="size-3 text-primary" />{" "}
                                  {event.location}
                                </div>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div
                      className="relative border-b h-20 bg-muted/5 flex items-center group transition-colors hover:bg-muted/10"
                      style={{ gridColumn: `2 / span ${timeSteps.length}` }}
                    >
                      <div
                        className={cn(
                          "absolute h-12 rounded-xl border-2 shadow-sm flex items-center px-4 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer z-10 group/bar",
                          colorClass,
                        )}
                        style={{
                          left: `${left + 6}px`,
                          width: `${Math.max(stepWidth - 12, width - 12)}px`,
                        }}
                        onClick={() =>
                          (window.location.href = `/events/${event.id}`)
                        }
                      >
                        <span className="text-[11px] font-extrabold truncate uppercase tracking-tight">
                          {event.title}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {[...Array(2)].map((_, i) => (
                <React.Fragment key={`empty-${i}`}>
                  <div
                    className="sticky left-0 z-30 bg-background border-b border-r h-20 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.1)]"
                    style={{ gridColumn: 1 }}
                  />
                  <div
                    className="border-b h-20 bg-muted/5"
                    style={{ gridColumn: `2 / span ${timeSteps.length}` }}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted/30 px-6 py-3 border-t flex justify-between items-center text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <div className="size-2 bg-primary rounded-full" /> Active Event
            </span>
            <span className="flex items-center gap-2">
              <div className="size-2 bg-red-500 rounded-full" /> Current Time
            </span>
          </div>
          <span>
            Total {events.length} Events •{" "}
            {viewMode === "day" ? "Day View" : "Week View"}
          </span>
        </div>
      </div>
    </div>
  );
};
