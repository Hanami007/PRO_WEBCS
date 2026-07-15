"use client";

import React, { useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea, FormNumber } from "@/components/form";
import { Field, FieldGroup, FieldSet, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUser } from "@/lib/auth";
import { useMisEquipmentBorrows } from "../api/get-mis-equipment-borrows";
import {
  CreateMisEquipmentBorrowInput,
  createMisEquipmentBorrowInputSchema,
  useCreateMisEquipmentBorrow,
} from "../api/create-mis-equipment-borrow";

const statusMap = {
  borrowed: { label: "กำลังยืม", variant: "secondary" as const },
  returned: { label: "คืนแล้ว", variant: "default" as const },
  overdue: { label: "เกินกำหนด", variant: "destructive" as const },
};

export const CreateMisEquipmentBorrow = () => {
  const { data: currentUser } = useUser();
  const mutation = useCreateMisEquipmentBorrow();

  // Fetch borrow history
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } = useMisEquipmentBorrows({
    limit: 100,
  });

  const form = useForm<CreateMisEquipmentBorrowInput>({
    resolver: zodResolver(createMisEquipmentBorrowInputSchema),
    defaultValues: {
      borrowerName: "",
      equipmentName: "",
      quantity: 1,
      borrowDate: "",
      returnDate: "",
      note: "",
    },
  });

  // Pre-fill borrowerName with current user's name
  useEffect(() => {
    if (currentUser) {
      form.setValue("borrowerName", currentUser.name || "");
    }
  }, [currentUser, form]);

  // Filter history for current user
  const myHistory = useMemo(() => {
    if (!currentUser) return [];
    return (historyData?.data || []).filter(
      (item) => item.borrowerName === currentUser.name
    );
  }, [historyData, currentUser]);

  const onSubmit = (values: CreateMisEquipmentBorrowInput) => {
    mutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast.success("บันทึกคำขอยืมครุภัณฑ์สำเร็จ");
          form.reset({
            borrowerName: currentUser?.name || "",
            equipmentName: "",
            quantity: 1,
            borrowDate: "",
            returnDate: "",
            note: "",
          });
          refetchHistory();
        },
        onError: () => toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"),
      },
    );
  };

  return (
    <section className="max-w-2xl mx-auto space-y-12">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <FieldSet>
            <FormInput control={form.control} name="borrowerName" label="ชื่อผู้ยืม" />
            <FormInput control={form.control} name="equipmentName" label="ชื่ออุปกรณ์" />
            <FormNumber control={form.control} name="quantity" label="จำนวน" />

            {/* Date field — วันที่ยืม */}
            <Controller
              control={form.control}
              name="borrowDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="borrowDate">วันที่ยืม</FieldLabel>
                  </FieldContent>
                  <Input {...field} id="borrowDate" type="date" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Date field — วันที่กำหนดคืน */}
            <Controller
              control={form.control}
              name="returnDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="returnDate">วันที่กำหนดคืน</FieldLabel>
                  </FieldContent>
                  <Input {...field} id="returnDate" type="date" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <FormTextarea control={form.control} name="note" label="หมายเหตุ (ถ้ามี)" />

            <Field>
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? "กำลังส่ง..." : "ส่งคำขอยืม"}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>

      {/* History section (Only displays when student is logged in) */}
      {currentUser && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            ประวัติการยืม-คืนครุภัณฑ์ของคุณ
          </h3>
          {isLoadingHistory ? (
            <div className="text-sm text-slate-500">กำลังโหลดประวัติ...</div>
          ) : myHistory.length > 0 ? (
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">อุปกรณ์</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">จำนวน</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">วันที่ยืม</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">กำหนดคืน</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                  {myHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.equipmentName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.borrowDate}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.returnDate}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusMap[item.status].variant}>
                          {statusMap[item.status].label}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              ยังไม่มีประวัติการยืม-คืนครุภัณฑ์ในระบบ
            </p>
          )}
        </div>
      )}
    </section>
  );
};
