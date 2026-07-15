import { AuthResponse, User } from "@/types/api";
import { api } from "./api-client";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";

export const getUser = async (): Promise<User> => {
  const response = (await api.get("/auth/me")) as { data: User };
  return response.data;
};

export const userQueryKey = ["user"];
export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

const logout = (): Promise<void> => {
  return api.post("/auth/logout");
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

export const loginInputSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง").refine(
    (val) =>
      val === "admin@example.com" ||
      val.endsWith("@mju.ac.th") ||
      val.endsWith("@g.mju.ac.th"),
    {
      message: "กรุณาใช้อีเมลมหาวิทยาลัย (@mju.ac.th หรือ @g.mju.ac.th)",
    }
  ),
  password: z.string().min(5, "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post("/auth/login", data);
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

export const changePasswordInputSchema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(5, "Required"),
    confirmNewPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const changePassword = (
  data: ChangePasswordInput,
): Promise<AuthResponse> => {
  const { currentPassword, newPassword } = data;
  return api.post(`/auth/changepassword`, { currentPassword, newPassword });
};

export const useChangePassword = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};
