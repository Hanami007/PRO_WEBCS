"use client";

import { useContacts } from "../api/get-contacts";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

import { Mail, Phone, Link as LinkIcon, HelpCircle } from "lucide-react";

const CONTACT_UI_CONFIG = {
  email: {
    Icon: Mail,
  },
  phone: {
    Icon: Phone,
  },
  url: {
    Icon: LinkIcon,
  },
} as const;

export const ContactList = () => {
  const contactsQuery = useContacts({
    page: 1,
    limit: 8,
    "filter.isActive": `$eq:${true}`,
  });

  if (contactsQuery.isLoading) {
    return <Spinner />;
  }

  const contacts = contactsQuery.data?.data;

  if (!contacts) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
      {contacts.map((contact) => {
        const config = CONTACT_UI_CONFIG[
          contact.type as keyof typeof CONTACT_UI_CONFIG
        ] || {
          Icon: HelpCircle,
        };

        const { Icon } = config;
        return (
          <div
            key={contact.id}
            className="flex flex-col py-8 px-12 bg-card border border-border space-y-4 rounded-md"
          >
            <Icon />
            <p className="font-semibold text-card-foreground">
              {contact.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {contact.description}
            </p>

            <div className="font-medium text-primary hover:text-primary/80 transition-colors">
              {contact.type === "email" && (
                <a href={`mailto:${contact.value}`}>{contact.value}</a>
              )}

              {contact.type === "phone" && (
                <a href={`tel:${contact.value}`}>{contact.value}</a>
              )}

              {contact.type === "url" && (
                <Link
                  href={contact.value}
                  target="_blank"
                  className="inline-flex items-center gap-1"
                >
                  {contact.label}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
