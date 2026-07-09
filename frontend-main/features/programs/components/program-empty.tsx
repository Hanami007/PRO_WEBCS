"use client";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchSlash } from "lucide-react";

const ProgramEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchSlash />
        </EmptyMedia>
        <EmptyTitle>No Data</EmptyTitle>
        <EmptyDescription>No programs data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default ProgramEmpty;
