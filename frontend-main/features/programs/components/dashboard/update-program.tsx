"use client";

import React from "react";
import { useProgram } from "../../api/get-program";
import {
  UpdateProgramInput,
  updateProgramInputSchema,
  useUpdateProgram,
} from "../../api/update-program";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Program } from "@/features/programs/types/api";
import DeleteProgram from "./delete-program";
import { FormCheckbox, FormInput, FormNumber } from "@/components/form";
import { CreateProgramCourse } from "./create-program-course";
import { ClientDataTable } from "@/components/ui/client-data-table";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { getProgramCourseColumns } from "./program-course-columns";
import { getProgramStudyPlanColumns } from "./program-study-plan-columns";
import { CreateStudyPlan } from "./create-study-plan";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowLeftIcon,
  InfoIcon,
  BookOpenIcon,
  LayoutGridIcon,
  Settings2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";

type UpdateProgramProps = {
  programId: string;
};

const UpdateProgramInfoForm = ({ program }: { program: Program }) => {
  const programId = program.id;

  const updateProgramMutation = useUpdateProgram({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Program Information is updated.");
      },
    },
  });

  const form = useForm<UpdateProgramInput>({
    resolver: zodResolver(updateProgramInputSchema),
    defaultValues: {
      code: program.code ?? "",
      nameTh: program.nameTh ?? "",
      nameEn: program.nameEn ?? "",
      degreeThFull: program.degreeThFull ?? "",
      degreeEnFull: program.degreeEnFull ?? "",
      degreeTh: program.degreeTh ?? "",
      degreeEn: program.degreeEn ?? "",
      credits: program.credits ?? 0,
      revision: program.revision ?? "",
      duration: program.duration ?? "",
      languages: program.languages ?? "",
      tqf: program.tqf ?? "",
    },
  });

  const onSubmit = (values: UpdateProgramInput) => {
    updateProgramMutation.mutate({ data: values, programId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>General Information</FieldLegend>
          <FieldDescription>
            Basic program identification and naming.
          </FieldDescription>

          <FormInput
            control={form.control}
            name="code"
            label="Curriculum Code"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="nameTh"
              label="Name (Thai)"
            />

            <FormInput
              control={form.control}
              name="nameEn"
              label="Name (English)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="degreeThFull"
              label="Degree Full Name (Thai)"
            />

            <FormInput
              control={form.control}
              name="degreeEnFull"
              label="Degree Full Name (English)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="degreeTh"
              label="Degree Abbreviation (Thai)"
            />

            <FormInput
              control={form.control}
              name="degreeEn"
              label="Degree Abbreviation (English)"
            />
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Curriculum Details</FieldLegend>
          <FieldDescription>
            Specific details regarding credits, duration, and languages.
          </FieldDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormNumber
              control={form.control}
              name="credits"
              label="Total Credits"
            />

            <FormInput
              control={form.control}
              name="revision"
              label="Revision Year"
            />

            <FormInput
              control={form.control}
              name="duration"
              label="Duration"
            />

            <FormInput
              control={form.control}
              name="languages"
              label="Languages"
            />
          </div>

          <FormInput
            control={form.control}
            name="tqf"
            label="TQF Document Link (PDF URL)"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateProgramMutation.isPending}>
            {updateProgramMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

const ProgramControlForm = ({ program }: { program: Program }) => {
  const programId = program.id;

  const updateProgramMutation = useUpdateProgram({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Program settings updated.");
      },
    },
  });

  const form = useForm<UpdateProgramInput>({
    resolver: zodResolver(updateProgramInputSchema),
    defaultValues: {
      code: program.code ?? "",
      nameTh: program.nameTh ?? "",
      nameEn: program.nameEn ?? "",
      isCurrent: program.isCurrent ?? false,
      isActive: program.isActive ?? false,
    },
  });

  const onSubmit = (values: UpdateProgramInput) => {
    updateProgramMutation.mutate({ data: values, programId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Program Settings</FieldLegend>
          <FieldDescription>
            Manage visibility and active status.
          </FieldDescription>

          <FormCheckbox
            control={form.control}
            name="isCurrent"
            label="Default Curriculum"
            description="Set this as the current curriculum displayed by default"
          />

          <FormCheckbox
            control={form.control}
            name="isActive"
            label="Active Status"
            description="Uncheck to hide this curriculum from the public website"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateProgramMutation.isPending}>
            {updateProgramMutation.isPending ? "Saving..." : "Save Visibility"}
          </Button>
        </Field>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Program Control</FieldLegend>
          <FieldDescription>
            Permanently delete this curriculum and all associated data.
          </FieldDescription>

          <Field orientation="horizontal">
            <FieldLabel>Delete this program?</FieldLabel>
            <DeleteProgram id={programId} />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

const UpdateProgramCourses = ({ program }: { program: Program }) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(
    () => getProgramCourseColumns(program.id),
    [program.id],
  );

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Program Courses</h3>
          <p className="text-sm text-muted-foreground">
            Manage courses associated with this program.
          </p>
        </div>
        <CreateProgramCourse
          programId={program.id}
          trigger={<Button>Add Course</Button>}
        />
      </div>

      <ClientDataTable
        columns={columns}
        data={program.programCourses}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        searchColumns={["course.code", "course.titleTh", "group.name"]}
        searchPlaceholder="Filter by code, title or group..."
      />
    </section>
  );
};

const UpdateProgramStudyPlans = ({ program }: { program: Program }) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "year", desc: false },
    { id: "semester", desc: false },
  ]);

  const columns = React.useMemo(
    () => getProgramStudyPlanColumns(program.id),
    [program.id],
  );

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Study Plans</h3>
          <p className="text-sm text-muted-foreground">
            Manage study plan for this program.
          </p>
        </div>
        <CreateStudyPlan
          programId={program.id}
          trigger={<Button>Add Entry</Button>}
        />
      </div>

      <ClientDataTable
        columns={columns}
        data={program.studyPlans}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        searchColumns={["course.code", "label"]}
        searchPlaceholder="Filter by code or title..."
      />
    </section>
  );
};

const UpdateProgram = ({ programId }: UpdateProgramProps) => {
  const router = useRouter();
  const programQuery = useProgram({ programId });
  const program = programQuery.data;

  if (programQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Program not found.</p>
        <Button
          variant="link"
          onClick={() => router.push(paths.dashboard.programs.getHref())}
        >
          Back to Programs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push(paths.dashboard.programs.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Programs
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Program Curriculum</p>
          <p className="text-muted-foreground text-sm">
            Manage curriculum details, courses, and study plans.
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info" className="gap-2">
            <InfoIcon className="w-4 h-4" />
            Information
          </TabsTrigger>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpenIcon className="w-4 h-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="study-plans" className="gap-2">
            <LayoutGridIcon className="w-4 h-4" />
            Study Plans
          </TabsTrigger>
          <TabsTrigger value="control" className="gap-2">
            <Settings2Icon className="w-4 h-4" />
            Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6">
          <UpdateProgramInfoForm program={program} />
        </TabsContent>

        <TabsContent value="courses" className="py-6">
          <UpdateProgramCourses program={program} />
        </TabsContent>

        <TabsContent value="study-plans" className="py-6">
          <UpdateProgramStudyPlans program={program} />
        </TabsContent>

        <TabsContent value="control" className="py-6">
          <ProgramControlForm program={program} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateProgram;
