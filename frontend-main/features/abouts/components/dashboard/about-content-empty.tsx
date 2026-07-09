"use client";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { SearchSlash } from "lucide-react";
import { CreateAboutContent } from "./create-about-content";

type AboutContentEmptyProps = {
  sectionId: string;
};

const AboutContentEmpty = ({ sectionId }: AboutContentEmptyProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchSlash />
        </EmptyMedia>
        <EmptyTitle>No Data</EmptyTitle>
        <EmptyDescription>No Contents data found</EmptyDescription>
        <EmptyContent>
          <CreateAboutContent aboutSectionId={sectionId} />
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  );
};

export default AboutContentEmpty;
