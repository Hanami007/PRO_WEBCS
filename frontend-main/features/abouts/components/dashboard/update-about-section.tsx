"use client";

import React from "react";
import { useAboutSection } from "../../api/get-about-section";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import { FormInput, FormNumber } from "@/components/form";
import {
  UpdateAboutSectionInput,
  updateAboutSectionInputSchema,
  useUpdateAboutSection,
} from "../../api/update-about-section";
import { AboutSection } from "../../types/api";
import DeleteAboutSection from "./delete-about-section";
import {
  InfoIcon,
  LayoutGridIcon,
  Settings2Icon,
  ArrowLeftIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import AboutContentForm from "./about-content-form";

type UpdateAboutSectionProps = {
  aboutSectionId: string;
};

const UpdateAboutSectionInfoForm = ({
  aboutSection,
}: {
  aboutSection: AboutSection;
}) => {
  const aboutSectionId = aboutSection.id;
  const updateMutation = useUpdateAboutSection({
    mutationConfig: {
      onSuccess: () => {
        toast.success("About Section Info updated.");
      },
    },
  });

  const form = useForm<UpdateAboutSectionInput>({
    resolver: zodResolver(updateAboutSectionInputSchema),
    defaultValues: {
      title: aboutSection.title,
      sortOrder: aboutSection.sortOrder,
    },
  });

  const onSubmit = (values: UpdateAboutSectionInput) => {
    updateMutation.mutate({ data: values, aboutSectionId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Information</FieldLegend>
          <FieldDescription>
            Basic information about this section.
          </FieldDescription>

          <FormInput control={form.control} name="title" label="Title" />

          <FormNumber
            control={form.control}
            name="sortOrder"
            label="Sort Order"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

const AboutSectionControlForm = ({
  aboutSectionId,
}: {
  aboutSectionId: string;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const router = useRouter();

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Section Control</FieldLegend>
        <FieldDescription>
          Delete your about section. This action cannot be undone.
        </FieldDescription>

        <Field orientation="horizontal">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Delete Section</span>
            <span className="text-xs text-muted-foreground">
              This action cannot be undone.
            </span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </Field>
      </FieldSet>

      <DeleteAboutSection
        id={aboutSectionId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={() => router.push(paths.dashboard.abouts.getHref())}
      />
    </FieldGroup>
  );
};

const UpdateAboutSection = ({ aboutSectionId }: UpdateAboutSectionProps) => {
  const router = useRouter();
  const aboutSectionQuery = useAboutSection(aboutSectionId);
  const aboutSection = aboutSectionQuery.data;

  if (!aboutSection) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
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
          onClick={() => router.push(paths.dashboard.abouts.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Sections
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit About Section</p>
          <p className="text-muted-foreground">
            Manage and edit your about section details and content blocks.
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info" className="gap-2">
            <InfoIcon className="w-4 h-4" />
            Information
          </TabsTrigger>
          <TabsTrigger value="contents" className="gap-2">
            <LayoutGridIcon className="w-4 h-4" />
            Contents
          </TabsTrigger>
          <TabsTrigger value="control" className="gap-2">
            <Settings2Icon className="w-4 h-4" />
            Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6 lg:max-w-xl">
          <UpdateAboutSectionInfoForm aboutSection={aboutSection} />
        </TabsContent>

        <TabsContent value="contents" className="py-6">
          <AboutContentForm sectionId={aboutSectionId} />
        </TabsContent>

        <TabsContent value="control" className="py-6 lg:max-w-xl">
          <AboutSectionControlForm aboutSectionId={aboutSection.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateAboutSection;
