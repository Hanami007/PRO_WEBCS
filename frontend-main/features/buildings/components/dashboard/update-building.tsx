"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import {
  updateBuildingInputSchema,
  useUpdateBuilding,
  UpdateBuildingInput,
} from "../../api/update-building";
import {
  UpdateBuildingImageInput,
  updateBuildingImageInputSchema,
  useUpdateBuildingImage,
} from "../../api/update-building-image";
import { Building } from "@/features/buildings/types/api";
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
import Image from "next/image";
import { FormInput } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";

export const UpdateBuildingInfoForm = ({
  building,
}: {
  building: Building;
}) => {
  const updateBuildingMutation = useUpdateBuilding({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Building information updated successfully.");
      },
      onError: () => {
        toast.error("Failed to update information.");
      },
    },
  });

  const form = useForm<Omit<UpdateBuildingInput, "id">>({
    resolver: zodResolver(updateBuildingInputSchema),
    defaultValues: {
      name: building.name,
    },
  });

  const onSubmit = (values: Omit<UpdateBuildingInput, "id">) => {
    updateBuildingMutation.mutate({
      data: values,
      id: building.id,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FormInput control={form.control} name="name" label="Building Name" />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateBuildingMutation.isPending}>
            Save Changes
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export const UpdateBuildingImageForm = ({
  building,
}: {
  building: Building;
}) => {
  const updateBuildingImageMutation = useUpdateBuildingImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Image uploaded");
      },
      onError: () => {
        toast.error("Failed to upload image.");
      },
    },
  });

  const form = useForm<UpdateBuildingImageInput>({
    resolver: zodResolver(updateBuildingImageInputSchema),
  });

  const onSubmit = (values: UpdateBuildingImageInput) => {
    const { file } = values;

    if (file instanceof File) {
      updateBuildingImageMutation.mutate({
        id: building.id,
        file: file,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Building Image</FieldLegend>
            <FieldDescription>Select or upload an image file.</FieldDescription>
            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent className="mb-4">
                    {building.image?.url ? (
                      <div className="relative aspect-video w-full mx-auto">
                        <Image
                          src={building.image.url}
                          alt={building.name}
                          fill={true}
                          priority
                          className="object-cover rounded-md border shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full mx-auto bg-muted flex items-center justify-center rounded-md border-2 border-dashed">
                        <p className="text-muted-foreground text-sm font-medium">
                          No Image Uploaded
                        </p>
                      </div>
                    )}
                  </FieldContent>
                  <FieldLabel htmlFor={field.name}>File Input</FieldLabel>
                  <Input
                    id={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="file"
                    accept="image/*"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button
                type="submit"
                disabled={updateBuildingImageMutation.isPending}
              >
                Upload Image
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
