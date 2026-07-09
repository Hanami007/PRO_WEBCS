"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useCarousels } from "@/features/carousels/api/get-carousels";
import { carouselColumns } from "./dashboard-carousel-columns";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import CarouselEmpty from "../carousel-empty";

export const CarouselList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const carouselQuery = useCarousels({
    page: page,
    limit: limit,
    search: search,
  });

  if (carouselQuery.isPending && !carouselQuery.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const carousels = carouselQuery?.data?.data;
  const meta = carouselQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  if (!carousels?.length) {
    return <CarouselEmpty />;
  }

  return (
    <div className="space-y-8">
      <DataTable
        columns={carouselColumns}
        data={carousels}
        pageCount={pageCount}
        searchPlaceholder="ค้นหารูปหน้าปก..."
      />
    </div>
  );
};
