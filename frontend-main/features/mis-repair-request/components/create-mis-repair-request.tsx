"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea, FormFile, FormImagePreview } from "@/components/form";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUser } from "@/lib/auth";
import useFilePreview from "@/hooks/use-file-preview";
import { useMisRepairRequests } from "../api/get-mis-repair-requests";
import {
  CreateMisRepairRequestInput,
  createMisRepairRequestInputSchema,
  useCreateMisRepairRequest,
} from "../api/create-mis-repair-request";

const statusMap = {
  pending: { label: "รอดำเนินการ", variant: "outline" as const },
  in_progress: { label: "กำลังซ่อม", variant: "secondary" as const },
  resolved: { label: "ซ่อมเสร็จ", variant: "default" as const },
};

export const CreateMisRepairRequest = () => {
  const { data: currentUser } = useUser();
  const mutation = useCreateMisRepairRequest();

  // Fetch repair request history
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } = useMisRepairRequests({
    limit: 100,
  });

  const form = useForm<CreateMisRepairRequestInput>({
    resolver: zodResolver(createMisRepairRequestInputSchema),
    defaultValues: {
      reporterName: "",
      location: "",
      itemName: "",
      description: "",
      file: undefined,
    },
  });

  const file = form.watch("file");
  const [filePreview] = useFilePreview(file ?? null);

  // Pre-fill reporterName with current user's name
  useEffect(() => {
    if (currentUser) {
      form.setValue("reporterName", currentUser.name || "");
    }
  }, [currentUser, form]);

  // Filter history for current user
  const myHistory = useMemo(() => {
    if (!currentUser) return [];
    return (historyData?.data || []).filter(
      (item) => item.reporterName === currentUser.name
    );
  }, [historyData, currentUser]);

  const onSubmit = (values: CreateMisRepairRequestInput) => {
    const { file, ...data } = values;
    mutation.mutate(
      { data, file },
      {
        onSuccess: () => {
          toast.success("แจ้งของพังสำเร็จแล้ว ทีมงานจะดำเนินการโดยเร็ว");
          form.reset({
            reporterName: currentUser?.name || "",
            location: "",
            itemName: "",
            description: "",
            file: undefined,
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
            <FormInput control={form.control} name="reporterName" label="ชื่อผู้แจ้ง" />
            <FormInput control={form.control} name="location" label="สถานที่/ห้อง" />
            <FormInput control={form.control} name="itemName" label="ชื่ออุปกรณ์ที่พัง" />
            <FormTextarea control={form.control} name="description" label="รายละเอียดปัญหา" />
            <FormImagePreview file={filePreview} />
            <FormFile control={form.control} name="file" label="อัพโหลดรูปภาพ (ถ้ามี)" />
            <Field>
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? "กำลังส่ง..." : "ส่งคำร้อง"}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>

      {/* History section (Only displays when student is logged in) */}
      {currentUser && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            ประวัติการแจ้งซ่อมของคุณ
          </h3>
          {isLoadingHistory ? (
            <div className="text-sm text-slate-500">กำลังโหลดประวัติ...</div>
          ) : myHistory.length > 0 ? (
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">วันที่แจ้ง</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">อุปกรณ์</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">สถานที่</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                  {myHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(item.createdAt))}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.itemName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.location}
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
              ยังไม่มีประวัติการแจ้งซ่อมในระบบ
            </p>
          )}
        </div>
      )}
    </section>
  );
};
