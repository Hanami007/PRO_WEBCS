"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { Separator } from "@/components/ui/separator";
import { CreateComplain } from "@/features/complains/components/create-complain";
import { ContactList } from "@/features/contacts/components/contact-list";

const Contacts = () => {
  return (
    <ContentLayout
      title="Contact Us"
      description="Reach out to the office for administrative assistance, scheduling, or academic partnership."
    >
      <div className="space-y-8">
        <ContactList />
        <Separator />
        <CreateComplain />
      </div>
    </ContentLayout>
  );
};

export default Contacts;
