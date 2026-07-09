import AboutContentItem from "./about-content-item";
import type { AboutSection as AboutSectionType } from "../types/api";

interface ComponentProps {
  section: AboutSectionType;
}

const AboutSection = ({ section }: ComponentProps) => {
  return (
    <div key={section.id} className="space-y-4">
      {section.contents.map((content) => (
        <AboutContentItem key={content.id} content={content} />
      ))}
    </div>
  );
};

export default AboutSection;
