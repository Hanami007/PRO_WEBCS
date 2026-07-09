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
  createRoomInputSchema,
  useCreateRoom,
  CreateRoomInput,
} from "../../api/create-room";
import { SelectItem } from "@/components/ui/select";
import { useBuildings } from "../../../buildings/api/get-buildings";
import { useRoomTypes } from "../../api/get-room-types";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import { FormInput, FormSelect, FormNumber } from "@/components/form";

export const CreateRoom = () => {
  const [open, setOpen] = useState(false);

  const { data: buildingsResponse } = useBuildings({ limit: 100 });
  const buildings = buildingsResponse?.data || [];

  const { data: roomTypes } = useRoomTypes();
  const { data: personnelResponse } = usePersonnels({ limit: 100 });
  const personnels = personnelResponse?.data || [];

  const createRoomMutation = useCreateRoom({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Room created successfully.");
        setOpen(false);
        form.reset();
      },
    },
  });

  const form = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomInputSchema),
    defaultValues: {
      code: "",
      nameTh: "",
      nameEn: "",
      floor: "",
      capacity: 0,
      buildingId: "",
      typeId: "",
      personnelId: null,
    },
  });

  const onSubmit = (values: CreateRoomInput) => {
    createRoomMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>Create a new room entry.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput control={form.control} name="code" label="Room Code" />

            <FormInput control={form.control} name="floor" label="Floor" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput control={form.control} name="nameTh" label="Name (TH)" />

            <FormInput
              control={form.control}
              name="nameEn"
              label="Name (EN) (Optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="buildingId"
              label="Building"
            >
              {buildings.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </FormSelect>

            <FormSelect control={form.control} name="typeId" label="Room Type">
              {roomTypes?.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </FormSelect>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormNumber
              control={form.control}
              name="capacity"
              label="Capacity (Seats)"
            />

            <FormSelect
              control={form.control}
              name="personnelId"
              label="Person in Charge"
            >
              {personnels.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.fullnameTh}
                </SelectItem>
              ))}
            </FormSelect>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={createRoomMutation.isPending}>
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
