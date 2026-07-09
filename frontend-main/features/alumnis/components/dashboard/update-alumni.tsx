"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateAlumniInputSchema,
  useUpdateAlumni,
  UpdateAlumniInput,
} from "../../api/update-alumni";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alumni } from "../../types/api";
import { useAlumni } from "../../api/get-alumni";
import {
  UpdateAlumniImageInput,
  updateAlumniImageInputSchema,
  useUpdateAlumniImage,
} from "../../api/update-alumni-image";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FormInput, FormNumber, FormTextarea } from "@/components/form";
import { DeleteAlumni } from "./delete-alumni";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeftIcon, InfoIcon, Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/auth";
import { canUpdateAlumni } from "@/lib/authorization";

type EditAlumniProps = {
  alumniId: string;
};

const UpdateAlumniInfoForm = ({ alumni }: { alumni: Alumni }) => {
  const updateAlumniMutation = useUpdateAlumni({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Alumni information updated successfully.");
      },
    },
  });

  const form = useForm<UpdateAlumniInput>({
    resolver: zodResolver(updateAlumniInputSchema),
    defaultValues: {
      fullName: alumni.fullName || "",
      cohort: alumni.cohort || "",
      workplace: alumni.workplace || "",
      position: alumni.position || "",
      quote: alumni.quote || "",
    },
  });

  const onSubmit = (values: UpdateAlumniInput) => {
    updateAlumniMutation.mutate({ data: values, id: alumni.id });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldDescription>
            Personal details and graduation info.
          </FieldDescription>

          <FormInput control={form.control} name="fullName" label="Fullname" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="workplace"
              label="Workplace"
            />
            <FormInput
              control={form.control}
              name="position"
              label="Position"
            />
          </div>

          <FormNumber
            control={form.control}
            name="cohort"
            label="ศิษย์เก่ารุ่นที่"
          />

          <FormTextarea control={form.control} name="quote" label="Quote" />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateAlumniMutation.isPending}>
            {updateAlumniMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

const UploadAlumniImageForm = ({ alumni }: { alumni: Alumni }) => {
  const alumniId = alumni.id;
  const updateAlumniImageMutation = useUpdateAlumniImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Image uploaded");
      },
    },
  });

  const form = useForm<UpdateAlumniImageInput>({
    resolver: zodResolver(updateAlumniImageInputSchema),
  });

  const onSubmit = (values: UpdateAlumniImageInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateAlumniImageMutation.mutate({
        alumniId,
        file: file,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Profile Picture</FieldLegend>
            <FieldDescription>Update alumni profile image</FieldDescription>

            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent className="mb-4">
                    {alumni.profileImage?.url ? (
                      <div className="relative aspect-4/3 w-[328px]">
                        <Image
                          src={alumni.profileImage.url}
                          alt={field.name}
                          fill={true}
                          priority
                          className="object-cover rounded-md border shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square w-[328px] border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-sm">No Image</p>
                      </div>
                    )}
                  </FieldContent>
                  <FieldLabel htmlFor={field.name}>File Input</FieldLabel>
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
              <Button
                type="submit"
                disabled={updateAlumniImageMutation.isPending}
              >
                {updateAlumniImageMutation.isPending
                  ? "Uploading..."
                  : "Upload Image"}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

const AlumniControlForm = ({ alumniId }: { alumniId: string }) => {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Alumni Control</FieldLegend>
        <FieldDescription>
          Delete this alumni record. This action cannot be undone.
        </FieldDescription>

        <Field orientation="horizontal">
          <FieldLabel>Delete this record?</FieldLabel>
          <DeleteAlumni id={alumniId} />
        </Field>
      </FieldSet>
    </FieldGroup>
  );
};

const UpdateAlumni = ({ alumniId }: EditAlumniProps) => {
  const router = useRouter();
  const alumniQuery = useAlumni(alumniId);

  const user = useUser();

  if (!canUpdateAlumni(user?.data)) {
    return null;
  }

  const alumni = alumniQuery?.data;

  if (alumniQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!alumni) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Alumni not found.</p>
        <Button
          variant="link"
          onClick={() => router.push(paths.dashboard.alumnis.getHref())}
        >
          Back to Alumni List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push(paths.dashboard.alumnis.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Alumni List
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Alumni</p>
          <p className="text-muted-foreground text-sm">
            Update profile and workplace information.
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info" className="gap-2">
            <InfoIcon className="w-4 h-4" />
            Information
          </TabsTrigger>
          <TabsTrigger value="control" className="gap-2">
            <Settings2Icon className="w-4 h-4" />
            Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6 space-y-8">
          <UpdateAlumniInfoForm alumni={alumni} />
          <Separator />
          <UploadAlumniImageForm alumni={alumni} />
        </TabsContent>

        <TabsContent value="control" className="py-6">
          <AlumniControlForm alumniId={alumni.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateAlumni;
