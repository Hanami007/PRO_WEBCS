"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { SectionSpacing } from "@/components/ui/section-space";
import AlumniList from "@/features/alumnis/components/alumni-list";

const Alumnis = () => {
  return (
    <ContentLayout title="Graduates" description="" align="center">
      <AlumniList />
      <SectionSpacing size="4xl" />
    </ContentLayout>
  );
};

export default Alumnis;
