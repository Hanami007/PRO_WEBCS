"use client";

import React from "react";
import { aboutSectionsColumns } from "./about-section-columns";
import { useAboutSections } from "../../api/get-about-sections";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";

const DashboardAboutSectionList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const aboutSectionsQuery = useAboutSections({
    page,
    limit,
    search: search,
  });

  if (aboutSectionsQuery.isPending && !aboutSectionsQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const sections = aboutSectionsQuery?.data?.data || [];
  const meta = aboutSectionsQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={aboutSectionsColumns}
        data={sections}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาหัวข้อ..."
      />
    </div>
  );
};

export default DashboardAboutSectionList;
