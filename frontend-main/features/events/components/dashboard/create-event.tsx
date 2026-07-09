"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateEvent } from "../../api/create-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormInput, FormTextarea } from "@/components/form";
import { useRouter } from "next/navigation";

const simpleEventSchema = z.object({
  title: z.string().min(1, "Required"),
  organizer: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

export const CreateEvent = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof simpleEventSchema>>({
    resolver: zodResolver(simpleEventSchema),
    defaultValues: {
      title: "",
      organizer: "",
      location: "",
      description: "",
    },
  });

  const createEventMutation = useCreateEvent({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success("Event created successfully");
        setOpen(false);
        form.reset();
        router.push(`/dashboard/events/${data.id}`);
      },
    },
  });

  const onSubmit = (values: z.infer<typeof simpleEventSchema>) => {
    createEventMutation.mutate({
      data: {
        ...values,
        startsAt: new Date().toISOString(),
        isActive: false,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus size={18} />
          <span>Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the essential details to create a new event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormInput control={form.control} name="title" label="Event Title" />
          <div className="grid grid-cols-2 gap-4">
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
          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
          />
          <DialogFooter>
            <Button type="submit" disabled={createEventMutation.isPending}>
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
