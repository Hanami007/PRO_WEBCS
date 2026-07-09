"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormTextarea } from "@/components/form";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet, Field } from "@/components/ui/field";

import {
  updateResourceInputSchema,
  useUpdateResource,
} from "../../api/update-resource";
import { Resource } from "../../types/api";

export const UpdateResourceInfoForm = ({
  resource,
}: {
  resource: Resource;
}) => {
  const updateResourceMutation = useUpdateResource({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Resource has been updated.");
      },
    },
  });

  const form = useForm<z.infer<typeof updateResourceInputSchema>>({
    resolver: zodResolver(updateResourceInputSchema),
    values: {
      key: resource?.key,
      value: resource?.value || "",
      description: resource?.description || "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateResourceInputSchema>) => {
    updateResourceMutation.mutate({ data: values, resourceId: resource.id });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FormInput
            control={form.control}
            name="key"
            label="Name"
            description="This is a unique key for identifying resources"
          />
          <FormInput
            control={form.control}
            name="value"
            label="Value"
            description="The actual value that will be used"
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            description="A note of what this resources is used for"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateResourceMutation.isPending}>
            {updateResourceMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
