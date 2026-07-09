"use client";

import { useActiveAnnouncements } from "../api/get-active-announcements";
import AnnouncementBanner from "./announcement-banner";

export const AnnouncementBannerList = () => {
  const announcementsQuery = useActiveAnnouncements();

  const announcements = announcementsQuery.data;

  if (!announcements) return null;

  return (
    <div className="flex flex-col">
      {announcements.map((announcement) => (
        <AnnouncementBanner key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};
