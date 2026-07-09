"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteProgramCourse } from "../../api/delete-program-course";

type ProgramCourseActionsProps = {
  programId: string;
  programCourseId: string;
};

export const ProgramCourseActions = ({
  programId,
  programCourseId,
}: ProgramCourseActionsProps) => {
  const deleteMutation = useDeleteProgramCourse({ programId });

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive"
      onClick={() =>
        deleteMutation.mutate({
          programCourseId,
        })
      }
      disabled={deleteMutation.isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
