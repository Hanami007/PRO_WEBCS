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
import { Lock, SquarePen } from "lucide-react";
import { MisEquipmentBorrow } from "../../types/api";
import { ConfirmReturnModal } from "./confirm-return-modal";

interface ReturnEquipmentModalProps {
  item: MisEquipmentBorrow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReturnEquipmentModal = ({
  item,
  open,
  onOpenChange,
}: ReturnEquipmentModalProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">
              บันทึกข้อมูลคืนครุภัณฑ์
            </DialogTitle>
          </DialogHeader>

          {/* Section 1: ข้อมูลการยืมครุภัณฑ์ */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              ข้อมูลการยืมครุภัณฑ์
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  ชื่อผู้ยืมครุภัณฑ์
                </label>
                <Input
                  readOnly
                  value={item.borrowerName}
                  className="bg-slate-100 dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  เบอร์โทรติดต่อ
                </label>
                <Input
                  readOnly
                  value="0815180195"
                  className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  วันที่ยืม
                </label>
                <Input
                  readOnly
                  value={item.borrowDate}
                  className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                รายละเอียดการยืม
              </label>
              <Textarea
                readOnly
                rows={2}
                value={item.note || "ยืมเพื่อใช้งานการเรียนการสอน/กิจกรรมภาควิชา"}
                className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 resize-none"
              />
            </div>
          </div>

          {/* Section 2: รายการครุภัณฑ์ที่ถูกยืม */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              รายการครุภัณฑ์ที่ถูกยืม
            </h3>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-center font-semibold text-slate-600 dark:text-slate-400 w-16">
                      ลำดับ
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">
                      ครุภัณฑ์
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-600 dark:text-slate-400 w-28">
                      จำนวนที่ยืม
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">
                      รายละเอียด
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-600 dark:text-slate-400 w-36">
                      ตรวจสอบครุภัณฑ์
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                  <tr>
                    <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                      1
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {item.equipmentName}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      -
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        type="button"
                        size="icon"
                        className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg h-8 w-8 cursor-pointer"
                      >
                        <SquarePen className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Action Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 h-11 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                คืนครุภัณฑ์
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmReturnModal
        item={item}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onSuccess={() => onOpenChange(false)}
      />
    </>
  );
};
