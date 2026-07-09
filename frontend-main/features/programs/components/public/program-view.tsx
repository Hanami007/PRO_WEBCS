"use client";

import { Spinner } from "@/components/ui/spinner";
import { useProgram } from "../../api/get-program";
import ProgramOverview from "./program-overview";
import { ProgramStudyPlan } from "./program-study-plan";
import { ProgramStructures } from "./program-structures";

const ProgramView = ({ programId }: { programId: string }) => {
  const programQuery = useProgram({ programId });

  if (programQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner className="size-18" />
      </div>
    );
  }

  const program = programQuery.data;

  if (!program) return null;

  return (
    <div>
      <ProgramOverview program={program} />

      <ProgramStructures programCourses={program.programCourses} />

      <ProgramStudyPlan program={program} />
    </div>
  );
};

export default ProgramView;
