"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteStudyPlan } from "../../api/delete-study-plan";

type ProgramStudyPlanActionsProps = {
  programId: string;
  studyPlanId: string;
};

export const ProgramStudyPlanActions = ({
  programId,
  studyPlanId,
}: ProgramStudyPlanActionsProps) => {
  const deleteMutation = useDeleteStudyPlan({ programId });

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive"
      onClick={() =>
        deleteMutation.mutate({
          studyPlanId,
        })
      }
      disabled={deleteMutation.isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
