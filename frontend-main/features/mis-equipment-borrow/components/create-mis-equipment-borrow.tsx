"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Minus, Trash2, Calendar, Phone, Activity, RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldSet, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { FormInput, FormTextarea } from "@/components/form";

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

type EquipmentItem = {
  name: string;
  quantity: number;
};

export const CreateMisEquipmentBorrow = () => {
  const { data: currentUser } = useUser();
  const mutation = useCreateMisEquipmentBorrow();

  // Fetch history
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } = useMisEquipmentBorrows({
    limit: 100,
  });

  // Dynamic Equipment Items State
  const [items, setItems] = useState<EquipmentItem[]>([{ name: "", quantity: 1 }]);

  // Borrow Duration State
  const [durationMode, setDurationMode] = useState<"single" | "multi">("multi");

  // Phone and Activity State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activityPurpose, setActivityPurpose] = useState("");

  const form = useForm<CreateMisEquipmentBorrowInput>({
    resolver: zodResolver(createMisEquipmentBorrowInputSchema),
    defaultValues: {
      borrowerName: "",
      equipmentName: "placeholder", // will be computed on submit
      quantity: 1, // will be computed on submit
      borrowDate: "",
      returnDate: "",
      note: "",
    },
  });

  const { control, handleSubmit, setValue, reset, formState: { errors } } = form;

  // Pre-fill user data
  useEffect(() => {
    if (currentUser) {
      setValue("borrowerName", currentUser.name || "");
    }
  }, [currentUser, setValue]);

  // Filter history for current user
  const myHistory = useMemo(() => {
    if (!currentUser) return [];
    return (historyData?.data || []).filter(
      (item) => item.borrowerName === currentUser.name
    );
  }, [historyData, currentUser]);

  // Dynamic Items Operations
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleUpdateItem = (index: number, key: keyof EquipmentItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleClear = () => {
    reset({
      borrowerName: currentUser?.name || "",
      equipmentName: "placeholder",
      quantity: 1,
      borrowDate: "",
      returnDate: "",
      note: "",
    });
    setItems([{ name: "", quantity: 1 }]);
    setDurationMode("multi");
    setPhoneNumber("");
    setActivityPurpose("");
  };

  const onSubmit = (values: CreateMisEquipmentBorrowInput) => {
    console.log("Form values at onSubmit:", values);
    // Validate custom items
    const validItems = items.filter((item) => item.name.trim() !== "");
    if (validItems.length === 0) {
      toast.error("กรุณาระบุครุภัณฑ์ที่ต้องการยืมอย่างน้อย 1 รายการ");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("กรุณากรอกเบอร์โทรติดต่อ");
      return;
    }

    if (!activityPurpose.trim()) {
      toast.error("กรุณาระบุวัตถุประสงค์การใช้ในกิจกรรม");
      return;
    }

    // Format fields
    const equipmentString = validItems
      .map((item) => `${item.name} (${item.quantity})`)
      .join(", ");
    
    const totalQuantity = validItems.reduce((acc, curr) => acc + curr.quantity, 0);

    // If duration is single, returnDate is same as borrowDate
    const finalReturnDate = durationMode === "single" ? values.borrowDate : values.returnDate;

    if (!finalReturnDate) {
      toast.error("กรุณาเลือกวันที่สิ้นสุดการยืม");
      return;
    }

    const noteString = `เบอร์โทรติดต่อ: ${phoneNumber}\nใช้ในกิจกรรม: ${activityPurpose}`;

    const submissionData: CreateMisEquipmentBorrowInput = {
      ...values,
      equipmentName: equipmentString,
      quantity: totalQuantity,
      returnDate: finalReturnDate,
      note: noteString,
    };

    console.log("Sending submissionData to API:", submissionData);

    mutation.mutate(
      { data: submissionData },
      {
        onSuccess: () => {
          toast.success("บันทึกคำขอยืมครุภัณฑ์สำเร็จ");
          handleClear();
          refetchHistory();
        },
        onError: (err: any) => {
          console.error("API submission error:", err);
          const errMsg = err?.response?.data?.message || err?.message || "กรุณาลองใหม่อีกครั้ง";
          toast.error(`เกิดข้อผิดพลาด: ${errMsg}`);
        },
      }
    );
  };

  const onValidationError = (errors: any) => {
    console.error("React Hook Form validation failed:", errors);
    toast.error("กรุณากรอกข้อมูลในแบบฟอร์มให้ถูกต้องและครบถ้วน");
  };

  return (
    <section className="max-w-4xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container - Left Side */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6">
          <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-6">
            <FieldGroup>
              <FieldSet>
                {/* Borrower Name */}
                <FormInput control={control} name="borrowerName" label="ชื่อผู้ยืม *" />

                {/* Dynamic Equipment Rows */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      รายการครุภัณฑ์ที่ต้องการยืม *
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddItem}
                      className="text-emerald-500 border-emerald-500 hover:bg-emerald-50 cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      เพิ่มรายการ
                    </Button>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-end bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl relative border border-slate-100 dark:border-slate-800/80">
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-semibold text-slate-500">
                          ชื่อครุภัณฑ์ ({index + 1})
                        </label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleUpdateItem(index, "name", e.target.value)}
                          placeholder="ระบุชื่อครุภัณฑ์ เช่น โต๊ะ, เก้าอี้"
                          className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 block text-center">
                          จำนวน
                        </label>
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                          <Button
                            type="button"
                            onClick={() => handleUpdateItem(index, "quantity", Math.max(1, item.quantity - 1))}
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold text-slate-700 dark:text-slate-300">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            onClick={() => handleUpdateItem(index, "quantity", item.quantity + 1)}
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-9 w-9 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Duration Mode */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ระยะเวลาการยืม *
                  </label>
                  <RadioGroup
                    value={durationMode}
                    onValueChange={(val: any) => setDurationMode(val)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="mode-single" />
                      <label htmlFor="mode-single" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                        วันเดียว
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multi" id="mode-multi" />
                      <label htmlFor="mode-multi" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                        มากกว่า 1 วัน
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <Controller
                    control={control}
                    name="borrowDate"
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <label htmlFor="borrowDate" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          วันที่ยืม *
                        </label>
                        <div className="relative">
                          <Input
                            {...field}
                            id="borrowDate"
                            type="date"
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 pr-10 focus:bg-white transition-all"
                            aria-invalid={fieldState.invalid}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                        {fieldState.invalid && (
                          <p className="text-xs text-red-500 font-medium">{fieldState.error?.message}</p>
                        )}
                      </div>
                    )}
                  />

                  {/* End Date (Only if multi duration) */}
                  {durationMode === "multi" && (
                    <Controller
                      control={control}
                      name="returnDate"
                      render={({ field, fieldState }) => (
                        <div className="space-y-2">
                          <label htmlFor="returnDate" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            วันที่สิ้นสุดการยืม *
                          </label>
                          <div className="relative">
                            <Input
                              {...field}
                              id="returnDate"
                              type="date"
                              className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 pr-10 focus:bg-white transition-all"
                              aria-invalid={fieldState.invalid}
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          </div>
                          {fieldState.invalid && (
                            <p className="text-xs text-red-500 font-medium">{fieldState.error?.message}</p>
                          )}
                        </div>
                      )}
                    />
                  )}
                </div>

                {/* Purpose/Activity */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-slate-400" />
                    ใช้ในกิจกรรม *
                  </label>
                  <Textarea
                    value={activityPurpose}
                    onChange={(e) => setActivityPurpose(e.target.value)}
                    rows={3}
                    placeholder="ระบุชื่อกิจกรรม หรือ รายละเอียดการนำไปใช้งาน"
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 resize-none focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-slate-400" />
                    เบอร์โทรติดต่อ *
                  </label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="เช่น 0812345678"
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                  />
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
              src="/images/equipment_borrow.png"
              alt="Equipment Borrow Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-center font-bold text-slate-700 dark:text-slate-300 mt-6">
            ระบบยืม-คืนครุภัณฑ์
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
            ประวัติการยืม-คืนครุภัณฑ์ของคุณ
          </h3>
          {isLoadingHistory ? (
            <div className="text-sm text-slate-500">กำลังโหลดประวัติ...</div>
          ) : myHistory.length > 0 ? (
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">รายการครุภัณฑ์</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">จำนวนรวม</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">วันที่ยืม</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">กำหนดคืน</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                  {myHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                        {item.equipmentName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.quantity} ชิ้น
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.borrowDate}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.returnDate}
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
              ยังไม่มีประวัติการยืม-คืนครุภัณฑ์ในระบบ
            </p>
          )}
        </div>
      )}
    </section>
  );
};
