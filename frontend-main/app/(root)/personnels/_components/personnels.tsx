"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import PersonnelList from "@/features/personnels/components/personnel-list";

const Personnels = () => {
  return (
    <ContentLayout
      title="บุคลากร"
      description="ทำความรู้จักกับคณาจารย์ผู้เชี่ยวชาญ และบุคลากรสายสนับสนุนประจำสาขาวิชา ผู้ร่วมขับเคลื่อนความเป็นเลิศทางวิชาการและการบริการ"
    >
      <PersonnelList />
    </ContentLayout>
  );
};

export default Personnels;
