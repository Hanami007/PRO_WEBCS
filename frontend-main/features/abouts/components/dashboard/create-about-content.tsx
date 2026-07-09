"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateAboutContent } from "../../api/create-about-content";
import { Plus } from "lucide-react";
import { aboutContentLayoutEnum } from "../../types/api";

type CreateAboutContentProps = {
  aboutSectionId: string;
};

export const CreateAboutContent = ({
  aboutSectionId,
}: CreateAboutContentProps) => {
  const createAboutContentMutation = useCreateAboutContent({
    aboutSectionId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Content created.");
      },
    },
  });

  const onCreate = () => {
    createAboutContentMutation.mutate({
      data: {
        section: { id: aboutSectionId },
        layoutType: aboutContentLayoutEnum.TEXT,
      },
    });
  };

  return (
    <Button onClick={onCreate}>
      <Plus />
      New Content
    </Button>
  );
};
