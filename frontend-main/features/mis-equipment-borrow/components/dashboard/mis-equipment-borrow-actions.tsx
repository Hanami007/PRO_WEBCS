"use client";

import React, { useState } from "react";
import { MisEquipmentBorrow } from "../../types/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, PackageCheck, PackageX, Package } from "lucide-react";
import { DeleteMisEquipmentBorrow } from "./delete-mis-equipment-borrow";
import { useUpdateMisEquipmentBorrow } from "../../api/update-mis-equipment-borrow";
import { toast } from "sonner";

type Props = { item: MisEquipmentBorrow };

export const MisEquipmentBorrowActions = ({ item }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const updateMutation = useUpdateMisEquipmentBorrow({
    mutationConfig: { onSuccess: () => toast.success("อัพเดทสถานะสำเร็จ") },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">เปิดเมนู</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>สถานะ</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "borrowed" } })} className="flex justify-between cursor-pointer">
            <span>กำลังยืม</span>
            <Package className="h-4 w-4 text-blue-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "returned" } })} className="flex justify-between cursor-pointer">
            <span>คืนแล้ว</span>
            <PackageCheck className="h-4 w-4 text-green-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "overdue" } })} className="flex justify-between cursor-pointer">
            <span>เกินกำหนด</span>
            <PackageX className="h-4 w-4 text-red-500" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setDeleteOpen(true)} className="flex justify-between cursor-pointer text-destructive focus:text-destructive">
            <span>ลบ</span>
            <Trash2 size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteMisEquipmentBorrow id={item.id} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
};
