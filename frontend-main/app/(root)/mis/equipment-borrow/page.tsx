import { Metadata } from "next";
import { CreateMisEquipmentBorrow } from "@/features/mis-equipment-borrow/components/create-mis-equipment-borrow";
import { ContentLayout } from "@/components/layouts/content-layout";

export const metadata: Metadata = {
  title: "ระบบยืม-คืนครุภัณฑ์",
  description: "ระบบยืม-คืนครุภัณฑ์ ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้",
};

export default function MisEquipmentBorrowPage() {
  return (
    <ContentLayout
      title="ระบบยืม-คืนครุภัณฑ์"
      description="ระบบยืม-คืนครุภัณฑ์ ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้"
    >
      <CreateMisEquipmentBorrow />
    </ContentLayout>
  );
}
