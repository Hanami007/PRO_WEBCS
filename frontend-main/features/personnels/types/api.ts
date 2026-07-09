import { FileEntity, Entity } from "@/types/api";

export type Personnel = Entity<{
  citizenId: string;
  prefix: string;
  fullnameTh: string;
  fullnameEn: string;
  academicPosition: string;
  administrativePosition: string;
  email: string;
  phoneNumber: string;
  education: string;
  personnelType: string;
  academicType: string;
  profileImage?: FileEntity;
  workStatus: WorkStatus;
  profile: PersonnelProfile;
}>;

export type PersonnelProfile = Entity<{
  bio: string;
  workplace: string;
  skills: string;
  experts: string;
  experiences: string;
  researches: string;
  isPublic: boolean;
}>;

export type WorkStatus = Entity<{
  name: string;
}>;
