"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon, SaveIcon, ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  UpdateAboutContentInput,
  updateAboutContentInputSchema,
  useUpdateAboutContent,
} from "../../api/update-about-content";
import { AboutContent, aboutContentLayoutEnum } from "../../types/api";
import { useUpdateAboutContentImage } from "../../api/update-about-content-image";

type AboutContentImageFormProps = {
  content: AboutContent;
  sectionId: string;
  onSuccess?: () => void;
};

export const AboutContentImageForm = ({
  content,
  sectionId,
  onSuccess,
}: AboutContentImageFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const updateMutation = useUpdateAboutContent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Content updated successfully");
        onSuccess?.();
      },
    },
  });

  const updateImageMutation = useUpdateAboutContentImage({
    aboutSectionId: sectionId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Image updated successfully");
        setPreview(null);
      },
    },
  });

  const form = useForm<UpdateAboutContentInput>({
    resolver: zodResolver(updateAboutContentInputSchema),
    defaultValues: {
      title: content?.title,
      body: content?.body || "",
      layoutType: content?.layoutType || aboutContentLayoutEnum.IMAGE,
      sortOrder: content?.sortOrder,
    },
  });

  const onSubmit = (values: UpdateAboutContentInput) => {
    updateMutation.mutate({
      aboutContentId: content.id,
      data: values,
    });
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    updateImageMutation.mutate({
      aboutContentId: content.id,
      file,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayImage = preview ?? content.image?.url ?? null;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <FormInput
        control={form.control}
        name="title"
        label="Block Title (Optional)"
      />

      <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
        {/* Hidden file input */}
        <input
          ref={inputRef}
          id={`image-upload-${content.id}`}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleInputChange}
          disabled={updateImageMutation.isPending}
        />

        {displayImage ? (
          /* ── Clean image preview ── */
          <div className="relative aspect-video w-full group/preview">
            <div className="relative w-full h-full overflow-hidden rounded-xl border">
              <Image
                src={displayImage}
                alt="Background preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Hover overlay — sits above image, doesn't tint it */}
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover/preview:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-2 opacity-0 group-hover/preview:opacity-100">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={updateImageMutation.isPending}
                onClick={() => inputRef.current?.click()}
              >
                {updateImageMutation.isPending ? (
                  <Spinner className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <UploadIcon className="mr-1.5 h-3.5 w-3.5" />
                )}
                {updateImageMutation.isPending ? "Uploading…" : "Replace"}
              </Button>
              {preview && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={clearPreview}
                >
                  <XIcon className="mr-1.5 h-3.5 w-3.5" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* ── Click-to-upload zone ── */
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={updateImageMutation.isPending}
            className={[
              "relative aspect-video w-full rounded-xl border-2 border-dashed",
              "flex flex-col items-center justify-center gap-3",
              "transition-all duration-150 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
              "border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10",
            ].join(" ")}
            aria-label="Upload image"
          >
            <div className="h-12 w-12 rounded-full bg-background shadow-md flex items-center justify-center border border-primary/10">
              {updateImageMutation.isPending ? (
                <Spinner className="h-6 w-6 text-primary" />
              ) : (
                <ImageIcon className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-primary">
                {updateImageMutation.isPending
                  ? "Uploading…"
                  : "Click to upload"}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                SVG, PNG, JPG, WebP accepted
              </p>
            </div>
          </button>
        )}

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : (
              <SaveIcon className="mr-2 h-4 w-4" />
            )}
            Confirm Layout
          </Button>
        </div>
      </div>
    </form>
  );
};
