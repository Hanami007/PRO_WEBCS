"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPersonnelInputSchema,
  useCreatePersonnel,
  CreatePersonnelInput,
} from "../../api/create-personnel";
import { usePersonnelStatuses } from "../../api/get-personnel-statuses";
import { FormInput, FormSelect } from "@/components/form";
import { SelectItem } from "@/components/ui/select";
import { WorkStatus } from "../../types/api";

export const CreatePersonnel = () => {
  const [open, setOpen] = useState(false);
  const { data: statuses } = usePersonnelStatuses();

  const createPersonnelMutation = useCreatePersonnel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Personnel created successfully.");
        setOpen(false);
        form.reset();
      },
    },
  });

  const form = useForm<CreatePersonnelInput>({
    resolver: zodResolver(createPersonnelInputSchema),
    defaultValues: {
      citizenId: "",
      prefix: "",
      fullnameTh: "",
      fullnameEn: "",
      academicPosition: "",
      administrativePosition: "",
      education: "",
      phoneNumber: "",
      email: "",
      personnelType: "",
      academicType: "",
      workStatusId: "",
    },
  });

  const onSubmit = (values: CreatePersonnelInput) => {
    createPersonnelMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Personnel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Personnel</DialogTitle>
          <DialogDescription>
            Enter personnel details and select their current work status.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              {statuses?.map((status: WorkStatus) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
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

          <FormInput
            control={form.control}
            name="phoneNumber"
            label="เบอร์โทรศัพท์"
          />

          <DialogFooter>
            <Button type="submit" disabled={createPersonnelMutation.isPending}>
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
