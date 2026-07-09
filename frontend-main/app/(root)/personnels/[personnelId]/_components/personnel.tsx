"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import PersonnelView from "@/features/personnels/components/public/personnel-view";

const Personnel = ({ personnelId }: { personnelId: string }) => {
  return (
    <ContentLayout>
      <PersonnelView personnelId={personnelId} />
    </ContentLayout>
  );
};

export default Personnel;
