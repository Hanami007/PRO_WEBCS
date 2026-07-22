"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { SquarePen, Trash2 } from "lucide-react";
import { DeleteProject } from "./delete-project";
import { Project } from "../../types/api";

type ProjectActionsProps = {
  project: Project;
};

export const ProjectActions = ({ project }: ProjectActionsProps) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Yellow/Gold Edit Button */}
      <Button
        type="button"
        size="icon"
        onClick={() =>
          router.push(paths.dashboard.project.getHref(project.id))
        }
        className="bg-amber-500 hover:bg-amber-600 text-white h-8 w-8 rounded-xl shadow-sm cursor-pointer"
        title="แก้ไขข้อมูลโครงงาน"
      >
        <SquarePen className="w-4 h-4" />
      </Button>

      {/* Red Delete Button */}
      <Button
        type="button"
        size="icon"
        onClick={() => setDeleteOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white h-8 w-8 rounded-xl shadow-sm cursor-pointer"
        title="ลบโครงงาน"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <DeleteProject
        id={project.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
};
