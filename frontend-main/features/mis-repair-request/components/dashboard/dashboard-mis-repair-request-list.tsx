"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter, Search, Eraser, Wrench } from "lucide-react";
import { useMisRepairRequests } from "../../api/get-mis-repair-requests";
import { misRepairRequestColumns } from "./mis-repair-request-columns";
import { CreateMisRepairRequest } from "../create-mis-repair-request";

interface DashboardMisRepairRequestListProps {
  statusFilter?: "active" | "resolved";
}

export const DashboardMisRepairRequestList = ({
  statusFilter,
}: DashboardMisRepairRequestListProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = useMisRepairRequests({ page, limit, search: activeSearch });

  const rawData = query.data?.data || [];
  
  // Filter by status if specified (active = pending/in_progress, resolved = resolved)
  const filteredData = rawData.filter((item) => {
    if (statusFilter === "active") return item.status !== "resolved";
    if (statusFilter === "resolved") return item.status === "resolved";
    return true;
  });

  const pageCount = query.data?.meta?.totalPages || 1;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearch(searchInput);
    setPage(1);
  };

  const handleClear = () => {
    setSearchInput("");
    setActiveSearch("");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="text-center space-y-1 py-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
          {statusFilter === "resolved" ? "ประวัติการซ่อม" : "รายการแจ้งซ่อม"}
          <ListFilter className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        </h2>
      </div>

      {/* Control Bar matching Screenshot */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Count Label */}
        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
          จำนวน {filteredData.length} รายการ
        </div>

        {/* Search & Buttons */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 max-w-2xl w-full">
          <Input
            placeholder="ป้อนคำที่ต้องการค้นหา"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 h-10 shadow-sm"
          />

          <Button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 h-10 flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            ค้นหา
          </Button>

          <Button
            type="button"
            onClick={handleClear}
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 h-10 flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
          >
            <Eraser className="w-4 h-4" />
            ล้าง
          </Button>

          {/* Yellow/Gold Repair Request Button */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 h-10 flex items-center gap-1.5 shadow-sm shrink-0 ml-auto cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                แจ้งซ่อม
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500" />
                  แบบฟอร์มแจ้งซ่อมอุปกรณ์
                </DialogTitle>
              </DialogHeader>
              <div className="pt-2">
                <CreateMisRepairRequest />
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </div>

      {/* Table Data */}
      {query.isPending && !query.data ? (
        <div className="flex h-48 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <DataTable
          columns={misRepairRequestColumns}
          data={filteredData}
          pageCount={pageCount}
        />
      )}
    </div>
  );
};
