"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Save, Bell, Check } from "lucide-react";
import { toast } from "sonner";

export const LineTokenTab = () => {
  const [token, setToken] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("กรุณาระบุ Line Notify Token");
      return;
    }
    // Save token logic (localStorage / setting API)
    if (typeof window !== "undefined") {
      localStorage.setItem("line_notify_token", token);
    }
    setIsSaved(true);
    toast.success("บันทึก Line Notify Token สำเร็จแล้ว");
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            ตั้งค่า Line Notify Token
          </CardTitle>
          <CardDescription>
            กำหนด Line Notify Token สำหรับรับการแจ้งเตือนเมื่อมีผู้แจ้งซ่อมอุปกรณ์ใหม่ในระบบ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Line Notify Access Token
              </label>
              <Input
                type="password"
                placeholder="วาง Line Notify Token ที่นี่..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900"
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5">
                <Bell className="w-4 h-4" /> วิธีรับ Line Notify Token:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-amber-700 dark:text-amber-400">
                <li>เข้าสู่ระบบเว็บไซต์ notify-bot.line.me</li>
                <li>ไปที่หน้า My Page และกด Generate token</li>
                <li>เลือกกลุ่มหรือแชทที่ต้องการรับการแจ้งเตือน</li>
                <li>คัดลอก Token มาวางในช่องด้านบนแล้วกดบันทึก</li>
              </ol>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2"
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaved ? "บันทึกแล้ว" : "บันทึก Token"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
