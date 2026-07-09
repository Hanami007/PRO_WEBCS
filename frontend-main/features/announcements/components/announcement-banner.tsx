"use client";

import Link from "next/link";
import React from "react";
import { Announcement, AnnouncementType } from "../types/api";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type AnnouncementBannerProps = {
  announcement: Announcement;
};

const AnnouncementBanner = ({ announcement }: AnnouncementBannerProps) => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) return null;

  const getStyles = (type: AnnouncementType) => {
    switch (type) {
      case AnnouncementType.URGENT:
        return "bg-destructive text-destructive-foreground after:bg-white/10";
      case AnnouncementType.WARNING:
        return "bg-yellow-500 text-black after:bg-black/10";
      case AnnouncementType.NEW_FEATURE:
        return "bg-blue-600 text-white after:bg-white/10";
      case AnnouncementType.INFO:
      default:
        return "bg-gray-800 text-gray-100 after:bg-white/10";
    }
  };

  const getButtonStyles = (type: AnnouncementType) => {
    switch (type) {
      case AnnouncementType.URGENT:
        return "bg-white/20 text-white hover:bg-white/30";
      case AnnouncementType.WARNING:
        return "bg-black/10 text-black hover:bg-black/20";
      case AnnouncementType.NEW_FEATURE:
        return "bg-white/20 text-white hover:bg-white/30";
      case AnnouncementType.INFO:
      default:
        return "bg-white/10 text-white hover:bg-white/15";
    }
  };

  return (
    <div
      className={cn(
        "relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px",
        getStyles(announcement.type),
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6">
          <strong className="font-semibold">{announcement.title}</strong>
          {announcement.description && (
            <>
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r="1" cx="1" cy="1" />
              </svg>
              {announcement.description}
            </>
          )}
        </p>
        {announcement.link && (
          <Link
            href={announcement.link}
            className={cn(
              "flex-none rounded-full px-3.5 py-1 text-sm font-semibold shadow-xs transition-colors",
              getButtonStyles(announcement.type),
            )}
          >
            {announcement.linkLabel || "Learn more"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="-m-3 p-3 focus-visible:-outline-offset-4 hover:opacity-70 transition-opacity"
        >
          <span className="sr-only">Dismiss</span>
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
