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
import { canCreateArticle } from "@/lib/authorization";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  createArticleInputSchema,
  useCreateArticle,
} from "../../api/create-article";

export const CreateArticle = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof createArticleInputSchema>>({
    resolver: zodResolver(createArticleInputSchema),
    defaultValues: {
      title: "",
    },
  });

  const createArticleMutation = useCreateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Article has been created.");
        form.reset();
        setIsOpen(false);
      },
    },
  });

  const user = useUser();

  if (!canCreateArticle(user?.data)) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof createArticleInputSchema>) => {
    createArticleMutation.mutate({ data: values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Article</DialogTitle>
          <DialogDescription>Create a new article</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={255}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createArticleMutation.isPending}>
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
