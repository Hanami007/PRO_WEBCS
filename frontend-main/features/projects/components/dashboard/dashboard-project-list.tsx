"use client";

import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import { useProjects } from "../../api/get-projects";
import { projectsColumns } from "./dashboard-project-columns";
import { Spinner } from "@/components/ui/spinner";

export const DashboardProjectList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const projectQuery = useProjects({
    page: page,
    limit: limit,
    search: search,
  });

  if (projectQuery.isPending && !projectQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const projects = projectQuery?.data?.data || [];
  const meta = projectQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={projectsColumns}
        data={projects}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาโครงการ..."
      />
    </div>
  );
};
