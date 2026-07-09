"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useResourceByKey } from "@/features/resources/api/get-resource-by-key";

const IntroductionVideo = ({ className }: { className?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoQuery = useResourceByKey({ resourceKey: "introduction_video_id" });

  const video = videoQuery.data;

  if (!video) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <AspectRatio
      ratio={16 / 9}
      className={cn("bg-muted relative overflow-hidden rounded-md", className)}
    >
      {!isPlaying ? (
        <>
          <Image
            src={`https://img.youtube.com/vi/${video.value}/maxresdefault.jpg`}
            alt={video.key}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="group bg-background group-hover:bg-foreground rounded-md p-4 transition-all group-hover:scale-110">
              <PlayIcon className="group-hover:stroke-background" />
            </div>
          </button>
        </>
      ) : (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.value}?autoplay=1`}
            title={video.value}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full z-9999"
          />
        </>
      )}
    </AspectRatio>
  );
};

export default IntroductionVideo;
