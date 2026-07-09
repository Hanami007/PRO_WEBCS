"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateRoomInputSchema,
  useUpdateRoom,
  UpdateRoomInput,
} from "../../api/update-room";
import { useUpdateRoomImage } from "../../api/update-room-image";
import { Room } from "@/features/rooms/types/api";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { SelectItem } from "@/components/ui/select";
import { useBuildings } from "../../../buildings/api/get-buildings";
import { useRoomTypes } from "../../api/get-room-types";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import Image from "next/image";
import { FormInput, FormSelect, FormNumber } from "@/components/form";

export const UpdateRoomInfoForm = ({ room }: { room: Room }) => {
  const { data: buildingsResponse } = useBuildings({ limit: 100 });
  const buildings = buildingsResponse?.data || [];
  const { data: roomTypes } = useRoomTypes();
  const { data: personnelResponse } = usePersonnels({ limit: 100 });
  const personnels = personnelResponse?.data || [];
  const roomId = room.id;

  const updateRoomMutation = useUpdateRoom({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Room information updated.");
      },
    },
  });

  const form = useForm<UpdateRoomInput>({
    resolver: zodResolver(updateRoomInputSchema),
    defaultValues: {
      code: room.code,
      nameTh: room.nameTh,
      nameEn: room.nameEn || "",
      floor: room.floor,
      capacity: room.capacity || undefined,
      buildingId: room.building?.id || "",
      typeId: room.type?.id || "",
      personnelId: room.personnel?.id || null,
    },
  });

  const onSubmit = (values: UpdateRoomInput) => {
    updateRoomMutation.mutate({
      data: values,
      roomId,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldDescription>Details about the room.</FieldDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput control={form.control} name="code" label="Code" />
            <FormInput control={form.control} name="floor" label="Floor" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput control={form.control} name="nameTh" label="Name (TH)" />
            <FormInput control={form.control} name="nameEn" label="Name (EN)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormNumber
              control={form.control}
              name="capacity"
              label="Capacity"
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
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit" disabled={updateRoomMutation.isPending}>
            {updateRoomMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export const UpdateRoomImageForm = ({ room }: { room: Room }) => {
  const updateRoomImageMutation = useUpdateRoomImage({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Image updated successfully.");
      },
    },
  });

  const handleUpload = (file: File) => {
    updateRoomImageMutation.mutate({
      id: room.id,
      file: file,
    });
  };

  const imageUrl = room.image?.url;

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Room Image</FieldLegend>
        <FieldDescription>Upload a new image for the room.</FieldDescription>

        <FieldContent>
          <div className="flex items-center gap-6">
            <div className="relative h-40 w-60 rounded-md overflow-hidden border-2 border-muted shrink-0 bg-secondary">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={room.nameTh}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
          </div>
        </FieldContent>

        <Field>
          <FieldLabel>Select New Image</FieldLabel>
          <div className="flex gap-4 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
              className="max-w-md"
            />
          </div>
        </Field>
      </FieldSet>
    </FieldGroup>
  );
};
