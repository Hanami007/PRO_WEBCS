"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "../types/api";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import Link from "next/link";
import { paths } from "@/config/paths";

interface ProjectTableProps {
  projects: Project[];
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
  return (
    <div className="rounded-2xl border bg-card/30 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[100px] pl-6 py-4">Code</TableHead>
            <TableHead className="py-4">Project Title</TableHead>
            <TableHead className="py-4">Year</TableHead>
            <TableHead className="py-4">Advisor</TableHead>
            <TableHead className="text-right pr-6 py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="group hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-xs pl-6 py-4">
                <span className="bg-muted px-1.5 py-0.5 rounded">{project.code}</span>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-foreground/90 line-clamp-1">{project.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tight line-clamp-1">
                    {project.editors.join(", ")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 text-sm text-muted-foreground">{project.year}</TableCell>
              <TableCell className="py-4 text-sm font-medium text-foreground/80">
                {project.chairman?.fullnameTh || "-"}
              </TableCell>
              <TableCell className="text-right pr-6 py-4">
                <div className="flex justify-end gap-2">
                  {project.file?.url && (
                    <Button variant="ghost" size="icon" className="size-8" asChild>
                      <a href={project.file.url} target="_blank" rel="noreferrer" title="View PDF">
                        <FileText className="size-4 text-muted-foreground" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="size-8 group-hover:text-primary transition-colors" asChild>
                    <Link href={paths.project.getHref(project.id)} title="View Detail">
                      <Eye className="size-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
