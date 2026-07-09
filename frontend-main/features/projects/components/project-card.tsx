"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { paths } from "@/config/paths";
import { User, Calendar, FileText } from "lucide-react";
import { Project } from "../types/api";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={paths.project.getHref(project.id)} className="group block">
      <Card className="border rounded-2xl bg-card/30 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 px-8 pt-8">
          <div className="space-y-1.5 text-left">
            <CardTitle className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 bg-muted px-2 py-0.5 rounded">
                Code: {project.code}
              </span>
              <div className="flex items-center text-sm text-muted-foreground font-medium">
                <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                Academic Year {project.year}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-8 text-left">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 flex items-center gap-1.5 mb-1">
                <User className="h-3 w-3" /> Advisor
              </span>
              <p className="text-base font-semibold text-foreground/80 leading-snug">
                {project.chairman?.fullnameTh || "-"}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 flex items-center gap-1.5 mb-1">
                <FileText className="h-3 w-3" /> Authors
              </span>
              <p className="text-base font-semibold text-foreground/80 leading-snug line-clamp-1 max-w-xs">
                {project.editors.join(", ")}
              </p>
            </div>

            <div className="flex flex-col h-full justify-center pt-2 ml-auto">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/60">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${project.file?.url ? "bg-green-400" : "bg-amber-400"}`}
                />
                <span>
                  {project.file?.url ? "Document Available" : "No Document"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
