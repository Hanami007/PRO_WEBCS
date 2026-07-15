"use client";

import React, { useState } from "react";
import FacilitiesSections from "@/features/buildings/components/facilities-view";
import { ContentLayout } from "@/components/layouts/content-layout";
import { RoomList } from "@/features/rooms/components/room-list";

const Facilities = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("");

  return (
    <ContentLayout
      title="อาคารและห้องเรียน"
      description="อาคารเรียนในปัจจุบันมีอยู่ด้วยกัน 2 อาคารเรียน ได้แก่ อาคารแม่โจ้ 60 ปี และอาคารจุฬาภรณ์ คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้ แบ่งห้องเรียนออกเป็น 2 รูปแบบได้แก่ ห้องบรรยายคอมพิวเตอร์ และปฏิบัติการคอมพิวเตอร์
โดยมีห้องสำนักงานตั้งอยู่ที่ ชั้น 6 อาหารแม่โจ้ 60 ปี"
    >
      <div className="container mx-auto">
        <FacilitiesSections selectedBuildingId={selectedBuildingId} onBuildingChange={setSelectedBuildingId} />
        {selectedBuildingId && <RoomList buildingId={selectedBuildingId} />}
      </div>
    </ContentLayout>
  );
};

export default Facilities;
