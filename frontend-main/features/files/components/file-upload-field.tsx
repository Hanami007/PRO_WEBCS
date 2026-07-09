"use client";

import React, { useState } from "react";
import Image from "next/image";

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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FileUploadFieldProps = {
  onFileChange: (file: File | null) => void;
  initialPreview?: string;
  error?: string;
  accept?: string;
  legend?: string;
  description?: string;
  label?: string;
  previewVariant?: "video" | "square" | "circle";
  className?: string;
};

const FileUploadField = ({
  onFileChange,
  initialPreview,
  error,
  accept = "image/*",
  legend = "Upload File",
  description,
  label = "Choose File",
  previewVariant = "video",
  className,
}: FileUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const displayPreview = preview || initialPreview;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);

    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <FieldGroup className={className}>
      <FieldSet>
        {legend && <FieldLegend>{legend}</FieldLegend>}
        {description && <FieldDescription>{description}</FieldDescription>}

        <Field orientation="vertical" data-invalid={!!error}>
          <FieldContent>
            <div
              className={cn(
                "relative overflow-hidden border border-border bg-muted",
                previewVariant === "video" &&
                  "aspect-video w-full max-w-[400px] rounded-md",
                previewVariant === "square" &&
                  "aspect-square w-[200px] rounded-md",
                previewVariant === "circle" &&
                  "aspect-square w-[200px] rounded-full",
              )}
            >
              {displayPreview ? (
                <Image
                  src={displayPreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-xs text-muted-foreground">
                    No Preview Available
                  </p>
                </div>
              )}
            </div>
          </FieldContent>
          <FieldLabel htmlFor="file-upload-input">{label}</FieldLabel>
          <Input
            id="file-upload-input"
            type="file"
            accept={accept}
            aria-invalid={!!error}
            onChange={handleFileChange}
          />
          {error && <FieldError errors={[{ message: error }]} />}
        </Field>
      </FieldSet>
    </FieldGroup>
  );
};

export { FileUploadField };
