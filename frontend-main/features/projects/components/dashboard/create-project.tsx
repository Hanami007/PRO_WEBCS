"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectInputSchema,
  useCreateProject,
  CreateProjectInput,
} from "../../api/create-project";
import { SelectItem } from "@/components/ui/select";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea, FormFile } from "@/components/form";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { useUser } from "@/lib/auth";
import { canCreateProject } from "@/lib/authorization";

export const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const { data: personnelData } = usePersonnels({ limit: 100 });
  const personnel = personnelData?.data || [];

  const createProjectMutation = useCreateProject({
    mutationConfig: {
      onSuccess: () => {
        toast.success("เพิ่มข้อมูลโครงงานเรียบร้อยแล้ว");
        setOpen(false);
        form.reset();
      },
    },
  });

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectInputSchema),
    defaultValues: {
      code: "",
      name: "",
      year: "",
      detail: "",
      editors: [{ value: "" }],
      chairmanId: "",
      director1Id: "",
      director2Id: "",
      file: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "editors",
  });

  const user = useUser();

  if (!canCreateProject(user?.data)) {
    return null;
  }

  const onSubmit = (values: CreateProjectInput) => {
    const { file, ...restValues } = values;
    createProjectMutation.mutate({
      data: restValues,
      file: file instanceof File ? file : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 h-10 flex items-center gap-1.5 shadow-sm cursor-pointer">
          <Plus className="h-4 w-4" /> เพิ่ม
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>เพิ่มข้อมูลโครงงานนักศึกษาใหม่</DialogTitle>
          <DialogDescription>
            กรอกรายละเอียดโครงงาน รหัสโครงงาน ผู้จัดทำ และอัปโหลดไฟล์เอกสาร (PDF)
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="create-project-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput control={form.control} name="code" label="รหัสโครงงาน (เช่น P08)" />

                <FormInput control={form.control} name="year" label="ปีการศึกษา (พ.ศ. เช่น 2564)" />
              </div>

              <FormInput control={form.control} name="name" label="ชื่อโครงงาน *" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FieldLabel>ชื่อผู้ทำโครงงาน / ผู้จัดทำ *</FieldLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus className="mr-1 h-3 w-3" /> เพิ่มผู้จัดทำ
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
                        className="mt-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <FormSelect
                control={form.control}
                name="chairmanId"
                label="อาจารย์ที่ปรึกษา (ประธาน) *"
              >
                {personnel.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.fullnameTh}
                  </SelectItem>
                ))}
              </FormSelect>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  control={form.control}
                  name="director1Id"
                  label="กรรมการ 1 (ไม่บังคับ)"
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
                  label="กรรมการ 2 (ไม่บังคับ)"
                >
                  {personnel.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.fullnameTh}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>

              <FormTextarea
                control={form.control}
                name="detail"
                label="รายละเอียด / บทคัดย่อโครงงาน"
              />

              <FormFile
                control={form.control}
                name="file"
                label="อัปโหลดไฟล์เอกสารโครงงาน (PDF / Word)"
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="submit"
            form="create-project-form"
            disabled={createProjectMutation.isPending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            {createProjectMutation.isPending ? "กำลังบันทึกและอัปโหลดไฟล์..." : "บันทึกข้อมูล"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              ยกเลิก
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
