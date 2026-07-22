"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eraser } from "lucide-react";
import { useProjects } from "../../api/get-projects";
import { projectsColumns } from "./dashboard-project-columns";
import { CreateProject } from "./create-project";

export const DashboardProjectList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const projectQuery = useProjects({
    page,
    limit,
    search: activeSearch,
  });

  const projects = projectQuery?.data?.data || [];
  const meta = projectQuery?.data?.meta;
  const pageCount = meta?.totalPages || 1;

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
      {/* Control Bar matching Screenshot */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Total Items Count */}
        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
          จำนวน {projects.length} รายการ
        </div>

        {/* Search & Action Buttons */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 max-w-3xl w-full">
          <Input
            placeholder="ป้อนคำที่ต้องการค้นหา เช่น ชื่อ รหัสโครงงาน หรือชื่ออาจารย์ที่ปรึกษา"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 h-10 shadow-sm text-sm"
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
          <div className="ml-auto shrink-0">
            <CreateProject />
          </div>
        </form>
      </div>

      {/* Table Data */}
      {projectQuery.isPending && !projectQuery.data ? (
        <div className="flex h-48 w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <DataTable
          columns={projectsColumns}
          data={projects}
          pageCount={pageCount}
        />
      )}
    </div>
  );
};
