"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, useWatch, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateAnnouncementInput,
  updateAnnouncementInputSchema,
  useUpdateAnnouncement,
} from "../../api/update-announcement";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import DeleteAnnouncement from "./delete-announcement";
import { useState } from "react";
import {
  Announcement,
  AnnouncementStatus,
  AnnouncementType,
} from "../../types/api";
import { useAnnouncement } from "../../api/get-announcement";
import { Separator } from "@/components/ui/separator";
import { SelectItem } from "@/components/ui/select";
import { FormDatePicker, FormInput, FormSelect } from "@/components/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { Spinner } from "@/components/ui/spinner";
import AnnouncementBanner from "../announcement-banner";

type UpdateAnnouncementProps = {
  announcementId: string;
};

const AnnouncementPreview = ({
  control,
  announcement,
}: {
  control: Control<UpdateAnnouncementInput>;
  announcement: Announcement;
}) => {
  const values = useWatch({ control });

  const previewAnnouncement: Announcement = {
    ...announcement,
    ...values,
    publishedAt: values.publishedAt?.toISOString() ?? announcement.publishedAt,
    expiresAt: values.expiresAt?.toISOString() ?? announcement.expiresAt,
  } as Announcement;

  return <AnnouncementBanner announcement={previewAnnouncement} />;
};

const UpdateAnnouncementInfoForm = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  const announcementId = announcement.id;
  const updateAnnouncementMutation = useUpdateAnnouncement({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Announcement information updated.");
      },
    },
  });

  const form = useForm<UpdateAnnouncementInput>({
    resolver: zodResolver(updateAnnouncementInputSchema),
    defaultValues: {
      title: announcement.title,
      description: announcement.description || "",
      link: announcement.link || "",
      linkLabel: announcement.linkLabel || "",
      type: announcement.type,
      status: announcement.status,
      publishedAt: new Date(announcement.publishedAt),
      expiresAt: new Date(announcement.expiresAt),
    },
  });

  const onSubmit = (values: UpdateAnnouncementInput) => {
    updateAnnouncementMutation.mutate({ data: values, announcementId });
  };

  return (
    <div className="space-y-8">
      <FieldSet>
        <FieldLegend>Preview</FieldLegend>
        <FieldDescription>
          How the announcement will look like to users.
        </FieldDescription>
        <div className="border rounded-lg overflow-hidden mt-2 bg-muted/30 p-4">
          <AnnouncementPreview
            control={form.control}
            announcement={announcement}
          />
        </div>
      </FieldSet>

      <Separator />

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Announcement Details</FieldLegend>
            <FieldDescription>
              Update announcement information.
            </FieldDescription>

            <FormInput control={form.control} name="title" label="Title" />

            <FormInput
              control={form.control}
              name="description"
              label="Description"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput control={form.control} name="link" label="Link" />

              <FormInput
                control={form.control}
                name="linkLabel"
                label="Link Label"
                description="A display text for link"
              />
            </div>

            <FormSelect control={form.control} name="type" label="Type">
              <SelectItem value={AnnouncementType.INFO}>Information</SelectItem>
              <SelectItem value={AnnouncementType.NEW_FEATURE}>
                New Feature
              </SelectItem>
              <SelectItem value={AnnouncementType.URGENT}>Urgent</SelectItem>
              <SelectItem value={AnnouncementType.WARNING}>Warning</SelectItem>
            </FormSelect>

            <div className="grid grid-cols-2 gap-4">
              <FormDatePicker
                control={form.control}
                name="publishedAt"
                label="วันเริ่มใช้"
              />

              <FormDatePicker
                control={form.control}
                name="expiresAt"
                label="วันหมดอายุ"
              />
            </div>
          </FieldSet>

          <Field orientation="horizontal">
            <Button
              type="submit"
              disabled={updateAnnouncementMutation.isPending}
            >
              Save Changes
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const AnnouncementControlForm = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  const announcementId = announcement.id;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const updateAnnouncementMutation = useUpdateAnnouncement({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Announcement status updated.");
      },
    },
  });

  const form = useForm<UpdateAnnouncementInput>({
    resolver: zodResolver(updateAnnouncementInputSchema),
    defaultValues: {
      title: announcement.title,
      description: announcement.description || "",
      link: announcement.link || "",
      linkLabel: announcement.linkLabel || "",
      type: announcement.type,
      status: announcement.status,
      publishedAt: new Date(announcement.publishedAt),
      expiresAt: new Date(announcement.expiresAt),
    },
  });

  const onSubmit = (values: UpdateAnnouncementInput) => {
    updateAnnouncementMutation.mutate({ data: values, announcementId });
  };

  return (
    <FieldGroup>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet className="max-w-lg">
          <FieldLegend>Status</FieldLegend>
          <FieldDescription>Update announcement status.</FieldDescription>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <FormSelect control={form.control} name="status" label="Status">
                <SelectItem value={AnnouncementStatus.DRAFT}>Draft</SelectItem>
                <SelectItem value={AnnouncementStatus.PUBLISHED}>
                  Published
                </SelectItem>
                <SelectItem value={AnnouncementStatus.ARCHIVED}>
                  Archived
                </SelectItem>
              </FormSelect>
            </div>
            <Button
              type="submit"
              disabled={updateAnnouncementMutation.isPending}
            >
              Update Status
            </Button>
          </div>
        </FieldSet>
      </form>

      <Separator />

      <FieldSet>
        <FieldLegend>Danger Zone</FieldLegend>
        <FieldDescription>Delete this announcement.</FieldDescription>

        <Field orientation="horizontal" className="max-w-lg">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-medium">Delete Announcement</span>
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

      <DeleteAnnouncement
        id={announcement.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={() => router.push(paths.dashboard.announcements.getHref())}
      />
    </FieldGroup>
  );
};

export const UpdateAnnouncement = ({
  announcementId,
}: UpdateAnnouncementProps) => {
  const router = useRouter();
  const announcementQuery = useAnnouncement({ announcementId });
  const announcement = announcementQuery.data;

  if (announcementQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!announcement) {
    return <div className="p-8 text-destructive">Announcement not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push(paths.dashboard.announcements.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Announcements
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Announcement</p>
          <p className="text-muted-foreground text-sm">
            Update the announcement by providing necessary info.
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6 space-y-8">
          <UpdateAnnouncementInfoForm announcement={announcement} />
        </TabsContent>
        <TabsContent value="control" className="py-6">
          <AnnouncementControlForm announcement={announcement} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
