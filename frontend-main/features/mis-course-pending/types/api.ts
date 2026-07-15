import { Entity } from "@/types/api";

export type CoursePendingStatus = "pending" | "in_progress" | "resolved";

export type MisCoursePending = Entity<{
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  subjectType: string;
  advisor?: string;
  reason: string;
  status: CoursePendingStatus;
}>;
