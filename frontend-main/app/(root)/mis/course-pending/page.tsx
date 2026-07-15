import { Metadata } from "next";
import { CreateMisCoursePending } from "@/features/mis-course-pending/components/create-mis-course-pending";
import { ContentLayout } from "@/components/layouts/content-layout";

export const metadata: Metadata = {
  title: "ระบบแจ้งตกค้างรายวิชา",
  description: "แจ้งตกค้างรายวิชาสำหรับนักศึกษา ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้",
};

export default function MisCoursePendingPage() {
  return (
    <ContentLayout
      title="ระบบแจ้งตกค้างรายวิชา"
      description="แจ้งตกค้างรายวิชาสำหรับนักศึกษา ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้"
    >
      <CreateMisCoursePending />
    </ContentLayout>
  );
}
