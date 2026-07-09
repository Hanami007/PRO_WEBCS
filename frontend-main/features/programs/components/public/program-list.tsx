"use client";

import { usePrograms } from "../../api/get-programs";
import { ProgramCard } from "./program-card";
import { SectionHeader } from "@/components/ui/section-header";

const ProgramList = () => {
  const programsQuery = usePrograms();
  const programs = programsQuery.data?.data;

  if (!programs || programs.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 border rounded-2xl border-dashed bg-muted/10">
        <span className="text-sm font-medium text-muted-foreground">
          No programs found.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SectionHeader subtitle="Curriculum" title="Available Programs" />

      <div className="flex flex-col gap-8">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};

export default ProgramList;
