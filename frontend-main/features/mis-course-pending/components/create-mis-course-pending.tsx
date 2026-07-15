"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Search, Check, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput, FormTextarea } from "@/components/form";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUser } from "@/lib/auth";
import { useCourses } from "@/features/courses/api/get-courses";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import { useMisCoursePendings } from "../api/get-mis-course-pendings";
import {
  CreateMisCoursePendingInput,
  createMisCoursePendingInputSchema,
  useCreateMisCoursePending,
} from "../api/create-mis-course-pending";

const statusMap = {
  pending: { label: "รอดำเนินการ", variant: "outline" as const },
  in_progress: { label: "กำลังดำเนินการ", variant: "secondary" as const },
  resolved: { label: "เสร็จสิ้น", variant: "default" as const },
};

export const CreateMisCoursePending = () => {
  const { data: currentUser } = useUser();
  const createMutation = useCreateMisCoursePending();

  // Fetch courses and personnels (advisors)
  const { data: coursesData, isLoading: isLoadingCourses } = useCourses({
    limit: 1000,
  });
  const { data: personnelsData, isLoading: isLoadingPersonnels } = usePersonnels({
    limit: 100,
  });

  // Fetch history list
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } = useMisCoursePendings({
    limit: 100,
  });

  const courses = useMemo(() => coursesData?.data || [], [coursesData]);
  const personnels = useMemo(() => personnelsData?.data || [], [personnelsData]);

  const studentIdFromEmail = useMemo(() => {
    return currentUser?.email?.split("@")[0] || "";
  }, [currentUser]);

  // Filter history for current user
  const myHistory = useMemo(() => {
    if (!currentUser) return [];
    return (historyData?.data || []).filter(
      (item) => item.studentId === studentIdFromEmail || item.studentName === currentUser.name
    );
  }, [historyData, currentUser, studentIdFromEmail]);

  // Form State
  const form = useForm<CreateMisCoursePendingInput>({
    resolver: zodResolver(createMisCoursePendingInputSchema),
    defaultValues: {
      studentId: "",
      studentName: "",
      subjectType: "",
      courseCode: "",
      courseName: "",
      advisor: "",
      reason: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const subjectType = watch("subjectType");
  const courseCode = watch("courseCode");
  const courseName = watch("courseName");
  const advisor = watch("advisor");
  const reason = watch("reason");

  // Pre-fill user data when loaded
  useEffect(() => {
    if (currentUser) {
      setValue("studentName", currentUser.name || "");
      setValue("studentId", studentIdFromEmail);
    }
  }, [currentUser, studentIdFromEmail, setValue]);

  // UI state
  const [selfComplete, setSelfComplete] = useState(false);
  const [advisorSelect, setAdvisorSelect] = useState("");
  const [advisorInput, setAdvisorInput] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Dialog State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<CreateMisCoursePendingInput | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle course dropdown click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCourseDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!courseSearch) return courses;
    const lower = courseSearch.toLowerCase();
    return courses.filter(
      (c) =>
        c.code.toLowerCase().includes(lower) ||
        c.titleTh.toLowerCase().includes(lower) ||
        (c.titleEn && c.titleEn.toLowerCase().includes(lower))
    );
  }, [courses, courseSearch]);

  // Watch subject type change to reset fields
  useEffect(() => {
    if (subjectType) {
      setValue("courseCode", "");
      setValue("courseName", "");
      setSelectedCourse(null);
      setCourseSearch("");
      setSelfComplete(false);
    }
  }, [subjectType, setValue]);

  // Handle course selection
  const handleSelectCourse = (course: any) => {
    setSelectedCourse(course);
    setValue("courseCode", course.code);
    setValue("courseName", course.titleTh);
    setCourseSearch(`${course.code} - ${course.titleTh}`);
    setIsCourseDropdownOpen(false);
  };

  // Sync advisor name
  useEffect(() => {
    if (subjectType === "2" || advisorSelect === "other") {
      setValue("advisor", advisorInput);
    } else {
      setValue("advisor", advisorSelect);
    }
  }, [subjectType, advisorSelect, advisorInput, setValue]);

  // Clean form
  const handleClear = () => {
    reset({
      studentId: studentIdFromEmail,
      studentName: currentUser?.name || "",
      subjectType: "",
      courseCode: "",
      courseName: "",
      advisor: "",
      reason: "",
    });
    setSelfComplete(false);
    setAdvisorSelect("");
    setAdvisorInput("");
    setCourseSearch("");
    setSelectedCourse(null);
  };

  // Submission handler (First opens dialog)
  const onSubmitForm = (values: CreateMisCoursePendingInput) => {
    setPendingValues(values);
    setIsConfirmOpen(true);
  };

  // Actual submit to backend
  const handleConfirmSubmit = () => {
    if (!pendingValues) return;
    createMutation.mutate(
      { data: pendingValues },
      {
        onSuccess: () => {
          toast.success("บันทึกข้อมูลเรียบร้อยแล้ว!");
          handleClear();
          setIsConfirmOpen(false);
          refetchHistory();
        },
        onError: (err: any) => {
          const errMsg = err?.response?.data?.message || "กรุณาตรวจสอบข้อมูลอีกครั้ง";
          toast.error(`ข้อมูลไม่ถูกต้อง: ${errMsg}`);
        },
      }
    );
  };

  return (
    <section className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <FieldGroup>
          <FieldSet>
            {/* Student ID & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput control={control} name="studentId" label="รหัสนักศึกษา" />
              <FormInput control={control} name="studentName" label="ชื่อ-นามสกุล" />
            </div>

            {/* Subject Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                กลุ่มรายวิชาเฉพาะ
              </label>
              <Controller
                control={control}
                name="subjectType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all">
                      <SelectValue placeholder="เลือกกลุ่มรายวิชาเฉพาะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">กลุ่มรายวิชาภายในสาขา</SelectItem>
                      <SelectItem value="2">กลุ่มรายวิชาภายนอกสาขา</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subjectType && (
                <p className="text-xs font-medium text-red-500">
                  {errors.subjectType.message}
                </p>
              )}
            </div>

            {/* Internal Course Selection */}
            {subjectType === "1" && (
              <>
                <div className="space-y-2" ref={dropdownRef}>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    เลือกวิชาที่ต้องการแจ้ง
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="กรอกรหัสหรือวิชาที่ต้องการแจ้ง..."
                      value={courseSearch}
                      onChange={(e) => {
                        setCourseSearch(e.target.value);
                        setIsCourseDropdownOpen(true);
                      }}
                      onFocus={() => setIsCourseDropdownOpen(true)}
                      disabled={selfComplete || isLoadingCourses}
                      className="pr-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {isLoadingCourses ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </div>

                    {/* Dropdown list */}
                    {isCourseDropdownOpen && !selfComplete && (
                      <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {filteredCourses.length > 0 ? (
                          filteredCourses.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => handleSelectCourse(c)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm flex items-center justify-between border-b last:border-0 border-slate-100 dark:border-slate-800 transition-colors cursor-pointer"
                            >
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {c.code} - {c.titleTh}
                              </span>
                              {selectedCourse?.id === c.id && (
                                <Check className="h-4 w-4 text-emerald-500" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-slate-400">
                            ไม่พบวิชาที่ค้นหา
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Self Complete Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="selfComplete"
                    checked={selfComplete}
                    onCheckedChange={(checked) => {
                      setSelfComplete(!!checked);
                      if (checked) {
                        setValue("courseCode", "");
                        setValue("courseName", "");
                      } else if (selectedCourse) {
                        setValue("courseCode", selectedCourse.code);
                        setValue("courseName", selectedCourse.titleTh);
                      }
                    }}
                  />
                  <label
                    htmlFor="selfComplete"
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                  >
                    ต้องการกรอกข้อมูลด้วยตนเอง
                  </label>
                </div>
              </>
            )}

            {/* Course Code & Name input fields */}
            {(subjectType === "2" || (subjectType === "1" && selfComplete)) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    รหัสรายวิชา
                  </label>
                  <Controller
                    control={control}
                    name="courseCode"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="เช่น CS313"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                      />
                    )}
                  />
                  {errors.courseCode && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.courseCode.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ชื่อรายวิชา
                  </label>
                  <Controller
                    control={control}
                    name="courseName"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="เช่น วิศวกรรมซอฟต์แวร์"
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                      />
                    )}
                  />
                  {errors.courseName && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.courseName.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Selected but readonly (when subject type is 1 and not self complete) */}
            {subjectType === "1" && !selfComplete && (courseCode || courseName) && (
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    รายวิชาที่เลือก
                  </div>
                  <div className="font-bold text-slate-700 dark:text-slate-300 mt-1">
                    {courseCode} — {courseName}
                  </div>
                </div>
              </div>
            )}

            {/* Advisor Selection */}
            {subjectType && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  อาจารย์ผู้รับผิดชอบรายวิชา
                </label>
                {subjectType === "1" ? (
                  <div className="space-y-3">
                    <Select onValueChange={setAdvisorSelect} value={advisorSelect}>
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all">
                        <SelectValue placeholder="เลือกอาจารย์ผู้รับผิดชอบ" />
                      </SelectTrigger>
                      <SelectContent>
                        {personnels.map((p) => {
                          const displayName = `${p.prefix || ""}${p.fullnameTh}`;
                          return (
                            <SelectItem key={p.id} value={displayName}>
                              {displayName}
                            </SelectItem>
                          );
                        })}
                        <SelectItem value="other">อื่นๆ</SelectItem>
                      </SelectContent>
                    </Select>

                    {advisorSelect === "other" && (
                      <Input
                        type="text"
                        placeholder="กรอกชื่ออาจารย์ผู้รับผิดชอบรายวิชา"
                        value={advisorInput}
                        onChange={(e) => setAdvisorInput(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                      />
                    )}
                  </div>
                ) : (
                  <Input
                    type="text"
                    placeholder="กรอกชื่ออาจารย์ผู้รับผิดชอบรายวิชา"
                    value={advisorInput}
                    onChange={(e) => setAdvisorInput(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white transition-all"
                  />
                )}
                {(errors.advisor || (!advisor && (advisorSelect === "other" || subjectType === "2") && !advisorInput)) && (
                  <p className="text-xs font-medium text-red-500">
                    กรุณาระบุอาจารย์ผู้รับผิดชอบ
                  </p>
                )}
              </div>
            )}

            {/* Reason Detail */}
            <FormTextarea control={control} name="reason" label="เหตุผลในการยื่นคำร้องแจ้งตกค้างรายวิชา" />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClear}
                className="text-slate-500 hover:bg-slate-50"
              >
                ล้างแบบฟอร์ม
              </Button>
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8"
                disabled={createMutation.isPending}
              >
                ส่งคำร้อง
              </Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
              ตรวจสอบข้อมูลการแจ้งตกค้างรายวิชา
            </DialogTitle>
            <DialogDescription>
              โปรดตรวจสอบความถูกต้องของข้อมูลก่อนยืนยันส่งคำร้องเข้าระบบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="w-32 font-bold text-slate-500">รหัสรายวิชา :</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{courseCode}</span>
            </div>
            <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="w-32 font-bold text-slate-500">ชื่อรายวิชา :</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{courseName}</span>
            </div>
            <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="w-32 font-bold text-slate-500">อาจารย์ผู้ดูแล :</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{advisor || "-"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-slate-500">รายละเอียด / เหตุผล :</span>
              <p className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400 max-h-24 overflow-y-auto">
                {reason}
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-row gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfirmOpen(false)}
              className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800"
            >
              ยกเลิก
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSubmit}
              className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "กำลังบันทึก..." : "ยืนยัน"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History section (Only displays when student is logged in) */}
      {currentUser && (
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            ประวัติการยื่นคำร้องแจ้งตกค้างรายวิชาของคุณ
          </h3>
          {isLoadingHistory ? (
            <div className="text-sm text-slate-500">กำลังโหลดประวัติการแจ้ง...</div>
          ) : myHistory.length > 0 ? (
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
              <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">วันที่แจ้ง</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">รายวิชา</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">อาจารย์ผู้รับผิดชอบ</th>
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
                        {item.courseCode} - {item.courseName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.advisor || "-"}
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
              ยังไม่มีประวัติการยื่นคำร้องแจ้งตกค้างรายวิชาในระบบ
            </p>
          )}
        </div>
      )}
    </section>
  );
};
