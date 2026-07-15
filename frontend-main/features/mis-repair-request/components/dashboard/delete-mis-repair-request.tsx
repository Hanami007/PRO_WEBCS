"use client";

import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteMisRepairRequest } from "../../api/delete-mis-repair-request";

type Props = { id: string; open?: boolean; onOpenChange?: (open: boolean) => void };

export const DeleteMisRepairRequest = ({ id, open: propOpen, onOpenChange }: Props) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const mutation = useDeleteMisRepairRequest({
    mutationConfig: {
      onSuccess: () => { toast.success("ลบรายการสำเร็จ"); setOpen(false); },
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ?</AlertDialogTitle>
          <AlertDialogDescription>รายการแจ้งของพังนี้จะถูกลบออกจากระบบ</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => { e.preventDefault(); mutation.mutate({ id }); }}
            disabled={mutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? "กำลังลบ..." : "ลบ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
