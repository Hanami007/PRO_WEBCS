"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { Wrench, MapPin, Tag, FileText, Camera, RotateCcw, Save, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUser } from "@/lib/auth";
import useFilePreview from "@/hooks/use-file-preview";
import { useRooms } from "@/features/rooms/api/get-rooms";
import { useMisRepairRequests } from "../api/get-mis-repair-requests";
import {
  CreateMisRepairRequestInput,
  createMisRepairRequestInputSchema,
  useCreateMisRepairRequest,
} from "../api/create-mis-repair-request";
import { FormInput, FormTextarea, FormFile, FormImagePreview, FormSelect } from "@/components/form";

const statusMap = {
  pending: { label: "รอดำเนินการ", variant: "outline" as const },
  in_progress: { label: "กำลังซ่อม", variant: "secondary" as const },
  resolved: { label: "ซ่อมเสร็จ", variant: "default" as const },
};

// Static mock equipments with prefilled names and rooms
const mockEquipments = [
  { code: "วท.7440-019-1209/62", name: "เครื่องคอมพิวเตอร์", room: "ห้องปฏิบัติการคอมพิวเตอร์ 3" },
  { code: "วท.7440-019-1210/62", name: "เครื่องฉายภาพโปรเจคเตอร์", room: "ห้องบรรยาย 1" },
  { code: "วท.7440-019-1211/62", name: "เครื่องปรับอากาศ", room: "ห้องปฏิบัติการคอมพิวเตอร์ 1" },
  { code: "วท.7440-019-1212/62", name: "จอภาพ LED 55 นิ้ว", room: "ห้องประชุมภาควิชา" },
  { code: "วท.7440-019-1213/62", name: "ไมโครโฟนไร้สาย", room: "ห้องบรรยาย 2" }
];

