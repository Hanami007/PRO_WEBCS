"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateContactInputSchema,
  useUpdateContact,
  UpdateContactInput,
} from "../../api/update-contact";
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
import { Contact, CONTACT_TYPES } from "../../types/api";
import {
  UpdateContactImageInput,
  updateContactImageInputSchema,
  useUpdateContactImage,
} from "../../api/update-contact-image";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import {
  FormCheckbox,
  FormInput,
  FormNumber,
  FormSelect,
  FormTextarea,
} from "@/components/form";

export const UpdateContactInfoForm = ({ contact }: { contact: Contact }) => {
  const contactId = contact.id;
  const updateContactMutation = useUpdateContact({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Contact information updated.");
      },
    },
  });

  const form = useForm<UpdateContactInput>({
    resolver: zodResolver(updateContactInputSchema),
    defaultValues: {
      title: contact.title,
      description: contact.description || "",
      type: contact.type,
      value: contact.value,
      label: contact.label || "",
      sortOrder: contact.sortOrder,
      isActive: contact.isActive,
    },
  });

  const onSubmit = (values: UpdateContactInput) => {
    updateContactMutation.mutate({ data: values, id: contactId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Contact Details</FieldLegend>
          <FieldDescription>Update contact information.</FieldDescription>

          <div className="grid grid-cols-2 gap-4">
            <FormInput control={form.control} name="title" label="Title" />

            <FormSelect control={form.control} name="type" label="Contact Type">
              {CONTACT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </FormSelect>
          </div>

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
          />

          <FormInput control={form.control} name="value" label="Value" />

          <FormInput control={form.control} name="label" label="Label" />

          <FormNumber control={form.control} name="sortOrder" label="Order" />

          <FormCheckbox
            control={form.control}
            name="isActive"
            label="Is Active"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateContactMutation.isPending}>
            {updateContactMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export const UploadContactImageForm = ({ contact }: { contact: Contact }) => {
  const contactId = contact.id;
  const updateContactImageMutation = useUpdateContactImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Image uploaded");
      },
    },
  });

  const form = useForm<UpdateContactImageInput>({
    resolver: zodResolver(updateContactImageInputSchema),
  });

  const onSubmit = (values: UpdateContactImageInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateContactImageMutation.mutate({
        contactId,
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
                    {contact.image?.url ? (
                      <div className="relative aspect-square w-[328px] mx-auto">
                        <Image
                          src={contact.image.url}
                          alt={field.name}
                          fill={true}
                          priority
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square mx-auto bg-muted w-[328px] flex items-center justify-center">
                        <p className=" text-sm">No Image</p>
                      </div>
                    )}
                  </FieldContent>
                  <FieldLabel htmlFor={field.name}>Custom Image</FieldLabel>
                  <FieldDescription>
                    Select an image to be display when this contact is shown to
                    the user.
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
