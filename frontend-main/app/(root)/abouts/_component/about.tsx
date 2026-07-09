"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import AboutView from "@/features/abouts/components/about-view";

const About = () => {
  return (
    <ContentLayout title="เกี่ยวกับเรา">
      <AboutView />
    </ContentLayout>
  );
};

export default About;
