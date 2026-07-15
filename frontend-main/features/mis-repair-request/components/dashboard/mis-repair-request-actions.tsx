"use client";

import React, { useState } from "react";
import { MisRepairRequest } from "../../types/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";
import { DeleteMisRepairRequest } from "./delete-mis-repair-request";
import { useUpdateMisRepairRequest } from "../../api/update-mis-repair-request";
import { toast } from "sonner";
import Image from "next/image";

type Props = { item: MisRepairRequest };

export const MisRepairRequestActions = ({ item }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const updateMutation = useUpdateMisRepairRequest({
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setViewOpen(true)} className="flex justify-between cursor-pointer">
            <span>ดูรายละเอียด</span>
            <Eye className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>สถานะ</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "pending" } })} className="flex justify-between cursor-pointer">
            <span>รอดำเนินการ</span>
            <Clock className="h-4 w-4 text-yellow-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "in_progress" } })} className="flex justify-between cursor-pointer">
            <span>กำลังซ่อม</span>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateMutation.mutate({ id: item.id, data: { status: "resolved" } })} className="flex justify-between cursor-pointer">
            <span>ซ่อมเสร็จแล้ว</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setDeleteOpen(true)} className="flex justify-between cursor-pointer text-destructive focus:text-destructive">
            <span>ลบ</span>
            <Trash2 size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteMisRepairRequest id={item.id} open={deleteOpen} onOpenChange={setDeleteOpen} />

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{item.itemName} — {item.location}</DialogTitle>
            <DialogDescription>แจ้งโดย {item.reporterName} เมื่อ {new Date(item.createdAt).toLocaleString("th-TH")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">รายละเอียด</h4>
              <p className="whitespace-pre-wrap leading-relaxed border rounded-lg p-4 bg-muted/30">{item.description}</p>
            </div>
            {item.image?.url && (
              <div className="space-y-1">
                <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">รูปภาพ</h4>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
                  <Image src={item.image.url} alt={item.itemName} fill className="object-contain" />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
