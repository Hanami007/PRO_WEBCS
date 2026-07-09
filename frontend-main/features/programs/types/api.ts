import { Entity } from "@/types/api";

export type Program = Entity<{
  code: string;
  nameTh: string;
  nameEn: string;
  degreeThFull: string;
  degreeEnFull: string;
  degreeTh: string;
  degreeEn: string;
  credits: number;
  revision: string;
  duration: string;
  languages: string;
  tqf: string;
  isCurrent: boolean;
  isActive: boolean;
  studyPlans: StudyPlan[];
  programCourses: ProgramCourse[];
}>;

export type StudyPlan = Entity<{
  program: Program;
  course: Course;
  label: string;
  year: number;
  semester: number;
  credit: number;
}>;

export type CourseGroup = {
  id: string;
  name: string;
  credits: number;
  parent: CourseGroup;
  children: CourseGroup[];
};

export type ProgramCourse = Entity<{
  program: Program;
  course: Course;
  group: CourseGroup;
}>;

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
