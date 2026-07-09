"use client";

import { DataTable } from "@/components/ui/data-table";
import { announcementColumns } from "./announcement-columns";
import { useSearchParams } from "next/navigation";
import { useAnnouncements } from "../../api/get-announcements";

const DashobardAnnouncementList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const announcementQuery = useAnnouncements({
    page: page,
    limit: limit,
    search: search,
  });

  const announcements = announcementQuery?.data?.data || [];
  const meta = announcementQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={announcementColumns}
        data={announcements}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาจาก ชื่อ..."
      />
    </div>
  );
};

export default DashobardAnnouncementList;
