"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCarouselInputSchema,
  useUpdateCarousel,
  UpdateCarouselInput,
} from "@/features/carousels/api/update-carousel";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  UpdateCarouselImageInput,
  updateCarouselImageInputSchema,
  useUpdateCarouselImage,
} from "../../api/update-carousel-image";
import {
  FormCheckbox,
  FormInput,
  FormNumber,
  FormTextarea,
} from "@/components/form";
import { FileUploadField } from "@/features/files/components/file-upload-field";
import { Carousel } from "../../types/api";

export const UpdateCarouselInfoForm = ({
  carousel,
}: {
  carousel: Carousel;
}) => {
  const carouselId = carousel.id;
  const updateCarouselMutation = useUpdateCarousel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Carousel information updated.");
      },
    },
  });

  const form = useForm<UpdateCarouselInput>({
    resolver: zodResolver(updateCarouselInputSchema),
    defaultValues: {
      title: carousel.title,
      description: carousel.description || "",
      sortOrder: carousel.sortOrder,
      isActive: carousel.isActive,
    },
  });

  const onSubmit = (values: UpdateCarouselInput) => {
    updateCarouselMutation.mutate({ data: values, carouselId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldDescription>Slide details.</FieldDescription>

          <FormInput control={form.control} name="title" label="Title" />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormNumber control={form.control} name="sortOrder" label="Order" />
          </div>

          <FormCheckbox
            control={form.control}
            name="isActive"
            label="Is Active"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateCarouselMutation.isPending}>
            Save Changes
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export const UploadCarouselImageForm = ({
  carousel,
}: {
  carousel: Carousel;
}) => {
  const carouselId = carousel.id;
  const updateCarouselImageMutation = useUpdateCarouselImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Image uploaded");
      },
    },
  });

  const form = useForm<UpdateCarouselImageInput>({
    resolver: zodResolver(updateCarouselImageInputSchema),
  });

  const onSubmit = (values: UpdateCarouselImageInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateCarouselImageMutation.mutate({
        carouselId,
        file: file,
      });
    }
  };

  return (
    <div className="max-w-xl">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <FileUploadField
                  onFileChange={field.onChange}
                  initialPreview={carousel.image?.url}
                  error={fieldState.error?.message}
                  label="Image"
                  description="Select or Upload an image file"
                  legend="Carousel Image"
                  previewVariant="video"
                />
              )}
            />

            <Field orientation="horizontal">
              <Button
                type="submit"
                disabled={updateCarouselImageMutation.isPending}
              >
                {updateCarouselImageMutation.isPending
                  ? "Uploading..."
                  : "Upload"}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
