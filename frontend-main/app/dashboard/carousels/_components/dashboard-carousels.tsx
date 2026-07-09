"use client";

import React from "react";
import { CarouselList } from "@/features/carousels/components/dashboard/carousel-list";
import { CreateCarousel } from "@/features/carousels/components/dashboard/create-carousel";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardCarousels = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Carousels Management"
        description="Manage your homepage slider images."
      >
        <CreateCarousel />
      </DashboardContentHeader>
      <Separator />
      <CarouselList />
    </DashboardContentLayout>
  );
};

export default DashboardCarousels;
