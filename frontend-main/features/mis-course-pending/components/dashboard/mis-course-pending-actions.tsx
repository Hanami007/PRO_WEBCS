"use client";

import React, { useState } from "react";
import { MisCoursePending } from "../../types/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";
import { DeleteMisCoursePending } from "./delete-mis-course-pending";
import { useUpdateMisCoursePending } from "../../api/update-mis-course-pending";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Props = { item: MisCoursePending };

export const MisCoursePendingActions = ({ item }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const updateMutation = useUpdateMisCoursePending({
    mutationConfig: {
      onSuccess: () => toast.success("อัพเดทสถานะสำเร็จ"),
    },
  });

  const handleStatusUpdate = (status: MisCoursePending["status"]) => {
    updateMutation.mutate({ id: item.id, data: { status } });
  };

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
          <DropdownMenuItem onClick={() => handleStatusUpdate("pending")} className="flex justify-between cursor-pointer">
            <span>รอดำเนินการ</span>
            <Clock className="h-4 w-4 text-yellow-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusUpdate("in_progress")} className="flex justify-between cursor-pointer">
            <span>กำลังดำเนินการ</span>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusUpdate("resolved")} className="flex justify-between cursor-pointer">
            <span>เสร็จสิ้น</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className="flex justify-between cursor-pointer text-destructive focus:text-destructive"
          >
            <span>ลบ</span>
            <Trash2 size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteMisCoursePending id={item.id} open={deleteOpen} onOpenChange={setDeleteOpen} />

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>รายละเอียดคำร้องแจ้งตกค้างรายวิชา</DialogTitle>
            <DialogDescription>
              ส่งโดย {item.studentName} (รหัส {item.studentId}) เมื่อ {new Date(item.createdAt).toLocaleString("th-TH")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-muted-foreground block text-xs uppercase tracking-wider">รหัสวิชา</span>
                <span className="font-semibold text-slate-800">{item.courseCode}</span>
              </div>
              <div>
                <span className="font-bold text-muted-foreground block text-xs uppercase tracking-wider">ชื่อวิชา</span>
                <span className="font-semibold text-slate-800">{item.courseName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-muted-foreground block text-xs uppercase tracking-wider">ประเภทรายวิชา</span>
                <span className="font-semibold text-slate-800">
                  {item.subjectType === "2" ? "กลุ่มรายวิชาภายนอกสาขา" : "กลุ่มรายวิชาภายในสาขา"}
                </span>
              </div>
              <div>
                <span className="font-bold text-muted-foreground block text-xs uppercase tracking-wider">อาจารย์ผู้ดูแล</span>
                <span className="font-semibold text-slate-800">{item.advisor || "-"}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-muted-foreground block text-xs uppercase tracking-wider">เหตุผลในการยื่นคำร้อง</span>
              <p className="whitespace-pre-wrap leading-relaxed border rounded-lg p-4 bg-muted/30">
                {item.reason}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