export const CreateMisRepairRequest = () => {
  const { data: currentUser } = useUser();
  const mutation = useCreateMisRepairRequest();

  // Fetch rooms list for manual entry room select
  const { data: roomsData } = useRooms({ limit: 100 });
  const rooms = useMemo(() => roomsData?.data || [], [roomsData]);

  // Fetch repair request history
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } = useMisRepairRequests({
    limit: 100,
  });

  // Radio button choice: hasCode (true) or noCode (false)
  const [hasCode, setHasCode] = useState<"true" | "false">("true");
  // Selected mock equipment code
  const [selectedEquipmentCode, setSelectedEquipmentCode] = useState("");

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

  const { control, handleSubmit, setValue, reset, formState: { errors } } = form;

  const file = form.watch("file");
  const [filePreview] = useFilePreview(file ?? null);

  // Pre-fill reporterName with current user's name
  useEffect(() => {
    if (currentUser) {
      setValue("reporterName", currentUser.name || "");
    }
  }, [currentUser, setValue]);

  // Handle Equipment Code selection
  useEffect(() => {
    if (hasCode === "true" && selectedEquipmentCode) {
      const eq = mockEquipments.find((e) => e.code === selectedEquipmentCode);
      if (eq) {
        setValue("itemName", eq.name);
        setValue("location", eq.room);
      }
    }
  }, [hasCode, selectedEquipmentCode, setValue]);

  // Reset values when switching radio option
  useEffect(() => {
    setValue("itemName", "");
    setValue("location", "");
    setSelectedEquipmentCode("");
  }, [hasCode, setValue]);

  // Filter history for current user
  const myHistory = useMemo(() => {
    if (!currentUser) return [];
    return (historyData?.data || []).filter(
      (item) => item.reporterName === currentUser.name
    );
  }, [historyData, currentUser]);

  const handleClear = () => {
    reset({
      reporterName: currentUser?.name || "",
      location: "",
      itemName: "",
      description: "",
      file: undefined,
    });
    setHasCode("true");
    setSelectedEquipmentCode("");
  };

  const onSubmit = (values: CreateMisRepairRequestInput) => {
    const { file, ...data } = values;

    if (!data.itemName.trim()) {
      toast.error("กรุณาระบุชื่อครุภัณฑ์/อุปกรณ์");
      return;
    }

    if (!data.location.trim()) {
      toast.error("กรุณาระบุสถานที่/ห้อง");
      return;
    }

    // Append equipment code prefix to itemName if hasCode is true
    const finalItemName =
      hasCode === "true" && selectedEquipmentCode
        ? `${data.itemName} (รหัส: ${selectedEquipmentCode})`
        : data.itemName;

    const submissionData = {
      ...data,
      itemName: finalItemName,
    };

    mutation.mutate(
      { data: submissionData, file },
      {
        onSuccess: () => {
          toast.success("แจ้งของพังสำเร็จแล้ว ทีมงานจะดำเนินการโดยเร็ว");
          handleClear();
          refetchHistory();
        },
        onError: () => toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"),
      },
    );
  };

  return (
    <section className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container - Left Side */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <FieldSet>
                {/* Radio selection: Has or Has Not Equipment Code */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    หมายเลขครุภัณฑ์ที่ชำรุด *
                  </label>
                  <RadioGroup
                    value={hasCode}
                    onValueChange={(val: "true" | "false") => setHasCode(val)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="has-code" />
                      <label htmlFor="has-code" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                        มีหมายเลขครุภัณฑ์
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="no-code" />
                      <label htmlFor="no-code" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                        ไม่มีหมายเลขครุภัณฑ์
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dropdown to select equipment code */}
                {hasCode === "true" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Search className="h-4 w-4 text-slate-400" />
                      เลือกรหัสครุภัณฑ์ที่ชำรุด *
                    </label>
                    <Select onValueChange={setSelectedEquipmentCode} value={selectedEquipmentCode}>
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all">
                        <SelectValue placeholder="ค้นหาและเลือกรหัสครุภัณฑ์..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEquipments.map((eq) => (
                          <SelectItem key={eq.code} value={eq.code}>
                            {eq.code} - {eq.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Prefilled or manually editable inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* itemName field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-slate-400" />
                      ชื่อครุภัณฑ์ *
                    </label>
                    <Controller
                      control={control}
                      name="itemName"
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          readOnly={hasCode === "true"}
                          placeholder={hasCode === "true" ? "ข้อมูลชื่อครุภัณฑ์อัตโนมัติ" : "เช่น เครื่องคอมพิวเตอร์"}
                          className={`bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all ${
                            hasCode === "true" ? "text-slate-400 dark:text-slate-500 cursor-not-allowed bg-slate-100" : ""
                          }`}
                        />
                      )}
                    />
                  </div>

                  {/* location field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      ห้อง *
                    </label>
                    {hasCode === "true" ? (
                      <Controller
                        control={control}
                        name="location"
                        render={({ field }) => (
                          <Input
                            {...field}
                            readOnly
                            placeholder="ข้อมูลห้องอัตโนมัติ"
                            className="bg-slate-100 text-slate-400 dark:text-slate-500 cursor-not-allowed dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                          />
                        )}
                      />
                    ) : (
                      <FormSelect control={control} name="location">
                        {rooms.map((room) => {
                          const displayName = `${room.nameTh} (${room.code})`;
                          return (
                            <SelectItem key={room.id} value={room.nameTh}>
                              {displayName}
                            </SelectItem>
                          );
                        })}
                      </FormSelect>
                    )}
                  </div>
                </div>

                {/* Detail / Description */}
                <FormTextarea control={control} name="description" label="รายละเอียดปัญหา *" />

                {/* Reporter Name */}
                <FormInput control={control} name="reporterName" label="ชื่อ-นามสกุล ผู้แจ้ง *" />

                {/* File Upload with Image Preview */}
                <div className="space-y-2">
                  <FormImagePreview file={filePreview} />
                  <FormFile control={control} name="file" label="อัพโหลดรูปภาพประกอบ (ไฟล์อัพโหลดต้องไม่เกิน 8MB)" />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-900">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClear}
                    className="text-slate-500 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-4 w-4" />
                    ล้างแบบฟอร์ม
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 flex items-center gap-1.5 cursor-pointer"
                    disabled={mutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    บันทึกข้อมูล
                  </Button>
                </div>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>

        {/* Illustration Container - Right Side */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 h-full">
          <div className="relative w-full aspect-square max-w-[320px]">
            <Image
              src="/images/repair_request.png"
              alt="Repair Request Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-center font-bold text-slate-700 dark:text-slate-300 mt-6">
            ระบบแจ้งซ่อมอุปกรณ์ / บำรุงรักษา
          </h3>
          <p className="text-center text-xs text-slate-400 mt-1">
            ภาควิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
          </p>
        </div>
      </div>

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
                        <Badge variant={statusMap[item.status]?.variant || "outline"}>
                          {statusMap[item.status]?.label || item.status}
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
