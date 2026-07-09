import { Entity } from "@/types/api";

export type CourseGroup = {
  id: string;
  name: string;
  credits: number;
  parent: CourseGroup;
  children: CourseGroup[];
};

export type Course = Entity<{
  code: string;
  titleTh: string;
  titleEn: string;
  description: string;
  credits: number;
  lectureHours: number;
  labHours: number;
  selfStudyHours: number;
  isActive: boolean;
}>;
