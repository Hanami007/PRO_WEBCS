"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, Trash2, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Helper from shadcn
import { useDeleteArticleImages } from "../../api/delete-article-images";
import { ArticleImageEntity } from "../../types/api";

interface ArticleImageDashboardProps {
  images: ArticleImageEntity[];
  articleId: string;
}

const ArticleImageDashboard = ({
  images,
  articleId,
}: ArticleImageDashboardProps) => {
  const [viewingImage, setViewingImage] = useState<ArticleImageEntity | null>(
    null,
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deleteArticleImagesMutation = useDeleteArticleImages({
    mutationConfig: {
      onSuccess: () => {
        setSelectedIds([]);
      },
    },
  });

  // --- Selection Logic ---
  const toggleSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === images.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(images.map((img) => img.id));
    }
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      deleteArticleImagesMutation.mutate({
        images: images.filter((image) => selectedIds.includes(image.id)),
        articleId: articleId,
      });
    }
  };

  const closeModal = () => setViewingImage(null);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (viewingImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [viewingImage, handleKeyDown]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-40 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 text-sm text-muted-foreground">
        <p>No images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Admin Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{selectedIds.length} selected</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              className="h-8 text-xs"
            >
              {selectedIds.length === images.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteClick}
            className="gap-2 h-8"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {images.map((image, index) => {
          const isSelected = selectedIds.includes(image.id);

          return (
            <div
              key={image.id || index}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-lg border bg-background transition-all cursor-pointer",
                isSelected
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:ring-2 hover:ring-muted-foreground/25",
              )}
              onClick={() => setViewingImage(image)}
            >
              <Image
                src={image.file.url}
                alt={image.id}
                fill={true}
                className={cn(
                  "object-cover transition-all duration-300",
                  isSelected ? "scale-95 opacity-75" : "group-hover:scale-105",
                )}
                sizes="(max-width: 768px) 33vw, 15vw"
              />

              {/* Checkbox Overlay */}
              <div
                onClick={(e) => toggleSelection(e, image.id)}
                className={cn(
                  "absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border shadow-sm transition-all duration-200",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground scale-100"
                    : "bg-background/80 border-input text-transparent hover:bg-background hover:border-primary/50 md:opacity-0 md:group-hover:opacity-100",
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </div>

              {/* Hover Overlay (Subtle dark tint on hover) */}
              {!isSelected && (
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Modal */}
      {viewingImage && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={closeModal}
            className="absolute right-4 top-4 z-50 rounded-full bg-background/50 hover:bg-background border-0 text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <div
            className="relative h-full w-full max-w-7xl p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={viewingImage.file.url}
              alt={viewingImage.id}
              fill={true}
              className="object-contain drop-shadow-2xl"
              priority={true}
              quality={95}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleImageDashboard;
