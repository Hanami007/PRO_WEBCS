import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderCode } from "lucide-react";
import React from "react";
import { CreateContact } from "./create-contact";

export const ContactEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>No Contacts Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any contacts yet. Get started by creating
          your first contact.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <CreateContact />
      </EmptyContent>
    </Empty>
  );
};
