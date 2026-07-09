import { RoleEnum, User } from "@/types/api";

export const isAdmin = (user: User | null | undefined) =>
  user?.role.name === RoleEnum.ADMIN;

export const canCreateArticle = isAdmin;
export const canUpdateArticle = isAdmin;
export const canCreateProgram = isAdmin;
export const canUpdateProgram = isAdmin;
export const canCreateCourse = isAdmin;
export const canUpdateCourse = isAdmin;
export const canCreateAboutSection = isAdmin;
export const canUpdateAboutSection = isAdmin;
export const canCreateTestimonial = isAdmin;
export const canUpdateTestimonial = isAdmin;
export const canCreateProject = isAdmin;
export const canUpdateProject = isAdmin;
export const canCreateAlumni = isAdmin;
export const canUpdateAlumni = isAdmin;
export const canCreateAnnouncement = isAdmin;
export const canUpdateAnnouncement = isAdmin;
