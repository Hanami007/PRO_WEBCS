"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MisEquipmentBorrow } from "../../types/api";
import { useUpdateMisEquipmentBorrow } from "../../api/update-mis-equipment-borrow";
import { toast } from "sonner";

interface ConfirmReturnModalProps {
  item: MisEquipmentBorrow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ConfirmReturnModal = ({
  item,
  open,
  onOpenChange,
  onSuccess,
}: ConfirmReturnModalProps) => {
  const [receiverName, setReceiverName] = useState("");
  const updateMutation = useUpdateMisEquipmentBorrow({
    mutationConfig: {
      onSuccess: () => {
        toast.success("บันทึกการคืนครุภัณฑ์เรียบร้อยแล้ว");
        onOpenChange(false);
        if (onSuccess) onSuccess();
      },
      onError: () => toast.error("เกิดข้อผิดพลาดในการบันทึกการคืน"),
    },
  });

  const handleConfirm = () => {
    if (!receiverName.trim()) {
      toast.error("กรุณาระบุชื่อผู้รับคืนครุภัณฑ์");
      return;
    }

    const updatedNote = item.note
      ? `${item.note} | ผู้รับคืน: ${receiverName}`
      : `ผู้รับคืน: ${receiverName}`;

    updateMutation.mutate({
      id: item.id,
      data: {
        status: "returned",
        note: updatedNote,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-8 text-center space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">
            ยืนยันการคืนครุภัณฑ์
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 block">
            ชื่อผู้รับคืนครุภัณฑ์
          </label>
          <Input
            placeholder="ระบุชื่อผู้รับคืน..."
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="text-center h-12 text-base bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={updateMutation.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 h-10 rounded-xl cursor-pointer"
          >
            {updateMutation.isPending ? "กำลังบันทึก..." : "ยืนยัน"}
          </Button>
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 h-10 rounded-xl cursor-pointer"
          >
            ยกเลิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
