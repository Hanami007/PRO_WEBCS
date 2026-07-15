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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Upload } from "lucide-react";
import {
  createArticleInputSchema,
  useCreateArticle,
} from "../../api/create-article";
import { uploadFile } from "@/features/files/api/upload-file";
import { Spinner } from "@/components/ui/spinner";

export const CreateArticle = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof createArticleInputSchema>>({
    resolver: zodResolver(createArticleInputSchema),
    defaultValues: {
      title: "",
      category: "",
      link: "",
      content: "",
      published: false,
    },
  });

  const createArticleMutation = useCreateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Article has been created.");
        form.reset();
        setThumbnailFile(null);
        setIsOpen(false);
      },
    },
  });

  const user = useUser();

  if (!canCreateArticle(user?.data)) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof createArticleInputSchema>) => {
    setIsSubmitting(true);
    try {
      let thumbnailPayload = undefined;

      if (thumbnailFile) {
        // Upload thumbnail first
        const uploadedFile = await uploadFile({
          file: thumbnailFile,
          prefix: "articles",
        });
        thumbnailPayload = {
          id: uploadedFile.id,
          path: uploadedFile.path,
        };
      }

      await createArticleMutation.mutateAsync({
        data: {
          ...values,
          thumbnail: thumbnailPayload,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        form.reset();
        setThumbnailFile(null);
      }
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Article</DialogTitle>
          <DialogDescription>Create a new article with all details</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-h-[65vh] overflow-y-auto pr-2 space-y-4 py-2">
            <FieldGroup>
              {/* Title */}
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
                      placeholder="Enter article title"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Category */}
              <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      maxLength={40}
                      placeholder="e.g. Activity, Announcement, General"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Link */}
              <Controller
                control={form.control}
                name="link"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>External Link (Optional)</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="https://example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Content */}
              <Controller
                control={form.control}
                name="content"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Write article details..."
                      rows={5}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Thumbnail */}
              <Field>
                <FieldLabel htmlFor="thumbnail">Thumbnail Cover Image</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setThumbnailFile(file);
                    }}
                  />
                  {thumbnailFile && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Upload className="h-3.5 w-3.5 text-primary" />
                      Selected cover: {thumbnailFile.name}
                    </p>
                  )}
                </div>
              </Field>

              {/* Published */}
              <Controller
                control={form.control}
                name="published"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                    className="flex items-center gap-2 mt-2"
                  >
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={field.name} className="cursor-pointer">
                      Publish immediately
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isSubmitting || createArticleMutation.isPending}
            >
              {(isSubmitting || createArticleMutation.isPending) && (
                <Spinner className="mr-2" />
              )}
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

