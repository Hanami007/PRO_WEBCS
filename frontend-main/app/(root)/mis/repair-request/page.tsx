import { Metadata } from "next";
import { CreateMisRepairRequest } from "@/features/mis-repair-request/components/create-mis-repair-request";
import { ContentLayout } from "@/components/layouts/content-layout";

export const metadata: Metadata = {
  title: "ระบบแจ้งของพัง",
  description: "แจ้งซ่อมอุปกรณ์และครุภัณฑ์ที่ชำรุด ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้",
};

export default function MisRepairRequestPage() {
  return (
    <ContentLayout
      title="ระบบแจ้งของพัง"
      description="แจ้งซ่อมอุปกรณ์และครุภัณฑ์ที่ชำรุด ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้"
    >
      <CreateMisRepairRequest />
    </ContentLayout>
  );
}
