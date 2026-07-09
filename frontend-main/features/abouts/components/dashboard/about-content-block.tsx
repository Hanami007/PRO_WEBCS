"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { XIcon, TypeIcon, ImageIcon } from "lucide-react";

import { aboutContentLayoutEnum } from "../../types/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateAboutContent } from "../../api/update-about-content";
import AboutContentItem from "../about-content-item";
import { useAboutContent } from "../../api/get-about-content";
import { AboutContentInfoForm } from "./about-content-info-form";
import { AboutContentImageForm } from "./about-content-image-form";

type AboutContentBlockProps = {
  contentId: string;
  sectionId: string;
};

const AboutContentBlock = ({
  contentId,
  sectionId,
}: AboutContentBlockProps) => {
  const contentQuery = useAboutContent({ contentId });
  const [isEditing, setIsEditing] = useState(false);

  const content = contentQuery?.data;

  const updateMutation = useUpdateAboutContent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Layout updated successfully");
      },
    },
  });

  if (!content) {
    return null;
  }

  const toggleLayout = () => {
    const nextLayout =
      content?.layoutType === aboutContentLayoutEnum.TEXT
        ? aboutContentLayoutEnum.IMAGE
        : aboutContentLayoutEnum.TEXT;

    updateMutation.mutate({
      aboutContentId: contentId,
      data: {
        title: content.title || "",
        body: content.body || "",
        layoutType: nextLayout,
        sortOrder: content.sortOrder ?? 0,
      },
    });
  };

  return (
    <Card className="relative group border shadow-none bg-background/50 overflow-hidden">
      <div className="absolute top-3 left-3 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-12 transition-all"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <XIcon className="h-4 w-4" /> : <span>Edit</span>}
        </Button>
        {isEditing && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-12 transition-all"
            onClick={toggleLayout}
            disabled={updateMutation.isPending}
            title={`Switch to ${content?.layoutType === aboutContentLayoutEnum.IMAGE ? "Text" : "Image"} layout`}
          >
            {content?.layoutType === aboutContentLayoutEnum.IMAGE ? (
              <TypeIcon className="h-4 w-4" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <CardContent className="p-6 pt-14">
        {isEditing ? (
          <>
            {content?.layoutType === aboutContentLayoutEnum.TEXT ? (
              <AboutContentInfoForm
                content={content}
                onSuccess={() => setIsEditing(false)}
              />
            ) : (
              <AboutContentImageForm
                content={content}
                sectionId={sectionId}
                onSuccess={() => setIsEditing(false)}
              />
            )}
          </>
        ) : (
          <AboutContentItem content={content} />
        )}
      </CardContent>
    </Card>
  );
};

export default AboutContentBlock;
