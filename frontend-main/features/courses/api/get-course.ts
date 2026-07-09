import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@/features/courses/types/api";

export const getCourse = ({ courseId }: { courseId: string }): Promise<Course> => {
  return api.get(`/courses/${courseId}`);
};

export const getCourseQueryOption = (courseId: string) => {
  return {
    queryKey: ["courses", courseId],
    queryFn: () => getCourse({ courseId }),
  };
};

export const useCourse = (courseId: string) => {
  return useQuery(getCourseQueryOption(courseId));
};
