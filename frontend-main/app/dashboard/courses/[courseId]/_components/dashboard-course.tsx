import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import UpdateCourse from "@/features/courses/components/dashboard/update-course";
import React from "react";

type DashboardCourseProps = {
  courseId: string;
};

const DashboardCourse = ({ courseId }: DashboardCourseProps) => {
  return (
    <DashboardContentLayout>
      <UpdateCourse courseId={courseId} />
    </DashboardContentLayout>
  );
};

export default DashboardCourse;
