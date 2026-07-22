"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProjectActions } from "./project-actions";
import { Project } from "../../types/api";

export const projectsColumns: ColumnDef<Project>[] = [
  {
    id: "codeYear",
    header: "รหัสโครงงาน",
    size: 130,
    cell: ({ row }) => (
      <span className="font-bold text-slate-800 dark:text-slate-200">
        {row.original.code} {row.original.year ? `/${row.original.year}` : ""}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "ชื่อโครงงาน (ลิงค์ไฟล์)",
    size: 320,
    cell: ({ row }) => {
      const file = row.original.file;
      return (
        <div>
          {file ? (
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 underline underline-offset-2 transition-colors line-clamp-2"
            >
              {row.original.name}
            </a>
          ) : (
            <span className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
              {row.original.name}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "editors",
    header: "ชื่อผู้ทำโครงงาน",
    size: 220,
    cell: ({ row }) => {
      const editors = row.original.editors || [];
      if (editors.length === 0) return <span className="text-slate-400">-</span>;
      return (
        <div className="space-y-0.5 text-slate-800 dark:text-slate-200 font-medium">
          {editors.map((editor, idx) => (
            <div key={idx} className="line-clamp-1">
              {editor}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "advisors",
    header: "ชื่ออาจารย์ที่ปรึกษา",
    size: 260,
    cell: ({ row }) => {
      const { chairman, director1, director2 } = row.original;
      return (
        <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
          {chairman && (
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                ประธาน
              </div>
              <div className="font-medium">{chairman.fullnameTh}</div>
            </div>
          )}

          {director1 && (
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                กรรมการ
              </div>
              <div className="font-medium">{director1.fullnameTh}</div>
            </div>
          )}

          {director2 && (
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100">
                กรรมการ
              </div>
              <div className="font-medium">{director2.fullnameTh}</div>
            </div>
          )}

          {!chairman && !director1 && !director2 && (
            <span className="text-slate-400">-</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "การจัดการ",
    size: 100,
    cell: ({ row }) => <ProjectActions project={row.original} />,
  },
];
