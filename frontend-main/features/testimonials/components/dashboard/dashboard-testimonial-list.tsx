"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useTestimonials } from "@/features/testimonials/api/get-testimonials";
import { testimonialColumns } from "./dashboard-testimonial-columns";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export const DashboardTestimonailList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const testimonialsQuery = useTestimonials({
    page: page,
    limit: limit,
    search: search,
  });

  if (testimonialsQuery.isPending && !testimonialsQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const testimonials = testimonialsQuery?.data?.data || [];
  const meta = testimonialsQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={testimonialColumns}
        data={testimonials}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาคำนิยม..."
      />
    </div>
  );
};
