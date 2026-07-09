"use client";

import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { FormInput, FormTextarea, FormCheckbox } from "@/components/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";

import { useEvent } from "../../api/get-event";
import {
  useUpdateEvent,
  UpdateEventInput,
  updateEventInputSchema,
} from "../../api/update-event";
import { useUpdateEventPoster } from "../../api/update-event-poster";
import { Event } from "../../types/api";
import { DeleteEvent } from "./delete-event";

type UpdateEventProps = {
  eventId: string;
};

const UploadEventPosterForm = ({ event }: { event: Event }) => {
  const eventId = event.id;
  const updateEventPosterMutation = useUpdateEventPoster({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Poster uploaded");
      },
    },
  });

  const form = useForm<{ file: File | null }>({});

  const onSubmit = (values: { file: File | null }) => {
    updateEventPosterMutation.mutate({
      eventId,
      file: values.file,
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Poster</FieldLegend>
            <FieldDescription>
              Select or Upload a poster image for your event
            </FieldDescription>

            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent className="mb-4">
                    {event.poster?.url ? (
                      <div className="relative aspect-video w-full max-w-[400px]">
                        <Image
                          src={event.poster.url}
                          alt="Poster"
                          fill={true}
                          sizes="400px"
                          priority
                          className="object-cover rounded-md border shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full max-w-[400px] border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className=" text-sm font-medium">
                          No Poster Uploaded
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
                    className="max-w-[400px]"
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
                disabled={updateEventPosterMutation.isPending}
              >
                {updateEventPosterMutation.isPending ? (
                  <>
                    <Spinner className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

const UpdateEventInfoForm = ({ event }: { event: Event }) => {
  const eventId = event.id;

  const updateEventMutation = useUpdateEvent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Event Information updated.");
      },
    },
  });

  const formatForInput = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const form = useForm<UpdateEventInput>({
    resolver: zodResolver(updateEventInputSchema),
    defaultValues: {
      title: event.title || "",
      organizer: event.organizer || "",
      location: event.location || "",
      startsAt: formatForInput(event.startsAt),
      endsAt: formatForInput(event.endsAt),
      externalLink: event.externalLink || "",
    },
  });

  const onSubmit = (values: UpdateEventInput) => {
    updateEventMutation.mutate({ data: values, eventId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Essential details about the event.
            </FieldDescription>

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
                    <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                    <Input
                      type="datetime-local"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
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
                    <FieldLabel htmlFor={field.name}>
                      End Date (Optional)
                    </FieldLabel>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value || ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <FormInput
              control={form.control}
              name="externalLink"
              label="External Link (Registration)"
            />
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={updateEventMutation.isPending}>
              {updateEventMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const UpdateEventDescriptionForm = ({ event }: { event: Event }) => {
  const eventId = event.id;

  const form = useForm<UpdateEventInput>({
    resolver: zodResolver(updateEventInputSchema),
    defaultValues: {
      title: event.title || "",
      description: event.description || "",
    },
  });

  const updateMutation = useUpdateEvent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Description updated");
      },
    },
  });

  const onSubmit = (values: UpdateEventInput) => {
    updateMutation.mutate({ data: values, eventId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Content Editor</FieldLegend>
            <FieldDescription>
              Write a detailed description for the event.
            </FieldDescription>

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
            />
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const EventControlForm = ({ event }: { event: Event }) => {
  const eventId = event.id;

  const updateEventMutation = useUpdateEvent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Visibility updated.");
      },
    },
  });

  const form = useForm<UpdateEventInput>({
    resolver: zodResolver(updateEventInputSchema),
    defaultValues: {
      title: event.title,
      isActive: event.isActive,
    },
  });

  const onSubmit = (values: UpdateEventInput) => {
    updateEventMutation.mutate({ data: values, eventId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Visibility Settings</FieldLegend>
            <FieldDescription>
              Manage if the event should be visible on the public website.
            </FieldDescription>
            <FormCheckbox
              control={form.control}
              name="isActive"
              label="Active Status"
              description="Visible on public pages when active"
            />
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={updateEventMutation.isPending}>
              {updateEventMutation.isPending ? "Saving..." : "Save Visibility"}
            </Button>
          </Field>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Event Control</FieldLegend>
            <FieldDescription>Permanently delete this event.</FieldDescription>

            <Field orientation="horizontal">
              <FieldLabel>Delete this event?</FieldLabel>
              <DeleteEvent id={eventId} />
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export const UpdateEvent = ({ eventId }: UpdateEventProps) => {
  const router = useRouter();
  const eventQuery = useEvent(eventId);

  if (eventQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const event = eventQuery.data;

  if (!event) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Event not found
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
          onClick={() => router.push(paths.dashboard.events.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Event</p>
          <p className="text-muted-foreground text-sm">
            Update activity details and schedule.
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="content">Description</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6 space-y-8">
          <UpdateEventInfoForm event={event} />
          <Separator />
          <UploadEventPosterForm event={event} />
        </TabsContent>

        <TabsContent value="content" className="py-6">
          <UpdateEventDescriptionForm event={event} />
        </TabsContent>

        <TabsContent value="control" className="py-6">
          <EventControlForm event={event} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
