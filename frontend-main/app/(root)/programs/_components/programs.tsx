"use client";

import CTA from "@/components/cta";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import ProgramList from "@/features/programs/components/public/program-list";
import Link from "next/link";

const Programs = () => {
  return (
    <ContentLayout
      title="Curriculum Overview"
      description="Discover our range of undergraduate programs designed for the future of computer science."
      align="center"
    >
      <div className="space-y-12">
        <ProgramList />

        <CTA title="Have a question about our program?">
          <Button size="lg" asChild>
            <Link href={paths.contact.getHref()}>Contact Us</Link>
          </Button>
        </CTA>
      </div>
    </ContentLayout>
  );
};

export default Programs;
