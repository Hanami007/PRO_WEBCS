"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTestimonialInputSchema,
  useCreateTestimonial,
  CreateTestimonialInput,
} from "@/features/testimonials/api/create-testimonial";
import { FieldGroup } from "@/components/ui/field";
import { useUser } from "@/lib/auth";
import { canCreateTestimonial } from "@/lib/authorization";
import { FormInput, FormTextarea } from "@/components/form";

export const CreateTestimonial = () => {
  const [open, setOpen] = useState(false);
  const createTestimonialMutation = useCreateTestimonial({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Testimonial created successfully.");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to create testimonial.");
      },
    },
  });

  const form = useForm<CreateTestimonialInput>({
    resolver: zodResolver(createTestimonialInputSchema),
    defaultValues: {
      authorName: "",
      authorTitle: "",
      content: "",
      isActive: true,
    },
  });

  const user = useUser();

  if (!canCreateTestimonial(user?.data)) {
    return null;
  }

  const onSubmit = (values: CreateTestimonialInput) => {
    createTestimonialMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Testimonial</DialogTitle>
          <DialogDescription>Add a new review.</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormInput
                control={form.control}
                name="authorName"
                label="Name"
                description="The person giving the testimonial"
              />

              <FormInput
                control={form.control}
                name="authorTitle"
                label="Title / Role"
                description="Their job title, company, or relevant context (e.g., 'Marketing Manager at Acme Corp')"
              />

              <FormTextarea
                control={form.control}
                name="content"
                label="Content"
                description="A short quote from a student sharing their positive experience"
              />
            </FieldGroup>
            <DialogFooter>
              <Button
                type="submit"
                disabled={createTestimonialMutation.isPending}
              >
                Create
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
