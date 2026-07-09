"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useUser } from "@/lib/auth";
import { toast } from "sonner";
import { canCreateAboutSection } from "@/lib/authorization";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form";
import {
  createAboutSectionInputSchema,
  useCreateAboutSection,
} from "../../api/create-about-section";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateAboutSection = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof createAboutSectionInputSchema>>({
    resolver: zodResolver(createAboutSectionInputSchema),
    defaultValues: {
      title: "",
    },
  });

  const createAboutSectionMutation = useCreateAboutSection({
    mutationConfig: {
      onSuccess: () => {
        toast.success("About Section has been created.");
        form.reset();
        setIsOpen(false);
        router.refresh();
      },
    },
  });

  const user = useUser();

  if (!canCreateAboutSection(user?.data)) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof createAboutSectionInputSchema>) => {
    createAboutSectionMutation.mutate({ data: values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New About Section</DialogTitle>
          <DialogDescription>Create a new about section</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={form.control} name="title" label="Title" />
          <DialogFooter>
            <Button
              type="submit"
              disabled={createAboutSectionMutation.isPending}
            >
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
