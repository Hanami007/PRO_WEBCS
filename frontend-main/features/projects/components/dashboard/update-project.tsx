"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProjectInput,
  updateProjectInputSchema,
  useUpdateProject,
} from "../../api/update-project";
import {
  FormFile,
  FormInput,
  FormNumber,
  FormSelect,
  FormTextarea,
} from "@/components/form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProject } from "../../api/get-project";
import { ArrowLeft, Trash, FileText, Plus, X } from "lucide-react";
import Link from "next/link";
import { DeleteProject } from "./delete-project";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { SelectItem } from "@/components/ui/select";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import {
  UpdateProjectFileInput,
  updateProjectFileInputSchema,
  useUpdateProjectFile,
} from "../../api/update-project-file";
import { useUser } from "@/lib/auth";
import { canUpdateProject } from "@/lib/authorization";
import NotFoundPage from "@/app/dashboard/not-found";
import { Project } from "../../types/api";

type UpdateProjectProps = {
  projectId: string;
};

const UpdateProjectInfoForm = ({ project }: { project: Project }) => {
  const { data: personnelData } = usePersonnels({ limit: 100 });
  const personnel = personnelData?.data || [];
  const projectId = project.id;

  const updateProjectMutation = useUpdateProject();

  const form = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectInputSchema),
    defaultValues: {
      code: project.code,
      name: project.name,
      year: project.year,
      detail: project.detail || "",
      editors: project.editors.map((v) => ({ value: v })),
      chairmanId: project.chairman?.id || "",
      director1Id: project.director1?.id || null,
      director2Id: project.director2?.id || null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "editors",
  });

  const onSubmit = (values: UpdateProjectInput) => {
    updateProjectMutation.mutate({ data: values, projectId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <div className="grid grid-cols-2 gap-4">
            <FormInput control={form.control} name="code" label="Code" />
            <FormNumber control={form.control} name="year" label="Year (BE)" />
          </div>

          <FormInput control={form.control} name="name" label="Project Title" />

          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <FieldLabel>Authors / Editors</FieldLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: "" })}
              >
                <Plus className="mr-1 h-3 w-3" /> Add Author
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <FormInput
                    control={form.control}
                    name={`editors.${index}.value`}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Committee</FieldLegend>
          <FormSelect
            control={form.control}
            name="chairmanId"
            label="Chairman (Advisor)"
          >
            {personnel.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.fullnameTh}
              </SelectItem>
            ))}
          </FormSelect>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="director1Id"
              label="Director 1"
            >
              {personnel.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.fullnameTh}
                </SelectItem>
              ))}
            </FormSelect>
            <FormSelect
              control={form.control}
              name="director2Id"
              label="Director 2"
            >
              {personnel.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.fullnameTh}
                </SelectItem>
              ))}
            </FormSelect>
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Content</FieldLegend>
          <FormTextarea
            control={form.control}
            name="detail"
            label="Details / Abstract"
          />
        </FieldSet>

        <div className="flex justify-start">
          <Button type="submit" disabled={updateProjectMutation.isPending}>
            {updateProjectMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

const UpdateProjectFileForm = ({ project }: { project: Project }) => {
  const updateFileMutation = useUpdateProjectFile({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("PDF file updated successfully.");
      },
    },
  });

  const form = useForm<UpdateProjectFileInput>({
    resolver: zodResolver(updateProjectFileInputSchema),
  });

  const onSubmit = (values: UpdateProjectFileInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateFileMutation.mutate({
        projectId: project.id,
        file: file,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Project Document</FieldLegend>
          <FieldDescription>
            Upload research paper in PDF format.
          </FieldDescription>
          <FieldContent>
            <div className="flex items-center gap-4 border p-4 rounded-md bg-muted/20">
              <FileText className="h-10 w-10 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {project.file?.filename || "No file uploaded"}
                </p>
                {project.file?.url && (
                  <a
                    href={project.file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Download Current PDF
                  </a>
                )}
              </div>
            </div>
          </FieldContent>
          <FormFile control={form.control} name="file" label="Upload File" />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

const ProjectControlForm = ({ project }: { project: Project }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Management</FieldLegend>
        <FieldDescription>
          Permanently remove this project from the database.
        </FieldDescription>
        <Field orientation="horizontal">
          <FieldLabel>Delete Project?</FieldLabel>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
        </Field>
        <DeleteProject
          id={project.id}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onSuccess={() => {
            queryClient.removeQueries({ queryKey: ["projects"] });
            router.push("/dashboard/projects");
          }}
        />
      </FieldSet>
    </FieldGroup>
  );
};

export const UpdateProject = ({ projectId }: UpdateProjectProps) => {
  const projectQuery = useProject({ projectId });

  const user = useUser();

  if (!canUpdateProject(user?.data)) {
    return null;
  }

  const project = projectQuery?.data;

  if (!project) return <NotFoundPage />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">
            {project.code} - {project.name}
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="file">Document</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="info">
            <UpdateProjectInfoForm project={project} />
          </TabsContent>
          <TabsContent value="file">
            <UpdateProjectFileForm project={project} />
          </TabsContent>
          <TabsContent value="control">
            <ProjectControlForm project={project} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
