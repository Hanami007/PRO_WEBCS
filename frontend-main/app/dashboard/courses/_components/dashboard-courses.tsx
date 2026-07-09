"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { CreateCourse } from "@/features/courses/components/dashboard/create-course";
import DashboardCourseList from "@/features/courses/components/dashboard/dashboard-course-list";
import React from "react";

const DashboardCourses = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Courses"
        description="Manage your department courses."
      >
        <CreateCourse />
      </DashboardContentHeader>
      <Separator />
      <DashboardCourseList />
    </DashboardContentLayout>
  );
};

export default DashboardCourses;
