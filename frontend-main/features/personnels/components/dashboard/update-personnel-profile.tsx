"use client";

import { PersonnelProfile } from "../../types/api";
import {
  useUpdatePersonnelProfile,
  UpdatePersonnelProfileInput,
  updatePersonnelProfileInputSchema,
} from "../../api/update-personnel-profile";
import { useCreatePersonnelProfile } from "../../api/create-personnel-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText, Plus, Save } from "lucide-react";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { FormCheckbox, FormTextarea } from "@/components/form";

type UpdatePersonnelProfileProps = {
  personnelId: string;
  profile: PersonnelProfile | null;
};

const UpdatePersonnelProfile = ({
  personnelId,
  profile,
}: UpdatePersonnelProfileProps) => {
  const createProfileMutation = useCreatePersonnelProfile({
    personnelId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Profile created successfully.");
      },
    },
  });

  const updateProfileMutation = useUpdatePersonnelProfile({
    personnelId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Profile updated successfully.");
      },
    },
  });

  const form = useForm<UpdatePersonnelProfileInput>({
    resolver: zodResolver(updatePersonnelProfileInputSchema),
    defaultValues: {
      bio: profile?.bio || "",
      workplace: profile?.workplace || "",
      skills: profile?.skills || "",
      experts: profile?.experts || "",
      experiences: profile?.experiences || "",
      researches: profile?.researches || "",
      isPublic: profile?.isPublic ?? true,
    },
  });

  const onUpdate = (values: UpdatePersonnelProfileInput) => {
    if (!profile) return;
    updateProfileMutation.mutate({ data: values, id: profile.id });
  };

  const onCreate = () => {
    createProfileMutation.mutate({ data: { personnelId } });
  };

  if (!profile) {
    return (
      <Empty className="h-64">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No Profile Found</EmptyTitle>
          <EmptyDescription>
            This personnel doesn&apos;t have a profile yet. Create one to start
            adding more details like bio, skills, and researches.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" /> Create Profile
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onUpdate)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personnel Profile (CV)</FieldLegend>
          <FieldDescription>
            Detailed information about the personnel for their public profile
            page.
          </FieldDescription>

          <FormTextarea
            control={form.control}
            name="bio"
            label="Biography (Bio)"
          />

          <FormTextarea
            control={form.control}
            name="workplace"
            label="Workplace"
          />

          <FormTextarea
            control={form.control}
            name="skills"
            label="Skills & Abilities"
          />

          <FormTextarea
            control={form.control}
            name="experts"
            label="Expertise"
          />

          <FormTextarea
            control={form.control}
            name="experiences"
            label="Experiences"
          />

          <FormTextarea
            control={form.control}
            name="researches"
            label="Researches & Publications"
          />

          <FormCheckbox
            control={form.control}
            name="isPublic"
            label="Show on Public Website"
            description="If checked, this profile will be visible to everyone on the public website."
          />
        </FieldSet>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save Profile
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default UpdatePersonnelProfile;
