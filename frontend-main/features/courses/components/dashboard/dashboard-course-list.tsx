"use client";

import React from "react";
import { useCourses } from "../../api/get-courses";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";
import { coursesColumns } from "./dashboard-course-columns";

const DashboardCourseList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const coursesQuery = useCourses({
    page: page,
    limit: limit,
    search: search,
  });

  if (coursesQuery.isPending && !coursesQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const courses = coursesQuery?.data?.data || [];
  const meta = coursesQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={coursesColumns}
        data={courses}
        pageCount={pageCount}
        searchPlaceholder="ค้นหารายวิชา..."
      />
    </div>
  );
};

export default DashboardCourseList;
