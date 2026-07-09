"use client";

import React from "react";
import { Course } from "@/features/courses/types/api";
import { ProgramCourse } from "@/features/programs/types/api";
import { groupBy } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Boxes, BookText, Info, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export interface GroupedSubGroup {
  id: string;
  name: string;
  credits: number;
  courses: (Course & { relationId: string })[];
}

export interface GroupedParentGroup {
  id: string;
  name: string;
  subGroups: GroupedSubGroup[];
}

export const groupProgramCourses = (
  data: ProgramCourse[],
): GroupedParentGroup[] => {
  if (!data) return [];

  const validData = data.filter((item) => item && item.group && item.course);

  const byParent = groupBy(validData, (item) => {
    return item.group.parent?.id ?? `top-${item.group.id}`;
  });

  return Object.entries(byParent).map(([parentId, parentItems]) => {
    const firstItem = parentItems[0];
    const isTopLevel = parentId.startsWith("top-");

    const parentInfo = isTopLevel ? firstItem.group : firstItem.group.parent;

    const bySubGroup = groupBy(parentItems, (item) => item.group.id);

    const subGroups = Object.entries(bySubGroup).map(
      ([subGroupId, subGroupItems]) => {
        const groupInfo = subGroupItems[0].group;

        return {
          id: subGroupId,
          name: groupInfo?.name ?? "General",
          credits: groupInfo?.credits ?? 0,
          courses: subGroupItems.map((item) => ({
            relationId: item.id,
            ...item.course,
          })),
        };
      },
    );

    return {
      id: parentId,
      name: parentInfo?.name ?? "Untitled Group",
      subGroups: subGroups,
    };
  });
};

export const ProgramStructures = ({
  programCourses,
}: {
  programCourses: ProgramCourse[];
}) => {
  if (!programCourses || programCourses.length === 0) {
    return (
      <div className="text-center py-20 border rounded-2xl border-dashed text-muted-foreground bg-muted/10">
        <Boxes className="h-8 w-8 mx-auto mb-3 opacity-20" />
        <p className="text-sm font-medium">
          No structure information available for this program.
        </p>
      </div>
    );
  }

  const structuredData = groupProgramCourses(programCourses);

  return (
    <section className="py-12 md:py-24">
      <div className="space-y-12">
        <SectionHeader
          subtitle="Academic Requirements"
          title="Program Structures"
        />

        <Accordion
          type="multiple"
          defaultValue={[structuredData[0]?.id]}
          className="space-y-6"
        >
          {structuredData.map((parentGroup) => (
            <AccordionItem
              value={parentGroup.id}
              key={parentGroup.id}
              className="border rounded-2xl px-6 bg-card/30 overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center border">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-lg font-semibold tracking-tight">
                    {parentGroup.name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="space-y-12 pt-4">
                  {parentGroup.subGroups.map((subgroup) => (
                    <div key={subgroup.id} className="space-y-6">
                      <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                          <BookText className="h-3 w-3" />
                          {subgroup.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground/50">
                            Requirement
                          </span>
                          <span className="text-base font-black text-primary/80">
                            {subgroup.credits}{" "}
                            <span className="text-xs font-normal text-muted-foreground/60">
                              Credits
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {subgroup.courses.map((course) => (
                          <div
                            key={course.relationId}
                            className="group grid grid-cols-12 gap-4 py-3.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-3 lg:col-span-2">
                              <span className="text-xs font-mono font-medium text-muted-foreground/80 bg-muted px-2 py-0.5 rounded">
                                {course.code}
                              </span>
                            </div>
                            <div className="col-span-7 lg:col-span-8 flex flex-col gap-1">
                              <span className="text-base font-medium text-foreground/90 leading-snug">
                                {course.titleEn}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-tight">
                                {course.titleTh || "-"}
                              </span>
                            </div>
                            <div className="col-span-2 text-right flex flex-col items-end justify-center">
                              <span className="text-base font-bold text-foreground/80">
                                {course.credits}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-tighter">
                                <span>
                                  {course.lectureHours}-{course.labHours}-
                                  {course.selfStudyHours}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl border text-xs text-muted-foreground max-w-2xl">
          <Info className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
          <p className="leading-relaxed italic">
            Note: The credits shown in brackets (L-P-S) represent Lecture,
            Practical/Lab, and Self-study hours respectively. Students must
            consult their academic advisors regarding the elective course
            selections to ensure all curriculum requirements are met.
          </p>
        </div>
      </div>
    </section>
  );
};
