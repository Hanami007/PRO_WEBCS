export type BaseEntity = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type PaginatedParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  filter?: string;
  [key: string]: string | number | undefined;
};

export type FileEntity = {
  id: string;
  path: string;
  url: string;
  filename: string;
  createdAt: number;
};

export type AuthResponse = {
  message: string;
};

export enum RoleEnum {
  USER = "user",
  ADMIN = "admin",
}

export type Role = {
  id: string;
  name: string;
};

export type User = Entity<{
  id: string;
  name: string;
  email: string;
  role: Role;
  photo?: FileEntity;
}>;

export type Session = Entity<{
  ip: string;
  userAgent: string;
  isCurrent: boolean;
}>;
