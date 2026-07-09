"use client";

import { Program, StudyPlan } from "@/features/programs/types/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { numberToOrdinalWord } from "@/lib/utils";
import { BookOpen, Clock, Layers } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export const ProgramStudyPlan = ({ program }: { program: Program }) => {
  if (!program.studyPlans || program.studyPlans.length === 0) {
    return (
      <div className="text-center py-20 border rounded-2xl border-dashed text-muted-foreground bg-muted/10">
        <Layers className="h-8 w-8 mx-auto mb-3 opacity-20" />
        <p className="text-sm font-medium">
          No study plan information available for this program.
        </p>
      </div>
    );
  }

  const groupedPlans = program.studyPlans.reduce(
    (acc, plan) => {
      const { year, semester } = plan;
      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][semester]) {
        acc[year][semester] = [];
      }

      acc[year][semester].push(plan);

      return acc;
    },
    {} as Record<number, Record<string, StudyPlan[]>>,
  );

  const getSortedKeys = (obj: Record<string, unknown>) =>
    Object.keys(obj)
      .map(Number)
      .sort((a, b) => a - b);

  const years = getSortedKeys(groupedPlans);

  return (
    <section className="py-12 md:py-24">
      <div className="space-y-12">
        <SectionHeader subtitle="Curriculum Structure" title="Study Plan" />

        <Accordion
          type="multiple"
          defaultValue={[years[0]?.toString()]}
          className="space-y-6"
        >
          {years.map((year) => (
            <AccordionItem
              value={year.toString()}
              key={year}
              className="border rounded-2xl px-6 bg-card/30 overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground border">
                    0{year}
                  </div>
                  <span className="text-lg font-semibold tracking-tight">
                    {numberToOrdinalWord(year)} Year
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                  {getSortedKeys(groupedPlans[year]).map((semester) => (
                    <div key={semester} className="space-y-6">
                      <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          Semester {semester}
                        </h4>
                        <span className="text-[10px] font-medium text-muted-foreground/50">
                          {groupedPlans[year][semester].length} Courses
                        </span>
                      </div>

                      <div className="space-y-1">
                        {groupedPlans[year][semester].map((plan) => (
                          <div
                            key={plan.id}
                            className="group grid grid-cols-12 gap-4 py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-3 lg:col-span-2">
                              <span className="text-xs font-mono font-medium text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded">
                                {plan.course?.code || "N/A"}
                              </span>
                            </div>
                            <div className="col-span-7 lg:col-span-8 flex flex-col gap-0.5">
                              <span className="text-base font-medium text-foreground/90 leading-snug">
                                {plan.course?.titleEn || plan.label}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-tight">
                                {plan.course?.titleTh || "-"}
                              </span>
                            </div>
                            <div className="col-span-2 text-right flex flex-col items-end justify-center">
                              <span className="text-base font-bold text-foreground/80">
                                {plan.course?.credits || plan.credit}
                              </span>
                              <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-tighter">
                                Credits
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/20 rounded-xl p-4 flex justify-between items-center border border-dashed">
                        <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground/70 flex items-center gap-2">
                          <BookOpen className="h-3 w-3" />
                          Semester Total
                        </span>
                        <span className="text-base font-black text-foreground/80">
                          {groupedPlans[year][semester].reduce(
                            (sum, p) => sum + (p.course?.credits || p.credit),
                            0,
                          )}{" "}
                          Credits
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
