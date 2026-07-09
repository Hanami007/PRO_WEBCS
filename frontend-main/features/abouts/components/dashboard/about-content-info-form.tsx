"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormInput, FormTextarea } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  UpdateAboutContentInput,
  updateAboutContentInputSchema,
  useUpdateAboutContent,
} from "../../api/update-about-content";
import { Spinner } from "@/components/ui/spinner";
import { AboutContent, aboutContentLayoutEnum } from "../../types/api";

type AboutContentInfoFormProps = {
  content: AboutContent;
  onSuccess?: () => void;
};

export const AboutContentInfoForm = ({
  content,
  onSuccess,
}: AboutContentInfoFormProps) => {
  const updateMutation = useUpdateAboutContent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Content updated successfully");
        onSuccess?.();
      },
    },
  });

  const form = useForm<UpdateAboutContentInput>({
    resolver: zodResolver(updateAboutContentInputSchema),
    defaultValues: {
      title: content?.title,
      body: content?.body || "",
      layoutType: content?.layoutType || aboutContentLayoutEnum.TEXT,
      sortOrder: content?.sortOrder,
    },
  });

  const onSubmit = (values: UpdateAboutContentInput) => {
    updateMutation.mutate({
      aboutContentId: content.id,
      data: values,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        control={form.control}
        name="title"
        label="Block Title (Optional)"
      />
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
        <FormTextarea
          control={form.control}
          name="body"
          label="Content Text"
        />
        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm" disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Spinner className="mr-2 h-4 w-4" />}
            Save Block
          </Button>
        </div>
      </div>
    </form>
  );
};
