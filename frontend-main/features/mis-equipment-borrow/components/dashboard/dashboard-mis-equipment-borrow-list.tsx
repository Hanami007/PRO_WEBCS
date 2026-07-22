"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eraser, Plus } from "lucide-react";
import { useMisEquipmentBorrows } from "../../api/get-mis-equipment-borrows";
import { misEquipmentBorrowColumns } from "./mis-equipment-borrow-columns";
import { CreateMisEquipmentBorrowModal } from "./create-mis-equipment-borrow-modal";

export const DashboardMisEquipmentBorrowList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const query = useMisEquipmentBorrows({ page, limit, search: activeSearch });

  const data = query.data?.data || [];
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
      {/* Control Bar matching Screenshot 2 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Count Label */}
        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
          จำนวน {data.length} รายการ
        </div>

        {/* Search & Action Buttons */}
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

          {/* Green + เพิ่ม Button */}
          <Button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 h-10 flex items-center gap-1.5 shadow-sm shrink-0 ml-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            เพิ่ม
          </Button>
        </form>
      </div>

      {/* Table Data */}
      {query.isPending && !query.data ? (
        <div className="flex h-48 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <DataTable
          columns={misEquipmentBorrowColumns}
          data={data}
          pageCount={pageCount}
        />
      )}

      {/* Create Borrowing Modal */}
      <CreateMisEquipmentBorrowModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
};
