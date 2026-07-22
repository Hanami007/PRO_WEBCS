"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MisEquipmentBorrow } from "../../types/api";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { ReturnEquipmentModal } from "./return-equipment-modal";
import { DeleteMisEquipmentBorrow } from "./delete-mis-equipment-borrow";

// Action cell component that handles return modal and delete modal triggers
const MisEquipmentBorrowRowActions = ({ item }: { item: MisEquipmentBorrow }) => {
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Yellow/Gold Edit & Return Icon Button */}
      <Button
        type="button"
        size="icon"
        onClick={() => setReturnModalOpen(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white h-8 w-8 rounded-xl shadow-sm cursor-pointer"
        title="บันทึกการคืน / แก้ไข"
      >
        <SquarePen className="w-4 h-4" />
      </Button>

      {/* Red Delete Icon Button */}
      <Button
        type="button"
        size="icon"
        onClick={() => setDeleteModalOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white h-8 w-8 rounded-xl shadow-sm cursor-pointer"
        title="ลบรายการ"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <ReturnEquipmentModal
        item={item}
        open={returnModalOpen}
        onOpenChange={setReturnModalOpen}
      />

      <DeleteMisEquipmentBorrow
        id={item.id}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
    </div>
  );
};

export const misEquipmentBorrowColumns: ColumnDef<MisEquipmentBorrow>[] = [
  {
    id: "dates",
    header: "วันที่ยืม - คืน",
    size: 160,
    cell: ({ row }) => (
      <div className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
        <div>{row.original.borrowDate}</div>
        {row.original.returnDate && (
          <div className="text-slate-400">ถึง {row.original.returnDate}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "borrowerName",
    header: "ชื่อผู้ยืม",
    size: 180,
    cell: ({ row }) => (
      <span className="font-bold text-slate-800 dark:text-slate-200">
        {row.original.borrowerName}
      </span>
    ),
  },
  {
    accessorKey: "equipmentName",
    header: "รายการสิ่งที่ยืม",
    size: 240,
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <div className="font-medium text-slate-900 dark:text-slate-100">
          {row.original.equipmentName}
        </div>
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          จำนวน {row.original.quantity}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "สถานะการคืน",
    size: 130,
    cell: ({ row }) => {
      const isReturned = row.original.status === "returned";
      return (
        <span
          className={`font-bold text-sm ${
            isReturned
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {isReturned ? "คืนแล้ว" : "ยังไม่คืน"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "การจัดการ",
    size: 100,
    cell: ({ row }) => <MisEquipmentBorrowRowActions item={row.original} />,
  },
];
