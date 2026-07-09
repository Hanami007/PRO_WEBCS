import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchSlash } from "lucide-react";

export const ArticleEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchSlash />
        </EmptyMedia>
        <EmptyTitle>No Data</EmptyTitle>
        <EmptyDescription>No article data found</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
