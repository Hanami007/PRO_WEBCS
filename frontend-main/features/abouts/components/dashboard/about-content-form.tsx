"use client";

import AboutContentEmpty from "./about-content-empty";
import AboutContentBlock from "./about-content-block";
import { CreateAboutContent } from "./create-about-content";
import { useAboutContents } from "../../api/get-about-contents";

type AboutContentFormProps = {
  sectionId: string;
};

const AboutContentForm = ({ sectionId }: AboutContentFormProps) => {
  const contentsQuery = useAboutContents({
    "filter.section.id": `$eq:${sectionId}`,
  });

  const contents = contentsQuery.data?.data;

  if (!contents) {
    return <AboutContentEmpty sectionId={sectionId} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2">
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight">Content Layout</h3>
          <p className="text-sm text-muted-foreground">
            Arrange and edit the blocks of information for this section.
          </p>
        </div>
        <CreateAboutContent aboutSectionId={sectionId} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {contents.map((content) => (
          <AboutContentBlock
            key={content.id}
            contentId={content.id}
            sectionId={sectionId}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
        <p className="text-sm text-muted-foreground mb-4 font-medium">
          Need more content?
        </p>
        <CreateAboutContent aboutSectionId={sectionId} />
      </div>
    </div>
  );
};

export default AboutContentForm;
