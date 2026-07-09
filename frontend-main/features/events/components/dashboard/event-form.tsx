"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import { FormInput, FormTextarea, FormCheckbox } from "@/components/form";
import {
  createEventInputSchema,
  CreateEventInput,
} from "../../api/create-event";
import { Spinner } from "@/components/ui/spinner";

type EventFormProps = {
  onSubmit: (values: CreateEventInput) => void;
  defaultValues?: Partial<CreateEventInput>;
  isPending: boolean;
  submitLabel: string;
};

export const EventForm = ({
  onSubmit,
  defaultValues,
  isPending,
  submitLabel,
}: EventFormProps) => {
  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventInputSchema),
    defaultValues: {
      title: "",
      description: "",
      organizer: "",
      location: "",
      startsAt: new Date().toISOString().split("T")[0],
      isActive: true,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Information</FieldLegend>
          <FieldDescription>Basic details about the event.</FieldDescription>

          <FormInput control={form.control} name="title" label="Title" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="organizer"
              label="Organizer"
            />
            <FormInput
              control={form.control}
              name="location"
              label="Location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={form.control}
              name="startsAt"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Start Date</FieldLabel>
                  <Input type="datetime-local" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="endsAt"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>End Date (Optional)</FieldLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Content</FieldLegend>
          <FieldDescription>Detailed description and links.</FieldDescription>

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
          />

          <FormInput
            control={form.control}
            name="externalLink"
            label="External Link (Registration)"
          />
        </FieldSet>

        <FieldSet>
          <FieldLegend>Settings</FieldLegend>
          <FormCheckbox
            control={form.control}
            name="isActive"
            label="Active Status"
            description="Visible on public pages when active"
          />
        </FieldSet>
      </FieldGroup>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="min-w-[120px]"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
};
