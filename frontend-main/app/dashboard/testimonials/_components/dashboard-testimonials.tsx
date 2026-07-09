"use client";

import React from "react";
import { DashboardTestimonailList } from "@/features/testimonials/components/dashboard/dashboard-testimonial-list";
import { CreateTestimonial } from "@/features/testimonials/components/dashboard/create-testimonial";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

const DashboardTestimonials = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Testimonials Management"
        description="Manage your student and alumni reviews."
      >
        <CreateTestimonial />
      </DashboardContentHeader>
      <Separator />
      <DashboardTestimonailList />
    </DashboardContentLayout>
  );
};

export default DashboardTestimonials;
