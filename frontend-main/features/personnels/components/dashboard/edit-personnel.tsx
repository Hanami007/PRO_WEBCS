"use client";

import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePersonnelInputSchema,
  useUpdatePersonnel,
  UpdatePersonnelInput,
} from "../../api/update-personnel";
import {
  updatePersonnelImageInputSchema,
  UpdatePersonnelImageInput,
  useUpdatePersonnelImage,
} from "../../api/update-personnel-image";
import { Personnel, WorkStatus } from "@/features/personnels/types/api";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePersonnel } from "../../api/get-personnel";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { DeletePersonnel } from "./delete-personnel";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { usePersonnelStatuses } from "../../api/get-personnel-statuses";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { Separator } from "@/components/ui/separator";
import { FormInput, FormSelect } from "@/components/form";
import UpdatePersonnelProfile from "./update-personnel-profile";

type EditPersonnelProps = {
  personnelId: string;
};

const UpdatePersonnelInfoForm = ({ personnel }: { personnel: Personnel }) => {
  const { data: statuses } = usePersonnelStatuses();

  const updatePersonnelMutation = useUpdatePersonnel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Personnel information updated successfully.");
      },
    },
  });

  const form = useForm<Omit<UpdatePersonnelInput, "id">>({
    resolver: zodResolver(updatePersonnelInputSchema),
    defaultValues: {
      citizenId: personnel.citizenId || "",
      prefix: personnel.prefix || "",
      fullnameTh: personnel.fullnameTh,
      fullnameEn: personnel.fullnameEn,
      academicPosition: personnel.academicPosition || "",
      administrativePosition: personnel.administrativePosition || "",
      education: personnel.education || "",
      phoneNumber: personnel.phoneNumber || "",
      email: personnel.email || "",
      personnelType: personnel.personnelType,
      academicType: personnel.academicType || "",
      workStatusId: personnel.workStatus?.id || "",
    },
  });

  const onSubmit = (values: Omit<UpdatePersonnelInput, "id">) => {
    updatePersonnelMutation.mutate({ data: values, id: personnel.id });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>ข้อมูลเบื้องต้น</FieldLegend>
          <FieldDescription>รายละเอียดข้อมูลส่วนตัวและตำแหน่ง</FieldDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="citizenId"
              label="รหัสบัตรประชาชน"
            />
            <FormInput
              control={form.control}
              name="prefix"
              label="คำนำหน้าชื่อ"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="fullnameTh"
              label="ชื่อไทย"
            />
            <FormInput
              control={form.control}
              name="fullnameEn"
              label="ชื่ออังกฤษ"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="academicPosition"
              label="ตำแหน่งทางวิชาการ"
            />
            <FormInput
              control={form.control}
              name="administrativePosition"
              label="ตำแหน่งทางบริหาร"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="personnelType"
              label="ประเภทของบุคลากร"
            />
            <FormInput
              control={form.control}
              name="academicType"
              label="ประเภททางมหาวิทยาลัย"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="workStatusId"
              label="สถานะการทำงาน"
            >
              {statuses?.map((s: WorkStatus) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </FormSelect>
            <FormInput control={form.control} name="email" label="อีเมล" />
          </div>

          <FormInput
            control={form.control}
            name="education"
            label="ประวัติการศึกษา"
          />
        </FieldSet>

        <FieldSet>
          <FieldLegend>ข้อมูลการติดต่อ</FieldLegend>
          <FieldDescription>เบอร์โทรศัพท์สำหรับการติดต่อ</FieldDescription>

          <FormInput
            control={form.control}
            name="phoneNumber"
            label="เบอร์โทรศัพท์"
          />
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Save Changes</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

const UpdatePersonnelImageForm = ({ personnel }: { personnel: Personnel }) => {
  const updatePersonnelImageMutation = useUpdatePersonnelImage({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Profile image updated");
      },
    },
  });

  const form = useForm<UpdatePersonnelImageInput>({
    resolver: zodResolver(updatePersonnelImageInputSchema),
  });

  const onSubmit = (values: UpdatePersonnelImageInput) => {
    const { file } = values;

    if (file instanceof File) {
      updatePersonnelImageMutation.mutate({
        id: personnel.id,
        file: file,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>รูปโปรไฟล์</FieldLegend>
          <FieldDescription>อัปโหลดรูปภาพประจำตัวของบุคลากร</FieldDescription>
          <Controller
            control={form.control}
            name="file"
            render={({ field, fieldState }) => (
              <Field orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldContent className="mb-4">
                  {personnel.profileImage?.url ? (
                    <div className="relative aspect-4/3 w-[328px]">
                      <Image
                        src={personnel.profileImage.url}
                        alt={personnel.fullnameTh}
                        fill={true}
                        priority
                        className="object-cover rounded-md border shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square w-[328px] bg-secondary flex items-center justify-center rounded-md border-2 border-dashed">
                      <p className="text-muted-foreground text-sm font-medium">
                        No Image Uploaded
                      </p>
                    </div>
                  )}
                </FieldContent>
                <FieldLabel htmlFor={field.name}>เลือกไฟล์รูปภาพ</FieldLabel>
                <Input
                  id={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="file"
                  accept="image/*"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  className="max-w-[400px]"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field orientation="horizontal">
            <Button type="submit">Upload Image</Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

const PersonnelControlForm = ({ personnel }: { personnel: Personnel }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>ส่วนควบคุม</FieldLegend>
        <FieldDescription>การลบข้อมูลบุคลากรออกจากระบบ</FieldDescription>

        <Field orientation="horizontal">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">ลบข้อมูลบุคลากร</span>
            <span className="text-xs text-muted-foreground">
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </span>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </Field>

        <DeletePersonnel
          id={personnel.id}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onSuccess={() => {
            queryClient.removeQueries({ queryKey: ["personnels"] });
            router.push("/dashboard/personnels");
          }}
        />
      </FieldSet>
    </FieldGroup>
  );
};

export const EditPersonnel = ({ personnelId }: EditPersonnelProps) => {
  const router = useRouter();
  const personnelQuery = usePersonnel({ personnelId });
  const personnel = personnelQuery.data;

  if (personnelQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!personnel) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Personnel not found
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
          onClick={() => router.push(paths.dashboard.personnel.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          กลับไปยังหน้ารายการบุคลากร
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">แก้ไขข้อมูลบุคลากร</p>
          <p className="text-muted-foreground text-sm">
            ปรับปรุงข้อมูลส่วนตัว ตำแหน่ง และรูปโปรไฟล์
          </p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info">ข้อมูลบุคลากร</TabsTrigger>
          <TabsTrigger value="profile">ข้อมูลรายละเอียด (CV)</TabsTrigger>
          <TabsTrigger value="control">ตั้งค่า</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="py-6 space-y-8">
          <UpdatePersonnelInfoForm personnel={personnel} />
          <Separator />
          <UpdatePersonnelImageForm personnel={personnel} />
        </TabsContent>
        <TabsContent value="profile" className="py-6">
          <UpdatePersonnelProfile
            personnelId={personnel.id}
            profile={personnel.profile}
          />
        </TabsContent>
        <TabsContent value="control" className="py-6">
          <PersonnelControlForm personnel={personnel} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
