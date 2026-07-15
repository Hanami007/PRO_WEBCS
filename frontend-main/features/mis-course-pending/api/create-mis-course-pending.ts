import { api } from "@/lib/api-client";
import z from "zod";
import { MisCoursePending } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const createMisCoursePendingInputSchema = z.object({
  studentId: z.string().min(1, "กรุณากรอกรหัสนักศึกษา"),
  studentName: z.string().min(2, "กรุณากรอกชื่อ-นามสกุล"),
  courseCode: z.string().min(2, "กรุณากรอกรหัสวิชา"),
  courseName: z.string().min(2, "กรุณากรอกชื่อวิชา"),
  subjectType: z.string().min(1, "กรุณาเลือกประเภทรายวิชา"),
  advisor: z.string().optional(),
  reason: z.string().min(1, "กรุณาระบุเหตุผลในการยื่นคำร้อง"),
});

export type CreateMisCoursePendingInput = z.infer<typeof createMisCoursePendingInputSchema>;

export const createMisCoursePending = ({
  data,
}: {
  data: CreateMisCoursePendingInput;
}): Promise<MisCoursePending> => {
  return api.post("/mis-course-pending", data);
};

type UseOptions = {
  mutationConfig?: MutationConfig<typeof createMisCoursePending>;
};

export const useCreateMisCoursePending = ({ mutationConfig }: UseOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: createMisCoursePending,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
  });
};
