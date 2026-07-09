"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { useUser } from "@/lib/auth";

import {
  updateUserInputSchema,
  useUpdateUser,
  UpdateUserInput,
} from "../api/update-user";

export const UpdateUserInfoForm = () => {
  const userQuery = useUser();
  const user = userQuery.data;

  const updateUserInfoMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Profile information updated.");
      },
      onError: () => {
        toast.error("Failed to update profile information.");
      },
    },
  });

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserInputSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = (values: UpdateUserInput) => {
    if (!user) return;
    updateUserInfoMutation.mutate({ data: values, id: user.id });
  };

  if (userQuery.isLoading) {
    return (
      <div className="p-4 italic text-muted-foreground">Loading profile...</div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FieldGroup>
        <FieldSet>
          <FormInput control={form.control} name="name" label="Full Name" />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save Changes</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default UpdateUserInfoForm;
