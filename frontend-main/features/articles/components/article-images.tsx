"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArticleImageEntity } from "../types/api";

const INITIAL_DISPLAY_COUNT = 8;

const ArticleImages = ({ images }: { images: ArticleImageEntity[] }) => {
  const [selectedImage, setSelectedImage] = useState<ArticleImageEntity | null>(
    null,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleImages = isExpanded
    ? images
    : images.slice(0, INITIAL_DISPLAY_COUNT);
  const hiddenCount = images.length - INITIAL_DISPLAY_COUNT;

  const closeModal = () => setSelectedImage(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (selectedImage) {
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
  }, [selectedImage, handleKeyDown]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full my-8">
      {" "}
      <h3 className="text-lg font-semibold mb-4">
        Gallery ({images.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {visibleImages.map((image, index) => (
          <div
            key={image.id || index}
            className="relative aspect-4/3 sm:aspect-square cursor-pointer overflow-hidden rounded-lg border  hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-200"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.file.url}
              alt={image.id || `Image ${index}`}
              fill={true}
              className="object-cover transition-transform duration-300 hover:scale-110" // Zoom effect on hover
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      {/* Show More / Show Less Button */}
      {images.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 rounded-full "
          >
            {isExpanded ? (
              <>
                Show Less
                {/* Chevron Up */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-y-0.5"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </>
            ) : (
              <>
                Show {hiddenCount} more
                {/* Chevron Down */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center  p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative h-full w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.file.url}
              alt={selectedImage.id || "Fullscreen image"}
              fill={true}
              className="object-contain"
              priority={true}
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleImages;
