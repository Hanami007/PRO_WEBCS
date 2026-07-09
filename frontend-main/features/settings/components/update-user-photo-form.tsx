"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/auth";

import {
  updateUserPhotoInputSchema,
  useUpdateUserPhoto,
  UpdateUserPhotoInput,
} from "../api/update-user-photo";

export const UpdateUserPhotoForm = () => {
  const userQuery = useUser();
  const user = userQuery.data;

  const updateUserPhotoMutation = useUpdateUserPhoto({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Profile photo updated.");
      },
      onError: () => {
        toast.error("Failed to update profile photo.");
      },
    },
  });

  const form = useForm<UpdateUserPhotoInput>({
    resolver: zodResolver(updateUserPhotoInputSchema),
  });

  const onSubmit = (values: UpdateUserPhotoInput) => {
    const { file } = values;

    if (!user) return;

    if (file instanceof File || file == null) {
      updateUserPhotoMutation.mutate({
        userId: user.id,
        file: file,
      });
    }
  };

  if (userQuery.isLoading) {
    return (
      <div className="p-4 italic text-muted-foreground">Loading photo...</div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Profile Photo</FieldLegend>
          <FieldDescription>
            This is how you will be recognized across the platform.
          </FieldDescription>

          <Controller
            control={form.control}
            name="file"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <div className="relative aspect-square w-[200px] overflow-hidden rounded-full border border-border">
                    {user.photo?.url ? (
                      <Image
                        src={user.photo.url}
                        alt={user.name}
                        fill
                        priority
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <p className="text-xs text-muted-foreground">
                          No Photo
                        </p>
                      </div>
                    )}
                  </div>
                </FieldContent>
                <FieldLabel htmlFor={field.name}>Change Photo</FieldLabel>
                <Input
                  id={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="file"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field orientation="horizontal">
            <Button type="submit">Upload</Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default UpdateUserPhotoForm;
