"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteArticleThumbnail } from "../../api/delete-article-thumbnail";

const ResetArticleThumbnail = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const deleteArticleMutation = useDeleteArticleThumbnail({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Thumbnail reset");
      },
    },
  });
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() => deleteArticleMutation.mutate({ articleId: id })}
    >
      Reset
    </Button>
  );
};

export default ResetArticleThumbnail;
