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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { useCreateMisEquipmentBorrow } from "../../api/create-mis-equipment-borrow";
import { toast } from "sonner";

interface CreateMisEquipmentBorrowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMisEquipmentBorrowModal = ({
  open,
  onOpenChange,
}: CreateMisEquipmentBorrowModalProps) => {
  const [borrowerName, setBorrowerName] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [borrowDate, setBorrowDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const [note, setNote] = useState("");

  const createMutation = useCreateMisEquipmentBorrow({
    mutationConfig: {
      onSuccess: () => {
        toast.success("เพิ่มรายการยืมครุภัณฑ์สำเร็จแล้ว");
        onOpenChange(false);
        setBorrowerName("");
        setEquipmentName("");
        setQuantity(1);
        setNote("");
      },
      onError: () => toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล"),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowerName.trim()) {
      toast.error("กรุณาระบุชื่อผู้ยืม");
      return;
    }
    if (!equipmentName.trim()) {
      toast.error("กรุณาระบุชื่อครุภัณฑ์/อุปกรณ์");
      return;
    }

    createMutation.mutate({
      data: {
        borrowerName,
        equipmentName,
        quantity,
        borrowDate,
        returnDate: returnDate || borrowDate,
        note,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-500" />
            เพิ่มรายการยืมครุภัณฑ์ใหม่
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ชื่อผู้ยืม *
            </label>
            <Input
              required
              placeholder="ระบุชื่อ-นามสกุล ผู้ยืม..."
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                ชื่อครุภัณฑ์/อุปกรณ์ *
              </label>
              <Input
                required
                placeholder="เช่น กุญแจห้องบรรยาย 8, โปรเจคเตอร์..."
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                จำนวน *
              </label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                วันที่ยืม *
              </label>
              <Input
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                กำหนดวันคืน
              </label>
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              หมายเหตุ / รายละเอียดเพิ่มเติม
            </label>
            <Textarea
              rows={2}
              placeholder="ระบุรายละเอียดวัตถุประสงค์การยืม..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              บันทึกรายการ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
