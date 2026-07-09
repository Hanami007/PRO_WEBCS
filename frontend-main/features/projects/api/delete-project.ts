import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteProject = ({ id }: { id: string }) => {
  return api.delete(`/projects/${id}`);
};

export const useDeleteProject = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      onSuccess?.();
    },
    mutationFn: deleteProject,
  });
};