"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateTestimonial,
  UpdateTestimonialInput,
  updateTestimonialInputSchema,
} from "@/features/testimonials/api/update-testimonial";
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
import { Testimonial } from "../../types/api";
import {
  UpdateTestimonialImageInput,
  updateTestimonialImageInputSchema,
  useUpdateTestimonialImage,
} from "../../api/update-testimonial-image";
import { FormCheckbox, FormInput, FormTextarea } from "@/components/form";

export const UpdateTestimonialInfoForm = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  const testimonialId = testimonial.id;

  const updateTestimonialMutation = useUpdateTestimonial({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Testimonial information updated successfully.");
      },
    },
  });

  const form = useForm({
    resolver: zodResolver(updateTestimonialInputSchema),
    defaultValues: {
      authorName: testimonial.authorName,
      authorTitle: testimonial.authorTitle,
      content: testimonial.content,
      isActive: testimonial.isActive,
    },
  });

  const onSubmit = (values: UpdateTestimonialInput) => {
    updateTestimonialMutation.mutate({ data: values, testimonialId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldDescription>Reviewer details.</FieldDescription>

          <FormInput
            control={form.control}
            name="authorName"
            label="Fullname"
          />

          <FormInput
            control={form.control}
            name="authorTitle"
            label="Position"
          />

          <FormTextarea
            control={form.control}
            name="content"
            label="Testimonial Text"
          />

          <FormCheckbox
            control={form.control}
            name="isActive"
            label="Is Active"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export const UploadTestimonialImageForm = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  const testimonialId = testimonial.id;
  const updateTestimonialImageMutation = useUpdateTestimonialImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Image uploaded");
      },
    },
  });

  const form = useForm<UpdateTestimonialImageInput>({
    resolver: zodResolver(updateTestimonialImageInputSchema),
  });

  const onSubmit = (values: UpdateTestimonialImageInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateTestimonialImageMutation.mutate({
        testimonialId,
        file: file,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    {testimonial.image?.url ? (
                      <div className="relative aspect-square w-[328px] mx-auto">
                        <Image
                          src={testimonial.image.url}
                          alt={field.name}
                          fill={true}
                          priority
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square w-[328px]  flex items-center justify-center">
                        <p className="text-sm">No Image</p>
                      </div>
                    )}
                  </FieldContent>
                  <FieldLabel htmlFor={field.name}>Profile Image</FieldLabel>
                  <FieldDescription>
                    Select or Upload a image file
                  </FieldDescription>
                  <Input
                    id={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="file"
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
              <Button type="submit">Upload</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
